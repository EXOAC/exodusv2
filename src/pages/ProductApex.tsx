import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '../components/seo';
import { seoData } from '../data/seoData';
import ProductHero from '../components/ui/ProductHero';
import TabNavigation from '../components/ui/TabNavigation';
import ProductTabs from '../components/ui/ProductTabs';
import { MediaGallery } from '../components/video/MediaGallery';
import { apexFeatures } from '../data/features';
import { setupInstructions, troubleshootingItems, faqItems } from '../data/productData';

const mediaItems = [
  {
    type: 'video' as const,
    url: 'https://youtu.be/YUvGjdWVCrw'
  },
  {
    type: 'image' as const,
    url: 'https://imgur.com/UuZHXyo.jpg'
  }
];

export default function ProductApex() {
  const [activeTab, setActiveTab] = useState('features');
  const videoRef = useRef<HTMLDivElement>(null);
  
  const scrollToVideo = () => {
    videoRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <>
      <SEO {...seoData.products.apex} />
      
      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductHero
            title="Apex External"
            description="Experience next-level gameplay with our advanced external solution"
            onWatchDemo={scrollToVideo}
          />

          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={['features', 'documentation', 'FAQ']}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductTabs
                activeTab={activeTab}
                features={apexFeatures}
                setupInstructions={setupInstructions}
                troubleshootingItems={troubleshootingItems}
                faqItems={faqItems}
              />
            </motion.div>
          </AnimatePresence>

          <div ref={videoRef} className="mt-20 scroll-mt-24">
            <MediaGallery 
              items={mediaItems}
              className="shadow-xl shadow-black/20"
            />
          </div>
        </div>
      </div>
    </>
  );
}