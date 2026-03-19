import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  console.log("Generating mascot...");
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: 'A high-quality 3D render of a futuristic rabbit mascot for a tech startup. The rabbit is wearing a sleek dark blue and white sci-fi suit with glowing cyan neon accents and a high-tech visor. It is floating dynamically. Professional studio lighting, clean white background, 8k resolution, highly detailed, centered.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: "1K"
      }
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      const base64Data = part.inlineData.data;
      fs.mkdirSync('./public', { recursive: true });
      fs.writeFileSync('./public/mascot.png', Buffer.from(base64Data, 'base64'));
      console.log('Mascot generated and saved to ./public/mascot.png');
      return;
    }
  }
  console.log("No image data found in response.");
}

main().catch(console.error);
