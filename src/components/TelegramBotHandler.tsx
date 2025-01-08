import React, { useEffect } from 'react';
import { useTelegramBot } from '../hooks/useTelegramBot';

// Example command:
// {
//   "type": "UPDATE_STATUS",
//   "productName": "Apex External",
//   "status": "detected"
// }

export default function TelegramBotHandler() {
  const { handleCommand, error } = useTelegramBot();

  useEffect(() => {
    // Example of how to handle incoming Telegram commands
    const handleTelegramMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'string') {
        handleCommand(event.data);
      }
    };

    window.addEventListener('message', handleTelegramMessage);
    return () => window.removeEventListener('message', handleTelegramMessage);
  }, [handleCommand]);

  // This is a hidden component that just handles the bot integration
  return null;
}