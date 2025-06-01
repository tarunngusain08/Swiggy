package middleware

import (
	"delivery/pkg/auth"
	"net/http"

	"github.com/gin-gonic/gin"
)

// JWTAuth returns a Gin middleware that validates JWT tokens using pkg/auth.ValidateJWT.
func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if !auth.ValidateJWT(token) {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
			return
		}
		c.Next()
	}
}
