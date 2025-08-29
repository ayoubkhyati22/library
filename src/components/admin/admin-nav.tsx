import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, BookOpen, Tags } from 'lucide-react';
import { Container } from '../layout/container';

export function AdminNav() {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    {
      to: '/admin/dashboard',
      label: t('nav.dashboard'),
      icon: LayoutDashboard,
    },
    {
      to: '/admin/products',
      label: t('nav.products'),
      icon: BookOpen,
    },
    {
      to: '/admin/categories',
      label: t('nav.categories'),
      icon: Tags,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-background/95 backdrop-blur">
      <Container>
        <div className="flex items-center gap-4 py-3">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              <Button
                variant={isActive(item.to) ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </Container>
    </nav>
  );
}