package middleware

import (
	"fmt"
	"net/http"
	"time"

	"golang.org/x/time/rate"
)

var limiter = rate.NewLimiter(rate.Every(1*time.Second), 5) // 5 requests per sec
func RateLimiMiddleware(next http.Handler) http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
		fmt.Println("Limiter middleware")
		if !limiter.Allow(){
			http.Error(w, "Requests limit is up", http.StatusTooManyRequests)
			return 
		}
		next.ServeHTTP(w, r)
	})

}