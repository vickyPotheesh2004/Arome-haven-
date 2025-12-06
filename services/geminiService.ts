import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from '../constants';
import { Product } from '../types';

// Initialize Gemini Client
// Note: In a real production app, calls should go through a backend to protect the API key.
// Since this is a client-side demo, we use the env variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDrinkSuggestion = async (
  context: string,
  likedProducts: string[] = []
): Promise<{ product: Product | null; reason: string }> => {
  try {
    const productList = PRODUCTS.map(p => `${p.id}: ${p.name} (${p.category}) - ${p.description}`).join('\n');
    const likedNames = PRODUCTS.filter(p => likedProducts.includes(p.id)).map(p => p.name).join(', ');

    const prompt = `
      You are a barista at Aroma Haven, a calm coffee shop.
      Here is our menu:
      ${productList}

      The customer is feeling: "${context}".
      ${likedNames ? `They previously liked: ${likedNames}.` : ''}

      Recommend ONE single drink from the menu that fits their mood best.
      Return the ID of the product and a short, soothing 1-sentence reason why.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productId: { type: Type.STRING },
            reason: { type: Type.STRING },
          },
          required: ["productId", "reason"]
        }
      }
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(response.text);
    const recommendedProduct = PRODUCTS.find(p => p.id === result.productId);

    return {
      product: recommendedProduct || null,
      reason: result.reason || "We think you'll love this choice."
    };

  } catch (error) {
    console.error("AI Suggestion Error:", error);
    // Fallback
    const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    return {
      product: randomProduct,
      reason: "It's a house favorite that never disappoints."
    };
  }
};
