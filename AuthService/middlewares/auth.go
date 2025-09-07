package middleware

import (
	env "AuthInGo/config/env"
	"context"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

func JWTNextMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("JWT Middleware")
		token := r.Header.Get("Authorization")
		if token == "" {	
			http.Error(w, "Authorization header is missing", http.StatusUnauthorized)
			return
		}
		if strings.HasPrefix(token, "Bearer ") {
			token = strings.TrimPrefix(token, "Bearer ")
		} else {
			http.Error(w, "Invalid token format", http.StatusUnauthorized)
			return
		}
		claims := jwt.MapClaims{}
		_, err := jwt.ParseWithClaims(token, &claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(env.GetString("JWT_SECRET_KEY", "auth_token_key")), nil
		})
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		userId, idok := claims["id"].(float64) 
		email, emailOk := claims["email"].(string)
		if !idok || !emailOk {
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)	
			return
		}

		req_context := r.Context()
		cxt := context.WithValue(req_context, "userID", strconv.FormatFloat(userId, 'f', 0, 64))
		cxt = context.WithValue(cxt, "email", email)
		// r.Header.Set("X-User-ID",  strconv.FormatFloat(userId, 'f', 0, 64))
		next.ServeHTTP(w, r.WithContext(cxt))
	})

}



