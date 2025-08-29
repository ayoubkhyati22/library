import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product, Category } from '../../lib/storage';

const productSchema = z.object({
  title_fr: z.string().min(1, 'Titre en français requis'),
  title_en: z.string().min(1, 'Titre en anglais requis'),
  title_ar: z.string().min(1, 'Titre en arabe requis'),
  price: z.string().transform(val => parseFloat(val)).refine(val => val > 0, 'Prix doit être positif'),
  categoryId: z.string().min(1, 'Catégorie requise'),
  description_fr: z.string().optional(),
  description_en: z.string().optional(),
  description_ar: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
  categories: Category[];
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ProductForm({ 
  product, 
  categories,
  onSubmit, 
  onCancel, 
  loading 
}: ProductFormProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as keyof Category['name'];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      title_fr: product.title.fr,
      title_en: product.title.en,
      title_ar: product.title.ar,
      price: product.price.toString(),
      categoryId: product.categoryId,
      description_fr: product.description.fr,
      description_en: product.description.en,
      description_ar: product.description.ar,
    } : {},
  });

  const selectedCategoryId = watch('categoryId');

  const onFormSubmit = (data: ProductFormData) => {
    const formattedData = {
      title: {
        fr: data.title_fr,
        en: data.title_en,
        ar: data.title_ar,
      },
      price: data.price,
      categoryId: data.categoryId,
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: {
        fr: data.description_fr || '',
        en: data.description_en || '',
        ar: data.description_ar || '',
      },
    };
    
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Titles */}
        <div>
          <Label htmlFor="title_fr">Titre (Français) *</Label>
          <Input
            id="title_fr"
            {...register('title_fr')}
            className={errors.title_fr ? 'border-destructive' : ''}
          />
          {errors.title_fr && (
            <p className="text-sm text-destructive mt-1">
              {errors.title_fr.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="title_en">Title (English) *</Label>
          <Input
            id="title_en"
            {...register('title_en')}
            className={errors.title_en ? 'border-destructive' : ''}
          />
          {errors.title_en && (
            <p className="text-sm text-destructive mt-1">
              {errors.title_en.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="title_ar">العنوان (العربية) *</Label>
          <Input
            id="title_ar"
            {...register('title_ar')}
            className={errors.title_ar ? 'border-destructive' : ''}
          />
          {errors.title_ar && (
            <p className="text-sm text-destructive mt-1">
              {errors.title_ar.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="price">{t('form.price')} (MAD) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register('price')}
            className={errors.price ? 'border-destructive' : ''}
          />
          {errors.price && (
            <p className="text-sm text-destructive mt-1">
              {errors.price.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="categoryId">{t('form.category')} *</Label>
          <Select
            value={selectedCategoryId}
            onValueChange={(value) => setValue('categoryId', value)}
          >
            <SelectTrigger className={errors.categoryId ? 'border-destructive' : ''}>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name[currentLang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && (
            <p className="text-sm text-destructive mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>
      </div>

      {/* Descriptions */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="description_fr">Description (Français)</Label>
          <Textarea
            id="description_fr"
            {...register('description_fr')}
            rows={3}
            className={errors.description_fr ? 'border-destructive' : ''}
          />
          {errors.description_fr && (
            <p className="text-sm text-destructive mt-1">
              {errors.description_fr.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="description_en">Description (English)</Label>
          <Textarea
            id="description_en"
            {...register('description_en')}
            rows={3}
            className={errors.description_en ? 'border-destructive' : ''}
          />
          {errors.description_en && (
            <p className="text-sm text-destructive mt-1">
              {errors.description_en.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="description_ar">الوصف (العربية)</Label>
          <Textarea
            id="description_ar"
            {...register('description_ar')}
            rows={3}
            className={errors.description_ar ? 'border-destructive' : ''}
          />
          {errors.description_ar && (
            <p className="text-sm text-destructive mt-1">
              {errors.description_ar.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          {t('actions.cancel')}
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Sauvegarde...' : t('actions.save')}
        </Button>
      </div>
    </form>
  );
}