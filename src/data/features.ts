import { Eye, Target, ShieldCheck, Radar, Cpu, Crown, Zap, Lock, BarChart3, Gem, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  details: string[];
}

export const apexFeatures: Feature[] = [
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

export const commonFeatures: Feature[] = [
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "Advanced protection system for secure gameplay",
    gradient: "from-orange-500/20 to-orange-600/20",
    details: ["HWID Protection", "Memory Encryption", "Anti-Detection", "Secure Updates"]
  },
  {
    icon: Cpu,
    title: "Optimized Engine",
    description: "High performance with minimal system impact",
    gradient: "from-orange-600/20 to-orange-500/20",
    details: ["Low Latency", "Resource Efficient", "Smooth Operation", "Background Processing"]
  },
  {
    icon: Zap,
    title: "Fast Updates",
    description: "Quick updates and automatic feature adjustments",
    gradient: "from-orange-500/20 to-orange-600/20",
    details: ["Auto-Updates", "Quick Patches", "Feature Sync", "Version Control"]
  },
  {
    icon: Lock,
    title: "Secure Access",
    description: "Multi-layer security and encrypted connections",
    gradient: "from-orange-600/20 to-orange-500/20",
    details: ["Encrypted Data", "Secure Login", "Protected Sessions", "Safe Connections"]
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    description: "Real-time performance tracking and analysis",
    gradient: "from-orange-500/20 to-orange-600/20",
    details: ["Performance Stats", "Usage Metrics", "System Monitor", "Resource Tracking"]
  },
  {
    icon: Gem,
    title: "Premium Support",
    description: "24/7 dedicated support and maintenance",
    gradient: "from-orange-600/20 to-orange-500/20",
    details: ["24/7 Support", "Priority Service", "Expert Help", "Quick Response"]
  }
];