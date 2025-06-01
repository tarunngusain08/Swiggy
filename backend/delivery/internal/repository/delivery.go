package repository

import (
	"time"

	"delivery/internal/model"

	"gorm.io/gorm"
)

type DeliveryRepository interface {
	Create(delivery *model.Delivery) error
	GetByID(id uint) (*model.Delivery, error)
	List(filter map[string]interface{}) ([]model.Delivery, error)
	UpdateStatus(id uint, status model.DeliveryStatus) error
}

type PartnerRepository interface {
	Create(partner *model.Partner) error
	List() ([]model.Partner, error)
	GetByID(id uint) (*model.Partner, error)
}

type deliveryRepository struct {
	db *gorm.DB
}

func NewDeliveryRepository(db *gorm.DB) DeliveryRepository {
	return &deliveryRepository{db}
}

func (r *deliveryRepository) Create(delivery *model.Delivery) error {
	return r.db.Create(delivery).Error
}

func (r *deliveryRepository) GetByID(id uint) (*model.Delivery, error) {
	var d model.Delivery
	err := r.db.First(&d, id).Error
	return &d, err
}

func (r *deliveryRepository) List(filter map[string]interface{}) ([]model.Delivery, error) {
	var deliveries []model.Delivery
	tx := r.db.Model(&model.Delivery{})
	if status, ok := filter["status"]; ok {
		tx = tx.Where("status = ?", status)
	}
	if partner, ok := filter["partner_id"]; ok {
		tx = tx.Where("partner_id = ?", partner)
	}
	if date, ok := filter["date"]; ok {
		tx = tx.Where("DATE(created_at) = ?", date.(time.Time).Format("2006-01-02"))
	}
	err := tx.Find(&deliveries).Error
	return deliveries, err
}

func (r *deliveryRepository) UpdateStatus(id uint, status model.DeliveryStatus) error {
	return r.db.Model(&model.Delivery{}).Where("id = ?", id).Update("status", status).Error
}

type partnerRepository struct {
	db *gorm.DB
}

func NewPartnerRepository(db *gorm.DB) PartnerRepository {
	return &partnerRepository{db}
}

func (r *partnerRepository) Create(partner *model.Partner) error {
	return r.db.Create(partner).Error
}

func (r *partnerRepository) List() ([]model.Partner, error) {
	var partners []model.Partner
	err := r.db.Find(&partners).Error
	return partners, err
}

func (r *partnerRepository) GetByID(id uint) (*model.Partner, error) {
	var p model.Partner
	err := r.db.First(&p, id).Error
	return &p, err
}
