package db

import (
	"AuthInGo/dto"
	model "AuthInGo/models"
	"database/sql"
	"fmt"
)

type UserRepository interface{
	Create(username string, email string, hashedPassword string) (dto.CreateUserDTO, error)
	GetByEmail(_email string) (*model.User, error)
}

type UserRepositoryImp struct{
	db *sql.DB
}


func NewUserRepository(_db *sql.DB) UserRepository{
	return &UserRepositoryImp{
		db:_db,
	}
} 

func (u *UserRepositoryImp) Create(username string, email string, hashedPassword string) (dto.CreateUserDTO, error) {
	query := `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`
	result, err := u.db.Exec(query, username, email, hashedPassword)

	if err != nil {
		fmt.Println("Error creating user:", err)
		return dto.CreateUserDTO{} , err
	}

	lastInsertID, rowErr := result.LastInsertId()
	if rowErr != nil {
		fmt.Println("Error getting last insert ID:", rowErr)
		return dto.CreateUserDTO{}, rowErr
	}

	user := dto.CreateUserDTO{
		Id:       lastInsertID,
		Username: username,
		Email:    email,
		Password: hashedPassword,
	}

	fmt.Println("User created successfully:", user)

	return user, nil
}



func (u *UserRepositoryImp) GetByEmail(_email string) (*model.User, error) {
	query := `SELECT id, email, password FROM users WHERE email=?`
	row := u.db.QueryRow(query, _email)
	user := &model.User{}
	err := row.Scan(&user.Id, &user.Email, &user.Password)
	if err != nil{
		fmt.Println("Error scanning values with user struct")
		return nil, err
	}
	
	return user, err
}
