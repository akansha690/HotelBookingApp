package controller

import (
	dto "AuthInGo/dto"
	service "AuthInGo/services"
	utils "AuthInGo/utils"
	"fmt"
	"errors"
	"net/http"
)

type UserController struct{
	userService service.UserService
}

func NewUserController(_serv service.UserService) *UserController{
	return &UserController{
		userService: _serv,
	}
}

func (uc *UserController) RegisterUser(w http.ResponseWriter, r *http.Request) {
	// user:=&model.User{}
	req_payload := r.Context().Value("payload").(*dto.CreateUserDTO)
	createdUser, err := uc.userService.CreateUser(req_payload)
	if err != nil {
		fmt.Println("Error creating user:", err)	
		return
	}
	utils.WriteSuccessResponse(w, http.StatusCreated, "User created successfully", createdUser)

}

func (uc *UserController) LoginUser(w http.ResponseWriter, r *http.Request) {
	// user:=&model.User{}
	req_payload := r.Context().Value("payload").(*dto.LoginUserDTO)

	token, err := uc.userService.LoginUser(req_payload.Email, req_payload.Password)
	if err != nil {
		utils.WriteErrorResponse(w, http.StatusInternalServerError, "Error logging in user", err)
		return
	}
	utils.WriteSuccessResponse(w, http.StatusOK, "User logged in successfully", token)

}


func (uc *UserController) GetUserById(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Fetching user by ID in UserController")
	// extract userid from url parameters
	userId := r.URL.Query().Get("id")
	if userId == "" {
		userId = r.Context().Value("userID").(string) // Fallback to context if not in URL
	}

	if userId == "" {
		utils.WriteErrorResponse(w, http.StatusBadRequest, "User ID is required", fmt.Errorf("missing user ID"))
		return
	}
	user, err := uc.userService.GetUserById(userId)
	if err != nil {
		utils.WriteErrorResponse(w, http.StatusInternalServerError, "Failed to fetch user", err)
		return
	}
	if user == nil {
		utils.WriteErrorResponse(w, http.StatusNotFound, "User not found", errors.New("user not found"))
		return
	}
	utils.WriteSuccessResponse(w, http.StatusOK, "User fetched successfully", user)
	fmt.Println("User fetched successfully:", user)
}
