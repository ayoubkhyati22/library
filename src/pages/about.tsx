import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container } from '../components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Award, Clock } from 'lucide-react';

export function AboutPage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: BookOpen,
      title: 'Grande Collection',
      description: 'Plus de 10,000 livres dans toutes les catégories'
    },
    {
      icon: Users,
      title: 'Service Client',
      description: 'Une équipe dédiée à votre satisfaction'
    },
    {
      icon: Award,
      title: 'Qualité',
      description: 'Sélection rigoureuse de titres de qualité'
    },
    {
      icon: Clock,
      title: 'Disponibilité',
      description: 'Ouvert 6 jours sur 7 pour vous servir'
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
            <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('about.description')}
            </p>
          </div>

          <div className="mb-12">
            <img
              src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Notre librairie"
              className="w-full h-64 md:h-96 object-cover rounded-2xl"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Notre Histoire</h2>
              <p className="text-muted-foreground">
                Fondée en 1985, notre librairie est un lieu de découverte et de partage 
                culturel au cœur de la ville. Nous nous passionnons pour les livres et 
                nous efforçons de créer un espace chaleureux où chaque lecteur peut 
                trouver son bonheur.
              </p>
              <p className="text-muted-foreground">
                Au fil des années, nous avons développé une expertise dans la sélection 
                d'ouvrages de qualité, alliant grands classiques et nouveautés contemporaines.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">Notre Mission</h2>
              <p className="text-muted-foreground">
                Promouvoir la lecture et rendre accessible la culture littéraire 
                à tous. Nous croyons au pouvoir des livres pour enrichir l'esprit, 
                développer l'imagination et créer des liens entre les personnes.
              </p>
              <p className="text-muted-foreground">
                Notre équipe de libraires expérimentés est là pour vous conseiller 
                et vous accompagner dans vos découvertes littéraires.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="text-center">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}