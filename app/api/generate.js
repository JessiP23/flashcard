import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long. You should return in the following JSON format: 
{
    "flashcard": [
        {
            "front": "Front of the card",
            "back": "Back of the card"
        }
    ]    
}`


export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: data },
        ],
    });

    const content = completion.choices[0].message.content.trim();
        let flashcards;

        // Try to parse the response, log any errors
        try {
            flashcards = JSON.parse(content).flashcard;
        } catch (error) {
            console.error('Error parsing JSON from OpenAI response:', error);
            return NextResponse.json({ error: 'Invalid response format from OpenAI' }, { status: 500 });
        }

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards)
}