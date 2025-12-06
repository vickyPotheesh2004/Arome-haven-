import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Espresso Romano',
    category: 'coffee',
    price: 3.50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1610889556284-886f4575850e?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Single Origin Espresso', 'Candied Lemon Peel', 'Sparkling Water Side'],
    goodFor: ['Focus', 'Morning Kick'],
    description: 'A awakening ritual. Bright, zesty espresso kissed with lemon oil to highlight citrus notes, served with a palate-cleansing sparkling water.'
  },
  {
    id: '2',
    name: 'Honey Lavender Latte',
    category: 'coffee',
    price: 5.50,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Blonde Espresso', 'Steamed Oat Milk', 'Wildflower Honey', 'Dried Lavender'],
    goodFor: ['Relaxation', 'Stress Relief'],
    description: 'A hug in a mug. Floral lavender buds steeped in warm oat milk and sweetened with raw honey create a gentle, soothing escape.'
  },
  {
    id: '3',
    name: 'Cold Brew Tonic',
    category: 'cold',
    price: 4.75,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['24hr Cold Brew', 'Botanical Tonic', 'Rosemary Sprig', 'Grapefruit'],
    goodFor: ['Refreshment', 'Summer Vibes'],
    description: 'Effervescent and bold. The bitterness of cold brew dances with the botanical sweetness of tonic, finished with aromatic rosemary.'
  },
  {
    id: '4',
    name: 'Ceremonial Matcha',
    category: 'tea',
    price: 5.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1515823664972-6d90e8ed9e94?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Ceremonial Grade Matcha', 'Hot Water', 'Bamboo Whisked'],
    goodFor: ['Mindfulness', 'Zen'],
    description: 'Pure, umami-rich vibrant green tea whisked to a frothy perfection. A traditional experience for clarity and calm.'
  },
  {
    id: '5',
    name: 'Salted Caramel Macchiato',
    category: 'coffee',
    price: 5.25,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1485808191679-5f8c7c97a366?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Espresso', 'Vanilla Milk', 'Salted Caramel Drizzle', 'Sea Salt'],
    goodFor: ['Indulgence', 'Sweet Tooth'],
    description: 'Layers of velvety vanilla milk marked by rich espresso, topped with a crosshatch of buttery salted caramel.'
  },
  {
    id: '6',
    name: 'Oat Flat White',
    category: 'coffee',
    price: 4.50,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Ristretto Shots', 'Microfoam Oat Milk'],
    goodFor: ['Dairy-Free', 'Smoothness'],
    description: 'The texture king. Silky, micro-foamed oat milk poured freely over double ristretto shots for a nutty, creamy profile.'
  },
  {
    id: '7',
    name: 'Spiced Chai Latte',
    category: 'tea',
    price: 4.95,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231844f74?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Black Tea', 'Cardamom', 'Cinnamon', 'Ginger', 'Steamed Milk'],
    goodFor: ['Warmth', 'Cozy Days'],
    description: 'A spicy, warming blanket. Authentic masala chai spices simmered with black tea and stretched with creamy milk.'
  },
  {
    id: '8',
    name: 'Classic Affogato',
    category: 'dessert',
    price: 6.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Hot Espresso', 'Madagascan Vanilla Gelato'],
    goodFor: ['Treat', 'After Dinner'],
    description: 'The perfect hot-cold contrast. Intense hot espresso poured over a scoop of cold, speckled vanilla bean gelato.'
  },
  {
    id: '9',
    name: 'Golden Turmeric Latte',
    category: 'tea',
    price: 5.50,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1605692676228-e4eb245b7367?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Turmeric Root', 'Ginger', 'Black Pepper', 'Coconut Milk'],
    goodFor: ['Immunity', 'Healing'],
    description: 'Sunshine in a cup. A caffeine-free anti-inflammatory blend of earthy turmeric and spicy ginger in creamy coconut milk.'
  },
  {
    id: '10',
    name: 'Rose & Cardamom Cortado',
    category: 'coffee',
    price: 4.75,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Espresso', 'Rose Water', 'Cardamom Pods', 'Equal Parts Milk'],
    goodFor: ['Romance', 'Sophistication'],
    description: 'Exotic and floral. The boldness of espresso cut with equal parts milk, infused with romantic rose and aromatic cardamom.'
  },
  {
    id: '11',
    name: 'Blueberry Hibiscus Iced Tea',
    category: 'cold',
    price: 4.25,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Hibiscus Flower', 'Dried Blueberries', 'Mint', 'Ice'],
    goodFor: ['Hydration', 'Detox'],
    description: 'Vibrant ruby red. Tart hibiscus notes balanced by sweet blueberries and cooling mint, served ice cold.'
  },
  {
    id: '12',
    name: 'Maple Pecan Cold Foam',
    category: 'cold',
    price: 5.75,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop',
    ingredients: ['Cold Brew', 'Maple Syrup', 'Pecan Extract', 'Sweet Cream'],
    goodFor: ['Autumn', 'Comfort'],
    description: 'Nutty and velvety. Smooth cold brew topped with a thick layer of maple-pecan infused sweet cream foam.'
  }
];

export const THEME = {
  container: 'max-w-6xl mx-auto px-4 md:px-6',
  card: 'bg-cafe-surface rounded-2xl border border-cafe-surfaceAlt shadow-[0_8px_30px_rgb(0,0,0,0.04)]',
  button: {
    primary: 'bg-cafe-espresso text-cafe-bg px-6 py-3 rounded-full font-medium shadow-[0_4px_14px_0_rgba(92,59,38,0.39)] hover:shadow-[0_6px_20px_rgba(92,59,38,0.23)] hover:-translate-y-0.5 transition-all active:scale-95',
    secondary: 'bg-cafe-surfaceAlt text-cafe-espresso px-6 py-3 rounded-full font-medium hover:bg-[#dcc3b0] transition-colors active:scale-95',
    icon: 'p-3 rounded-full bg-cafe-surfaceAlt text-cafe-espresso hover:bg-cafe-latte hover:text-white transition-colors shadow-sm'
  }
};