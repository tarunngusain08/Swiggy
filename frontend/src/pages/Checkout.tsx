import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Tag, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../utils/format';

type PaymentMethod = 'card' | 'cash' | 'upi';
type DeliveryAddress = 'home' | 'work' | 'other';

export function Checkout() {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>('home');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  
  // Mock delivery and tax fees
  const deliveryFee = 40;
  const tax = totalAmount * 0.05;
  const total = totalAmount + deliveryFee + tax;
  
  const handlePlaceOrder = () => {
    // Simulating order placement
    setIsOrderPlaced(true);
    
    // After 2 seconds, redirect to order tracking
    setTimeout(() => {
      clearCart();
      navigate('/tracking/123456');
    }, 2000);
  };
  
  if (isOrderPlaced) {
    return (
      <div className="container py-16 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-success" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-8">
          Your order has been placed successfully. Redirecting you to the order tracking page...
        </p>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-pulse" style={{ width: '100%' }}></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Delivery Address */}
          <div className="card p-6 mb-6">
            <h2 className="text-lg font-semibold flex items-center mb-4">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              Delivery Address
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <button
                className={`p-4 border rounded-lg text-left ${
                  deliveryAddress === 'home' ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setDeliveryAddress('home')}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Home</span>
                  {deliveryAddress === 'home' && (
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  123 Home Street, Apt 4B, Cityville, 12345
                </p>
              </button>
              
              <button
                className={`p-4 border rounded-lg text-left ${
                  deliveryAddress === 'work' ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setDeliveryAddress('work')}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Work</span>
                  {deliveryAddress === 'work' && (
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  456 Office Tower, Floor 7, Worktown, 67890
                </p>
              </button>
              
              <button
                className={`p-4 border rounded-lg text-left flex flex-col items-center justify-center ${
                  deliveryAddress === 'other' ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setDeliveryAddress('other')}
              >
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center mb-2">
                  <Plus className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="font-medium">Add New Address</span>
              </button>
            </div>
            
            {deliveryAddress === 'other' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" />
                  <Input placeholder="Phone Number" />
                </div>
                <Input placeholder="Address Line 1" />
                <Input placeholder="Address Line 2 (Optional)" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input placeholder="City" />
                  <Input placeholder="State" />
                  <Input placeholder="ZIP Code" />
                </div>
                <div>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Save this address for future orders
                  </label>
                </div>
              </div>
            )}
          </div>
          
          {/* Payment Method */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold flex items-center mb-4">
              <CreditCard className="h-5 w-5 mr-2 text-primary" />
              Payment Method
            </h2>
            
            <div className="space-y-4">
              <button
                className={`w-full p-4 border rounded-lg text-left flex items-center ${
                  paymentMethod === 'card' ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="w-10 h-6 bg-blue-600 rounded mr-3"></div>
                <div className="flex-1">
                  <div className="font-medium">Credit/Debit Card</div>
                  <div className="text-sm text-muted-foreground">Pay securely with your card</div>
                </div>
                {paymentMethod === 'card' && (
                  <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                )}
              </button>
              
              <button
                className={`w-full p-4 border rounded-lg text-left flex items-center ${
                  paymentMethod === 'cash' ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setPaymentMethod('cash')}
              >
                <div className="w-10 h-6 bg-green-600 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                  $
                </div>
                <div className="flex-1">
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-sm text-muted-foreground">Pay when your order arrives</div>
                </div>
                {paymentMethod === 'cash' && (
                  <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                )}
              </button>
              
              <button
                className={`w-full p-4 border rounded-lg text-left flex items-center ${
                  paymentMethod === 'upi' ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setPaymentMethod('upi')}
              >
                <div className="w-10 h-6 bg-purple-600 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                  UPI
                </div>
                <div className="flex-1">
                  <div className="font-medium">UPI Payment</div>
                  <div className="text-sm text-muted-foreground">Pay using your UPI ID</div>
                </div>
                {paymentMethod === 'upi' && (
                  <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                )}
              </button>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="mt-6 space-y-4">
                <Input placeholder="Card Number" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Expiry Date (MM/YY)" />
                  <Input placeholder="CVV" />
                </div>
                <div>
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Save this card for future payments
                  </label>
                </div>
              </div>
            )}
            
            {paymentMethod === 'upi' && (
              <div className="mt-6">
                <Input placeholder="Enter UPI ID (e.g., name@bank)" />
              </div>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="max-h-56 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <div>
                    <span className="font-medium">{item.quantity}x </span>
                    <span>{item.name}</span>
                  </div>
                  <div>{formatCurrency(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes</span>
                <span>{formatCurrency(tax)}</span>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <Input placeholder="Enter promo code" className="rounded-r-none" />
              <Button className="rounded-l-none">Apply</Button>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            
            <Button
              className="w-full"
              size="lg"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              By placing your order, you agree to our 
              <a href="#" className="text-primary"> Terms of Service</a> and 
              <a href="#" className="text-primary"> Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}