import { Star, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Restaurant } from '../../types';
import { formatRating, formatDeliveryTime } from '../../utils/format';
import { cn } from '../../utils/cn';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

export function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  const { name, cuisine, rating, deliveryTime, priceRange, image, offers, isVeg } = restaurant;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="card overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        
        {/* Price range and veg indicator */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge bg-white">{priceRange}</span>
          {isVeg && (
            <span className="badge bg-green-100 text-green-700 border-green-200">
              Pure Veg
            </span>
          )}
        </div>

        {/* Offers */}
        {offers && offers.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-primary text-white text-xs px-2 py-1 rounded flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              {offers[0]}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{name}</h3>
        
        <div className="flex items-center mb-2">
          {/* Rating */}
          <div className="flex items-center bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs font-semibold">
            <Star className="h-3 w-3 fill-current mr-0.5" />
            {formatRating(rating)}
          </div>
          
          {/* Delivery time */}
          <div className="flex items-center ml-3 text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {formatDeliveryTime(deliveryTime)}
          </div>
        </div>
        
        {/* Cuisines */}
        <p className="text-sm text-muted-foreground line-clamp-1">
          {cuisine.join(', ')}
        </p>
      </div>
    </motion.div>
  );
}