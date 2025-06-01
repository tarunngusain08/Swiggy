package repository

import (
	"restaurant/internal/model"

	"gorm.io/gorm"
)

type RestaurantRepository interface {
	Create(r *model.Restaurant) error
	GetByID(id uint) (*model.Restaurant, error)
	List(offset, limit int, cuisine, location string) ([]model.Restaurant, int64, error)
	Update(r *model.Restaurant) error
	Delete(id uint) error
}

type MenuRepository interface {
	Add(item *model.MenuItem) error
	List(restaurantID uint) ([]model.MenuItem, error)
	Update(item *model.MenuItem) error
	Delete(itemID uint) error
}

type restaurantRepository struct {
	db *gorm.DB
}

func NewRestaurantRepository(db *gorm.DB) RestaurantRepository {
	return &restaurantRepository{db}
}

func (r *restaurantRepository) Create(rest *model.Restaurant) error {
	return r.db.Create(rest).Error
}

func (r *restaurantRepository) GetByID(id uint) (*model.Restaurant, error) {
	var rest model.Restaurant
	err := r.db.Preload("MenuItems").First(&rest, id).Error
	return &rest, err
}

func (r *restaurantRepository) List(offset, limit int, cuisine, location string) ([]model.Restaurant, int64, error) {
	var rests []model.Restaurant
	var count int64
	query := r.db.Model(&model.Restaurant{})
	if cuisine != "" {
		query = query.Where("cuisine = ?", cuisine)
	}
	if location != "" {
		query = query.Where("address ILIKE ?", "%"+location+"%")
	}
	query.Count(&count)
	err := query.Offset(offset).Limit(limit).Find(&rests).Error
	return rests, count, err
}

func (r *restaurantRepository) Update(rest *model.Restaurant) error {
	return r.db.Save(rest).Error
}

func (r *restaurantRepository) Delete(id uint) error {
	return r.db.Delete(&model.Restaurant{}, id).Error
}

type menuRepository struct {
	db *gorm.DB
}

func NewMenuRepository(db *gorm.DB) MenuRepository {
	return &menuRepository{db}
}

func (m *menuRepository) Add(item *model.MenuItem) error {
	return m.db.Create(item).Error
}

func (m *menuRepository) List(restaurantID uint) ([]model.MenuItem, error) {
	var items []model.MenuItem
	err := m.db.Where("restaurant_id = ?", restaurantID).Find(&items).Error
	return items, err
}

func (m *menuRepository) Update(item *model.MenuItem) error {
	return m.db.Save(item).Error
}

func (m *menuRepository) Delete(itemID uint) error {
	return m.db.Delete(&model.MenuItem{}, itemID).Error
}
