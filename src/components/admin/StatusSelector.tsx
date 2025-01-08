import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { ProductStatus, PRODUCT_STATUSES } from '../../types/product';
import StatusBadge from './StatusBadge';
import toast from 'react-hot-toast';

interface StatusSelectorProps {
  productId: string;
  currentStatus: ProductStatus;
}

export default function StatusSelector({ productId, currentStatus }: StatusSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateProduct } = useProducts();

  const handleStatusChange = async (status: ProductStatus) => {
    if (status === currentStatus) {
      setIsOpen(false);
      return; // Никаких изменений не требуется
    }

    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ status }));

      await updateProduct.mutateAsync({
        id: productId,
        data: formData,
      });

      toast.success('Status updated successfully');
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="relative">
      {/* Кнопка статуса */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <StatusBadge status={currentStatus} />
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Затенение фона */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Селектор статуса */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-black/90 border border-orange-500/20 
                         rounded-lg shadow-xl overflow-hidden z-50"
            >
              {PRODUCT_STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`w-full px-4 py-2 text-left hover:bg-white/5 transition-colors 
                             flex items-center space-x-2 ${
                               status === currentStatus ? 'text-orange-500' : 'text-white'
                             }`}
                  disabled={status === currentStatus} // Отключить текущий статус
                >
                  <StatusBadge status={status} className="flex-1" />
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
