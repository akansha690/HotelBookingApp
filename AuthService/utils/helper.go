package utils

import(
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(pass string) (string, error) {
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(pass), 5)
    return string(hashedPassword), err
}

func CompareHashedPassword(pass string, hashedPass string) bool{
	err := bcrypt.CompareHashAndPassword([]byte(hashedPass), []byte(pass))
	return err==nil
	
}