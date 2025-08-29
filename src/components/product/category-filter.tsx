import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
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
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={!selectedCategoryId ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange()}
        className="rounded-full"
      >
        {t('category.all')}
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategoryId === category.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="rounded-full"
        >
          {category.name[currentLang]}
        </Button>
      ))}
    </div>
  );
}