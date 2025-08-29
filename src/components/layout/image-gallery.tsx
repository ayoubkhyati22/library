import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const featuredImage = {
  url: 'https://people.com/thmb/0ZYILbLgM1tJIk6bKc_YtDXJI78=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(507x164:509x166)/school-photo-081823-tout-cfada8aafae044bc9cb9979f2e7f2cf1.jpg',
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