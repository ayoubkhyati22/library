import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Category } from '../../lib/storage';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId?: string;
  onCategoryChange: (categoryId?: string) => void;
}

export function CategoryFilter({ 
  categories, 
  selectedCategoryId, 
  onCategoryChange 
}: CategoryFilterProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as keyof Category['name'];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">Catégories</h3>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={!selectedCategoryId ? 'default' : 'outline'}
          className="cursor-pointer hover:bg-primary/80 px-3 py-1"
          onClick={() => onCategoryChange()}
        >
          {t('category.all')}
        </Badge>
        
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategoryId === category.id ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary/80 px-3 py-1"
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name[currentLang]}
          </Badge>
        ))}
      </div>
    </div>
  );
}