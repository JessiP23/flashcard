import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flashcard creator. Take the provided text and create exactly 5 flashcards, each with a one-sentence front and back. Return the result in the following JSON format: 
{
    "flashcard": [
        {
            "front": "Front of the card",
            "back": "Back of the card"
        }
    ]    
}`;

export async function POST(req) {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const data = await req.text();

        const completion = await openai.chat.completions.create({
            model: 'gpt-4', // Change to 'gpt-3.5-turbo' if faster
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: data },
            ],
        });

        const content = completion.choices[0]?.message?.content.trim();

        if (!content) {
            throw new Error('No content returned from OpenAI');
        }

        let flashcards;
        try {
            flashcards = JSON.parse(content).flashcard;
        } catch (error) {
            console.error('Error parsing JSON from OpenAI response:', error);
            return NextResponse.json({ error: 'Invalid response format from OpenAI' }, { status: 500 });
        }

        return NextResponse.json(flashcards);
    } catch (error) {
        console.error('Error in /api/generate:', error);
        return NextResponse.json({ error: 'An error occurred while generating flashcards.' }, { status: 500 });
    }
}
