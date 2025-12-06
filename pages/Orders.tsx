import React from 'react';
import { THEME } from '../constants';

export const Orders: React.FC = () => {
  // Mock Orders Data
  const orders = [
    {
      id: 'ORD-7782',
      date: 'Today, 10:30 AM',
      status: 'Preparing',
      total: 12.50,
      items: ['Honey Lavender Latte', 'Croissant']
    },
    {
      id: 'ORD-5541',
      date: 'Yesterday, 2:15 PM',
      status: 'Completed',
      total: 5.50,
      items: ['Espresso Romano']
    }
  ];

  return (
    <div className={`min-h-screen pt-24 ${THEME.container}`}>
      <h1 className="text-3xl font-serif font-bold text-cafe-espresso mb-8">Your Orders</h1>

      <div className="space-y-6 max-w-2xl">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-2xl border border-cafe-surfaceAlt shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm text-cafe-muted block mb-1">Order #{order.id}</span>
                <h3 className="font-bold text-cafe-espresso text-lg">{order.status}</h3>
              </div>
              <span className="text-cafe-accent font-semibold">${order.total.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-cafe-surfaceAlt pt-4">
              <p className="text-sm text-cafe-muted mb-2">{order.date}</p>
              <ul className="text-cafe-espresso">
                {order.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cafe-latte" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
