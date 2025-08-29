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
import { Badge } from '@/components/ui/badge';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { TableSkeleton } from '@/components/ui/loading-skeleton';
import { ProductForm } from '../../components/admin/product-form';
import { 
  Product, 
  Category, 
  getProducts, 
  getCategories, 
  saveProduct, 
  updateProduct, 
  deleteProduct 
} from '../../lib/storage';
import { formatPrice } from '../../lib/utils';
import { usePagination } from '../../hooks/usePagination';
import { PaginationControls } from '../../components/ui/pagination-controls';

export function AdminProductsPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as keyof Product['title'];

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; product?: Product }>({
    open: false,
  });
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedProducts,
    goToPage,
    canGoNext,
    canGoPrevious,
  } = usePagination({
    data: products,
    itemsPerPage: 10,
  });

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  const loadData = async () => {
    setDataLoading(true);
    try {
      const productsData = await getProducts();
      const categoriesData = await getCategories();
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setDataLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setDeleteConfirm({ open: true, product });
  };

  const handleFormSubmit = async (data: Omit<Product, 'id' | 'createdAt'>) => {
    setLoading(true);
    
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        toast.success(t('toast.updated'));
      } else {
        await saveProduct(data);
        toast.success(t('toast.saved'));
      }
      
      await loadData();
      setIsFormOpen(false);
      setEditingProduct(undefined);
    } catch (error) {
      toast.error(t('toast.error'));
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.product) return;
    
    try {
      await deleteProduct(deleteConfirm.product.id);
      toast.success(t('toast.deleted'));
      await loadData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(t('toast.error'));
    }
    
    setDeleteConfirm({ open: false });
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name[currentLang] : 'Inconnue';
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
              <h1 className="text-3xl font-bold">Gestion des produits</h1>
              <p className="text-muted-foreground">
                Gérez votre catalogue de livres
              </p>
            </div>
            <Button onClick={handleAddProduct} className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un produit
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Liste des produits ({products.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {dataLoading ? (
                <TableSkeleton rows={8} columns={6} />
              ) : products.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun produit trouvé. Commencez par ajouter votre premier livre.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img
                              src={product.image}
                              alt={product.title[currentLang]}
                              className="w-12 h-16 object-cover rounded"
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{product.title[currentLang]}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {getCategoryName(product.categoryId)}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatPrice(product.price)}</TableCell>
                          <TableCell>
                            {new Date(product.createdAt).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteProduct(product)}
                                className="text-destructive hover:text-destructive"
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

        {/* Product Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              categories={categories}
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
          title="Supprimer le produit"
          description={`Êtes-vous sûr de vouloir supprimer "${deleteConfirm.product?.title[currentLang]}" ? Cette action ne peut pas être annulée.`}
        />
      </Container>
    </div>
  );
}