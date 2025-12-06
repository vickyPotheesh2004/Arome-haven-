import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { THEME } from '../constants';
import { Loader2 } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, cartTotal } = useStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-serif text-cafe-espresso mb-4">Cart Empty</h2>
        <button onClick={() => navigate('/menu')} className={THEME.button.primary}>Go to Menu</button>
      </div>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/orders');
      // In real app, would clear cart here
    }, 2000);
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 ${THEME.container}`}>
      <h1 className="text-3xl font-serif font-bold text-cafe-espresso mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-cafe-surfaceAlt">
            <h3 className="font-bold text-cafe-espresso mb-4">Contact Information</h3>
            <div className="space-y-4">
              <input type="email" placeholder="Email" className="w-full border p-3 rounded-lg bg-cafe-bg border-cafe-surfaceAlt focus:outline-none focus:border-cafe-accent" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-cafe-surfaceAlt">
             <h3 className="font-bold text-cafe-espresso mb-4">Payment Details</h3>
             <div className="p-4 border-2 border-cafe-accent/20 bg-cafe-surface/30 rounded-xl text-center text-cafe-muted text-sm">
               Stripe Payment Element would load here.
             </div>
          </div>
        </div>

        <div className="bg-cafe-surface p-8 rounded-2xl h-fit border border-cafe-surfaceAlt">
          <h3 className="font-bold text-cafe-espresso mb-6 text-xl">Order Summary</h3>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                 <span className="text-cafe-espresso">{item.quantity}x {item.name}</span>
                 <span className="text-cafe-muted">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-cafe-surfaceAlt pt-4 flex justify-between items-center font-bold text-xl text-cafe-espresso mb-8">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full ${THEME.button.primary} flex items-center justify-center`}
          >
            {isProcessing ? <Loader2 className="animate-spin mr-2" /> : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
