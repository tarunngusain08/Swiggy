import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { User, MapPin, FileText, CreditCard, Heart, LogOut } from 'lucide-react';
import { cn } from '../utils/cn';

// Profile Tabs
function ProfileTabs() {
  const location = useLocation();
  const path = location.pathname;
  
  const tabs = [
    { icon: User, label: 'Account', path: '/profile' },
    { icon: MapPin, label: 'Addresses', path: '/profile/addresses' },
    { icon: FileText, label: 'Orders', path: '/profile/orders' },
    { icon: CreditCard, label: 'Payment Methods', path: '/profile/payments' },
    { icon: Heart, label: 'Favorites', path: '/profile/favorites' },
  ];
  
  return (
    <div className="border-b">
      <div className="container flex items-center overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={cn(
              "flex items-center py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap",
              path === tab.path
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Account Section
function Account() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      
      <div className="card p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="input"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="input"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              className="input"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>
          
          <div className="pt-2">
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </div>
      
      <div className="card p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Password</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              className="input"
              placeholder="Enter current password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              className="input"
              placeholder="Enter new password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              className="input"
              placeholder="Confirm new password"
            />
          </div>
          
          <div className="pt-2">
            <button className="btn btn-primary">Update Password</button>
          </div>
        </div>
      </div>
      
      <div className="card p-6 border-error">
        <h3 className="text-lg font-semibold mb-4 text-error">Danger Zone</h3>
        <p className="text-muted-foreground mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="btn bg-error text-white hover:bg-error/90">
          Delete Account
        </button>
      </div>
    </div>
  );
}

// Addresses Section
function Addresses() {
  const addresses = [
    {
      id: '1',
      type: 'home',
      address: '123 Home Street, Apt 4B',
      city: 'Cityville',
      state: 'State',
      zip: '12345',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      address: '456 Office Tower, Floor 7',
      city: 'Worktown',
      state: 'State',
      zip: '67890',
      isDefault: false,
    },
  ];
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Saved Addresses</h2>
        <button className="btn btn-primary">Add New Address</button>
      </div>
      
      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="card p-6">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="font-medium capitalize">
                  {address.type}
                  {address.isDefault && (
                    <span className="ml-2 text-xs bg-primary/10 text-primary py-0.5 px-2 rounded-full">
                      Default
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-sm text-primary">Edit</button>
                <button className="text-sm text-muted-foreground">Delete</button>
              </div>
            </div>
            
            <div className="mt-2 text-muted-foreground">
              <p>{address.address}</p>
              <p>{`${address.city}, ${address.state} ${address.zip}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Orders Section
function Orders() {
  const orders = [
    {
      id: '123456',
      date: 'May 15, 2025',
      restaurant: 'Burger Kingdom',
      items: ['Classic Cheeseburger', 'French Fries', 'Chocolate Milkshake'],
      total: 23.98,
      status: 'delivered',
    },
    {
      id: '123455',
      date: 'May 10, 2025',
      restaurant: 'Pizza Paradise',
      items: ['Margherita Pizza', 'Garlic Bread', 'Coke'],
      total: 32.50,
      status: 'delivered',
    },
    {
      id: '123454',
      date: 'May 5, 2025',
      restaurant: 'Sushi Sensation',
      items: ['California Roll', 'Miso Soup', 'Green Tea'],
      total: 45.75,
      status: 'delivered',
    },
  ];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <p className="font-medium">{order.restaurant}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              
              <div className="mt-2 md:mt-0 flex items-center">
                <span className="text-sm font-medium">${order.total.toFixed(2)}</span>
                <span className="ml-4 text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full capitalize">
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm mb-2">
                <span className="font-medium">Order ID:</span> #{order.id}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {order.items.join(', ')}
              </p>
              
              <div className="flex gap-3">
                <button className="btn btn-sm btn-outline">View Details</button>
                <button className="btn btn-sm btn-primary">Reorder</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Profile Component
export function Profile() {
  return (
    <div>
      <ProfileTabs />
      
      <div className="container py-8">
        <Routes>
          <Route index element={<Account />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<div><h2 className="text-2xl font-bold">Payment Methods</h2></div>} />
          <Route path="favorites" element={<div><h2 className="text-2xl font-bold">Favorite Restaurants</h2></div>} />
        </Routes>
      </div>
    </div>
  );
}