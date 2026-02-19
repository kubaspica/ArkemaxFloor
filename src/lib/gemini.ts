import { GoogleGenAI } from "@google/genai";

export const getAI = () => {
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

export const MODELS = {
  chat: "gemini-3.1-pro-preview",
  image: "gemini-2.5-flash-image",
};
