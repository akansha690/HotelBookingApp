package router

import (
	controller "AuthInGo/controllers"
	middleware "AuthInGo/middlewares"
	"github.com/go-chi/chi/v5"
	
)

type UserRouter struct{
	userController *controller.UserController
}

func NewUserRouter(_userController *controller.UserController) Router {
	return &UserRouter{
		userController: _userController,
	}

}

func (ur *UserRouter) Register(r chi.Router) {
	r.With(middleware.JWTNextMiddleware).Get("/profile", ur.userController.GetUserById)
	r.With(middleware.UserCreateRequestMiddleware).Post("/register", ur.userController.RegisterUser)
	r.With(middleware.UserLoginRequestMiddleware).Get("/login", ur.userController.LoginUser)
}
