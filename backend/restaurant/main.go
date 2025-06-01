package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"restaurant/internal/handler"
	"restaurant/internal/middleware"
	"restaurant/internal/model"
	"restaurant/internal/repository"
	"restaurant/internal/service"
)

func main() {
	// Load config from env or file (for brevity, using env)
	dsn := os.Getenv("POSTGRES_DSN")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=postgres dbname=restaurant port=5432 sslmode=disable"
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// Auto-migrate models
	db.AutoMigrate(&model.Restaurant{}, &model.MenuItem{})

	// Init repositories, services, handlers
	restaurantRepo := repository.NewRestaurantRepository(db)
	menuRepo := repository.NewMenuRepository(db)
	restaurantService := service.NewRestaurantService(restaurantRepo, menuRepo)
	restaurantHandler := handler.NewRestaurantHandler(restaurantService)

	// Gin router
	r := gin.Default()

	// Global middleware
	r.Use(
		middleware.CORS(),
		middleware.TraceID(),
		middleware.ContextManager(),
		middleware.Timeout(),
		middleware.LatencyTracker(),
		middleware.Logging(),
		middleware.ErrorHandler(),
	)

	// Public routes
	r.GET("/restaurants", restaurantHandler.ListRestaurants)
	r.GET("/restaurants/:id", restaurantHandler.GetRestaurant)
	r.GET("/restaurants/:id/menu", restaurantHandler.ListMenuItems)

	// Protected routes (JWT)
	auth := r.Group("/")
	auth.Use(middleware.JWTAuth())
	{
		auth.POST("/restaurants", restaurantHandler.CreateRestaurant)
		auth.PUT("/restaurants/:id", restaurantHandler.UpdateRestaurant)
		auth.DELETE("/restaurants/:id", restaurantHandler.DeleteRestaurant)

		auth.POST("/restaurants/:id/menu", restaurantHandler.AddMenuItem)
		auth.PUT("/restaurants/:id/menu/:item_id", restaurantHandler.UpdateMenuItem)
		auth.DELETE("/restaurants/:id/menu/:item_id", restaurantHandler.DeleteMenuItem)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
