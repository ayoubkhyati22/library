import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';
import { Product, Category } from '../../lib/storage';
import { formatPrice } from '../../lib/utils';
import { generateWhatsAppURL, openWhatsApp } from '../../lib/whatsapp';

interface ProductCardProps {
  product: Product;
  category?: Category;
}

export function ProductCard({ product, category }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as keyof typeof product.title;

  const handleWhatsAppClick = () => {
    const phone = import.meta.env.VITE_WHATSAPP_PHONE;
    const message = t('product.whatsappMessage', {
      title: product.title[currentLang],
      id: product.id,
      price: formatPrice(product.price),
    });
    
    const url = generateWhatsAppURL(
      phone,
      product.title[currentLang],
      product.id,
      product.price,
      message
    );
    
    openWhatsApp(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.image}
            alt={product.title[currentLang]}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
          {category && (
            <Badge className="absolute top-2 left-2" variant="secondary">
              {category.name[currentLang]}
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4 flex flex-col gap-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
              {product.title[currentLang]}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {product.description[currentLang] || t('product.noDescription')}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="font-bold text-xl text-primary">
              {formatPrice(product.price)}
            </span>
            
            <Button
              onClick={handleWhatsAppClick}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{t('actions.contactWhatsApp')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}