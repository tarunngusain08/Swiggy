package middleware

import (
	"time"

	"github.com/gin-gonic/gin"
)

// LatencyTrackerMiddleware adds request latency to context (for further use)
func LatencyTrackerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Next()
		c.Set("latency", time.Since(start))
	}
}
