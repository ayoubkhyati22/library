import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const galleryImages = [
  {
    url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Librairie classique'
  },
  {
    url: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Étagères de livres'
  },
  {
    url: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Livres anciens'
  },
  {
    url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Collection de livres'
  },
  {
    url: 'https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Lecture paisible'
  },
  {
    url: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300',
    alt: 'Bibliothèque moderne'
  }
];

export function ImageGallery() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Galerie</h3>
      <div className="grid gap-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-32 object-cover hover:scale-105 transition-transform"
                loading="lazy"
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}