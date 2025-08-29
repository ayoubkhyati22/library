import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ProductCard } from './product-card';
import { ProductSkeleton } from '@/components/ui/loading-skeleton';
import { Product, Category } from '../../lib/storage';

interface ProductGridProps {
  products: Product[];
  categories: Category[];
  loading?: boolean;
}

export function ProductGrid({ products, categories, loading }: ProductGridProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-muted-foreground text-lg">{t('product.noProducts')}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {products.map((product, index) => {
        const category = categories.find(cat => cat.id === product.categoryId);
        
        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} category={category} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}