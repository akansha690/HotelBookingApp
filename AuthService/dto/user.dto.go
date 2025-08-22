
package dto

type CreateUserDTO struct{
	Id		int64  `json:"id"`
	Username  string `json:"username" validate:"required"`
	Email     string  `json:"email" validate:"required,email"`
	Password  string `json:"password" validate:"required,min=7"`
}

type LoginUserDTO struct {
	Email    string `json:"email" validate:"required,email"`	
	Password string `json:"password" validate:"required,min=7"`
}

type SignUpUserDTO struct {
	Username string `json:"username" validate:"required"`
	Email    string `json:"email" validate:"required,email"`	
	Password string `json:"password" validate:"required,min=7"`
}