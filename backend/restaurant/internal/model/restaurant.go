package model

import "gorm.io/gorm"

type Restaurant struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Name      string         `json:"name"`
	Address   string         `json:"address"`
	Cuisine   string         `json:"cuisine"`
	Contact   string         `json:"contact"`
	MenuItems []MenuItem     `json:"menu_items,omitempty"`
	CreatedAt int64          `json:"created_at"`
	UpdatedAt int64          `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type MenuItem struct {
	ID           uint           `gorm:"primaryKey" json:"id"`
	RestaurantID uint           `json:"restaurant_id"`
	Name         string         `json:"name"`
	Description  string         `json:"description"`
	Price        float64        `json:"price"`
	CreatedAt    int64          `json:"created_at"`
	UpdatedAt    int64          `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"`
}
