import type { APIRoute } from 'astro';

import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: String(import.meta.env.GOOGLE_GENERATIVE_AI_API_KEY),
});

export const POST: APIRoute = async ({ request }) => {
  const { prompt }: { prompt: string } = await request.json();

  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    system: 'You are a helpful assistant.',
    prompt,
  });

  return result.toAIStreamResponse();
}