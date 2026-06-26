
import model from "./config/gemini.js";

const test = async () =>{
    try{
        console.log('inside thid')
        const result = await model.generateContent("Say hello in one word");
        console.log(result.response.text());
    }catch(error){
        console.log(error)
    }
};

test();