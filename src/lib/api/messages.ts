import axios from 'axios';
import { z } from 'zod';
import { API_URL } from '@/config/constants';
import { sendDiscordMessage } from '../services/discord';
import { sendTelegramMessage } from '../services/telegram';
import { formatForDiscord, formatForTelegram } from '../utils/messageFormatting';

const messageSchema = z.object({
  content: z.string().min(1).max(2000),
  platforms: z.array(z.enum(['discord', 'telegram'])),
  scheduledFor: z.date().optional()
});

export type Message = z.infer<typeof messageSchema>;

export async function publishMessage(message: Message) {
  const validated = messageSchema.parse(message);
  
  try {
    // Send to selected platforms
    const promises = [];
    
    if (validated.platforms.includes('discord')) {
      const discordMessage = formatForDiscord(validated.content);
      promises.push(sendDiscordMessage(discordMessage));
    }
    
    if (validated.platforms.includes('telegram')) {
      const telegramMessage = formatForTelegram(validated.content);
      promises.push(sendTelegramMessage(telegramMessage));
    }
    
    // Wait for all messages to be sent
    await Promise.all(promises);
    
    // Log the successful broadcast
    const response = await axios.post(`${API_URL}/messages`, validated);
    return response.data;
  } catch (error) {
    console.error('Failed to publish message:', error);
    throw new Error('Failed to publish message to all platforms');
  }
}

export async function getMessages(page = 1) {
  const response = await axios.get(`${API_URL}/messages?page=${page}`);
  return response.data;
}