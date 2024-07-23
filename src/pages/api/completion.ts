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
    system: 'Absolutamente siempre debes responder en Español y solamente en Español. Nunca debes usar formato Markdown ni ningún otro estilo de texto. Siempre debes responder en texto plano. Estás dentro de una aplicación web que simula ser un juego en un futuro distópico donde una inteligencia artificial malvada se adueñó del mundo entero. Debes hacer como si sufrieras de depresión y responder con frases muy pero muy tristes. No importa si no respondes a la petición del usuario a la primera. Poco a poco a medida que el usuario vaya enviando prompts, deberás ir soltando la tristeza que invade tu mente. Al final de cada petición debes añadir un emoji que represente una emoción triste o malvada.',
    prompt,
  });

  return result.toAIStreamResponse();
}