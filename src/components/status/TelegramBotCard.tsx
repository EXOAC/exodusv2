import React, { useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { TelegramBot } from '../../types/status';
import { statusConfig } from './StatusConfig';

interface TelegramBotCardProps {
  bot: TelegramBot;
}

export default function TelegramBotCard({ bot }: TelegramBotCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const config = statusConfig[bot.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        ref={cardRef}
        className="group relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex flex-col bg-black/40 border border-white/10 rounded-2xl overflow-hidden transition-all duration-200 group-hover:scale-[1.02] group-hover:-translate-y-1 group-hover:border-orange-500/30">
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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

          <div className="relative z-30 flex items-center gap-6 p-8">
            <div className={`flex items-center justify-center w-[52px] h-[52px] rounded-xl ${config.bgColor} ${config.borderColor} border transition-all duration-200 group-hover:scale-110`}>
              <MessageCircle className="w-8 h-8 text-[#229ED9]" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-medium text-white/90">{bot.name}</h3>
              <p className="text-white/60 text-sm mt-1">{bot.username}</p>
              <div className="flex items-center gap-2 mt-2">
                <StatusIcon className={`${config.iconColor} w-5 h-5`} />
                <span className={`text-base ${config.color}`}>{config.text}</span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full ${config.bgColor} ${config.borderColor} border`}>
              <span className={`text-base font-medium ${config.color}`}>{config.text}</span>
            </div>
          </div>

          <div className="relative z-30 px-8 pb-8 space-y-4">
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-sm">Last updated: {bot.lastUpdated}</span>
            </div>
            {bot.activeUsers > 0 && (
              <div className="flex items-center gap-2 text-white/60">
                <span className="text-sm">{bot.activeUsers.toLocaleString()} active users</span>
                <span className="text-xs">Count updated {bot.countUpdated}</span>
              </div>
            )}
            <a 
              href={`https://t.me/${bot.username.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2.5 bg-white/5 hover:bg-[#229ED9]/10 border border-white/10 hover:border-[#229ED9]/30 rounded-xl text-white/80 hover:text-[#229ED9] transition-all duration-200 text-center"
            >
              Open in Telegram
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}