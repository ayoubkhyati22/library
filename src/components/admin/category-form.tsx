import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category } from '../../lib/storage';

const categorySchema = z.object({
  name_fr: z.string().min(1, 'Nom en français requis'),
  name_en: z.string().min(1, 'Nom en anglais requis'),
  name_ar: z.string().min(1, 'Nom en arabe requis'),
  slug: z.string().min(1, 'Slug requis'),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: Omit<Category, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function CategoryForm({ 
  category, 
  onSubmit, 
  onCancel, 
  loading 
}: CategoryFormProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: category ? {
      name_fr: category.name.fr,
      name_en: category.name.en,
      name_ar: category.name.ar,
      slug: category.slug,
    } : {},
  });

  const nameFr = watch('name_fr');

  // Auto-generate slug from French name
  React.useEffect(() => {
    if (nameFr && !category) {
      const slug = nameFr
        .toLowerCase()
        .replace(/[àáâãäå]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôõö]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/[ç]/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', slug);
    }
  }, [nameFr, category, setValue]);

  const onFormSubmit = (data: CategoryFormData) => {
    const formattedData = {
      name: {
        fr: data.name_fr,
        en: data.name_en,
        ar: data.name_ar,
      },
      slug: data.slug,
    };
    
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name_fr">Nom (Français) *</Label>
          <Input
            id="name_fr"
            {...register('name_fr')}
            className={errors.name_fr ? 'border-destructive' : ''}
          />
          {errors.name_fr && (
            <p className="text-sm text-destructive mt-1">
              {errors.name_fr.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="name_en">Name (English) *</Label>
          <Input
            id="name_en"
            {...register('name_en')}
            className={errors.name_en ? 'border-destructive' : ''}
          />
          {errors.name_en && (
            <p className="text-sm text-destructive mt-1">
              {errors.name_en.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="name_ar">الاسم (العربية) *</Label>
          <Input
            id="name_ar"
            {...register('name_ar')}
            className={errors.name_ar ? 'border-destructive' : ''}
          />
          {errors.name_ar && (
            <p className="text-sm text-destructive mt-1">
              {errors.name_ar.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            {...register('slug')}
            className={errors.slug ? 'border-destructive' : ''}
            placeholder="exemple-slug"
          />
          {errors.slug && (
            <p className="text-sm text-destructive mt-1">
              {errors.slug.message}
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