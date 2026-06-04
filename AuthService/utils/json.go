// package utils

// import (
// 	"encoding/json"
// 	"net/http"
// 	"github.com/go-playground/validator/v10"
// 	"fmt"
// )

// var Validator *validator.Validate

// func init() {
// 	fmt.Println("Initializing utils package")
// 	Validator = NewValidator()
// }

// func NewValidator() *validator.Validate {
// 	return validator.New(validator.WithRequiredStructEnabled())
// }

// func SendResponseInJSON(w http.ResponseWriter, status int, data any) error{
// 	w.Header().Set("content-type", "application/json")
// 	w.WriteHeader(status)
// 	return json.NewEncoder(w).Encode(data)
// }

// func ParseJSONToObject(r *http.Request , data any) error{
// 	return json.NewDecoder(r.Body).Decode(data)
// }

// func WriteSuccessResponse(w http.ResponseWriter, status int, message string, data any) error {
// 	response := map[string]any{}
// 	response["status"] = status
// 	response["data"] = data
// 	response["message"] = message
// 	return SendResponseInJSON(w, status, response)
// }

// func WriteErrorResponse(w http.ResponseWriter, status int, message string, err error) error {
// 	response := map[string]any{}
// 	response["status"] = status
// 	response["message"] = message
// 	response["error"] = err.Error()
// 	return SendResponseInJSON(w, status, response)
// }




package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/go-playground/validator/v10"
)

var Validator *validator.Validate

func init() {
    fmt.Println("Initializing utils package")
    Validator = NewValidator()
}

func NewValidator() *validator.Validate {
    return validator.New(validator.WithRequiredStructEnabled())
}

func SendResponseInJSON(w http.ResponseWriter, status int, data any) error {
    w.Header().Set("content-type", "application/json")
    w.WriteHeader(status)
    return json.NewEncoder(w).Encode(data)
}

func ParseJSONToObject(r *http.Request, data any) error {
    return json.NewDecoder(r.Body).Decode(data)
}

func WriteSuccessResponse(w http.ResponseWriter, status int, message string, data any) error {
    response := map[string]any{
        "status":  status,
        "data":    data,
        "message": message,
    }
    return SendResponseInJSON(w, status, response)
}

func WriteErrorResponse(w http.ResponseWriter, status int, message string, err error) error {
    response := map[string]any{
        "status":  status,
        "message": message,
        "error":   err.Error(),
    }
    return SendResponseInJSON(w, status, response)
}

// FormatValidationErrors converts go-playground/validator errors
// into a clean human-readable string like:
// "email is required; password must be at least 6 characters"
func FormatValidationErrors(err error) string {
    var errs validator.ValidationErrors
    if !errors.As(err, &errs) {
        return err.Error()
    }
    msgs := make([]string, 0, len(errs))
    for _, e := range errs {
        field := strings.ToLower(e.Field())
        switch e.Tag() {
        case "required":
            msgs = append(msgs, field+" is required")
        case "email":
            msgs = append(msgs, field+" must be a valid email")
        case "min":
            msgs = append(msgs, field+" must be at least "+e.Param()+" characters")
        case "max":
            msgs = append(msgs, field+" must be at most "+e.Param()+" characters")
        default:
            msgs = append(msgs, field+" is invalid")
        }
    }
    return strings.Join(msgs, "; ")
}