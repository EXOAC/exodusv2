import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Cookie, Globe, UserCheck, Scale, Bell } from 'lucide-react';

export default function TermsOfService() {
  const sections = [
    {
      icon: Shield,
      title: "Website Usage",
      content: `By using this website, or by purchasing a EXODUS product you accept these terms of service in full. If you disagree with these terms of service, you must not purchase or use the services and products offered by EXODUS as well as this website.

EXODUS reserves the right to deny access to the website and forum at any time, at our sole discretion.

Upon Purchase you agree you understand what you are purchasing. You agree that you have thoroughly read through the requirements and the product you are purchasing is compatible with your Computer.`
    },
    {
      icon: Lock,
      title: "Product Usage",
      content: `A license key or user account, containing the ability to access EXODUS products, must have been obtained through purchasing a product through our payment system. EXODUS is not liable for potential claims caused by one of their consumers on intellectual property of third parties. In such events, the consumer protects EXODUS for claims from third parties.

We reserve the right to revoke viewing and purchasing access to the website at any time for the following reasons:
• Chargeback, claim or dispute
• Misuse of an account
• Abuse or misconduct
• Breaking our community guidelines
• Working for an opposite entity`
    },
    {
      icon: Database,
      title: "Customer Support",
      content: `Customer support hours are 24/7. Support requests are processed within 24hours on the provided support systems unless unforeseen problems arise that warrant an extension of this time.`
    },
    {
      icon: Cookie,
      title: "Purchases and Payments",
      content: `You agree to provide current, complete, and accurate billing / purchase and account information for all purchases made via the Site. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. All payments shall be in GBP.

Unauthorized use of funds for payment, fraudulent payments, attempts to 'charged back' or deny payments to your account will result in your account being instantly disabled, permanently terminated and/or legal action will be taken.`
    },
    {
      icon: Globe,
      title: "End-User License Agreement",
      content: `This End-User License Agreement ("EULA") governs all access to and use of the software from EXODUS ("Software"). YOU MUST READ THIS EULA CAREFULLY AND ACCEPT ALL THE TERMS AND CONDITIONS SET OUT BELOW BEFORE YOU ARE ENTITLED TO DOWNLOAD, INSTALL AND USE THE SOFTWARE.

You acknowledge that all right, title, and interest in the copyrights and other intellectual property rights in the Software reside at all times in EXODUS.`
    },
    {
      icon: UserCheck,
      title: "Guidelines for Reviews",
      content: `We may provide you areas on the Site to leave reviews or ratings. When posting a review, you must comply with the following criteria:
• You should have first-hand experience with the person/entity being reviewed
• Your reviews should not contain offensive profanity, or abusive, racist, offensive, or hate language
• Your reviews should not contain discriminatory references
• Your reviews should not contain references to illegal activity`
    },
    {
      icon: Scale,
      title: "Disclaimer",
      content: `TO THE FULLEST EXTENT PERMITTED AT LAW, EXODUS IS PROVIDING THIS WEBSITE AND ITS CONTENTS/PRODUCTS ON AN "AS IS" BASIS AND MAKES NO (AND EXPRESSLY DISCLAIMS ALL) REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, WITH RESPECT TO THIS WEB SITE OR THE INFORMATION, CONTENT, MATERIALS OR PRODUCTS INCLUDED IN THIS SITE.`
    },
    {
      icon: Bell,
      title: "Updates to Terms",
      content: `At our discretion, we may update these terms to reflect current acceptable practices. We will take reasonable steps to let users know about changes via our website. Your continued use of this site after any changes to these terms will be regarded as acceptance of our practices.`
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
          <h1 className="text-4xl font-bold text-gradient mb-4">Terms of Service</h1>
          <p className="text-white/60">Please read these terms carefully before using our services</p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                  <section.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-white/90 mb-3">{section.title}</h2>
                  <div className="text-white/60 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center text-white/40"
        >
          These terms are effective as of August 27, 2024
        </motion.div>
      </div>
    </div>
  );
}