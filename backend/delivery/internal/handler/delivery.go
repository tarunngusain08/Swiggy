package handler

import (
	"net/http"
	"strconv"
	"time"

	"delivery/internal/model"
	"delivery/internal/service"

	"github.com/gin-gonic/gin"
)

type DeliveryHandler struct {
	service service.DeliveryService
}

func NewDeliveryHandler(s service.DeliveryService) *DeliveryHandler {
	return &DeliveryHandler{s}
}

type assignDeliveryRequest struct {
	OrderID   string `json:"order_id" binding:"required"`
	PartnerID uint   `json:"partner_id" binding:"required"`
	Pickup    string `json:"pickup" binding:"required"`
	Dropoff   string `json:"dropoff" binding:"required"`
}

func (h *DeliveryHandler) AssignDelivery(c *gin.Context) {
	var req assignDeliveryRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	delivery, err := h.service.AssignDelivery(req.OrderID, req.PartnerID, req.Pickup, req.Dropoff)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, delivery)
}

func (h *DeliveryHandler) GetDelivery(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	delivery, err := h.service.GetDelivery(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	c.JSON(http.StatusOK, delivery)
}

func (h *DeliveryHandler) ListDeliveries(c *gin.Context) {
	filter := make(map[string]interface{})
	if status := c.Query("status"); status != "" {
		filter["status"] = status
	}
	if partner := c.Query("partner_id"); partner != "" {
		id, _ := strconv.Atoi(partner)
		filter["partner_id"] = id
	}
	if date := c.Query("date"); date != "" {
		t, _ := time.Parse("2006-01-02", date)
		filter["date"] = t
	}
	deliveries, err := h.service.ListDeliveries(filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to list"})
		return
	}
	c.JSON(http.StatusOK, deliveries)
}

type updateStatusRequest struct {
	Status model.DeliveryStatus `json:"status" binding:"required"`
}

func (h *DeliveryHandler) UpdateDeliveryStatus(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var req updateStatusRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := h.service.UpdateDeliveryStatus(uint(id), req.Status)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}

// Partner handlers
type PartnerHandler struct {
	service service.PartnerService
}

func NewPartnerHandler(s service.PartnerService) *PartnerHandler {
	return &PartnerHandler{s}
}

func (h *PartnerHandler) ListPartners(c *gin.Context) {
	partners, err := h.service.ListPartners()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to list"})
		return
	}
	c.JSON(http.StatusOK, partners)
}

type registerPartnerRequest struct {
	Name  string `json:"name" binding:"required"`
	Phone string `json:"phone" binding:"required"`
}

func (h *PartnerHandler) RegisterPartner(c *gin.Context) {
	var req registerPartnerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	partner, err := h.service.RegisterPartner(req.Name, req.Phone)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, partner)
}
