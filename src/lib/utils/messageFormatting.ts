import { DiscordMessage } from '../services/discord';
import { TelegramMessage } from '../services/telegram';

export function formatForDiscord(content: string): DiscordMessage {
  return {
    content,
    username: 'Status Bot',
    avatar_url: 'https://imgur.com/iC4dzF4.png',
    webhook_url: process.env.DISCORD_WEBHOOK_URL || ''
  };
}

export function formatForTelegram(content: string): TelegramMessage {
  return {
    text: content,
    parse_mode: 'Markdown',
    disable_web_page_preview: false,
    bot_token: process.env.TELEGRAM_BOT_TOKEN || '',
    chat_id: process.env.TELEGRAM_CHANNEL_ID || ''
  };
}