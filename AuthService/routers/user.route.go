package router

import (
	controller "AuthInGo/controllers"
	middleware "AuthInGo/middlewares"
	 "AuthInGo/utils"
	"github.com/go-chi/chi/v5"
	"net/http"
	
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
	r.With(middleware.JWTNextMiddleware).Get("/profile",  http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID := r.Context().Value("userID")
		email := r.Context().Value("email")

		response := map[string]interface{}{
			"id":    userID,
			"email": email,
		}
		
		utils.WriteSuccessResponse(w, http.StatusOK, "all user profiles", response)
	}))
	r.With(middleware.UserRegisterRequestMiddleware).Post("/register", ur.userController.RegisterUser)
	r.With(middleware.UserLoginRequestMiddleware).Get("/login", ur.userController.LoginUser)
}
