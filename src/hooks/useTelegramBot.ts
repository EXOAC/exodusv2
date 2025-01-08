import { useState, useCallback } from 'react';
import { ProductStatus } from '../types/status';
import { useStatus } from '../context/StatusContext';
import { processTelegramCommand } from '../utils/telegramBot';

export function useTelegramBot() {
  const [error, setError] = useState<string | null>(null);
  const { updateProductStatus } = useStatus();

  const handleCommand = useCallback((command: string) => {
    setError(null);
    try {
      const success = processTelegramCommand(command, updateProductStatus);
      if (!success) {
        setError('Invalid command format');
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      return false;
    }
  }, [updateProductStatus]);

  return {
    error,
    handleCommand
  };
}