import model from "../config/gemini.js";

export const analyzeFoodImage = async (
    imageBuffer,
    mimeType
) => {

    const imagePart = {
        inlineData: {
            data: imageBuffer.toString("base64"),
            mimeType
        }
    };

    const prompt = `
    Analyze the food image.
    
    Return ONLY valid JSON.
    
    {
      "foodName": "",   
      "calories": 0,
      "mealType": ""
    }
    
    mealType must be one of:
    breakfast
    lunch
    snack
    dinner
    `;

    const result = await model.generateContent([
            prompt,
            imagePart
        ]);


    const response = result.response.text();
    const cleaned = response.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(cleaned);
};