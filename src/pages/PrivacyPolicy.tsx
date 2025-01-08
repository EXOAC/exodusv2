import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Cookie, Globe, UserCheck, Scale, Bell } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Shield,
      title: "Privacy Protection",
      content: `We care about data privacy and security. By using the Site or the Marketplace Offerings, you agree to be bound by our Privacy Policy posted on the Site, which is incorporated into these Terms of Use. Please be advised the site and the Marketplace Offerings are hosted in the United Kingdom.`
    },
    {
      icon: Database,
      title: "Information Collection",
      content: `When you visit our website, our servers may automatically log the standard data provided by your web browser. This data is considered "non-identifying information", as it does not personally identify you on its own. It may include your computer's Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details.`
    },
    {
      icon: Lock,
      title: "Data Collection Methods",
      content: `We collect information by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used. You are free to refuse our request for this information, with the understanding that we may be unable to provide you with some of your desired services without it.`
    },
    {
      icon: Scale,
      title: "Information Usage",
      content: `We may use a combination of identifying and non-identifying information to understand who our visitors are, how they use our services, and how we may improve their experience of our website in future. We do not disclose the specifics of this information publicly, but may share aggregated and anonymized versions of this information.`
    },
    {
      icon: Cookie,
      title: "Cookies Policy",
      content: `We use "cookies" to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit so we can understand how you use our site and serve you content based on preferences you have specified.

If you do not wish to accept cookies from us, you should instruct your browser to refuse cookies from our website.`
    },
    {
      icon: UserCheck,
      title: "Children's Privacy",
      content: `This website does not knowingly target or collect personal information from children. As a parent/guardian, please contact us if you believe your child is participating in an activity involving personal information on our website, and you have not received a notification or request for consent.`
    },
    {
      icon: Globe,
      title: "Third-Party Links",
      content: `Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices.`
    },
    {
      icon: Bell,
      title: "Your Rights",
      content: `As our user, you have the right to be informed about how your data is collected and used. You are entitled to know what data we collect about you, and how it is processed. You are entitled to correct and update any personal information about you, and to request this information be deleted.

You are entitled to restrict or object to our use of your data, while retaining the right to use your personal information for your own purposes.`
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
          <h1 className="text-4xl font-bold text-gradient mb-4">Privacy Policy</h1>
          <p className="text-white/60">Your privacy is important to us</p>
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
          This policy is effective as of August 27, 2024
        </motion.div>
      </div>
    </div>
  );
}