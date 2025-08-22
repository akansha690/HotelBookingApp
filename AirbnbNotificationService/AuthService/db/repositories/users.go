package db

import (
	"AuthInGo/dto"
	model "AuthInGo/models"
	"database/sql"
	"fmt"
)

type UserRepository interface{
	Create(username string, email string, hashedPassword string) (dto.CreateUserDTO, error)
	GetAll() ([]*model.User, error)        // return slice of pointers
    GetById(_id int64) (*model.User, error) // needs an id
    DeleteById(_id int64) error 
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


func (u *UserRepositoryImp) GetAll() ([]*model.User, error){
	query := `SELECT id, username, email, created_at, updated_at FROM users`
	rows, err := u.db.Query(query)
	if err != nil{
		fmt.Println("Error executing query:", err)
		return nil, err
	}
	defer rows.Close()
	
	var users []*model.User
	for rows.Next() {
		user := &model.User{}
		err := rows.Scan(&user.Id, &user.Username, &user.Email, &user.CreatedAt, &user.UpdatedAt)
		if err != nil{
			fmt.Println("Error scanning row:", err)
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil 
	
} 


func (u *UserRepositoryImp) GetById(_id int64) (*model.User, error){
	query := `SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?`
	row := u.db.QueryRow(query, _id)

	user := &model.User{}
	err:=row.Scan(&user.Id, &user.Username, &user.Email, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		fmt.Println("Error executing query:", err)
		return nil, err
	}
	return user, nil
	
} 

func (u *UserRepositoryImp) DeleteById(_id int64) error{
	query := `DELETE FROM users WHERE id = ?`
	row, err := u.db.Exec(query, _id)
	if err != nil{
		fmt.Println("Error deleting row:", err)
		return err
	}
	rowsAffected, err := row.RowsAffected()
	if err != nil {	
		fmt.Println("Error getting rows affected:", err)
		return err		
	}	
	if rowsAffected == 0 {
		fmt.Println("No user found with the given ID to delete:", _id)	
		return nil
	}
	fmt.Println("User deleted successfully with ID:", _id)
	return nil

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