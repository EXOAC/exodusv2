import axios from 'axios';
import { z } from 'zod';

const telegramMessageSchema = z.object({
  text: z.string().min(1),
  parse_mode: z.enum(['Markdown', 'HTML']).optional(),
  disable_web_page_preview: z.boolean().optional(),
  disable_notification: z.boolean().optional(),
  bot_token: z.string(),
  chat_id: z.string()
});

export type TelegramMessage = z.infer<typeof telegramMessageSchema>;

export async function sendTelegramMessage(message: TelegramMessage) {
  const validated = telegramMessageSchema.parse(message);
  const { bot_token, chat_id, ...messageData } = validated;
  
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${bot_token}/sendMessage`,
      {
        chat_id,
        ...messageData
      }
    );
    return response.data;
  } catch (error) {
    console.error('Telegram API Error:', error.response?.data || error.message);
    throw new Error('Failed to send Telegram message');
  }
}