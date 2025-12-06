import React, { useState, useEffect } from 'react';
import { LayoutGrid, GalleryHorizontalEnd, Sparkles } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, THEME } from '../constants';
import { Product, ViewMode } from '../types';
import { SwipeDeck } from '../components/SwipeDeck';
import { TiltCard } from '../components/TiltCard';
import { useStore } from '../context/StoreContext';
import { getDrinkSuggestion } from '../services/geminiService';

export const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialView = searchParams.get('view') === 'swipe' ? ViewMode.SWIPE : ViewMode.GRID;
  
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [filter, setFilter] = useState('all');
  const [products] = useState<Product[]>(PRODUCTS);
  const { addToCart, recordSwipe } = useStore();
  
  // AI Suggestion State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [suggestion, setSuggestion] = useState<{product: Product | null, reason: string} | null>(null);

  useEffect(() => {
    if (viewMode === ViewMode.SWIPE) {
        setSearchParams({ view: 'swipe' });
    } else {
        setSearchParams({});
    }
  }, [viewMode, setSearchParams]);

  const filteredProducts = products.filter(p => filter === 'all' || p.category === filter);

  const handleAiSuggest = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setSuggestion(null);
    const result = await getDrinkSuggestion(aiPrompt);
    setSuggestion(result);
    setIsAiLoading(false);
  };

  return (
    <div className={`min-h-screen pt-24 pb-20 ${THEME.container}`}>
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
        <div className="max-w-xl">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold text-cafe-espresso mb-4 leading-tight"
          >
            Curated <br/> <span className="text-cafe-accent italic">Moments</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-cafe-muted text-lg"
          >
            Explore our artisanal selection designed to match your mood, from energetic mornings to mindful evenings.
          </motion.p>
        </div>

        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-cafe-surfaceAlt">
           <button 
             onClick={() => setViewMode(ViewMode.GRID)}
             className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${viewMode === ViewMode.GRID ? 'bg-cafe-espresso text-white shadow-lg transform scale-105' : 'text-cafe-muted hover:bg-cafe-surface'}`}
           >
             <LayoutGrid size={18} />
             <span className="font-medium">Grid</span>
           </button>
           <button 
             onClick={() => setViewMode(ViewMode.SWIPE)}
             className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${viewMode === ViewMode.SWIPE ? 'bg-cafe-accent text-white shadow-lg transform scale-105' : 'text-cafe-muted hover:bg-cafe-surface'}`}
           >
             <GalleryHorizontalEnd size={18} />
             <span className="font-medium">Discovery</span>
           </button>
        </div>
      </div>

      {/* AI Suggestion Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16 bg-gradient-to-br from-white to-cafe-surface p-1 rounded-3xl shadow-sm border border-cafe-surfaceAlt/50"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-[20px] p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 mb-3 text-cafe-accent font-semibold uppercase tracking-wider text-xs">
                        <Sparkles size={14} />
                        <span>AI Barista</span>
                    </div>
                    <div className="flex gap-4">
                        <input 
                            type="text" 
                            placeholder="How are you feeling today? (e.g., 'I need a cozy hug' or 'Focus mode')"
                            className="flex-1 bg-cafe-bg border border-cafe-surfaceAlt rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cafe-latte transition-all placeholder:text-cafe-muted/50 text-cafe-espresso"
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAiSuggest()}
                        />
                        <button 
                            onClick={handleAiSuggest}
                            disabled={isAiLoading || !aiPrompt}
                            className={`${THEME.button.primary} whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isAiLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-75" />
                                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
                                </span>
                            ) : 'Suggest'}
                        </button>
                    </div>
                </div>
            </div>
            
            <AnimatePresence>
                {suggestion && suggestion.product && (
                <motion.div 
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                >
                    <div className="p-4 bg-green-50/50 rounded-2xl border border-green-100 flex flex-col md:flex-row gap-6 items-center">
                        <img src={suggestion.product.image} alt={suggestion.product.name} className="w-24 h-24 rounded-xl object-cover shadow-md" />
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="font-serif font-bold text-cafe-espresso text-xl mb-1">
                                We recommend: <span className="text-cafe-accent">{suggestion.product.name}</span>
                            </h3>
                            <p className="text-cafe-muted mb-4 max-w-2xl">{suggestion.reason}</p>
                            <button 
                                onClick={() => addToCart(suggestion.product!)}
                                className="text-sm font-bold text-white bg-cafe-accent px-4 py-2 rounded-lg hover:bg-cafe-espresso transition-colors"
                            >
                                Add to Order &mdash; ${suggestion.product.price}
                            </button>
                        </div>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
      </motion.div>

      {/* Categories */}
      {viewMode === ViewMode.GRID && (
        <div className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar justify-start md:justify-center">
          {['all', 'coffee', 'tea', 'cold', 'dessert'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full capitalize whitespace-nowrap transition-all duration-300 font-medium ${filter === cat ? 'bg-cafe-espresso text-white shadow-md transform scale-105' : 'bg-white text-cafe-muted hover:bg-cafe-surface border border-transparent hover:border-cafe-surfaceAlt'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {viewMode === ViewMode.SWIPE ? (
            <motion.div 
                key="swipe"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="py-6"
            >
            <SwipeDeck 
                products={filteredProducts} 
                onSwipe={(p, dir) => recordSwipe(p.id, dir)} 
            />
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-cafe-muted mt-12 text-sm font-medium tracking-wide uppercase"
            >
                Swipe Right to Love • Swipe Left to Pass
            </motion.p>
            </motion.div>
        ) : (
            <motion.div 
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2"
            >
            {filteredProducts.map((product) => (
               <TiltCard key={product.id} product={product} onAdd={addToCart} />
            ))}
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
