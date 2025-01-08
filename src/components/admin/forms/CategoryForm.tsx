import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCategories } from '../../../hooks/useCategories';
import { CATEGORY_ICONS, type Category, type CategoryIcon } from '../../../types/category';
import toast from 'react-hot-toast';

interface CategoryFormProps {
  category?: Category | null;
  onClose: () => void;
}

export default function CategoryForm({ category, onClose }: CategoryFormProps) {
  const { createCategory, updateCategory } = useCategories();
  const [name, setName] = useState(category?.name ?? '');
  const [slug, setSlug] = useState(category?.slug ?? '');
  const [icon, setIcon] = useState<CategoryIcon>(category?.icon ?? 'Shield');
  const [order, setOrder] = useState(category?.order ?? 0);
  const [isActive, setIsActive] = useState(category?.isActive ?? true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (category) {
        await updateCategory.mutateAsync({ 
          id: category._id, 
          name, 
          slug,
          icon,
          order,
          isActive
        });
        toast.success('Category updated successfully');
      } else {
        await createCategory.mutateAsync({ 
          name, 
          slug,
          icon,
          order,
          isActive
        });
        toast.success('Category created successfully');
      }
      onClose();
    } catch (error) {
      toast.error('Failed to save category');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-black/90 border border-orange-500/20 rounded-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {category ? 'Edit Category' : 'New Category'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
              }}
              className="w-full px-4 py-2 bg-black/50 border border-orange-500/20 rounded-lg
                       text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Icon
            </label>
            <select
              value={icon}
              onChange={(e) => setIcon(e.target.value as CategoryIcon)}
              className="w-full px-4 py-2 bg-black/50 border border-orange-500/20 rounded-lg
                       text-white focus:outline-none focus:border-orange-500"
            >
              {Object.keys(CATEGORY_ICONS).map((iconName) => (
                <option key={iconName} value={iconName}>
                  {iconName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-black/50 border border-orange-500/20 rounded-lg
                       text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-orange-500/20 text-orange-500 focus:ring-orange-500"
            />
            <label className="text-sm font-medium text-gray-400">
              Active
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              {category ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}