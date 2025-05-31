package middleware

import (
	"context"

	"github.com/gin-gonic/gin"
)

// ContextManagerMiddleware can be used to inject values or manage context
func ContextManagerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), "custom_key", "custom_value")
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}
