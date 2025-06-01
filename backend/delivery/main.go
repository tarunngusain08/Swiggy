package main

import (
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"delivery/internal/handler"
	"delivery/internal/middleware"
	"delivery/internal/model"
	"delivery/internal/repository"
	"delivery/internal/service"
)

func main() {
	dsn := os.Getenv("POSTGRES_DSN")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}
	// Auto-migrate models
	db.AutoMigrate(&model.Delivery{}, &model.Partner{})

	// Init repositories, services, handlers
	deliveryRepo := repository.NewDeliveryRepository(db)
	partnerRepo := repository.NewPartnerRepository(db)
	deliveryService := service.NewDeliveryService(deliveryRepo, partnerRepo)
	partnerService := service.NewPartnerService(partnerRepo)
	deliveryHandler := handler.NewDeliveryHandler(deliveryService)
	partnerHandler := handler.NewPartnerHandler(partnerService)

	r := gin.Default()

	// Middlewares (recommended order)
	r.Use(middleware.LoggingMiddleware())
	r.Use(middleware.CORS())
	r.Use(middleware.TraceIDMiddleware())
	r.Use(middleware.ContextManagerMiddleware())
	r.Use(middleware.TimeoutMiddleware(10 * time.Second))
	r.Use(middleware.LatencyTrackerMiddleware())
	r.Use(middleware.ErrorHandlerMiddleware())

	// Public routes
	r.GET("/partners", partnerHandler.ListPartners)
	r.POST("/partners", middleware.JWTAuth(), partnerHandler.RegisterPartner)

	// Deliveries
	delivery := r.Group("/deliveries")
	{
		delivery.GET("", deliveryHandler.ListDeliveries)
		delivery.GET("/:id", deliveryHandler.GetDelivery)
		delivery.POST("", middleware.JWTAuth(), deliveryHandler.AssignDelivery)
		delivery.PUT("/:id/status", middleware.JWTAuth(), deliveryHandler.UpdateDeliveryStatus)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
