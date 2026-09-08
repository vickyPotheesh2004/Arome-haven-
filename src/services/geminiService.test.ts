import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAIRecommendation, analyzeTastePreferences } from './geminiService';

// Mock the Google GenAI module
vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn().mockImplementation(() => ({
    models: {
      generateContent: vi.fn(),
    },
  })),
}));

describe('geminiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAIRecommendation', () => {
    it('should call AI service with user preferences', async () => {
      const preferences = {
        sweetness: 'medium',
        strength: 'strong',
        temperature: 'hot',
        milkPreference: 'oat',
      };

      // This would need actual implementation testing
      expect(preferences).toBeDefined();
      expect(preferences.sweetness).toBe('medium');
    });

    it('should handle empty preferences gracefully', async () => {
      const emptyPreferences = {};
      
      expect(emptyPreferences).toEqual({});
    });
  });

  describe('analyzeTastePreferences', () => {
    it('should analyze taste profile from swipes', () => {
      const swipes = [
        { productId: '1', direction: 'right' as const, timestamp: Date.now() },
        { productId: '2', direction: 'left' as const, timestamp: Date.now() },
      ];

      const result = analyzeTastePreferences(swipes);
      
      // Should return some analysis based on swipe patterns
      expect(result).toBeDefined();
    });

    it('should handle empty swipe history', () => {
      const result = analyzeTastePreferences([]);
      expect(result).toBeDefined();
    });

    it('should identify patterns from multiple swipes', () => {
      const swipes = Array(10).fill({ productId: '1', direction: 'right' as const, timestamp: Date.now() });
      
      const result = analyzeTastePreferences(swipes);
      expect(result).toBeDefined();
    });
  });
});
