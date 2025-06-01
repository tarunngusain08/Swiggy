package service

import (
	"errors"

	"delivery/internal/model"
	"delivery/internal/repository"
)

type DeliveryService interface {
	AssignDelivery(orderID string, partnerID uint, pickup, dropoff string) (*model.Delivery, error)
	GetDelivery(id uint) (*model.Delivery, error)
	ListDeliveries(filter map[string]interface{}) ([]model.Delivery, error)
	UpdateDeliveryStatus(id uint, status model.DeliveryStatus) error
}

type deliveryService struct {
	deliveryRepo repository.DeliveryRepository
	partnerRepo  repository.PartnerRepository
}

func NewDeliveryService(dr repository.DeliveryRepository, pr repository.PartnerRepository) DeliveryService {
	return &deliveryService{dr, pr}
}

func (s *deliveryService) AssignDelivery(orderID string, partnerID uint, pickup, dropoff string) (*model.Delivery, error) {
	_, err := s.partnerRepo.GetByID(partnerID)
	if err != nil {
		return nil, errors.New("partner not found")
	}
	delivery := &model.Delivery{
		OrderID:   orderID,
		PartnerID: partnerID,
		Pickup:    pickup,
		Dropoff:   dropoff,
		Status:    model.StatusAssigned,
	}
	err = s.deliveryRepo.Create(delivery)
	return delivery, err
}

func (s *deliveryService) GetDelivery(id uint) (*model.Delivery, error) {
	return s.deliveryRepo.GetByID(id)
}

func (s *deliveryService) ListDeliveries(filter map[string]interface{}) ([]model.Delivery, error) {
	return s.deliveryRepo.List(filter)
}

func (s *deliveryService) UpdateDeliveryStatus(id uint, status model.DeliveryStatus) error {
	return s.deliveryRepo.UpdateStatus(id, status)
}

type PartnerService interface {
	ListPartners() ([]model.Partner, error)
	RegisterPartner(name, phone string) (*model.Partner, error)
}

type partnerService struct {
	partnerRepo repository.PartnerRepository
}

func NewPartnerService(pr repository.PartnerRepository) PartnerService {
	return &partnerService{pr}
}

func (s *partnerService) ListPartners() ([]model.Partner, error) {
	return s.partnerRepo.List()
}

func (s *partnerService) RegisterPartner(name, phone string) (*model.Partner, error) {
	partner := &model.Partner{Name: name, Phone: phone}
	err := s.partnerRepo.Create(partner)
	return partner, err
}
