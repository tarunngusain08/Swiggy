import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { useCartStore } from '../store/cartStore';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toggleCart, itemsCount } = useCartStore();

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
            <path d="M17 12h.01"></path>
            <path d="M21 14H3a2 2 0 0 0 0 4h18a2 2 0 0 0 0-4Z"></path>
            <path d="M12 4v10"></path>
            <path d="m16 6-4-2-4 2"></path>
            <path d="M12 4v2a6 6 0 0 1 6 6"></path>
            <path d="M18 14v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5"></path>
          </svg>
          <span className="font-heading font-bold text-xl">Foodie</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              location.pathname === '/' ? 'text-primary' : 'text-foreground'
            )}
          >
            Home
          </Link>
          <Link
            to="/offers"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Offers
          </Link>
          <Link
            to="/help"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Help
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            className="hidden md:flex items-center gap-2 rounded-full bg-muted px-3 py-1.5"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
            <span className="text-sm">Search</span>
          </button>

          <button
            className="relative"
            onClick={() => toggleCart()}
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemsCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                {itemsCount}
              </span>
            )}
          </button>

          <Link
            to="/login"
            className="hidden md:block"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-md">
          <div className="flex items-center rounded-lg bg-muted px-3 py-2 mb-4">
            <Search className="h-4 w-4 mr-2" />
            <input
              type="text"
              placeholder="Search for food, restaurant..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === '/' ? 'text-primary' : 'text-foreground'
              )}
            >
              Home
            </Link>
            <Link
              to="/offers"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Offers
            </Link>
            <Link
              to="/help"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Help
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}