import express from "express";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 5000;
console.log("API KEY LOADED:", !!process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
    res.send("CampusIQ Backend is running!");
});

app.get("/api/ai-test", async (req, res) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: "Reply with exactly: CampusIQ AI is connected successfully."
        });

        res.json({
            success: true,
            message: response.text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: "Gemini AI connection failed"
        });
    }
});

app.listen(PORT, () => {
    console.log(`CampusIQ server running on http://localhost:${PORT}`);
});