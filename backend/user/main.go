package main

import (
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"user-service/internal/handlers"
	"user-service/internal/middleware"
	"user-service/internal/models"
	"user-service/internal/repositories"
	"user-service/internal/services"
)

func main() {
	// Load config from env
	dbURL := os.Getenv("DATABASE_URL")
	jwtSecret := os.Getenv("JWT_SECRET")
	if dbURL == "" || jwtSecret == "" {
		log.Fatal("DATABASE_URL and JWT_SECRET must be set")
	}

	// Connect to DB
	db, err := gorm.Open(postgres.Open(dbURL), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}
	// Auto-migrate User model
	db.AutoMigrate(&models.User{})

	// Setup dependencies
	userRepo := repositories.NewUserRepository(db)
	userService := services.NewUserService(userRepo, jwtSecret)
	userHandler := handlers.NewUserHandler(userService)

	// Setup Gin router
	r := gin.Default()

	// Add middlewares in recommended order
	r.Use(middleware.CORS())
	r.Use(middleware.TraceIDMiddleware())
	r.Use(middleware.ContextManagerMiddleware())
	r.Use(middleware.TimeoutMiddleware(10 * time.Second))
	r.Use(middleware.LatencyTrackerMiddleware())
	r.Use(middleware.LoggingMiddleware())
	r.Use(middleware.ErrorHandlerMiddleware())

	// Public routes
	r.POST("/users/register", userHandler.Register)
	r.POST("/users/login", userHandler.Login)

	// Protected routes (JWTAuth only here)
	auth := r.Group("/users")
	auth.Use(middleware.JWTAuthMiddleware(jwtSecret))
	{
		auth.GET("/me", userHandler.GetProfile)
		auth.PUT("/me", userHandler.UpdateProfile)
		auth.DELETE("/me", userHandler.DeleteAccount)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}
