import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Eye, Target, ShieldCheck, Radar, Cpu, Crown } from 'lucide-react';
import ScrollHint from '../components/ScrollHint';
import { MediaGallery } from '../components/video/MediaGallery';
import ExternalLink from '../components/ui/ExternalLink';

const features = [
  {
    icon: Eye,
    title: "Advanced ESP",
    description: "See through walls with customizable filters and real-time information display",
    gradient: "from-orange-500/20 to-orange-600/20",
    details: ["Player Position", "Health Status", "Equipment Info", "Distance Tracking"]
  },
  {
    icon: Target,
    title: "Precision Aimbot",
    description: "State-of-the-art targeting system with customizable parameters",
    gradient: "from-orange-600/20 to-orange-500/20",
    details: ["Smart Targeting", "Customizable FOV", "Smooth Aim", "Prediction System"]
  },
  {
    icon: ShieldCheck,
    title: "Undetectable",
    description: "Advanced protection system keeps your account safe",
    gradient: "from-orange-500/20 to-orange-600/20",
    details: ["HWID Spoofer", "Memory Protection", "Signature Bypass", "Auto-Updates"]
  },
  {
    icon: Radar,
    title: "Radar System",
    description: "Real-time position tracking and movement prediction",
    gradient: "from-orange-600/20 to-orange-500/20",
    details: ["2D Radar", "Sound ESP", "Movement Tracking", "Team Positions"]
  },
  {
    icon: Cpu,
    title: "Performance",
    description: "Zero impact on your game's performance",
    gradient: "from-orange-500/20 to-orange-600/20",
    details: ["No FPS Drop", "Low Memory Usage", "Optimized Code", "Smooth Experience"]
  },
  {
    icon: Crown,
    title: "Premium Support",
    description: "24/7 customer support and regular updates",
    gradient: "from-orange-600/20 to-orange-500/20",
    details: ["Discord Support", "Video Guides", "Regular Updates", "Priority Service"]
  }
];

const showcaseItems = [
  {
    title: "Apex Legends Showcase",
    description: "Experience seamless integration and superior performance",
    media: [
      {
        type: 'video' as const,
        url: 'https://youtu.be/YUvGjdWVCrw'
      },
      {
        type: 'image' as const,
        url: 'https://imgur.com/UuZHXyo.jpg'
      }
    ]
  },
  {
    title: "EFT Advanced Features",
    description: "Discover our cutting-edge technology in action",
    media: [
      {
        type: 'video' as const,
        url: 'https://youtu.be/pBkpHgDdcps'
      },
      {
        type: 'image' as const,
        url: 'https://imgur.com/1oof4SL.jpg'
      }
    ]
  },
  {
    title: "Fortnite Gameplay",
    description: "See how our tools enhance your gaming experience",
    media: [
      {
        type: 'video' as const,
        url: 'https://youtu.be/YUvGjdWVCrw'
      },
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&q=80&w=2340&h=1200'
      }
    ]
  },
  {
    title: "Rust Demonstration",
    description: "Watch our advanced features at work",
    media: [
      {
        type: 'video' as const,
        url: 'https://youtu.be/YUvGjdWVCrw'
      },
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2340&h=1200'
      }
    ]
  }
];

function FeatureBox({ feature, index }: { feature: typeof features[0], index: number }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

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
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <div
        ref={boxRef}
        className="group relative flex flex-col bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-orange-500/30"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
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

        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
          <feature.icon className="w-6 h-6 text-orange-500/70" />
        </div>
        
        <h3 className="text-xl font-medium text-white/90 mb-2">{feature.title}</h3>
        <p className="text-white/60 mb-4">{feature.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mt-auto">
          {feature.details.map((detail, i) => (
            <div
              key={i}
              className="px-3 py-1.5 bg-white/5 rounded-lg text-sm text-white/70 transition-colors duration-300 group-hover:bg-orange-500/10 group-hover:text-orange-500/90"
            >
              {detail}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ShowcaseItem({ item, index }: { item: typeof showcaseItems[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="w-full"
    >
      <div className="group relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-orange-500/30">
        <MediaGallery items={item.media.map(m => ({ type: m.type, url: m.url }))} />
        
        <div className="p-6">
          <h3 className="text-xl font-medium text-white/90 mb-2 group-hover:text-orange-500 transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-white/60 group-hover:text-white/70 transition-colors duration-300">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <main className="flex-grow pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <h1 className="relative text-gradient text-5xl font-bold mb-4 animate-title px-6 py-3 rounded-xl bg-black/50 backdrop-blur-sm border border-orange-500/20">
            Welcome to Exodus Project
          </h1>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl text-orange-500/80 animate-float mb-8"
        >
          Here we work for quality and customer satisfaction
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-white/90 max-w-3xl mx-auto mb-12"
        >
          Elevate your gaming experience with our premium tools. Gain the competitive edge with advanced features and undetectable technology.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-4 mb-20"
        >
          <ExternalLink 
            href="https://dsc.gg/exoac"
            className="group relative px-8 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 via-orange-600/80 to-orange-500/80 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-500 transition-opacity"
              style={{
                background: `
                  linear-gradient(
                    45deg,
                    transparent 25%,
                    rgba(255,255,255,0.1) 50%,
                    transparent 75%
                  )
                `,
                backgroundSize: '200% 200%',
                animation: 'shine 3s linear infinite',
              }}
            />
            
            <div className="relative flex items-center gap-2 text-white transform group-hover:scale-[1.02] transition-transform duration-300">
              <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium tracking-wide">Join Discord</span>
            </div>
          </ExternalLink>

          <button 
            onClick={scrollToFeatures}
            className="px-8 py-3 bg-black/50 hover:bg-black/70 text-white border border-orange-500/20 hover:border-orange-500/50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10"
          >
            Explore Features
          </button>
        </motion.div>

        <ScrollHint />

        {/* Features Grid */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 scroll-mt-32">
          {features.map((feature, index) => (
            <FeatureBox key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Video Showcases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseItems.map((item, index) => (
            <ShowcaseItem key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}