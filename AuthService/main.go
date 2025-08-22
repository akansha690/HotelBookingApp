package main

import (
	
	"AuthInGo/app"
    config "AuthInGo/config/env"
	
)

func main(){	
	config.Load()
	cfg:=app.ConfigConstructor()
	app:= app.ApplicationConstructor(cfg)
	app.Run()
}