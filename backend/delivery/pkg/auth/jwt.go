package auth

import (
	"strings"
)

// ValidateJWT validates a JWT token string.
// This is a stub for demonstration. Replace with real JWT validation in production.
func ValidateJWT(token string) bool {
	// Example: Accept only "Bearer testtoken" for demo purposes.
	if token == "" {
		return false
	}
	parts := strings.SplitN(token, " ", 2)
	if len(parts) != 2 || parts[0] != "Bearer" {
		return false
	}
	return parts[1] == "testtoken"
}
