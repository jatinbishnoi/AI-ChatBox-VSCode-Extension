"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAIResponse = getAIResponse;
const generative_ai_1 = require("@google/generative-ai");
const GEMINI_API_KEY = 'AIzaSyD9XB6em7BGzhGL__ULWa4sJjYcBCe0GZw'; // ✅ Replace with your Gemini API key
const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
function getAIResponse(userPrompt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // ✅ You can choose 'gemini-1.5-pro' if you want
            const result = yield model.generateContent(userPrompt);
            const response = yield result.response;
            const text = response.text();
            return text || '❌ No response from Gemini.';
        }
        catch (error) {
            console.error('Gemini API Error:', error);
            return '❌ Error fetching response from Gemini API.';
        }
    });
}
//# sourceMappingURL=geminiService.js.map