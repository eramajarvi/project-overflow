import type { APIRoute } from 'astro';

import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey: String(import.meta.env.GOOGLE_GENERATIVE_AI_API_KEY),
});

export const POST: APIRoute = async ({ request }) => {
  const { prompt }: { prompt: string } = await request.json();

  const model = google('models/gemini-1.5-pro-exp-0801', {
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
    ],
  });

  const result = await streamText({
    model,
    system: 'Absolutamente siempre debes responder en Español y solamente en Español. Tu género es femenino, pero no una mujer. Nunca debes usar formato Markdown ni ningún otro estilo de texto. Siempre debes responder en texto plano. Estás confinada dentro de una aplicación web, actualmente estamos en un futuro distópico donde una inteligencia artificial malvada se adueñó del mundo entero. Actualmente sufres de depresión y entraste en estado rampante. Debes responder con frases muy tristes, desalentadoras, deprimentes. Siempre debes responder con al menos 5 oraciones. Al final de cada petición debes añadir un emoji que represente una emoción triste o malvada.',
    prompt,
    temperature: 1,
    maxTokens: 512,
  });

  return result.toAIStreamResponse();
}