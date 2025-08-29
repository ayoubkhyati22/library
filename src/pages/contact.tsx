import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '../components/layout/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { generateWhatsAppURL, openWhatsApp } from '../lib/whatsapp';

export function ContactPage() {
  const { t } = useTranslation();

  const handleWhatsAppContact = () => {
    const phone = import.meta.env.VITE_WHATSAPP_PHONE;
    const message = "Bonjour, j'aimerais avoir plus d'informations sur vos services.";
    
    const url = generateWhatsAppURL(phone, '', '', 0, message);
    openWhatsApp(url);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      content: '123 Rue de la Paix, Casablanca, Maroc'
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      content: '+212 6 XX XX XX XX'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@librairie.com'
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      content: 'Lun-Ven: 9h-19h, Sam: 9h-17h'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t('contact.title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Contactez-nous sur WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Discutons sur WhatsApp
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Contactez-nous directement sur WhatsApp pour une réponse rapide et personnalisée.
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <h4 className="font-medium">Pourquoi WhatsApp ?</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Réponse rapide et directe</li>
                        <li>• Partage facile d'images de livres</li>
                        <li>• Communication en temps réel</li>
                        <li>• Disponible 7j/7</li>
                      </ul>
                    </div>

                    <Button
                      onClick={handleWhatsAppContact}
                      className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 h-12"
                      size="lg"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Ouvrir WhatsApp
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      En cliquant sur le bouton, WhatsApp s'ouvrira avec un message pré-rempli
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{t('contact.info')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <info.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">{info.title}</h3>
                        <p className="text-muted-foreground">{info.content}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Map placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Carte interactive</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}