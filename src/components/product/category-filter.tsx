import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';

// Types flexibles pour gérer les deux structures
type Category = {
  id: string;
  slug: string;
  createdAt: string;
} & (
  // Structure directe Supabase
  {
    name_fr: string;
    name_en: string;
    name_ar: string;
  } | 
  // Structure transformée
  {
    name: {
      fr: string;
      en: string;
      ar: string;
    };
  }
);

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId?: string;
  onCategoryChange: (categoryId?: string) => void;
  loading?: boolean;
}

function TagsSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-6 bg-gray-200 animate-pulse rounded w-24" />
      <div className="flex flex-wrap gap-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-200 animate-pulse rounded-full w-20" />
        ))}
      </div>
    </div>
  );
}

export function CategoryFilter({ 
  categories, 
  selectedCategoryId, 
  onCategoryChange,
  loading
}: CategoryFilterProps) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fr';

  // Fonction pour récupérer le nom peut importe la structure
  const getCategoryName = (category: Category) => {
    const cat = category as any;
    
    // Cas 1: Structure directe Supabase (name_fr, name_en, name_ar)
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
             'Catégorie';
    }
    
    // Cas 2: Structure transformée (name.fr, name.en, name.ar)
    if (cat.name && typeof cat.name === 'object') {
      return cat.name[currentLang] || 
             cat.name.fr || 
             cat.name.en || 
             cat.name.ar ||
             'Catégorie';
    }
    
    return 'Catégorie';
  };

  if (loading) {
    return <TagsSkeleton />;
  }

  // S'assurer que categories est un tableau valide
  const validCategories = Array.isArray(categories) ? categories.filter(cat => cat && cat.id) : [];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">Catégories</h3>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={!selectedCategoryId ? 'default' : 'outline'}
          className="cursor-pointer hover:bg-primary/80 px-3 py-1 transition-colors"
          onClick={() => onCategoryChange()}
        >
          Toutes les catégories
        </Badge>
        
        {validCategories.map((category) => {
          const categoryName = getCategoryName(category);
          
          return (
            <Badge
              key={category.id}
              variant={selectedCategoryId === category.id ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/80 px-3 py-1 transition-colors"
              onClick={() => onCategoryChange(category.id)}
            >
              {categoryName}
            </Badge>
          );
        })}
      </div>
      
      {validCategories.length === 0 && !loading && (
        <p className="text-sm text-muted-foreground">
          Aucune catégorie disponible
        </p>
      )}
    </div>
  );
}