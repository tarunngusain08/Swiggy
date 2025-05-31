package middleware

import (
	"log"
	"time"

	"github.com/gin-gonic/gin"
)

// LoggingMiddleware logs method, path, status, latency, and trace-id
func LoggingMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		traceID := c.GetString("trace_id")
		c.Next()
		latency := time.Since(start)
		status := c.Writer.Status()
		log.Printf("[trace_id=%s] %s %s %d %s", traceID, c.Request.Method, c.Request.URL.Path, status, latency)
	}
}
