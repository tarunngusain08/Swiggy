package model

import (
	"time"
)

type DeliveryStatus string

const (
	StatusAssigned  DeliveryStatus = "assigned"
	StatusPickedUp  DeliveryStatus = "picked_up"
	StatusDelivered DeliveryStatus = "delivered"
	StatusCancelled DeliveryStatus = "cancelled"
)

type Delivery struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	OrderID   string         `gorm:"not null" json:"order_id"`
	PartnerID uint           `gorm:"not null" json:"partner_id"`
	Pickup    string         `gorm:"not null" json:"pickup"`
	Dropoff   string         `gorm:"not null" json:"dropoff"`
	Status    DeliveryStatus `gorm:"not null" json:"status"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

type Partner struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `gorm:"not null" json:"name"`
	Phone     string    `gorm:"unique;not null" json:"phone"`
	CreatedAt time.Time `json:"created_at"`
}
