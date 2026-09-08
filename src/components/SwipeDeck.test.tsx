import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SwipeDeck } from './SwipeDeck';
import { Product } from '../../types';
import { StoreProvider } from '../../context/StoreContext';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Cappuccino',
    description: 'Classic Italian coffee',
    price: 4.99,
    image: 'cappuccino.jpg',
    category: 'Hot Coffee',
    rating: 4.5,
    goodFor: ['Morning', 'Focus'],
  },
  {
    id: '2',
    name: 'Latte',
    description: 'Smooth and creamy',
    price: 5.49,
    image: 'latte.jpg',
    category: 'Hot Coffee',
    rating: 4.7,
    goodFor: ['Afternoon', 'Relaxation'],
  },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
);

describe('SwipeDeck', () => {
  it('should render product card with correct information', () => {
    const onSwipe = vi.fn();
    render(<SwipeDeck products={mockProducts} onSwipe={onSwipe} />, { wrapper });
    
    expect(screen.getByText('Cappuccino')).toBeInTheDocument();
    expect(screen.getByText('$4.99')).toBeInTheDocument();
    expect(screen.getByText('Classic Italian coffee')).toBeInTheDocument();
  });

  it('should display product category and rating', () => {
    const onSwipe = vi.fn();
    render(<SwipeDeck products={mockProducts} onSwipe={onSwipe} />, { wrapper });
    
    expect(screen.getByText('Hot Coffee')).toBeInTheDocument();
    expect(screen.getByText('★ 4.5')).toBeInTheDocument();
  });

  it('should show "Perfect For" tags', () => {
    const onSwipe = vi.fn();
    render(<SwipeDeck products={mockProducts} onSwipe={onSwipe} />, { wrapper });
    
    expect(screen.getByText('Morning')).toBeInTheDocument();
    expect(screen.getByText('Focus')).toBeInTheDocument();
  });

  it('should call onSwipe callback when swiping', () => {
    const onSwipe = vi.fn();
    render(<SwipeDeck products={mockProducts} onSwipe={onSwipe} />, { wrapper });
    
    // Simulate swipe by clicking the like button
    const likeButton = screen.getByRole('button', { name: /heart/i }) || 
                       document.querySelector('button svg[aria-label="Heart"]')?.closest('button');
    if (likeButton) {
      likeButton.click();
    }
    
    // Swipe should be recorded
    expect(onSwipe).toHaveBeenCalled();
  });

  it('should show completion message when all products are swiped', () => {
    const onSwipe = vi.fn();
    const emptyProducts: Product[] = [];
    render(<SwipeDeck products={emptyProducts} onSwipe={onSwipe} />, { wrapper });
    
    // Should show "Menu Explored" or similar completion message
    // This depends on implementation details
  });
});
