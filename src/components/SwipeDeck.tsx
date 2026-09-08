import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { THEME } from '../constants';

interface SwipeDeckProps {
  products: Product[];
  onSwipe: (product: Product, direction: 'left' | 'right') => void;
}

export const SwipeDeck: React.FC<SwipeDeckProps> = ({ products, onSwipe }) => {
  const [index, setIndex] = useState(0);
  const [exitX, setExitX] = useState<number>(0);
  const { addToCart } = useStore();

  // If we've gone through all products
  if (index >= products.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] text-center p-8 bg-cafe-surface/50 backdrop-blur-sm rounded-3xl border border-cafe-surfaceAlt shadow-xl">
        <div className="w-20 h-20 bg-cafe-surfaceAlt rounded-full flex items-center justify-center mb-6 text-cafe-espresso animate-bounce-slow">
            <RotateCcw size={32} />
        </div>
        <h3 className="text-3xl font-serif text-cafe-espresso mb-2">Menu Explored</h3>
        <p className="text-cafe-muted mb-8 max-w-xs mx-auto">You've seen all our current specials. Ready to revisit or check your cart?</p>
        <button 
          onClick={() => setIndex(0)}
          className={THEME.button.primary}
        >
          Start Over
        </button>
      </div>
    );
  }

  const currentProduct = products[index];
  const nextProduct = products[index + 1];

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      setExitX(200);
      onSwipe(currentProduct, 'right');
      addToCart(currentProduct);
      setTimeout(() => setIndex(prev => prev + 1), 200);
    } else if (info.offset.x < -100) {
      setExitX(-200);
      onSwipe(currentProduct, 'left');
      setTimeout(() => setIndex(prev => prev + 1), 200);
    }
  };

  return (
    <div className="relative w-full max-w-sm h-[600px] mx-auto perspective-1000">
        {/* Next Card (Background) */}
        {nextProduct && (
            <div className="absolute top-4 left-0 right-0 h-full transform scale-95 opacity-60 translate-y-4 -z-10">
                 <div className="w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden border border-cafe-surfaceAlt">
                    <img src={nextProduct.image} className="w-full h-3/5 object-cover grayscale" alt="" />
                    <div className="p-6">
                        <div className="h-6 w-1/2 bg-cafe-surfaceAlt/50 rounded mb-4" />
                        <div className="h-4 w-3/4 bg-cafe-surfaceAlt/30 rounded" />
                    </div>
                 </div>
            </div>
        )}

      <AnimatePresence>
        <Card 
          key={currentProduct.id} 
          product={currentProduct} 
          onDragEnd={handleDragEnd}
          exitX={exitX}
        />
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute -bottom-24 left-0 right-0 flex justify-center gap-8 z-20">
        <button 
          onClick={() => { setExitX(-250); onSwipe(currentProduct, 'left'); setTimeout(() => setIndex(i => i + 1), 200); }}
          className="p-5 bg-white rounded-full shadow-[0_8px_20px_rgba(220,38,38,0.15)] text-cafe-muted hover:text-red-500 hover:scale-110 hover:shadow-[0_12px_24px_rgba(220,38,38,0.25)] transition-all duration-300"
        >
          <X size={32} />
        </button>
        <button 
           onClick={() => { setExitX(250); onSwipe(currentProduct, 'right'); addToCart(currentProduct); setTimeout(() => setIndex(i => i + 1), 200); }}
          className="p-5 bg-white rounded-full shadow-[0_8px_20px_rgba(22,163,74,0.15)] text-cafe-accent hover:text-green-600 hover:scale-110 hover:shadow-[0_12px_24px_rgba(22,163,74,0.25)] transition-all duration-300"
        >
          <Heart size={32} fill="currentColor" className="opacity-20 hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
};

interface CardProps {
  product: Product;
  onDragEnd: (event: any, info: PanInfo) => void;
  exitX: number;
}

const Card: React.FC<CardProps> = ({ product, onDragEnd, exitX }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  
  // Color overlays indicating swipe direction
  const likeOpacity = useTransform(x, [20, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -20], [1, 0]);

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      initial={{ scale: 0.95, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ x: exitX, opacity: 0, rotate: exitX > 0 ? 20 : -20, transition: { duration: 0.3 } }}
      whileTap={{ cursor: "grabbing" }}
      className={`absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-cafe-surfaceAlt`}
    >
      <div className="relative h-[65%]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover pointer-events-none" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cafe-espresso/80 via-transparent to-transparent" />
        
        {/* Swipe Indicators */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 right-8 border-4 border-green-500 text-green-500 rounded-xl px-4 py-2 font-bold text-4xl transform rotate-12 bg-white/90 shadow-lg backdrop-blur-sm z-10">
          TASTY
        </motion.div>
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 left-8 border-4 border-red-500 text-red-500 rounded-xl px-4 py-2 font-bold text-4xl transform -rotate-12 bg-white/90 shadow-lg backdrop-blur-sm z-10">
          SKIP
        </motion.div>

        <div className="absolute bottom-6 left-6 right-6 text-white">
          <div className="flex gap-2 mb-2">
             <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-xs rounded-full uppercase tracking-wider font-semibold">
                {product.category}
            </span>
             <span className="px-3 py-1 bg-cafe-accent/80 backdrop-blur-md text-xs rounded-full uppercase tracking-wider font-semibold flex items-center gap-1">
               ★ {product.rating}
             </span>
          </div>
          <h2 className="text-4xl font-serif font-bold mb-1 shadow-black/10 drop-shadow-lg">{product.name}</h2>
          <p className="text-cafe-surfaceAlt text-lg font-medium">${product.price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="p-8 h-[35%] flex flex-col">
        <p className="text-cafe-muted text-base leading-relaxed mb-6 font-medium">
            "{product.description}"
        </p>
        
        <div className="mt-auto">
            <h4 className="text-xs font-bold text-cafe-accent uppercase tracking-widest mb-3">Perfect For</h4>
            <div className="flex flex-wrap gap-2">
                {product.goodFor.map(tag => (
                <span key={tag} className="text-xs bg-cafe-surface px-3 py-1.5 rounded-lg text-cafe-espresso font-semibold border border-cafe-surfaceAlt">
                    {tag}
                </span>
                ))}
            </div>
        </div>
      </div>
    </motion.div>
  );
};
