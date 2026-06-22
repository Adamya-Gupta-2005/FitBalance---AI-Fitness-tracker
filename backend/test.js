import { analyzeFoodImage } from "./servives/foodAiService.js";

import fs from 'fs';

const test = async () => {
    const image = fs.readFileSync('D:/VS code/Projects/FitBalance/backend/pizzaImage.jpg');

    const result = await analyzeFoodImage(image, "image/jpeg");

    console.log(result);
}

test();