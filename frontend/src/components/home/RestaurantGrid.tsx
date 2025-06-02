import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import { Restaurant } from '../../types';
import { RestaurantCard } from './RestaurantCard';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  title?: string;
}

export function RestaurantGrid({ restaurants, title = 'Restaurants near you' }: RestaurantGridProps) {
  const [sortOption, setSortOption] = useState('recommended');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Sort restaurants based on selected option
  const sortedRestaurants = [...restaurants].sort((a, b) => {
    switch (sortOption) {
      case 'rating':
        return b.rating - a.rating;
      case 'delivery':
        return a.deliveryTime - b.deliveryTime;
      default:
        // 'recommended' - Keep original order
        return 0;
    }
  });

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <h2 className="text-2xl font-bold mb-4 sm:mb-0">{title}</h2>
          
          <div className="flex flex-wrap gap-2">
            {/* Sort options */}
            <div className="flex space-x-2">
              <Button
                variant={sortOption === 'recommended' ? 'primary' : 'outline'}
                onClick={() => setSortOption('recommended')}
                size="sm"
              >
                Recommended
              </Button>
              <Button
                variant={sortOption === 'rating' ? 'primary' : 'outline'}
                onClick={() => setSortOption('rating')}
                size="sm"
              >
                Rating
              </Button>
              <Button
                variant={sortOption === 'delivery' ? 'primary' : 'outline'}
                onClick={() => setSortOption('delivery')}
                size="sm"
              >
                Delivery Time
              </Button>
            </div>
            
            {/* Filter button */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="flex items-center gap-1"
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {isFilterMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-56 bg-white rounded-md shadow-lg z-10 border">
                  <div className="px-4 py-2 text-sm font-medium text-foreground">
                    Dietary
                  </div>
                  <div className="px-4 py-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Vegetarian Only</span>
                    </label>
                  </div>
                  <div className="px-4 py-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Offers Available</span>
                    </label>
                  </div>
                  <div className="border-t my-2"></div>
                  <div className="px-4 py-2 text-sm font-medium text-foreground">
                    Price Range
                  </div>
                  <div className="px-4 py-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">$</span>
                    </label>
                  </div>
                  <div className="px-4 py-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">$$</span>
                    </label>
                  </div>
                  <div className="px-4 py-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">$$$</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedRestaurants.map((restaurant, index) => (
            <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
              <RestaurantCard restaurant={restaurant} index={index} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}