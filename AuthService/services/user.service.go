package service

import (
	env "AuthInGo/config/env"
	db "AuthInGo/db/repositories"
	"AuthInGo/dto"
	utils "AuthInGo/utils"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"time"
)

type UserService interface {
	CreateUser(payload *dto.CreateUserDTO) (dto.CreateUserDTO, error)
	LoginUser(email string, password string) (string, error)
}

type UserServiceImp struct {
	userRepository db.UserRepository 
}

func NewUserService(_repo db.UserRepository) UserService {
	return &UserServiceImp{
		userRepository:_repo,
	}
}
func (u *UserServiceImp) CreateUser(data *dto.CreateUserDTO) ( dto.CreateUserDTO , error) {
	fmt.Println("Creating user in UserService")
	fmt.Println(data.Password)
	hashPassword, err := utils.HashPassword(data.Password)
	if err!=nil{
		fmt.Println("error while hashing the password")
		return dto.CreateUserDTO{} , err
	}
	data.Password = string(hashPassword)
	fmt.Println(data.Password)
	return u.userRepository.Create(data.Username, data.Email, data.Password)
}

func (u *UserServiceImp) LoginUser(email string, password string) (string, error){
	user, err := u.userRepository.GetByEmail(email)
	if err!=nil{
		fmt.Println("This email has not been registered")
		return "", errors.New("this email has not been registered")
	}
	matched := utils.CompareHashedPassword(string(user.Password), password)
	if !matched {
		fmt.Println("Incorrect Password")
		return "" , errors.New("incorrect Password")
	}
	// creating a JWT token
	payload := jwt.MapClaims{
		"id" : user.Id,
		"email" : user.Email,
		"exp":   time.Now().Add(time.Hour * 1).Unix(),
	} 
	// unsigned JWTtoken
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	// Signed JWT
	tokenString, err := token.SignedString([]byte(env.GetString("JWT_SECRET_KEY", "auth_token_key")))
	if err!= nil{
		fmt.Println("Error signing the token:", err)
		return "", err
	}	
	fmt.Println("Token generated successfully, token string is: ", tokenString)
	return tokenString, nil
	
}

