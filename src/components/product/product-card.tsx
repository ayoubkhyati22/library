import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

// Interface pour les données DIRECTES de Supabase (pas transformées)
interface ProductRaw {
  id: string;
  title_fr: string;    // ← Structure DIRECTE de Supabase
  title_en: string;
  title_ar: string;
  price: number;
  image: string;
  category_id: string;
  description_fr: string;
  description_en: string;
  description_ar: string;
  created_at: string;
}

// Interface pour les données transformées (si elles existent)
interface ProductTransformed {
  id: string;
  title: {             // ← Structure transformée
    fr: string;
    en: string;
    ar: string;
  };
  price: number;
  image: string;
  categoryId: string;
  description: {
    fr: string;
    en: string;
    ar: string;
  };
  createdAt: string;
}

// Union des deux types
type Product = ProductRaw | ProductTransformed;

interface Category {
  id: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  } | {
    name_fr: string;
    name_en: string;  
    name_ar: string;
  };
  slug: string;
  createdAt: string;
}

interface ProductCardProps {
  product: Product;
  category?: Category;
}

function formatPrice(price: number, currency = 'MAD'): string {
  return `${price.toFixed(2)} ${currency}`;
}

export function ProductCard({ product, category }: ProductCardProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';

  // SOLUTION: Fonction pour récupérer le titre peut importe la structure
  const getTitle = () => {
    const prod = product as any;
    
    // Cas 1: Structure directe Supabase (title_fr, title_en, title_ar)
    if (prod.title_fr || prod.title_en || prod.title_ar) {
      console.log('📋 Using direct Supabase structure');
      const langMap = {
        'fr': prod.title_fr,
        'en': prod.title_en,
        'ar': prod.title_ar
      };
      return langMap[currentLang as keyof typeof langMap] || 
             prod.title_fr || 
             prod.title_en || 
             prod.title_ar ||
             'Titre non disponible';
    }
    
    // Cas 2: Structure transformée (title.fr, title.en, title.ar)
    if (prod.title && typeof prod.title === 'object') {
      console.log('🔄 Using transformed structure');
      return prod.title[currentLang] || 
             prod.title.fr || 
             prod.title.en || 
             prod.title.ar ||
             'Titre non disponible';
    }
    
    console.warn('❌ No title structure found');
    return 'Titre non disponible';
  };

  const getDescription = () => {
    const prod = product as any;
    
    // Structure directe Supabase
    if (prod.description_fr || prod.description_en || prod.description_ar) {
      const langMap = {
        'fr': prod.description_fr,
        'en': prod.description_en,
        'ar': prod.description_ar
      };
      return langMap[currentLang as keyof typeof langMap] || 
             prod.description_fr || 
             prod.description_en || 
             prod.description_ar ||
             'Aucune description disponible';
    }
    
    // Structure transformée
    if (prod.description && typeof prod.description === 'object') {
      return prod.description[currentLang] || 
             prod.description.fr || 
             prod.description.en || 
             prod.description.ar ||
             'Aucune description disponible';
    }
    
    return 'Aucune description disponible';
  };

  const getCategoryName = () => {
    if (!category) return '';
    const cat = category as any;
    
    // Structure directe
    if (cat.name_fr || cat.name_en || cat.name_ar) {
      const langMap = {
        'fr': cat.name_fr,
        'en': cat.name_en,
        'ar': cat.name_ar
      };
      return langMap[currentLang as keyof typeof langMap] || 
             cat.name_fr || 
             cat.name_en || 
             cat.name_ar ||
             '';
    }
    
    // Structure transformée
    if (cat.name && typeof cat.name === 'object') {
      return cat.name[currentLang] || 
             cat.name.fr || 
             cat.name.en || 
             cat.name.ar ||
             '';
    }
    
    return '';
  };

  const handleWhatsAppClick = (e) => {
    e.stopPropagation();
    const phone = '212600000000';
    const title = getTitle();
    const message = `Bonjour, je suis intéressé(e) par ce livre: ${title} - Prix: ${formatPrice(product.price)}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleProductClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.href = `/product/${product.id}`;
  };

  const title = getTitle();
  const description = getDescription();
  const categoryName = getCategoryName();

  return (
    <div className="h-full">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div onClick={handleProductClick} className="cursor-pointer">
          <div className="aspect-square relative overflow-hidden">
            <img
              src={product.image}
              alt={title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
            {categoryName && (
              <Badge className="absolute top-2 left-2" variant="secondary">
                {categoryName}
              </Badge>
            )}
          </div>
        </div>
        
        <CardContent className="p-4 flex flex-col gap-3">
          <div className="space-y-1 flex-grow">
            <div onClick={handleProductClick} className="cursor-pointer">
              <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors">
                {title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {description}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-bold text-xl text-primary">
              {formatPrice(product.price)}
            </span>
            
            <Button
              onClick={handleWhatsAppClick}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white gap-2 flex-shrink-0"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}