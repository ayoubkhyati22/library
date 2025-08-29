import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '../components/layout/container';
import { ProductGrid } from '../components/product/product-grid';
import { CategoryFilter } from '../components/product/category-filter';
import { PriceFilter } from '../components/product/price-filter';
import { SearchBar } from '../components/product/search-bar';
import { ImageGallery } from '../components/layout/image-gallery';
import { Product, Category, getProducts, getCategories, searchProducts, getProductsByCategory } from '../lib/storage';
import { usePagination } from '../hooks/usePagination';
import { PaginationControls } from '../components/ui/pagination-controls';

export function HomePage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [loading, setLoading] = useState(true);

  // Pagination for filtered products
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedProducts,
    goToPage,
    canGoNext,
    canGoPrevious,
  } = usePagination({
    data: products,
    itemsPerPage: 8,
  });

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  useEffect(() => {
    filterProducts().catch(console.error);
  }, [selectedCategoryId, searchQuery, minPrice, maxPrice]);

  const loadData = async () => {
    setLoading(true);
    try {
      const categoriesData = await getCategories();
      const productsData = await getProducts();
      
      setCategories(categoriesData);
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = async () => {
    let filteredProducts: Product[];

    if (searchQuery.trim()) {
      filteredProducts = await searchProducts(searchQuery);
      if (selectedCategoryId) {
        filteredProducts = filteredProducts.filter(
          product => product.categoryId === selectedCategoryId
        );
      }
    } else {
      filteredProducts = await getProductsByCategory(selectedCategoryId);
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(
      product => product.price >= minPrice && product.price <= maxPrice
    );

    setProducts(filteredProducts);
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=1200)'
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        <Container>
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              {t('hero.subtitle')}
            </p>
            <div className="max-w-md mx-auto">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-full"
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar gauche - Filtres */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 space-y-6"
            >
              <CategoryFilter
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onCategoryChange={setSelectedCategoryId}
                loading={loading}
              />
              
              <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={handlePriceChange}
              />
            </motion.div>

            {/* Contenu principal - Produits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-6"
            >
              <ProductGrid
                products={paginatedProducts}
                categories={categories}
                loading={loading}
              />
              
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
              />
            </motion.div>

            {/* Sidebar droite - Galerie d'images */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-3 flex flex-col h-fit"
            >
              <div className="sticky top-20">
                <ImageGallery />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}