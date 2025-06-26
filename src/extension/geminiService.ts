import * as vscode from 'vscode';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyD9XB6em7BGzhGL__ULWa4sJjYcBCe0GZw';  // ✅ Replace with your Gemini API key

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function getAIResponse(userPrompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });  // ✅ You can choose 'gemini-1.5-pro' if you want

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    return text || '❌ No response from Gemini.';
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return '❌ Error fetching response from Gemini API.';
  }
}
