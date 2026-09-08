import React from 'react';
import { X, Minus, Plus, Trash2, CreditCard } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { THEME } from '../constants';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useStore();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-cafe-espresso/20 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-cafe-bg h-full shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="p-6 border-b border-cafe-surfaceAlt flex items-center justify-between">
          <h2 className="text-2xl font-serif text-cafe-espresso">Your Order</h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-cafe-surfaceAlt rounded-full text-cafe-muted">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-cafe-muted">
              <ShoppingBagIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Your cart is empty.</p>
              <p className="text-sm mt-2">Time to discover some new flavors!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 items-center bg-cafe-surface p-4 rounded-xl">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-medium text-cafe-espresso">{item.name}</h3>
                  <p className="text-cafe-accent font-semibold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-3 bg-cafe-bg rounded-full px-2 py-1 border border-cafe-surfaceAlt">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-cafe-accent">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-cafe-accent">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-xs text-cafe-muted hover:text-red-500 flex items-center gap-1">
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-cafe-surfaceAlt bg-cafe-surface">
            <div className="flex justify-between items-center mb-6">
              <span className="text-cafe-muted">Total</span>
              <span className="text-2xl font-serif text-cafe-espresso font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className={`w-full ${THEME.button.primary} flex items-center justify-center gap-2`}
            >
              <CreditCard size={18} />
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
