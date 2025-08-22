

package config

import (
	env "AuthInGo/config/env"
	"database/sql"
	"fmt"
	"github.com/go-sql-driver/mysql"
)


func SetUpDB()(*sql.DB, error){
	cfg := mysql.NewConfig()

	cfg.User = env.GetString("DB_USER", "root")
	cfg.Passwd = env.GetString("DB_PASSWORD", "admin12")
	cfg.DBName = env.GetString("DB_NAME", "airbnb_auth_dev")
	cfg.Net = env.GetString("DB_NET", "tcp")
	cfg.Addr = env.GetString("DB_ADDR", "127.0.0.1:3306")

	db, err := sql.Open("mysql", cfg.FormatDSN())
    if err != nil {
        fmt.Println("Error connecting to the database:", err)
		return nil, err
    }
	fmt.Println("Database connection string:", cfg.FormatDSN())
	fmt.Println("Connecting to the database...")
    pingErr := db.Ping()
    if pingErr != nil {
        fmt.Println("Error pinging the database:", pingErr)
		return nil, err
	}
	fmt.Println("Successfully connected to the database!")
	return db, nil
}