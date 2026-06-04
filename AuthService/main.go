package main

import (
	
	"AuthInGo/app"
    config "AuthInGo/config/env"
	"fmt"
	"os"
)

func main(){	
	config.Load()
	cfg:=app.ConfigConstructor()
	app:= app.ApplicationConstructor(cfg)
	if app == nil {
        fmt.Println("Failed to initialize application")
        os.Exit(1)
    }
	app.Run()
}