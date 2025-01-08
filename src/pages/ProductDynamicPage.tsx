// src/pages/ProductDynamicPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SEO } from '../components/seo';
// Импортируем или создаём компонент аналогичный ProductHero, TabNavigation, и т.д.

interface ProductData {
  id: string;
  name: string;
  description: string;
  status: string;
  // ...другие поля, если нужны
}

// Пример. Если нужно повторить логику ProductApex, можно объединить.
export default function ProductDynamicPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    // Загружаем с бэкенда, например /api/products/:id
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await axios.get<ProductData>(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err: any) {
        console.error('Ошибка загрузки продукта:', err);
        setError('Продукт не найден или произошла ошибка');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="pt-24 text-center">Загрузка продукта...</div>;
  }
  if (error || !product) {
    return <div className="pt-24 text-center text-red-500">{error || 'Продукт не найден'}</div>;
  }

  return (
    <>
      {/* SEO, если нужно */}
      <SEO title={product.name} description={product.description} />

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Пример Hero */}
          <div className="mb-8">
            <h1 className="text-4xl text-white mb-2">{product.name}</h1>
            <p className="text-zinc-400">{product.description}</p>
          </div>

          {/* Пример табов (можно повторить логику из ProductApex) */}
          {/* <TabNavigation ... /> 
             <AnimatePresence>
               <motion.div ...>
                 <ProductTabs ... />
               </motion.div>
          */}

          {/* Если есть видео / медиа */}
          {/* <MediaGallery items={...} /> */}
        </div>
      </div>
    </>
  );
}
