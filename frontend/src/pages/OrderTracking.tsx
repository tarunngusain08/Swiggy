import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Phone, MessageCircle, Clock, CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

// Order status types
type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';

// Status step definition
interface StatusStep {
  status: OrderStatus;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  time?: string;
}

export function OrderTracking() {
  const { id } = useParams<{ id: string }>();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('placed');
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState('30-40 min');
  const [progress, setProgress] = useState(0);
  
  // Mock status steps
  const statusSteps: StatusStep[] = [
    { status: 'placed', label: 'Order Placed', icon: CheckCircle, time: '12:30 PM' },
    { status: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
    { status: 'preparing', label: 'Preparing Your Food', icon: Package },
    { status: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
    { status: 'delivered', label: 'Delivered', icon: Home },
  ];
  
  // Simulate order status updates
  useEffect(() => {
    const statuses: OrderStatus[] = ['placed', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
    let currentIndex = 0;
    
    const updateStatus = () => {
      if (currentIndex < statuses.length) {
        setCurrentStatus(statuses[currentIndex]);
        setProgress((currentIndex / (statuses.length - 1)) * 100);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    };
    
    // Update status every 5 seconds for demo
    const interval = setInterval(updateStatus, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Track Your Order</h1>
        <p className="text-muted-foreground mb-8">Order ID: #{id}</p>
        
        {/* Order Status Overview */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Burger Kingdom</h2>
              <p className="text-sm text-muted-foreground">2 items • Order total: $23.98</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium flex items-center justify-end">
                <Clock className="h-4 w-4 mr-1 text-primary" />
                Estimated delivery in {estimatedDeliveryTime}
              </p>
              <p className="text-sm text-muted-foreground">Arriving at: 123 Home Street</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Status steps */}
          <div className="grid grid-cols-5 gap-2">
            {statusSteps.map((step, index) => {
              const isActive = currentStatus === step.status;
              const isPast = statusSteps.findIndex(s => s.status === currentStatus) > index;
              
              return (
                <div key={step.status} className="flex flex-col items-center text-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                    isActive ? "bg-primary text-white" : 
                    isPast ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                  )}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <p className={cn(
                    "text-xs font-medium",
                    isActive ? "text-primary" : 
                    isPast ? "text-success" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </p>
                  {step.time && (
                    <p className="text-xs text-muted-foreground mt-1">{step.time}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Delivery Partner */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Delivery Partner</h2>
          
          <div className="flex items-center">
            <div className="w-16 h-16 bg-muted rounded-full overflow-hidden mr-4">
              <img 
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Delivery Partner"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold">Michael Johnson</h3>
              <p className="text-sm text-muted-foreground">Delivery Partner</p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-10 h-10 p-0"
              >
                <Phone className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-10 h-10 p-0"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {currentStatus === 'out_for_delivery' && (
            <div className="mt-6">
              <div className="bg-muted rounded-lg h-40 overflow-hidden">
                {/* This would be a real map in a production app */}
                <div className="h-full w-full flex items-center justify-center bg-gray-300">
                  <p className="text-muted-foreground">Map View</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Order Details */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <div>
                <span className="font-medium">1x </span>
                <span>Classic Cheeseburger</span>
              </div>
              <div>$9.99</div>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <div>
                <span className="font-medium">1x </span>
                <span>French Fries</span>
              </div>
              <div>$3.99</div>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <div>
                <span className="font-medium">1x </span>
                <span>Chocolate Milkshake</span>
              </div>
              <div>$4.99</div>
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>$18.97</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes</span>
                <span>$2.02</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                <span>Total</span>
                <span>$23.98</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}