package db


import (
	"AuthInGo/models"
	"database/sql"
)

type RoleRepository interface {
	GetRoleById(id int64) (*model.Role, error)
	GetRoleByName(name string) (*model.Role, error)
	GetAllRoles() ([]*model.Role, error)
	CreateRole(name string, description string) (*model.Role, error)
	DeleteRoleById(id int64) error
	UpdateRole(id int64, name string, description string) (*model.Role, error)
}

type RoleRepositoryImpl struct {
	db *sql.DB
}

func NewRoleRepository(_db *sql.DB) RoleRepository {
	return &RoleRepositoryImpl{
		db: _db,
	}
}

func (r *RoleRepositoryImpl) GetRoleById(id int64) (*model.Role, error) {
	query := "SELECT id, name, description, created_at, updated_at FROM roles where id = ?"
	row := r.db.QueryRow(query, id)

	role := &model.Role{}
	if err := row.Scan(&role.Id, &role.Name, &role.Description, &role.CreatedAt, &role.UpdatedAt); err != nil {
		return nil, err
	}
	return role, nil
}

func (r *RoleRepositoryImpl) GetRoleByName(name string) (*model.Role, error) {
	query := "SELECT id, name, description, created_at, updated_at FROM roles WHERE name = ?"
	row := r.db.QueryRow(query, name)

	role := &model.Role{}
	if err := row.Scan(&role.Id, &role.Name, &role.Description, &role.CreatedAt, &role.UpdatedAt); err != nil {
		return nil, err
	}
	return role, nil
}

func (r *RoleRepositoryImpl) GetAllRoles() ([]*model.Role, error) {
	query := "SELECT id, name, description, created_at, updated_at FROM roles"
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()  //executed after this function returns

	var roles []*model.Role
	for rows.Next() {
		role := &model.Role{}
		if err := rows.Scan(&role.Id, &role.Name, &role.Description, &role.CreatedAt, &role.UpdatedAt); err != nil {
			return nil, err
		}
		roles = append(roles, role)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return roles, nil
}

func (r *RoleRepositoryImpl) CreateRole(name string, description string) (*model.Role, error) {
	query := "INSERT INTO roles (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())"
	result, err := r.db.Exec(query, name, description)
	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	return &model.Role{
		Id:          id,
		Name:        name,
		Description: description,
		CreatedAt:   "",
		UpdatedAt:   "",
	}, nil
}

func (r *RoleRepositoryImpl) DeleteRoleById(id int64) error {
	query := "DELETE FROM roles WHERE id = ?"
	result, err := r.db.Exec(query, id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (r *RoleRepositoryImpl) UpdateRole(id int64, name string, description string) (*model.Role, error) {
	query := "UPDATE roles SET name = ?, description = ?, updated_at = NOW() WHERE id = ?"
	_, err := r.db.Exec(query, name, description, id)
	if err != nil {
		return nil, err
	}

	return &model.Role{
		Id:          id,
		Name:        name,
		Description: description,
		CreatedAt:   "", 
		UpdatedAt:   "", 
	}, nil
}