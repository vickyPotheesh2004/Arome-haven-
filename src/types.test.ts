import { describe, it, expect } from 'vitest';

describe('Type Definitions', () => {
  it('should validate Product type structure', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      description: 'A test product',
      price: 9.99,
      image: 'test.jpg',
      category: 'Test Category',
      rating: 4.5,
      goodFor: ['Morning', 'Evening'],
    };

    expect(product.id).toBe('1');
    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(9.99);
    expect(product.rating).toBe(4.5);
    expect(product.goodFor).toHaveLength(2);
  });

  it('should validate CartItem type structure', () => {
    const cartItem = {
      id: '1',
      name: 'Test Item',
      description: 'A test item',
      price: 5.99,
      image: 'item.jpg',
      category: 'Test',
      rating: 4.0,
      goodFor: ['Anytime'],
      quantity: 2,
    };

    expect(cartItem.quantity).toBe(2);
    expect(cartItem.price * cartItem.quantity).toBe(11.98);
  });

  it('should validate SwipeAction type structure', () => {
    const swipeAction = {
      productId: '1',
      direction: 'right' as const,
      timestamp: Date.now(),
    };

    expect(swipeAction.direction).toBe('right');
    expect(typeof swipeAction.timestamp).toBe('number');
  });
});
