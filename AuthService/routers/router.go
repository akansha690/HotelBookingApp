package router

import (
	// "net/http"

	middleware "AuthInGo/middlewares"
	"AuthInGo/utils"
    env "AuthInGo/config/env"
	"github.com/go-chi/chi/v5"
)

type Router interface{
	Register(r chi.Router) 
}

func SetUpRouter(UserRouter Router) *chi.Mux {
	chiRouter:=chi.NewRouter()
	// chiRouter.Get("/hello", controller.UserController.Hello)

	chiRouter.Use(middleware.CORSMiddleware);
	chiRouter.Use(middleware.RateLimiMiddleware)
	chiRouter.With(middleware.JWTNextMiddleware).HandleFunc("/hotelservice/*", utils.ProxyToService(env.GetString("HOTEL_SERVICE_URL", "http://localhost:3000"), "/hotelservice"))
	chiRouter.With(middleware.JWTNextMiddleware).HandleFunc("/bookingservice/*", utils.ProxyToService(env.GetString("BOOKING_SERVICE_URL", "http://localhost:3001"), "/bookingservice"))
	
	UserRouter.Register(chiRouter) 
	return chiRouter
}