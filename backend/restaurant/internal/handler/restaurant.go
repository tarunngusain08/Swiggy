package handler

import (
	"net/http"
	"strconv"

	"restaurant/internal/model"
	"restaurant/internal/service"

	"github.com/gin-gonic/gin"
)

type RestaurantHandler struct {
	svc service.RestaurantService
}

func NewRestaurantHandler(svc service.RestaurantService) *RestaurantHandler {
	return &RestaurantHandler{svc}
}

// POST /restaurants
func (h *RestaurantHandler) CreateRestaurant(c *gin.Context) {
	var req model.Restaurant
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := h.svc.CreateRestaurant(&req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, req)
}

// GET /restaurants
func (h *RestaurantHandler) ListRestaurants(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))
	cuisine := c.Query("cuisine")
	location := c.Query("location")
	rests, total, err := h.svc.ListRestaurants(offset, limit, cuisine, location)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"restaurants": rests, "total": total})
}

// GET /restaurants/:id
func (h *RestaurantHandler) GetRestaurant(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	rest, err := h.svc.GetRestaurant(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
		return
	}
	c.JSON(http.StatusOK, rest)
}

// PUT /restaurants/:id
func (h *RestaurantHandler) UpdateRestaurant(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var req model.Restaurant
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	req.ID = uint(id)
	if err := h.svc.UpdateRestaurant(&req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, req)
}

// DELETE /restaurants/:id
func (h *RestaurantHandler) DeleteRestaurant(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	if err := h.svc.DeleteRestaurant(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}

// POST /restaurants/:id/menu
func (h *RestaurantHandler) AddMenuItem(c *gin.Context) {
	restID, _ := strconv.Atoi(c.Param("id"))
	var req model.MenuItem
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	req.RestaurantID = uint(restID)
	if err := h.svc.AddMenuItem(&req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, req)
}

// GET /restaurants/:id/menu
func (h *RestaurantHandler) ListMenuItems(c *gin.Context) {
	restID, _ := strconv.Atoi(c.Param("id"))
	items, err := h.svc.ListMenuItems(uint(restID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, items)
}

// PUT /restaurants/:id/menu/:item_id
func (h *RestaurantHandler) UpdateMenuItem(c *gin.Context) {
	itemID, _ := strconv.Atoi(c.Param("item_id"))
	var req model.MenuItem
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	req.ID = uint(itemID)
	if err := h.svc.UpdateMenuItem(&req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, req)
}

// DELETE /restaurants/:id/menu/:item_id
func (h *RestaurantHandler) DeleteMenuItem(c *gin.Context) {
	itemID, _ := strconv.Atoi(c.Param("item_id"))
	if err := h.svc.DeleteMenuItem(uint(itemID)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusNoContent)
}
