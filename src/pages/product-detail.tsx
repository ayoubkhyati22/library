import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Share2 } from 'lucide-react';
import { Container } from '../components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product, Category, getProducts, getCategories } from '../lib/storage';
import { formatPrice } from '../lib/utils';
import { generateWhatsAppURL, openWhatsApp } from '../lib/whatsapp';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as keyof Product['title'];

  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct().catch(console.error);
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const products = await getProducts();
      const categories = await getCategories();
      
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        const foundCategory = categories.find(c => c.id === foundProduct.categoryId);
        setCategory(foundCategory || null);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    if (!product) return;
    
    const phone = import.meta.env.VITE_WHATSAPP_PHONE;
    const message = t('product.whatsappMessage', {
      title: product.title[currentLang],
      price: formatPrice(product.price),
    });
    
    const url = generateWhatsAppURL(
      phone,
      product.title[currentLang],
      '',
      product.price,
      message
    );
    
    openWhatsApp(url);
  };

  const handleShare = async () => {
    if (!product) return;
    
    const shareData = {
      title: product.title[currentLang],
      text: `${product.title[currentLang]} - ${formatPrice(product.price)}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <Container>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8" />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-12 bg-gray-200 rounded w-full" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background py-8">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
            <Button onClick={() => navigate('/')}>
              Retour à l'accueil
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('actions.back')}
          </Button>

          {/* Product Details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title[currentLang]}
                  className="w-full aspect-square object-cover"
                />
              </Card>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                {category && (
                  <Badge variant="secondary" className="mb-2">
                    {category.name[currentLang]}
                  </Badge>
                )}
                <h1 className="text-3xl font-bold mb-2">
                  {product.title[currentLang]}
                </h1>
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
              </div>

              {product.description[currentLang] && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description[currentLang]}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 h-12"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t('actions.contactWhatsApp')}
                </Button>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Partager
                </Button>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Informations</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Catégorie:</span>
                      <span>{category?.name[currentLang] || 'Non définie'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ajouté le:</span>
                      <span>{new Date(product.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}