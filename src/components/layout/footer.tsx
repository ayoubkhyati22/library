import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import { Container } from './container';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                <span className="font-bold text-xl">Librairie</span>
              </div>
              <p className="text-muted-foreground text-sm">
                {t('about.description')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Navigation</h3>
              <div className="space-y-2 text-sm">
                <div><a href="/" className="text-muted-foreground hover:text-foreground">{t('nav.home')}</a></div>
                <div><a href="/about" className="text-muted-foreground hover:text-foreground">{t('nav.about')}</a></div>
                <div><a href="/contact" className="text-muted-foreground hover:text-foreground">{t('nav.contact')}</a></div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('contact.info')}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>123 Rue de la Paix, Casablanca</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+212 6 XX XX XX XX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@librairie.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('contact.hours')}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Lun - Ven: 9h - 19h</div>
                <div>Sam: 9h - 17h</div>
                <div>Dim: Fermé</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Librairie. Tous droits réservés.
          </p>
        </div>
      </Container>
    </footer>
  );
}