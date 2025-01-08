import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import FeatureGrid from './FeatureGrid';
import { Accordion } from './Accordion';
import VideoPlayer from './VideoPlayer';
import RichContent from './RichContent';
import CommonIssues from './CommonIssues';
import SetupInstructions from './SetupInstructions';
import type { LucideIcon } from 'lucide-react';

interface TabContentProps {
  activeTab: string;
  features: {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: string;
    details: string[];
  }[];
  setupInstructions: {
    icon: LucideIcon;
    title: string;
    content: string;
  }[];
  troubleshootingItems: {
    icon: LucideIcon;
    title: string;
    content: string;
  }[];
  faqItems: {
    icon: LucideIcon;
    title: string;
    content: string;
  }[];
}

const tabVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

export default function ProductTabs({ 
  activeTab, 
  features,
  setupInstructions,
  troubleshootingItems,
  faqItems
}: TabContentProps) {
  const [[page, direction], setPage] = React.useState([0, 0]);
  const tabIndex = React.useMemo(() => {
    const tabs = ['features', 'documentation', 'FAQ'];
    return tabs.indexOf(activeTab);
  }, [activeTab]);

  React.useEffect(() => {
    setPage([tabIndex, tabIndex > page[0] ? 1 : -1]);
  }, [tabIndex]);

  const content = React.useMemo(() => {
    switch (activeTab) {
      case 'features':
        return <FeatureGrid features={features} />;
      case 'documentation':
        return (
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <div className="flex items-center gap-2 text-orange-500">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Important Note</span>
              </div>
              <p className="mt-2 text-white/70">
                To paste your license key, use the right mouse button. Make sure to follow all instructions carefully.
              </p>
            </div>

            <div className="space-y-8">
              <SetupInstructions />
              <CommonIssues />
            </div>
          </div>
        );
      case 'FAQ':
        return (
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            <Accordion items={faqItems} />
          </div>
        );
      default:
        return null;
    }
  }, [activeTab, features, setupInstructions, troubleshootingItems, faqItems]);

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={page[0]}
        custom={direction}
        variants={tabVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 }
        }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}