import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { MenuCategory as MenuCategoryType, MenuItem } from '../../types';
import { MenuItemCard } from './MenuItemCard';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuCategoryProps {
  category: MenuCategoryType;
}

export function MenuCategory({ category }: MenuCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-8">
      <button
        className="w-full flex items-center justify-between py-3 border-b text-left"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h3 className="text-xl font-medium">{category.name} <span className="text-sm text-muted-foreground">({category.items.length})</span></h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-4">
              {category.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}