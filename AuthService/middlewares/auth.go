package middleware

import (
	dbConfig "AuthInGo/config/db"
	env "AuthInGo/config/env"
	repo "AuthInGo/db/repositories"
	"AuthInGo/dto"
	"AuthInGo/utils"
	"context"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

func JWTNextMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("JWT Middleware")
		token := r.Header.Get("Authorization")
		if token == "" {	
			http.Error(w, "Authorization header is missing", http.StatusUnauthorized)
			return
		}
		if strings.HasPrefix(token, "Bearer ") {
			token = strings.TrimPrefix(token, "Bearer ")
		} else {
			http.Error(w, "Invalid token format", http.StatusUnauthorized)
			return
		}
		claims := jwt.MapClaims{}
		_, err := jwt.ParseWithClaims(token, &claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(env.GetString("JWT_SECRET_KEY", "auth_token_key")), nil
		})
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		userId, idok := claims["id"].(float64) 
		email, emailOk := claims["email"].(string)
		if !idok || !emailOk {
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)	
			return
		}

		req_context := r.Context()
		cxt := context.WithValue(req_context, "userID", strconv.FormatFloat(userId, 'f', 0, 64))
		cxt = context.WithValue(cxt, "email", email)
		next.ServeHTTP(w, r.WithContext(cxt))
	})

}

func RequireAllRoles(roles ...string) func(http.Handler) http.Handler {

	// function that can create a middleware for checking the above set of roles

	return func(next http.Handler) http.Handler {

		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

			userIdStr := r.Context().Value("userID").(string)
			userId, err := strconv.ParseInt(userIdStr, 10, 64)
			if err != nil {
				http.Error(w, "Invalid user ID", http.StatusUnauthorized)
				return
			}

			dbConn, dbErr := dbConfig.SetUpDB()
			if dbErr != nil {
				http.Error(w, "Database connection error: "+dbErr.Error(), http.StatusInternalServerError)
				return
			}

			urr := repo.NewUserRoleRepository(dbConn)

			hasAllRoles, hasAllRolesErr := urr.HasAllRoles(userId, roles)
			fmt.Println("userid", userId, "roles", roles, "hasAllRoles", hasAllRoles)
			if hasAllRolesErr != nil {
				http.Error(w, "Error checking user roles: "+hasAllRolesErr.Error(), http.StatusInternalServerError)
				return
			}

			if !hasAllRoles {
				http.Error(w, "Forbidden: You do not have the required roles", http.StatusForbidden)
				return
			}

			fmt.Println("User has all required roles:", roles)

			next.ServeHTTP(w, r)
		})
	}

}

func RequireAnyRole(roles ...string) func(http.Handler) http.Handler {

	return func(next http.Handler) http.Handler {

		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

			userIdStr := r.Context().Value("userID").(string)
			userId, err := strconv.ParseInt(userIdStr, 10, 64)
			if err != nil {
				http.Error(w, "Invalid user ID", http.StatusUnauthorized)
				return
			}

			dbConn, dbErr := dbConfig.SetUpDB()
			if dbErr != nil {
				http.Error(w, "Database connection error: "+dbErr.Error(), http.StatusInternalServerError)
				return
			}

			urr := repo.NewUserRoleRepository(dbConn)

			hasAnyRole, hasAnyRolesErr := urr.HasAnyRole(userId, roles)
			fmt.Println("userid", userId, "roles", roles, "hasAnyRole", hasAnyRole)
			if hasAnyRolesErr != nil {
				http.Error(w, "Error checking user roles: "+hasAnyRolesErr.Error(), http.StatusInternalServerError)
				return
			}

			if !hasAnyRole {
				http.Error(w, "Forbidden: You do not have the required roles", http.StatusForbidden)
				return
			}

			fmt.Println("User has all required roles:", roles)

			next.ServeHTTP(w, r)
		})
	}
}


func CreateRoleRequestValidator(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var payload dto.CreateRoleRequestDTO

		// Read and decode the JSON body into the payload
		if err := utils.ParseJSONToObject(r, &payload); err != nil {
			utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid request body", err)
			return
		}

		// Validate the payload using the Validator instance
		if err := utils.Validator.Struct(payload); err != nil {
			utils.WriteErrorResponse(w, http.StatusBadRequest, "Validation failed", err)
			return
		}

		ctx := context.WithValue(r.Context(), "payload", payload)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func UpdateRoleRequestValidator(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var payload dto.UpdateRoleRequestDTO

		// Read and decode the JSON body into the payload
		if err := utils.ParseJSONToObject(r, &payload); err != nil {
			utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid request body", err)
			return
		}

		// Validate the payload using the Validator instance
		if err := utils.Validator.Struct(payload); err != nil {
			utils.WriteErrorResponse(w, http.StatusBadRequest, "Validation failed", err)
			return
		}

		ctx := context.WithValue(r.Context(), "payload", payload)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func AssignPermissionRequestValidator(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var payload dto.AssignPermissionRequestDTO

		// Read and decode the JSON body into the payload
		if err := utils.ParseJSONToObject(r, &payload); err != nil {
			utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid request body", err)
			return
		}

		// Validate the payload using the Validator instance
		if err := utils.Validator.Struct(payload); err != nil {
			utils.WriteErrorResponse(w, http.StatusBadRequest, "Validation failed", err)
			return
		}

		ctx := context.WithValue(r.Context(), "payload", payload)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func RemovePermissionRequestValidator(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var payload dto.RemovePermissionRequestDTO

		// Read and decode the JSON body into the payload
		if err := utils.ParseJSONToObject(r, &payload); err != nil {
			utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid request body", err)
			return
		}

		// Validate the payload using the Validator instance
		if err := utils.Validator.Struct(payload); err != nil {
			utils.WriteErrorResponse(w, http.StatusBadRequest, "Validation failed", err)
			return
		}

		ctx := context.WithValue(r.Context(), "payload", payload)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}