import axios from 'axios';
import { z } from 'zod';

const discordMessageSchema = z.object({
  content: z.string().min(1).max(2000),
  username: z.string().optional(),
  avatar_url: z.string().url().optional(),
  webhook_url: z.string().url(),
  embeds: z.array(z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    color: z.number().optional(),
    fields: z.array(z.object({
      name: z.string(),
      value: z.string(),
      inline: z.boolean().optional()
    })).optional()
  })).optional()
});

export type DiscordMessage = z.infer<typeof discordMessageSchema>;

export async function sendDiscordMessage(message: DiscordMessage) {
  const validated = discordMessageSchema.parse(message);
  const { webhook_url, ...messageData } = validated;
  
  try {
    const response = await axios.post(webhook_url, messageData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Discord API Error:', error.response?.data || error.message);
    throw new Error('Failed to send Discord message');
  }
}