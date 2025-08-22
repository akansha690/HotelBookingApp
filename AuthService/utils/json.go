package utils

import (
	"encoding/json"
	"net/http"
	"github.com/go-playground/validator/v10"
	"fmt"
)

var Validator *validator.Validate

func init() {
	fmt.Println("Initializing utils package")
	Validator = NewValidator()
}

func NewValidator() *validator.Validate {
	return validator.New(validator.WithRequiredStructEnabled())
}

func SendResponseInJSON(w http.ResponseWriter, status int, data any) error{
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(data)
}

func ParseJSONToObject(r *http.Request , data any) error{
	return json.NewDecoder(r.Body).Decode(data)
}

func WriteSuccessResponse(w http.ResponseWriter, status int, message string, data any) error {
	response := map[string]any{}
	response["status"] = status
	response["data"] = data
	response["message"] = message
	return SendResponseInJSON(w, status, response)
}

func WriteErrorResponse(w http.ResponseWriter, status int, message string, err error) error {
	response := map[string]any{}
	response["status"] = status
	response["message"] = message
	response["error"] = err.Error()
	return SendResponseInJSON(w, status, response)
}