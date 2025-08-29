import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '../../components/layout/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Tags, Clock, TrendingUp } from 'lucide-react';
import { getProducts, getCategories, Product } from '../../lib/storage';

export function AdminDashboardPage() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    recentProducts: [] as Product[],
  });

  useEffect(() => {
    loadStats().catch(console.error);
  }, []);

  const loadStats = async () => {
    try {
      const products = await getProducts();
      const categories = await getCategories();
      const recentProducts = products
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        recentProducts,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const statCards = [
    {
      title: t('admin.stats.totalProducts'),
      value: stats.totalProducts,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: t('admin.stats.totalCategories'),
      value: stats.totalCategories,
      icon: Tags,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: t('admin.stats.recentlyAdded'),
      value: stats.recentProducts.length,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Performance',
      value: '98%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold">{t('admin.welcome')}</h1>
            <p className="text-muted-foreground">
              Tableau de bord de gestion de la librairie
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produits récemment ajoutés</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentProducts.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <img
                        src={product.image}
                        alt={product.title.fr}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.title.fr}</h3>
                        <p className="text-sm text-muted-foreground">
                          {product.price} MAD
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(product.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Aucun produit récent
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
}