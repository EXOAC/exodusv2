import { useState, useEffect } from 'react';

export function useTouchInteraction() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    const touchDevice = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0;
    
    setIsTouchDevice(touchDevice);
  }, []);

  const handleTouchFeedback = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Subtle haptic feedback
    }
  };

  return {
    isTouchDevice,
    handleTouchFeedback
  };
}