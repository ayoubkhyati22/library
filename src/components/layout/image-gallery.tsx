import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const featuredImage = {
  url: 'https://people.com/thmb/0ZYILbLgM1tJIk6bKc_YtDXJI78=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(507x164:509x166)/school-photo-081823-tout-cfada8aafae044bc9cb9979f2e7f2cf1.jpg',
  alt: 'Bibliothèque moderne'
};

export function ImageGallery() {
  return (
    <div className="h-full flex flex-col">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow flex-1">
        <img
          src={featuredImage.url}
          alt={featuredImage.alt}
          className="w-full h-full object-cover hover:scale-105 transition-transform min-h-[600px]"
          loading="lazy"
        />
      </Card>
    </div>
  );
}