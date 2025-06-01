package services

import (
	"errors"
	"strings"
	"user-service/internal/models"
	"user-service/internal/repositories"
	"user-service/pkg/utils"
)

type UserService interface {
	Register(name, email, phone, password string) (*models.User, error)
	Login(identifier, password string) (string, *models.User, error)
	GetProfile(userID uint) (*models.User, error)
	UpdateProfile(userID uint, name, phone, address string) (*models.User, error)
	DeleteAccount(userID uint) error
}

type userService struct {
	repo      repositories.UserRepository
	jwtSecret string
}

func NewUserService(repo repositories.UserRepository, jwtSecret string) UserService {
	return &userService{repo, jwtSecret}
}

func (s *userService) Register(name, email, phone, password string) (*models.User, error) {
	email = strings.ToLower(strings.TrimSpace(email))
	phone = strings.TrimSpace(phone)
	if name == "" || email == "" || phone == "" || password == "" {
		return nil, errors.New("all fields are required")
	}
	if _, err := s.repo.FindByEmail(email); err == nil {
		return nil, errors.New("email already registered")
	}
	if _, err := s.repo.FindByPhone(phone); err == nil {
		return nil, errors.New("phone already registered")
	}
	hashed, err := utils.HashPassword(password)
	if err != nil {
		return nil, err
	}
	user := &models.User{
		Name:     name,
		Email:    email,
		Phone:    phone,
		Password: hashed,
	}
	if err := s.repo.Create(user); err != nil {
		return nil, err
	}
	return user, nil
}

func (s *userService) Login(identifier, password string) (string, *models.User, error) {
	var user *models.User
	var err error
	if strings.Contains(identifier, "@") {
		user, err = s.repo.FindByEmail(strings.ToLower(identifier))
	} else {
		user, err = s.repo.FindByPhone(identifier)
	}
	if err != nil {
		return "", nil, errors.New("invalid credentials")
	}
	if !utils.CheckPasswordHash(password, user.Password) {
		return "", nil, errors.New("invalid credentials")
	}
	token, err := utils.GenerateJWT(user.ID, s.jwtSecret)
	if err != nil {
		return "", nil, err
	}
	return token, user, nil
}

func (s *userService) GetProfile(userID uint) (*models.User, error) {
	return s.repo.FindByID(userID)
}

func (s *userService) UpdateProfile(userID uint, name, phone, address string) (*models.User, error) {
	user, err := s.repo.FindByID(userID)
	if err != nil {
		return nil, err
	}
	if name != "" {
		user.Name = name
	}
	if phone != "" {
		// Check if phone is already taken by another user
		existing, err := s.repo.FindByPhone(phone)
		if err == nil && existing.ID != userID {
			return nil, errors.New("phone already registered")
		}
		user.Phone = phone
	}
	if address != "" {
		user.Address = address
	}
	if err := s.repo.Update(user); err != nil {
		return nil, err
	}
	return user, nil
}

func (s *userService) DeleteAccount(userID uint) error {
	user, err := s.repo.FindByID(userID)
	if err != nil {
		return err
	}
	return s.repo.Delete(user)
}
