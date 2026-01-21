package middleware

import (
	dto "AuthInGo/dto"
	utils "AuthInGo/utils"
	"context"
	"net/http"
)



func UserLoginRequestMiddleware(next http.Handler) http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var payload *dto.LoginUserDTO
		json := utils.ParseJSONToObject(r, &payload)
		if json != nil {
			utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid request payload", json)
			return
		}
		validationErr := utils.Validator.Struct(payload)
		if validationErr != nil {
			utils.WriteErrorResponse(w, http.StatusBadRequest, "Validation error", validationErr)
			return
		}
		// original context(old) : parent context
		req_context := r.Context()
		// passing payload to this context and create a new context i.e cxt
		cxt := context.WithValue(req_context, "payload", payload)
		
		next.ServeHTTP(w, r.WithContext(cxt))
	})
}


func UserRegisterRequestMiddleware(next http.Handler) http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var payload *dto.CreateUserDTO
		json := utils.ParseJSONToObject(r, &payload)
		if json != nil {
			utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid request payload", json)
			return
		}
		validationErr := utils.Validator.Struct(payload)
		if validationErr != nil {
			utils.WriteErrorResponse(w, http.StatusBadRequest, "Validation error", validationErr)
			return
		}
		req_context := r.Context()
		
		cxt := context.WithValue(req_context, "payload", payload)
		
		next.ServeHTTP(w, r.WithContext(cxt))
	})
}