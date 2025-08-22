-- +goose Up
-- +goose StatementBegin
SELECT 'up SQL query';
-- +goose StatementEnd
CREATE TABLE IF NOT EXISTS permissions(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(250),
    resource VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- INSERT INTO permissions (name, description) VALUES
-- ('user:read', 'Permission to read user data', 'user', 'read'),
-- ('user:write', 'Permission to write user data', 'user', 'write'),
-- ('user:delete', 'Permission to delete user data', 'user', 'delete'),
-- ('role:read', 'Permission to read role data', 'role', 'read'),
-- ('role:write', 'Permission to write role data', 'role', 'write'),
-- ('role:delete', 'Permission to delete role data', 'role', 'delete'),
-- ('role:manage', 'Permission to manage roles', 'role', 'manage'),
-- ('permission:read', 'Permission to read permissions', 'permission', 'read'),
-- ('permission:write', 'Permission to write permissions', 'permission', 'write'),
-- ('permission:delete', 'Permission to delete permissions', 'permission', 'delete'),
-- ('permission:manage', 'Permission to manage permissions', 'permission', 'manage');

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
DROP TABLE IF EXISTS permissions;