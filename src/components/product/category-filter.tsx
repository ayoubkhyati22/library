import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Catégories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant={!selectedCategoryId ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onCategoryChange()}
          className="w-full justify-start"
        >
          {t('category.all')}
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategoryId === category.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="w-full justify-start"
          >
            {category.name[currentLang]}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}