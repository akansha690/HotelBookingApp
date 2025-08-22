package app

import (
	dbConfig "AuthInGo/config/db"
	"AuthInGo/config/env"
	controller "AuthInGo/controllers"
	db "AuthInGo/db/repositories"
	router "AuthInGo/routers"
	service "AuthInGo/services"
	"database/sql"
	"fmt"
	"net/http"
	"time"
)

type Config struct{
	Addr string
} 

type Application struct{
	Config Config
	Db *sql.DB
} 

func ApplicationConstructor(cfg Config) *Application {
	db, err := dbConfig.SetUpDB()
	if err != nil {
		fmt.Println("Error setting up the database:", err)
		return nil
	}
	return &Application{
		Config: cfg,
		Db : db,
	}
}
func ConfigConstructor() Config{
	port := config.GetString("PORT", ":8081")
	return Config{
		Addr: port,
	}
}

func (app *Application) Run() error{
	ur:= db.NewUserRepository(app.Db)
	us := service.NewUserService(ur)
	uc := controller.NewUserController(us)
	userRouter := router.NewUserRouter(uc)
	// role...
	rpr := db.NewRolePermissionRepository(app.Db)
	urr := db.NewUserRoleRepository(app.Db)
	rr:= db.NewRoleRepository(app.Db)
	rs:= service.NewRoleService(rr, rpr, urr)
	rc:= controller.NewRoleController(rs)
	roleRouter:= router.NewRoleRouter(rc)

	server := &http.Server{
		Addr: app.Config.Addr,
		Handler: router.SetUpRouter(userRouter, roleRouter),
		ReadTimeout: 10 * time.Second,
		WriteTimeout: 10* time.Second,
	}
	fmt.Println("Starting server on", app.Config.Addr)
	return server.ListenAndServe()

}

