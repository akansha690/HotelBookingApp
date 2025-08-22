package router

import (
	// "net/http"

	middleware "AuthInGo/middlewares"
	"AuthInGo/utils"

	"github.com/go-chi/chi/v5"
)

type Router interface{
	Register(r chi.Router) 
}

func SetUpRouter(UserRouter Router, roleRouter Router) *chi.Mux {
	chiRouter:=chi.NewRouter()
	// chiRouter.Get("/hello", controller.UserController.Hello)
	
	chiRouter.Use(middleware.RateLimiMiddleware)
	// chiRouter.HandleFunc("/fakestoreservice/*", utils.ProxyToService("https://fakestoreapi.in", "/fakestoreservice"))
	chiRouter.HandleFunc("/hotels*", utils.ProxyToService("http://localhost:3000", "/hotels"))
	chiRouter.HandleFunc("/bookings*", utils.ProxyToService("http://localhost:3001", "/bookings"))
	
	UserRouter.Register(chiRouter) 
	roleRouter.Register(chiRouter)
	return chiRouter
}