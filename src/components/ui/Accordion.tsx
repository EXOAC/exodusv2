import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItemProps {
  title: string;
  icon: LucideIcon;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

export const AccordionItem = ({ title, icon: Icon, content, isOpen, onClick }: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      ref={contentRef}
      className="group border-b border-white/10 last:border-b-0"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onClick}
        className="relative w-full px-6 py-4 flex items-center justify-between text-left transition-all duration-300"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: isHovered
              ? `
                radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.06), transparent 40%),
                radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.08), transparent 40%),
                radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.12), transparent 40%),
                radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.15), transparent 40%)
              `
              : '',
          }}
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="text-orange-500 transition-transform duration-300 group-hover:scale-110">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-lg font-medium text-white/90 group-hover:text-orange-500 transition-colors duration-300">
            {title}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-orange-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="px-6 py-4 text-white/80"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AccordionProps {
  items: {
    icon: LucideIcon;
    title: string;
    content: string;
  }[];
}

export const Accordion = ({ items }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          {...item}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};