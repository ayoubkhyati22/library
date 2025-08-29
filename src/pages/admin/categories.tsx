import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Container } from '../../components/layout/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { TableSkeleton } from '@/components/ui/loading-skeleton';
import { CategoryForm } from '../../components/admin/category-form';
import { 
  Category, 
  getCategories, 
  saveCategory, 
  updateCategory, 
  deleteCategory,
  getProducts 
} from '../../lib/storage';
import { usePagination } from '../../hooks/usePagination';
import { PaginationControls } from '../../components/ui/pagination-controls';

export function AdminCategoriesPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as keyof Category['name'];

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryProductCounts, setCategoryProductCounts] = useState<Record<string, number>>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; category?: Category }>({
    open: false,
  });
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedCategories,
    goToPage,
    canGoNext,
    canGoPrevious,
  } = usePagination({
    data: categories,
    itemsPerPage: 10,
  });

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  const loadData = async () => {
    setDataLoading(true);
    try {
      const categoriesData = await getCategories();
      const products = await getProducts();
      
      // Calculate product counts for each category
      const counts: Record<string, number> = {};
      categoriesData.forEach(category => {
        counts[category.id] = products.filter(product => product.categoryId === category.id).length;
      });
      
      setCategories(categoriesData);
      setCategoryProductCounts(counts);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Erreur lors du chargement des catégories');
    } finally {
      setDataLoading(false);
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(undefined);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    // Check if category has products
    const productCount = categoryProductCounts[category.id] || 0;
    
    if (productCount > 0) {
      toast.error('Impossible de supprimer une catégorie qui contient des produits');
      return;
    }
    
    setDeleteConfirm({ open: true, category });
  };

  const handleFormSubmit = async (data: Omit<Category, 'id' | 'createdAt'>) => {
    setLoading(true);
    
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, data);
        toast.success(t('toast.updated'));
      } else {
        await saveCategory(data);
        toast.success(t('toast.saved'));
      }
      
      await loadData();
      setIsFormOpen(false);
      setEditingCategory(undefined);
    } catch (error) {
      toast.error(t('toast.error'));
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.category) return;
    
    try {
      await deleteCategory(deleteConfirm.category.id);
      toast.success(t('toast.deleted'));
      await loadData();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error(t('toast.error'));
    }
    
    setDeleteConfirm({ open: false });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Gestion des catégories</h1>
              <p className="text-muted-foreground">
                Organisez vos livres par catégories
              </p>
            </div>
            <Button onClick={handleAddCategory} className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter une catégorie
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des catégories ({categories.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {dataLoading ? (
                <TableSkeleton rows={5} columns={5} />
              ) : categories.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Aucune catégorie trouvée. Créez votre première catégorie.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Produits</TableHead>
                        <TableHead>Date de création</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedCategories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{category.name[currentLang]}</p>
                              <p className="text-sm text-muted-foreground">
                                {category.name.fr} / {category.name.en} / {category.name.ar}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className="bg-muted px-2 py-1 rounded text-sm">
                              {category.slug}
                            </code>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">
                              {categoryProductCounts[category.id] || 0} produit(s)
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(category.createdAt).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditCategory(category)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteCategory(category)}
                                className="text-destructive hover:text-destructive"
                                disabled={(categoryProductCounts[category.id] || 0) > 0}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              
              {!dataLoading && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  canGoPrevious={canGoPrevious}
                  canGoNext={canGoNext}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
              </DialogTitle>
            </DialogHeader>
            <CategoryForm
              category={editingCategory}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
              loading={loading}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <ConfirmDialog
          open={deleteConfirm.open}
          onOpenChange={(open) => setDeleteConfirm({ open })}
          onConfirm={confirmDelete}
          title="Supprimer la catégorie"
          description={`Êtes-vous sûr de vouloir supprimer la catégorie "${deleteConfirm.category?.name[currentLang]}" ? Cette action ne peut pas être annulée.`}
        />
      </Container>
    </div>
  );
}