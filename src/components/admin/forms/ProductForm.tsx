import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Image, Upload, Trash2 } from 'lucide-react';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';
import type { Product, ProductStatus } from '../../../types/product';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

interface PricingInput {
  period: '2h' | 'day' | 'week' | 'month';
  price: number;
  buttonId: string;
  digisellerUrl?: string;
}

const STATUSES = ['undetected', 'detected', 'updating', 'testing', 'closed'] as const;

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const navigate = useNavigate(); // Используем useNavigate для перехода
  const { createProduct, updateProduct } = useProducts();
  const { categories } = useCategories();
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    categoryId: product?.categoryId || '',
    status: product?.status || 'undetected' as ProductStatus,
    features: product?.features || [],
    requirements: product?.requirements || [],
    pricing: product?.pricing || [],
    isActive: product?.isActive ?? true,
    productUrl: product?.link || '',  // Ссылка на продукт
  });
  

  const [newPricing, setNewPricing] = useState<PricingInput>({
    period: '2h',
    price: 0,
    buttonId: '',
    digisellerUrl: ''
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>(product?.images || []);
  
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previews]);
  };

  const handleAddPricing = () => {
    if (!newPricing.price || !newPricing.period) {
      toast.error('Please fill in all required pricing fields');
      return;
    }

    setFormData(prev => ({
      ...prev,
      pricing: [...prev.pricing, newPricing]
    }));

    setNewPricing({
      period: '2h',
      price: 0,
      buttonId: '',
      digisellerUrl: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(formData));
  
      images.forEach(image => {
        formDataToSend.append('images', image);
      });
  
      let createdProduct;
      if (product) {
        await updateProduct.mutateAsync({
          id: product._id,
          data: formDataToSend
        });
        createdProduct = product;
      } else {
        createdProduct = await createProduct.mutateAsync(formDataToSend);
      }
      
      // Use the provided productUrl for redirection
      onClose();
      if (createdProduct) {
        navigate(`/product/${createdProduct.productUrl || createdProduct._id}`); // Navigate using the slug or fallback to _id
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to save product');
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-black/90 border border-orange-500/20 rounded-lg p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {product ? 'Edit Product' : 'New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-black/50 border border-orange-500/20 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select
                value={formData.categoryId}
                onChange={e => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                className="w-full px-3 py-2 bg-black/50 border border-orange-500/20 rounded-lg text-white"
                required
              >
                <option value="">Select category</option>
                {categories?.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                status: e.target.value as ProductStatus 
              }))}
              className="w-full px-3 py-2 bg-black/50 border border-orange-500/20 rounded-lg text-white"
            >
              {STATUSES.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-black/50 border border-orange-500/20 rounded-lg text-white"
              rows={4}
              required
            />
          </div>

          {/* Product link */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Product URL</label>
            <input
              type="text"
              value={formData.productUrl}
              onChange={e => setFormData(prev => ({ ...prev, productUrl: e.target.value }))}  // Ensure it takes the correct URL
              className="w-full px-3 py-2 bg-black/50 border border-orange-500/20 rounded-lg text-white"
              placeholder="e.g., unique-product-slug"  // Make sure to explain the format here
            />
          </div>


          {/* Images */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Images</label>
            <div className="grid grid-cols-4 gap-4">
              {previewImages.map((preview, index) => (
                <div key={index} className="relative aspect-video">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImages(prev => prev.filter((_, i) => i !== index));
                      setPreviewImages(prev => prev.filter((_, i) => i !== index));
                    }}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => imagesInputRef.current?.click()}
                className="aspect-video flex flex-col items-center justify-center border-2 border-dashed
                         border-orange-500/20 rounded-lg text-gray-400 hover:text-orange-400
                         hover:border-orange-500/40 transition-colors"
              >
                <Upload className="w-6 h-6 mb-1" />
                <span className="text-xs">Add Image</span>
              </button>
            </div>
            <input
              ref={imagesInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="hidden"
            />
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Pricing</label>
            <div className="space-y-4">
              {formData.pricing.map((price, index) => (
                <div key={index} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                  <div>
                    <span className="text-white">{price.period}</span>
                    <span className="mx-2 text-gray-400">-</span>
                    <span className="text-orange-400">${price.price}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-400">
                      {price.buttonId && <span className="mr-2">SellSN: {price.buttonId}</span>}
                      {price.digisellerUrl && <span>Digiseller: ✓</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        pricing: prev.pricing.filter((_, i) => i !== index)
                      }))}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Period</label>
                  <select
                    value={newPricing.period}
                    onChange={e => setNewPricing(prev => ({ 
                      ...prev, 
                      period: e.target.value as PricingInput['period']
                    }))}
                    className="w-full px-3 py-2 bg-black/50 border border-orange-500/20 rounded-lg text-white"
                  >
                    <option value="2h">2 Hours</option>
                    <option value="day">24 Hours</option>
                    <option value="week">7 Days</option>
                    <option value="month">30 Days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Price</label>
                  <input
                    type="number"
                    value={newPricing.price}
                    onChange={e => setNewPricing(prev => ({ 
                      ...prev, 
                      price: parseFloat(e.target.value) 
                    }))}
                    className="w-full px-3 py-2 bg-black/50 border border-orange-500/20 rounded-lg text-white"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">SellSN Button ID</label>
                  <input
                    type="text"
                    value={newPricing.buttonId}
                    onChange={e => setNewPricing(prev => ({ 
                      ...prev, 
                      buttonId: e.target.value 
                    }))}
                    className="w-full px-3 py-2 bg-black/50 border border-orange-500/20 rounded-lg text-white"
                    placeholder="e.g., fcb05f39-4d82..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Digiseller URL</label>
                  <input
                    type="text"
                    value={newPricing.digisellerUrl}
                    onChange={e => setNewPricing(prev => ({ 
                      ...prev, 
                      digisellerUrl: e.target.value 
                    }))}
                    className="w-full px-3 py-2 bg-black/50 border border-orange-500/20 rounded-lg text-white"
                    placeholder="https://digiseller.market/..."
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddPricing}
                className="w-full px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30"
              >
                Add Pricing
              </button>
            </div>
          </div>

          {/* Submit buttons */}
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
              {product ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
