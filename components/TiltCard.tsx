import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Product } from '../types';
import { Search } from 'lucide-react';

interface TiltCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({ product, onAdd }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-[420px] w-full rounded-2xl bg-cafe-surface border border-cafe-surfaceAlt group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        style={{ transform: "translateZ(50px)" }} 
        className="absolute inset-4 rounded-xl overflow-hidden shadow-lg"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cafe-espresso/90 via-transparent to-transparent opacity-80" />
      </div>

      <div 
        style={{ transform: "translateZ(75px)" }}
        className="absolute bottom-8 left-8 right-8 text-white pointer-events-none"
      >
        <div className="flex justify-between items-end mb-2">
            <div>
                 <span className="text-xs font-bold uppercase tracking-wider bg-cafe-accent/80 px-2 py-1 rounded-md mb-2 inline-block backdrop-blur-sm">
                  {product.category}
                </span>
                <h3 className="text-2xl font-serif font-bold leading-tight">{product.name}</h3>
            </div>
            <span className="text-xl font-bold text-cafe-crema">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          {product.description}
        </p>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onAdd(product); }}
        style={{ transform: "translateZ(100px)" }}
        className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cafe-accent hover:border-cafe-accent shadow-xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
      </button>

      {/* Benefits Tags Floating */}
      <div 
        style={{ transform: "translateZ(60px)" }}
        className="absolute top-6 left-6 flex flex-col gap-2"
      >
        {product.goodFor.slice(0, 2).map((tag, i) => (
             <span key={i} className="text-[10px] font-bold bg-black/30 text-white backdrop-blur-md px-2 py-1 rounded border border-white/10 w-fit">
               {tag}
             </span>
        ))}
      </div>

    </motion.div>
  );
};
