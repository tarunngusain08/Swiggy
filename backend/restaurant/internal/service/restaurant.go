package service

import (
	"restaurant/internal/model"
	"restaurant/internal/repository"
)

type RestaurantService interface {
	CreateRestaurant(r *model.Restaurant) error
	GetRestaurant(id uint) (*model.Restaurant, error)
	ListRestaurants(offset, limit int, cuisine, location string) ([]model.Restaurant, int64, error)
	UpdateRestaurant(r *model.Restaurant) error
	DeleteRestaurant(id uint) error

	AddMenuItem(item *model.MenuItem) error
	ListMenuItems(restaurantID uint) ([]model.MenuItem, error)
	UpdateMenuItem(item *model.MenuItem) error
	DeleteMenuItem(itemID uint) error
}

type restaurantService struct {
	restaurantRepo repository.RestaurantRepository
	menuRepo       repository.MenuRepository
}

func NewRestaurantService(r repository.RestaurantRepository, m repository.MenuRepository) RestaurantService {
	return &restaurantService{r, m}
}

func (s *restaurantService) CreateRestaurant(r *model.Restaurant) error {
	return s.restaurantRepo.Create(r)
}

func (s *restaurantService) GetRestaurant(id uint) (*model.Restaurant, error) {
	return s.restaurantRepo.GetByID(id)
}

func (s *restaurantService) ListRestaurants(offset, limit int, cuisine, location string) ([]model.Restaurant, int64, error) {
	return s.restaurantRepo.List(offset, limit, cuisine, location)
}

func (s *restaurantService) UpdateRestaurant(r *model.Restaurant) error {
	return s.restaurantRepo.Update(r)
}

func (s *restaurantService) DeleteRestaurant(id uint) error {
	return s.restaurantRepo.Delete(id)
}

func (s *restaurantService) AddMenuItem(item *model.MenuItem) error {
	return s.menuRepo.Add(item)
}

func (s *restaurantService) ListMenuItems(restaurantID uint) ([]model.MenuItem, error) {
	return s.menuRepo.List(restaurantID)
}

func (s *restaurantService) UpdateMenuItem(item *model.MenuItem) error {
	return s.menuRepo.Update(item)
}

func (s *restaurantService) DeleteMenuItem(itemID uint) error {
	return s.menuRepo.Delete(itemID)
}
