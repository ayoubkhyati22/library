import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Settings, LogOut, Home, Info, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './language-switcher';
import { Container } from './container';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'sonner';

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { isAuthenticated, signOut } = useAuth();

  const handleLogout = async () => {
    const { success, error } = await signOut();
    
    if (success) {
      toast.success(t('toast.loggedOut'));
    } else {
      toast.error(error || 'Erreur lors de la déconnexion');
    }
  };

  const navLinks = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/about', label: t('nav.about'), icon: Info },
    { to: '/contact', label: t('nav.contact'), icon: MessageCircle },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <BookOpen className="h-6 w-6" />
              <span>{t('nav.home')}</span>
            </Link>
            
            {!isAdminRoute && (
              <div className="hidden md:flex items-center space-x-4">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to}>
                    <Button
                      variant={isActive(link.to) ? 'default' : 'ghost'}
                      size="sm"
                      className="gap-2"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            {isAuthenticated && isAdminRoute && (
              <Button onClick={handleLogout} variant="ghost" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{t('actions.logout')}</span>
              </Button>
            )}
            
            {isAuthenticated && !isAdminRoute && (
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('nav.admin')}</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}