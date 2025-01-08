import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  openItem: string | null;
  onToggle: (question: string) => void;
}

export default function FaqAccordion({ items, openItem, onToggle }: FaqAccordionProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {items.map((item) => {
        const isOpen = openItem === item.question;
        
        return (
          <div
            key={item.question}
            className="w-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-orange-500/30 rounded-2xl overflow-hidden transition-colors duration-300"
          >
            <button
              onClick={() => onToggle(item.question)}
              className="w-full text-left p-6 flex justify-between items-center"
            >
              <h3 className="text-lg font-medium text-white/90">{item.question}</h3>
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown className="w-5 h-5 text-orange-500" />
              </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.3, ease: "easeInOut" }
                    }
                  }}
                  exit={{ 
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.3, ease: "easeInOut" }
                    }
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-white/60">{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}