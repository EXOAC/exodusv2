import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ShieldCheck, ShieldAlert, CircleDot, RefreshCw, Lock } from 'lucide-react';

export interface ProductCardProps {
  name: string;
  href: string;
  description: string;
  status: 'undetected' | 'detected' | 'testing' | 'updating' | 'closed';
  image: string;
}

export default function ProductCard({ name, href, description, status, image }: ProductCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleClick = () => {
    navigate(href);
  };

  const statusConfig = {
    undetected: {
      icon: ShieldCheck,
      text: 'Undetected',
      color: 'text-emerald-500/90',
      hoverColor: 'group-hover:text-emerald-400',
    },
    detected: {
      icon: ShieldAlert,
      text: 'Detected',
      color: 'text-red-500/90',
      hoverColor: 'group-hover:text-red-400',
    },
    testing: {
      icon: CircleDot,
      text: 'Testing',
      color: 'text-blue-500/90',
      hoverColor: 'group-hover:text-blue-400',
    },
    updating: {
      icon: RefreshCw,
      text: 'Updating',
      color: 'text-amber-500/90',
      hoverColor: 'group-hover:text-amber-400',
    },
    closed: {
      icon: Lock,
      text: 'Closed',
      color: 'text-zinc-500/90',
      hoverColor: 'group-hover:text-zinc-400',
    },
  };

  const { icon: StatusIcon, text, color, hoverColor } = statusConfig[status];

  return (
    <div className="p-1">
      <div
        ref={cardRef}
        onClick={handleClick}
        className="group relative flex flex-col h-[480px] overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Static dark background */}
        <div className="absolute inset-0 bg-[#141414] border border-white/10 group-hover:border-orange-500/50 rounded-2xl transition-colors duration-500" />
        
        {/* Dynamic light effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 rounded-2xl"
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

        {/* Image Section with status indicator */}
        <div className="relative h-64">
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent z-10" />
          <div 
            className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`} 
          />
          <img
            src={image}
            alt={`${name} Interface`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
            <div className="relative">
              <div 
                className="absolute -inset-4 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                style={{
                  background: isHovered
                    ? `radial-gradient(circle at 50% 50%, rgba(249,115,22,0.2), transparent 70%)`
                    : '',
                }}
              />
              <StatusIcon 
                className={`relative z-10 ${color} ${hoverColor} transform group-hover:scale-125 transition-all duration-500`}
                size={28}
              />
            </div>
            <span className={`text-sm font-medium ${color} ${hoverColor} transition-colors duration-300`}>
              {text}
            </span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="relative z-10 flex flex-col flex-grow p-6">
          <h3 className="text-2xl font-medium text-white/90 group-hover:text-white transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm text-zinc-400 group-hover:text-orange-500/70 transition-colors duration-300 mt-2">
            {description}
          </p>
          <div className="mt-auto">
            <div className="w-full px-4 py-2.5 bg-zinc-800/50 backdrop-blur-sm border border-white/5 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-500 text-white/90 rounded-lg transition-all duration-300 shadow-lg shadow-black/20 text-center">
              View Product
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}