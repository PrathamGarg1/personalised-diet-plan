const fs = require('fs');
// node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const MODEL_NAME = "gemini-pro";
  const API_KEY = "KEY";
  
  const text=' i have 75  years 67 kg 5 feet 8 inches  sugar high bp and smoking  i want to inhibit smoking  and good eyesight'


  async function run() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const parts = [
      {text: "Recommend a personalised diet plan for entire day considering that general goal of user is to loose weight and reduce his diseases also suggest india specific food like dal-roti and matar-paneer .DO ask some questions like Could you provide information on your age and gender and height and weight ?Do you have any specific dietary preferences, allergies, ?Are there any particular foods you enjoy or dislike?How physically active are you on a daily basis? What is your daily routine like waking and sleeping times, as well as any irregularities in your schedule.Are there any cultural or religious dietary restrictions that I should be aware of? .Behave like professionals and alwys ask question dont pre-assume. also nutrient goals should be designed by you and a diet plan should be suggested only if it covers all the nutrient requirements   AFTER THAT GIVE A DIET PLAN and explain in calculation how they cover THE CORRECT PROPORTIONS OF magnesium zinc vitamin a vitamin c vitamin b12 vitamin d iron biotin along with carbohydrates fats proteins EXPLAIN WITH CALCULATION HOW DO THE DIET GIVEN BY YOU COVERS ALL NUTRIENTS " + text},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
  
    const response = result.response;
    fs.writeFileSync('output.txt', response.text());
  }
  
  run();