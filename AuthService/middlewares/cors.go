
package middleware

import (
   "net/http"
)

func CORSMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

    allowedOrigins := map[string]bool{
      "http://localhost:5173": true,
      "https://codewithvision.com": true,
      "https://celebrated-genie-25cf9a.netlify.app": true,
    }

    origin := r.Header.Get("Origin")
    if allowedOrigins[origin] {
      w.Header().Set("Access-Control-Allow-Origin", origin)
    }

    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, Idempotency-Key, X-User-ID")

    if r.Method == "OPTIONS" {
      w.WriteHeader(http.StatusOK)
      return
    }

    next.ServeHTTP(w, r)
  })
}