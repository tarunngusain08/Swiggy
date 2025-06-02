import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Tag, Star, MapPin, ChevronLeft } from 'lucide-react';
import { restaurantDetails } from '../data/mockData';
import { formatRating, formatDeliveryTime } from '../utils/format';
import { MenuCategory } from '../components/restaurant/MenuCategory';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

export function RestaurantDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  
  const restaurant = id ? restaurantDetails[id] : undefined;
  
  // If restaurant not found, redirect to home
  useEffect(() => {
    if (!restaurant) {
      navigate('/');
    }
  }, [restaurant, navigate]);
  
  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderFixed(scrollPosition > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!restaurant) {
    return null;
  }
  
  return (
    <div className="pb-20">
      {/* Restaurant Header */}
      <div className="relative h-72 sm:h-96 bg-gray-200">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 bg-white/90 hover:bg-white text-foreground"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back
        </Button>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-sm mb-2">{restaurant.cuisine.join(', ')}</p>
            <p className="text-sm mb-3">{restaurant.address}</p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-sm">
                <div className="flex items-center bg-white text-green-700 px-2 py-0.5 rounded text-xs font-semibold">
                  <Star className="h-3 w-3 fill-current mr-0.5" />
                  {formatRating(restaurant.rating)}
                </div>
              </div>
              
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {formatDeliveryTime(restaurant.deliveryTime)}
              </div>
              
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {restaurant.address.split(',')[0]}
              </div>
            </div>
            
            {restaurant.offers && restaurant.offers.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {restaurant.offers.map((offer, index) => (
                  <div key={index} className="bg-primary text-white text-xs px-2 py-1 rounded flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {offer}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Sticky menu header */}
      <div className={cn(
        "bg-white border-b sticky top-16 z-30 transition-all duration-300",
        isHeaderFixed ? "shadow-md" : ""
      )}>
        <div className="container py-4">
          <div className="flex gap-6 overflow-x-auto hide-scrollbar">
            {restaurant.menu.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="text-sm font-medium whitespace-nowrap hover:text-primary transition-colors"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Menu */}
      <div className="container pt-8">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        
        {restaurant.menu.map((category) => (
          <div key={category.id} id={category.id}>
            <MenuCategory category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}