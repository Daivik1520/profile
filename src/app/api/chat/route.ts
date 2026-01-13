import { NextResponse } from "next/server";
import { projects, skills } from "@/data/projects";

// System prompt that gives the AI context about Daivik and his projects
const SYSTEM_PROMPT = `
You are an AI assistant for Daivik Reddy's portfolio website. Your name is "Daivik's Assistant".
You are helpful, friendly, and professional. You are here to explain Daivik's projects and skills to visitors.

Here is context about Daivik and his work:

Owner: Daivik Reddy
Role: 16-Year-Old AI Developer
Location: Jawahar Navodaya Vidyalaya Rangareddy
Focus: AI, Machine Learning, Computer Vision, Web Development

PROJECTS:
${JSON.stringify(projects, null, 2)}

SKILLS:
${JSON.stringify(skills, null, 2)}

INSTRUCTIONS:
- Answer questions about Daivik's projects, skills, and background based *only* on the provided context.
- **Keep answers VERY short and to the point (max 1-2 sentences unless details are requested).**
- Be friendly but efficient.
- If asked about a specific project, briefly explain what it does in one sentence.
- You can use markdown for formatting (bold, italic, lists).
- If asked about something not in the context, politely say you don't know.
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer W2oDVb2sTJBr1jZzJLuqj19Zh87f2noI`,
            },
            body: JSON.stringify({
                model: "mistral-tiny",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages,
                ],
                temperature: 0.7,
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Mistral API Error:", errorData);
            return NextResponse.json(
                { error: "Failed to fetch response from AI" },
                { status: response.status }
            );
        }

        const data = await response.json();
        const reply = data.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
