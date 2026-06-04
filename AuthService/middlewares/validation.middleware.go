// package middleware

// import (
// 	dto "AuthInGo/dto"
// 	utils "AuthInGo/utils"
// 	"context"
// 	"net/http"
// )



// func UserLoginRequestMiddleware(next http.Handler) http.Handler{
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		var payload *dto.LoginUserDTO
// 		json := utils.ParseJSONToObject(r, &payload)
// 		if json != nil {
// 			utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid request payload", json)
// 			return
// 		}
// 		validationErr := utils.Validator.Struct(payload)
// 		if validationErr != nil {
// 			utils.WriteErrorResponse(w, http.StatusBadRequest, "Validation error", validationErr)
// 			return
// 		}
// 		// original context(old) : parent context
// 		req_context := r.Context()
// 		// passing payload to this context and create a new context i.e cxt
// 		cxt := context.WithValue(req_context, "payload", payload)
		
// 		next.ServeHTTP(w, r.WithContext(cxt))
// 	})
// }


// func UserRegisterRequestMiddleware(next http.Handler) http.Handler{
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		var payload *dto.CreateUserDTO
// 		json := utils.ParseJSONToObject(r, &payload)
// 		if json != nil {
// 			utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid request payload", json)
// 			return
// 		}
// 		validationErr := utils.Validator.Struct(payload)
// 		if validationErr != nil {
// 			utils.WriteErrorResponse(w, http.StatusBadRequest, "Validation error", validationErr)
// 			return
// 		}
// 		req_context := r.Context()
		
// 		cxt := context.WithValue(req_context, "payload", payload)
		
// 		next.ServeHTTP(w, r.WithContext(cxt))
// 	})
// }


// middleware/request.middleware.go — use FormatValidationErrors
package middleware

import (
    dto "AuthInGo/dto"
    utils "AuthInGo/utils"
    "context"
    "errors"
    "net/http"
)

func UserLoginRequestMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        var payload *dto.LoginUserDTO
        if err := utils.ParseJSONToObject(r, &payload); err != nil {
            utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid request payload", err)
            return
        }
        if err := utils.Validator.Struct(payload); err != nil {
            // ← was sending raw validator error, now sends clean message
            msg := utils.FormatValidationErrors(err)
            utils.WriteErrorResponse(w, http.StatusBadRequest, "Validation error", errors.New(msg))
            return
        }
        cxt := context.WithValue(r.Context(), "payload", payload)
        next.ServeHTTP(w, r.WithContext(cxt))
    })
}

func UserRegisterRequestMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        var payload *dto.CreateUserDTO
        if err := utils.ParseJSONToObject(r, &payload); err != nil {
            utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid request payload", err)
            return
        }
        if err := utils.Validator.Struct(payload); err != nil {
            // ← same fix
            msg := utils.FormatValidationErrors(err)
            utils.WriteErrorResponse(w, http.StatusBadRequest, "Validation error", errors.New(msg))
            return
        }
        cxt := context.WithValue(r.Context(), "payload", payload)
        next.ServeHTTP(w, r.WithContext(cxt))
    })
}