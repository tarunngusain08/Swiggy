package middleware

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// TimeoutMiddleware cancels context if request takes too long
func TimeoutMiddleware(timeout time.Duration) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), timeout)
		defer cancel()
		c.Request = c.Request.WithContext(ctx)
		finished := make(chan struct{})
		go func() {
			c.Next()
			close(finished)
		}()
		select {
		case <-ctx.Done():
			c.AbortWithStatusJSON(http.StatusGatewayTimeout, gin.H{"error": "request timeout"})
		case <-finished:
		}
	}
}
