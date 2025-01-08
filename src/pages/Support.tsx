import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import ExternalLink from '../components/ui/ExternalLink';

export default function Support() {
  const supportLinks = [
    {
      name: 'Discord',
      icon: MessageCircle,
      href: 'https://dsc.gg/exoac',
      color: '#5865F2',
      description: 'Quick Community and Staff Support based on GMT time zone'
    },
    {
      name: 'Telegram',
      icon: Send,
      href: 'https://t.me/exodusfun',
      color: '#229ED9',
      description: 'Direct Support Channel based on GMT time zone'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gradient mb-4">Support</h1>
          <p className="text-white/60">Get help from our dedicated support team</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {supportLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ExternalLink
                href={link.href}
                className="block group"
              >
                <div 
                  className="aspect-square bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-orange-500/30"
                  style={{
                    background: `radial-gradient(circle at center, ${link.color}10, transparent)`
                  }}
                >
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div 
                      className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${link.color}20` }}
                    >
                      <link.icon 
                        className="w-12 h-12 transition-colors duration-300"
                        style={{ color: link.color }}
                      />
                    </div>
                    
                    <h2 className="text-2xl font-medium text-white/90 mb-2 transition-colors duration-300 group-hover:text-orange-500">
                      {link.name}
                    </h2>
                    
                    <p className="text-white/60 transition-colors duration-300 group-hover:text-white/70">
                      {link.description}
                    </p>
                  </div>
                </div>
              </ExternalLink>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}