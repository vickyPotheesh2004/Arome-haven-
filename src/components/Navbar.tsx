import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Coffee, Home, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { THEME } from '../constants';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen } = useStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-cafe-espresso font-semibold' : 'text-cafe-muted hover:text-cafe-espresso';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cafe-bg/80 backdrop-blur-md border-b border-cafe-surfaceAlt">
      <div className={`${THEME.container} h-16 flex items-center justify-between`}>
        <Link to="/" className="text-2xl font-serif font-bold text-cafe-espresso tracking-tight">
          Aroma Haven
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className={`hidden md:flex items-center space-x-1 ${isActive('/')}`}>
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/menu" className={`flex items-center space-x-1 ${isActive('/menu')}`}>
            <Coffee size={18} />
            <span className="hidden md:inline">Menu</span>
          </Link>
          <Link to="/orders" className={`hidden md:flex items-center space-x-1 ${isActive('/orders')}`}>
            <Clock size={18} />
            <span>Orders</span>
          </Link>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-cafe-espresso hover:bg-cafe-surfaceAlt rounded-full transition-colors"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-cafe-accent text-white text-xs flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
