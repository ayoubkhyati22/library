import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from '../components/layout/navbar';
import { Footer } from '../components/layout/footer';
import { AdminNav } from '../components/admin/admin-nav';
import { ProtectedRoute } from '../components/admin/protected-route';
import { HomePage } from '../pages/home';
import { AboutPage } from '../pages/about';
import { ContactPage } from '../pages/contact';
import { AdminLoginPage } from '../pages/admin/login';
import { AdminDashboardPage } from '../pages/admin/dashboard';
import { AdminProductsPage } from '../pages/admin/products';
import { AdminCategoriesPage } from '../pages/admin/categories';
import { useRTL } from '../hooks/useRTL';
import { useTranslation } from 'react-i18next';

export function App() {
  const { i18n } = useTranslation();
  useRTL(); // Initialize RTL support

  // Update document title based on current language
  useEffect(() => {
    const titles = {
      fr: 'Librairie - Découvrez notre collection',
      en: 'Library - Discover our collection',
      ar: 'المكتبة - اكتشف مجموعتنا'
    };
    document.title = titles[i18n.language as keyof typeof titles] || titles.fr;
  }, [i18n.language]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminNav />
                <Routes>
                  <Route path="dashboard" element={<AdminDashboardPage />} />
                  <Route path="products" element={<AdminProductsPage />} />
                  <Route path="categories" element={<AdminCategoriesPage />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
        
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}