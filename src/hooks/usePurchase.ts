import { useState } from 'react';

export function usePurchase() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = () => {
    setIsLoading(true);
  };

  return {
    isLoading,
    handlePurchase,
    closeLoader: () => setIsLoading(false)
  };
}