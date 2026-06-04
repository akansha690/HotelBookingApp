package utils

import (
	"net/http"
	"github.com/rs/cors"
	env "AuthInGo/config/env"
)

func main() {
	router := http.NewServeMux()

	c := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5173",
			"https://codewithvision.com",
		},
	})

	handler := c.Handler(router)

	http.ListenAndServe(env.GetString("PORT", ":8080"), handler)
}