import React, { useRef, useState } from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatusBoxProps {
  title: string;
  description: string;
  delay?: number;
}

export default function StatusBox({ title, description, delay = 0 }: StatusBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.05 }} // Faster animation and shorter delays
    >
      <div
        ref={boxRef}
        className="status-box group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Shine effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            background: isHovered
              ? `
                radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%),
                radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.08), transparent 40%),
                radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.12), transparent 40%),
                radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.15), transparent 40%)
              `
              : '',
          }}
        />

        {/* Content */}
        <motion.div
          className="status-icon-wrapper"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Shield className="status-icon" size={32} />
        </motion.div>
        <motion.h3 
          className="status-title"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {title}
        </motion.h3>
        <p className="status-description">{description}</p>
      </div>
    </motion.div>
  );
}