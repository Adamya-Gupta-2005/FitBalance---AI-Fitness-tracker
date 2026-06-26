import model from "../config/gemini.js";

export const analyzeFoodImage = async (imageBuffer, mimeType) => {

    const imagePart = {
        inlineData: {
            data: imageBuffer.toString("base64"),
            mimeType
        }
    };

    const prompt = `
        Analyze this food image.

        Estimate calories for ONE serving.

        Return ONLY valid JSON.

        {
            "foodName":"",
            "calories":0
        }

        Rules:
        - foodName must be generic.
        - Maximum TWO words.
        - Examples:
        Pizza
        Burger
        French Fries
        Fried Rice
        Chicken Curry
        Apple
        Banana
        Noodles
        Sandwich

        No explanation.
        No markdown.
        Only JSON.
        `;

    const result = await model.generateContent([prompt, imagePart]);

    const text = result.response.text();

    const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);
};