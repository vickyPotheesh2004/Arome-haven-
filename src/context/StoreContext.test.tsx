import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { StoreProvider, useStore } from './StoreContext';
import { Product } from '../../types';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
);

const mockProduct: Product = {
  id: '1',
  name: 'Test Coffee',
  description: 'A test coffee',
  price: 5.99,
  image: 'test.jpg',
  category: 'Hot Coffee',
  rating: 4.5,
  goodFor: ['Morning', 'Focus'],
};

describe('StoreContext', () => {
  beforeEach(() => {
    // Reset state between tests if needed
  });

  describe('cart operations', () => {
    it('should initialize with empty cart', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      expect(result.current.cart).toEqual([]);
      expect(result.current.cartCount).toBe(0);
      expect(result.current.cartTotal).toBe(0);
    });

    it('should add item to cart', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      act(() => {
        result.current.addToCart(mockProduct);
      });
      
      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0].id).toBe('1');
      expect(result.current.cart[0].quantity).toBe(1);
      expect(result.current.cartCount).toBe(1);
      expect(result.current.cartTotal).toBe(5.99);
    });

    it('should increase quantity when adding same item', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      act(() => {
        result.current.addToCart(mockProduct);
        result.current.addToCart(mockProduct);
      });
      
      expect(result.current.cart).toHaveLength(1);
      expect(result.current.cart[0].quantity).toBe(2);
      expect(result.current.cartCount).toBe(2);
      expect(result.current.cartTotal).toBe(11.98);
    });

    it('should remove item from cart', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      act(() => {
        result.current.addToCart(mockProduct);
      });
      
      expect(result.current.cart).toHaveLength(1);
      
      act(() => {
        result.current.removeFromCart('1');
      });
      
      expect(result.current.cart).toEqual([]);
      expect(result.current.cartCount).toBe(0);
    });

    it('should update item quantity', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      act(() => {
        result.current.addToCart(mockProduct);
      });
      
      act(() => {
        result.current.updateQuantity('1', 2);
      });
      
      expect(result.current.cart[0].quantity).toBe(3);
      
      act(() => {
        result.current.updateQuantity('1', -1);
      });
      
      expect(result.current.cart[0].quantity).toBe(2);
    });

    it('should remove item when quantity reaches zero', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      act(() => {
        result.current.addToCart(mockProduct);
      });
      
      act(() => {
        result.current.updateQuantity('1', -1);
      });
      
      expect(result.current.cart).toEqual([]);
    });
  });

  describe('cart state', () => {
    it('should toggle cart open state', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      expect(result.current.isCartOpen).toBe(false);
      
      act(() => {
        result.current.setIsCartOpen(true);
      });
      
      expect(result.current.isCartOpen).toBe(true);
      
      act(() => {
        result.current.setIsCartOpen(false);
      });
      
      expect(result.current.isCartOpen).toBe(false);
    });

    it('should open cart when adding item', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      expect(result.current.isCartOpen).toBe(false);
      
      act(() => {
        result.current.addToCart(mockProduct);
      });
      
      expect(result.current.isCartOpen).toBe(true);
    });
  });

  describe('swipe tracking', () => {
    it('should initialize with empty swipes', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      expect(result.current.swipes).toEqual([]);
    });

    it('should record right swipe', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      act(() => {
        result.current.recordSwipe('1', 'right');
      });
      
      expect(result.current.swipes).toHaveLength(1);
      expect(result.current.swipes[0].productId).toBe('1');
      expect(result.current.swipes[0].direction).toBe('right');
    });

    it('should record left swipe', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      act(() => {
        result.current.recordSwipe('1', 'left');
      });
      
      expect(result.current.swipes).toHaveLength(1);
      expect(result.current.swipes[0].direction).toBe('left');
    });

    it('should track multiple swipes', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      act(() => {
        result.current.recordSwipe('1', 'right');
        result.current.recordSwipe('2', 'left');
        result.current.recordSwipe('3', 'right');
      });
      
      expect(result.current.swipes).toHaveLength(3);
    });
  });

  describe('cart total calculation', () => {
    it('should calculate correct total for multiple items', () => {
      const { result } = renderHook(() => useStore(), { wrapper });
      
      const product1: Product = { ...mockProduct, id: '1', price: 10.00 };
      const product2: Product = { ...mockProduct, id: '2', price: 15.00 };
      
      act(() => {
        result.current.addToCart(product1);
        result.current.addToCart(product2);
        result.current.addToCart(product1); // Add first product again
      });
      
      expect(result.current.cartCount).toBe(3);
      expect(result.current.cartTotal).toBe(35.00); // 10 + 15 + 10
    });
  });
});
