import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Ban, Clock } from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gradient mb-4">Refund Policy</h1>
          <p className="text-white/60">Our commitment to fair and transparent refund practices</p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-white/90 mb-3">Refunds Policy</h2>
                <p className="text-white/60 leading-relaxed">
                  We reserve the right to deny any refund at any time. Since our services provide electronic, digital goods we do not offer refunds on used digital goods. You will not receive any refund for partial usage of the services provided, please make sure the subscription you are going to purchase is right for you.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                <Ban className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-white/90 mb-3">Cancellation</h2>
                <p className="text-white/60 leading-relaxed">
                  You are entitled to cancel your order before checkout, provided that the goods or services were not delivered.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-white/90 mb-3">Downtime Compensation</h2>
                <p className="text-white/60 leading-relaxed">
                  We reserve the right to deny downtime compensation and/or requests to pause software license keys.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}