import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const featuredImage = {
  url: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=600',
  alt: 'Bibliothèque moderne'
};

export function ImageGallery() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="h-full"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <img
          src={featuredImage.url}
          alt={featuredImage.alt}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
          loading="lazy"
        />
      </Card>
    </motion.div>
  );
}