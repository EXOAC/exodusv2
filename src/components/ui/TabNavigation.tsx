import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TabButton from './TabButton';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
}

export default function TabNavigation({ activeTab, onTabChange, tabs }: TabNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeButtonWidth, setActiveButtonWidth] = useState(0);
  const [activeButtonLeft, setActiveButtonLeft] = useState(0);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeTab);
    const activeButton = buttonsRef.current[activeIndex];
    
    if (activeButton && containerRef.current) {
      setActiveButtonWidth(activeButton.offsetWidth);
      let leftPosition = 0;
      for (let i = 0; i < activeIndex; i++) {
        leftPosition += buttonsRef.current[i]?.offsetWidth || 0;
      }
      setActiveButtonLeft(leftPosition);

      // Ensure active tab is visible on mobile
      const container = containerRef.current;
      const scrollLeft = leftPosition - (container.offsetWidth - activeButton.offsetWidth) / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeTab, tabs]);

  return (
    <div className="flex justify-center mb-8 sm:mb-12 px-4 sm:px-0">
      <div className="relative max-w-full overflow-x-auto scrollbar-hide" ref={containerRef}>
        <div className="relative bg-white/5 rounded-xl p-1 inline-flex">
          <div className="flex whitespace-nowrap">
            {tabs.map((tab, index) => (
              <TabButton
                key={tab}
                active={activeTab === tab}
                onClick={() => onTabChange(tab)}
                ref={el => buttonsRef.current[index] = el}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabButton>
            ))}
            <motion.div
              className="absolute inset-y-1 bg-orange-500 rounded-lg z-0"
              layoutId="activeTab"
              transition={{ 
                type: "spring", 
                duration: 0.6,
                bounce: 0.15
              }}
              style={{
                width: activeButtonWidth,
                left: activeButtonLeft + 4,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}