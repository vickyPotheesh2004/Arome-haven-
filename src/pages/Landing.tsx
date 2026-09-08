import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { THEME } from '../constants';

export const Landing: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  // 3D Hero Logic
  const heroRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
      if(!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      x.set(mouseX / width - 0.5);
      y.set(mouseY / height - 0.5);
  };
  
  const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
  };

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="absolute inset-0 bg-[#f9f4ef] z-0">
          <motion.div style={{ y: y1 }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#e7d4c5]/30 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3" />
          <motion.div style={{ y: y1 }} className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f1e0c5]/40 rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className={`${THEME.container} relative z-10 grid md:grid-cols-2 gap-16 items-center`}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 border border-cafe-surfaceAlt text-cafe-accent text-sm font-bold tracking-widest uppercase shadow-sm backdrop-blur-sm">
              Calm coffee, smart choices
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-cafe-espresso leading-[1.1]">
              Aroma <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cafe-accent to-cafe-latte">Haven</span>
            </h1>
            <p className="text-xl text-cafe-muted max-w-md leading-relaxed">
              Experience a coffee shop that feels like a deep breath. Swipe to discover your next favorite brew or let our AI guide you.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link to="/menu" className={THEME.button.primary}>
                Explore Menu
              </Link>
              <Link to="/menu?view=swipe" className={`${THEME.button.secondary} flex items-center justify-center gap-2 group`}>
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                Discovery Mode
              </Link>
            </div>
            
            <div className="flex items-center gap-8 pt-8 opacity-70">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-cafe-espresso">12+</h3>
                    <p className="text-xs uppercase tracking-wide text-cafe-muted">Artisan Blends</p>
                </div>
                <div className="w-px h-10 bg-cafe-surfaceAlt"></div>
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-cafe-espresso">AI</h3>
                    <p className="text-xs uppercase tracking-wide text-cafe-muted">Personalized</p>
                </div>
                <div className="w-px h-10 bg-cafe-surfaceAlt"></div>
                 <div className="text-center">
                    <h3 className="text-2xl font-bold text-cafe-espresso">4.9</h3>
                    <p className="text-xs uppercase tracking-wide text-cafe-muted">User Rating</p>
                </div>
            </div>
          </motion.div>
          
          <div className="relative hidden md:block perspective-1000" ref={heroRef}>
             <motion.div 
               style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
               className="relative w-full aspect-[4/5]"
             >
                <motion.div 
                    style={{ transform: "translateZ(50px)" }}
                    className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop" 
                        alt="Peaceful Coffee Shop" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-cafe-espresso/20 to-transparent mix-blend-multiply" />
                </motion.div>

                {/* Floating Elements */}
                <motion.div 
                    style={{ transform: "translateZ(100px)" }}
                    className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xs border border-white/50"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 rounded-full text-green-600">
                            <Coffee size={20} />
                        </div>
                        <span className="font-bold text-cafe-espresso">Mood Match</span>
                    </div>
                    <p className="text-sm text-cafe-muted italic">"Perfect for your rainy afternoon reading session."</p>
                </motion.div>

                <motion.div 
                    style={{ transform: "translateZ(80px)" }}
                    className="absolute top-10 -right-10 bg-cafe-espresso text-white p-4 rounded-xl shadow-xl flex items-center gap-3"
                >
                    <span className="text-2xl">✨</span>
                    <div>
                        <p className="text-xs opacity-80 uppercase tracking-wider">New Arrival</p>
                        <p className="font-bold font-serif">Golden Latte</p>
                    </div>
                </motion.div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Features Parallax */}
      <section className="py-32 bg-white relative">
        <div className={THEME.container}>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-serif font-bold text-cafe-espresso mb-6">Crafted for Tranquility</h2>
            <p className="text-cafe-muted text-lg">We combine the warmth of a traditional café with modern technology to make your coffee breaks effortless.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: <Coffee size={32} />, 
                title: "Curated Menu", 
                desc: "Hand-picked blends and calming teas designed to reset your day." 
              },
              { 
                icon: <Sparkles size={32} />, 
                title: "AI Suggestions", 
                desc: "Tell us how you feel, and we'll brew the perfect match for your mood." 
              },
              { 
                icon: <ArrowRight size={32} />, 
                title: "Swipe to Order", 
                desc: "A fun, Tinder-style way to explore new flavors and build your cart." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-10 rounded-[2rem] bg-cafe-bg border border-cafe-surfaceAlt hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-cafe-surface flex items-center justify-center text-cafe-accent mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-cafe-espresso mb-4 font-serif">{feature.title}</h3>
                <p className="text-cafe-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
