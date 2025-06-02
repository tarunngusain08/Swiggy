import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/format';

export function Cart() {
  const { items, totalAmount, isOpen, toggleCart, updateItemQuantity, removeItem } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart()}
            className="fixed inset-0 bg-black/50 z-50"
          />
          
          {/* Cart panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button
                onClick={() => toggleCart()}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-auto p-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                  <Button onClick={() => toggleCart()}>Browse Restaurants</Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 py-2">
                      <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-error"
                            aria-label="Remove item"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center mt-2">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-muted"
                              aria-label="Decrease quantity"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-muted"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="ml-auto font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>{formatCurrency(40)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes</span>
                    <span>{formatCurrency(totalAmount * 0.05)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(totalAmount + 40 + (totalAmount * 0.05))}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}