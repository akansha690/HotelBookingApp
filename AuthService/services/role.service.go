package service

import (
	repositories "AuthInGo/db/repositories"
	"AuthInGo/models"
)

type RoleService interface {
	GetRoleById(id int64) (*model.Role, error)
	GetRoleByName(name string) (*model.Role, error)
	GetAllRoles() ([]*model.Role, error)
	CreateRole(name string, description string) (*model.Role, error)
	DeleteRoleById(id int64) error
	UpdateRole(id int64, name string, description string) (*model.Role, error)
	GetRolePermissions(roleId int64) ([]*model.RolePermission, error)
	AddPermissionToRole(roleId int64, permissionId int64) (*model.RolePermission, error)
	RemovePermissionFromRole(roleId int64, permissionId int64) error
	GetAllRolePermissions() ([]*model.RolePermission, error)
	AssignRoleToUser(userId int64, roleId int64) error
}

type RoleServiceImpl struct {
	roleRepository           repositories.RoleRepository
	rolePermissionRepository repositories.RolePermissionRepository
	userRoleRepository       repositories.UserRoleRepository
}

func NewRoleService(roleRepo repositories.RoleRepository, rolePermissionRepo repositories.RolePermissionRepository, userRoleRepo repositories.UserRoleRepository) RoleService {
	return &RoleServiceImpl{
		roleRepository:           roleRepo,
		rolePermissionRepository: rolePermissionRepo,
		userRoleRepository:       userRoleRepo,
	}
}

func (s *RoleServiceImpl) GetRoleById(id int64) (*model.Role, error) {
	return s.roleRepository.GetRoleById(id)
}

func (s *RoleServiceImpl) GetRoleByName(name string) (*model.Role, error) {
	return s.roleRepository.GetRoleByName(name)
}

func (s *RoleServiceImpl) GetAllRoles() ([]*model.Role, error) {
	return s.roleRepository.GetAllRoles()
}

func (s *RoleServiceImpl) CreateRole(name string, description string) (*model.Role, error) {
	return s.roleRepository.CreateRole(name, description)
}

func (s *RoleServiceImpl) DeleteRoleById(id int64) error {
	return s.roleRepository.DeleteRoleById(id)
}

func (s *RoleServiceImpl) UpdateRole(id int64, name string, description string) (*model.Role, error) {

	return s.roleRepository.UpdateRole(id, name, description)
}

func (s *RoleServiceImpl) GetRolePermissions(roleId int64) ([]*model.RolePermission, error) {
	return s.rolePermissionRepository.GetRolePermissionByRoleId(roleId)
}

func (s *RoleServiceImpl) AddPermissionToRole(roleId int64, permissionId int64) (*model.RolePermission, error) {
	return s.rolePermissionRepository.AddPermissionToRole(roleId, permissionId)
}

func (s *RoleServiceImpl) RemovePermissionFromRole(roleId int64, permissionId int64) error {
	return s.rolePermissionRepository.RemovePermissionFromRole(roleId, permissionId)
}

func (s *RoleServiceImpl) GetAllRolePermissions() ([]*model.RolePermission, error) {
	return s.rolePermissionRepository.GetAllRolePermissions()
}

func (s *RoleServiceImpl) AssignRoleToUser(userId int64, roleId int64) error {
	return s.userRoleRepository.AssignRoleToUser(userId, roleId)
}