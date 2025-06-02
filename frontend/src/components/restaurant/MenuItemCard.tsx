import { ShoppingBag, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { MenuItem } from '../../types';
import { formatCurrency } from '../../utils/format';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/cartStore';
import { cn } from '../../utils/cn';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { items, addItem } = useCartStore();
  const isInCart = items.some((cartItem) => cartItem.id === item.id);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex gap-4 p-4 border rounded-lg"
    >
      <div className="w-24 h-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{item.name}</h4>
              {item.isVeg && (
                <span className="flex-shrink-0 w-4 h-4 border border-green-500 flex items-center justify-center">
                  <span className="block w-2 h-2 bg-green-500 rounded-full"></span>
                </span>
              )}
              {item.isRecommended && (
                <span className="bg-amber-100 text-amber-800 text-xs px-1.5 py-0.5 rounded">
                  Recommended
                </span>
              )}
              {item.isPopular && (
                <span className="bg-red-100 text-red-800 text-xs px-1.5 py-0.5 rounded">
                  Popular
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm mt-1">{formatCurrency(item.price)}</p>
          </div>
          
          <Button
            variant={isInCart ? 'primary' : 'outline'}
            size="sm"
            className={cn(
              "flex-shrink-0",
              isInCart ? "bg-green-500 hover:bg-green-600" : ""
            )}
            onClick={() => addItem(item)}
          >
            {isInCart ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
        
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}