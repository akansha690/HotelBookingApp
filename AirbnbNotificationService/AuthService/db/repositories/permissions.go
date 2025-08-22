package db

import (
	"AuthInGo/models"
	"database/sql"
	"fmt"
)

type PermissionRepository interface{
	GetPermissionById(id int64) (*model.Permission, error)
	GetPermissionByName(name string) (*model.Permission, error)
	GetAllPermissions() ([]*model.Permission, error)
	CreatePermission(name string, description string, resource string, action string) (*model.Permission, error)
	DeletePermissionById(id int64) error
	UpdatePermission(id int64, name string, description string, resource string, action string) (*model.Permission, error)

}

type PermissionRepositoryImp struct{
	db *sql.DB
}

func NewPermissionRepository(_db *sql.DB) PermissionRepository{
	return &PermissionRepositoryImp{
		db: _db,
	}
}

func (p *PermissionRepositoryImp) GetPermissionById(_id int64)(*model.Permission, error){
	query:=`SELECT * FROM permissions WHERE id=?`
	row:= p.db.QueryRow(query, _id)
	permission := &model.Permission{}

	err:= row.Scan(&permission.Id, &permission.Name, &permission.Description, &permission.Resource, &permission.Action, &permission.CreatedAt, &permission.UpdatedAt)
	if err != nil{
		return nil, err
	}
	return permission, nil
}
func (p *PermissionRepositoryImp) GetPermissionByName(_name string) (*model.Permission, error){
	query:=`SELECT * FROM permissions WHERE name=?`
	row:= p.db.QueryRow(query, _name)
	permission := &model.Permission{}

	err:= row.Scan(&permission.Id, &permission.Name, &permission.Description, &permission.Resource, &permission.Action, &permission.CreatedAt, &permission.UpdatedAt)
	if err != nil{
		return nil, err
	}
	return permission, nil
}


func (p *PermissionRepositoryImp) GetAllPermissions() ([]*model.Permission, error){
	query:= `SELECT id, name, description, created_at, updated_at FROM permissions`
	rows, err := p.db.Query(query)
	if err!=nil{

	}
	defer rows.Close()

	var permissions []*model.Permission

	for rows.Next(){
		permission:= &model.Permission{}
		err:= rows.Scan(&permission.Id, &permission.Name, &permission.Description, &permission.Resource, &permission.Action, &permission.CreatedAt, &permission.UpdatedAt)
		if err!=nil{
			return nil, err
		}
		permissions=append(permissions, permission)
	}
	return permissions, nil
}


func (p *PermissionRepositoryImp) CreatePermission(name string, description string, resource string, action string) (*model.Permission, error){
	query:= `INSERT into permissions (name, description, resource, action, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())`
	row, err:= p.db.Exec(query, name, description, resource, action)
	if err!=nil{
		fmt.Println("Error creating permission:", err)
		return nil , err
	}
	id, err := row.LastInsertId()
	if err!=nil{
		return nil, err
	}
	permission := &model.Permission{
		Id: id,
		Name: name,
		Description: description,
		Resource: resource,
		Action: action,
		CreatedAt: "",
		UpdatedAt: "",
	}
	return permission, nil
}

func (p *PermissionRepositoryImp) DeletePermissionById(_id int64) error{
	query:= `DELETE FROM permissions WHERE id=?`
	row, err:= p.db.Exec(query, _id)
	if err != nil{
		return err
	}
	rowsAffected, err := row.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}
	return nil

}
func (p *PermissionRepositoryImp) UpdatePermission(id int64, name string, description string, resource string, action string) (*model.Permission, error){
	query:= `UPDATE permissions SET id=?, name=?, description=?, resource=?, action=?`
	_, err:= p.db.Exec(query, id, name, description, resource, action)
	if err != nil{
		return nil, err
	}
	permission := &model.Permission{
		Id:          id,
		Name:        name,
		Description: description,
		Resource: resource,
		Action: action,
	}
	return permission, nil

}