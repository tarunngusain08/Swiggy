import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Cart } from '../components/cart/Cart';
import { useCartStore } from '../store/cartStore';

export function MainLayout() {
  const isCartOpen = useCartStore((state) => state.isOpen);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {isCartOpen && <Cart />}
    </div>
  );
}