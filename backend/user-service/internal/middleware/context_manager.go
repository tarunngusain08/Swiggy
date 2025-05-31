package middleware

import (
	"context"
	"time"

	"github.com/gin-gonic/gin"
)

// Context keys
type ctxKey string

const (
	CustomKey    ctxKey = "custom_key"
	TraceIDKey   ctxKey = "trace_id"
	UserIDKey    ctxKey = "user_id"
	StartTimeKey ctxKey = "start_time"
)

// ContextManagerMiddleware injects useful values into the Go context
func ContextManagerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := c.Request.Context()
		// Custom value example
		ctx = context.WithValue(ctx, CustomKey, "custom_value")
		// Trace/Correlation ID from gin context
		if traceID, ok := c.Get("trace_id"); ok {
			ctx = context.WithValue(ctx, TraceIDKey, traceID)
		}
		// User ID from gin context (set by JWT middleware)
		if userID, ok := c.Get("userID"); ok {
			ctx = context.WithValue(ctx, UserIDKey, userID)
		}
		// Request start time
		ctx = context.WithValue(ctx, StartTimeKey, time.Now())
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}
