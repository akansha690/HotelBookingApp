package controller

import (
	dto "AuthInGo/dto"
	service "AuthInGo/services"
	utils "AuthInGo/utils"
	"fmt"
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
	utils.WriteSuccessResponse(w, http.StatusOK, "User logged in successfully",token)

}

func GetProfileHandler(w http.ResponseWriter, r *http.Request) {
	// Retrieve userID and email from context
	userID, ok := r.Context().Value("userID").(string)
	if !ok {
		http.Error(w, "User ID not found in context", http.StatusUnauthorized)
		return
	}
	email, ok := r.Context().Value("email").(string)
	if !ok {
		http.Error(w, "Email not found in context", http.StatusUnauthorized)
		return
	}

	// Construct a profile response
	profile := map[string]string{
		"id":    userID,
		"email": email,
	}

	utils.WriteSuccessResponse(w, http.StatusOK, " user profile", profile)
}