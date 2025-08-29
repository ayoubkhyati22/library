/*
  # Create library management schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name_fr` (text)
      - `name_en` (text)
      - `name_ar` (text)
      - `slug` (text, unique)
      - `created_at` (timestamp)
    - `products`
      - `id` (uuid, primary key)
      - `title_fr` (text)
      - `title_en` (text)
      - `title_ar` (text)
      - `price` (decimal)
      - `image` (text)
      - `category_id` (uuid, foreign key)
      - `description_fr` (text)
      - `description_en` (text)
      - `description_ar` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to manage data
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_fr text NOT NULL,
  name_en text NOT NULL,
  name_ar text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_fr text NOT NULL,
  title_en text NOT NULL,
  title_ar text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  image text DEFAULT 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  description_fr text DEFAULT '',
  description_en text DEFAULT '',
  description_ar text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (true);

-- Products policies
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample categories
INSERT INTO categories (name_fr, name_en, name_ar, slug) VALUES
  ('Romans', 'Novels', 'روايات', 'romans'),
  ('Sciences', 'Science', 'علوم', 'sciences'),
  ('Histoire', 'History', 'تاريخ', 'histoire'),
  ('Philosophie', 'Philosophy', 'فلسفة', 'philosophie'),
  ('Littérature jeunesse', 'Children''s Literature', 'أدب الأطفال', 'litterature-jeunesse')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (title_fr, title_en, title_ar, price, image, category_id, description_fr, description_en, description_ar)
SELECT 
  'L''Étranger',
  'The Stranger',
  'الغريب',
  129.0,
  'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
  c.id,
  'Roman philosophique classique qui explore l''absurdité de la condition humaine.',
  'A classic philosophical novel exploring the absurdity of the human condition.',
  'رواية فلسفية كلاسيكية تستكشف عبثية الحالة الإنسانية.'
FROM categories c WHERE c.slug = 'romans'
ON CONFLICT DO NOTHING;

INSERT INTO products (title_fr, title_en, title_ar, price, image, category_id, description_fr, description_en, description_ar)
SELECT 
  'Une brève histoire du temps',
  'A Brief History of Time',
  'تاريخ موجز للزمن',
  189.0,
  'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400',
  c.id,
  'Une introduction accessible aux mystères de l''univers et du temps.',
  'An accessible introduction to the mysteries of the universe and time.',
  'مقدمة مفهومة لأسرار الكون والزمن.'
FROM categories c WHERE c.slug = 'sciences'
ON CONFLICT DO NOTHING;

INSERT INTO products (title_fr, title_en, title_ar, price, image, category_id, description_fr, description_en, description_ar)
SELECT 
  'Le Petit Prince',
  'The Little Prince',
  'الأمير الصغير',
  89.0,
  'https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg?auto=compress&cs=tinysrgb&w=400',
  c.id,
  'Un conte poétique et philosophique intemporel pour petits et grands.',
  'A timeless poetic and philosophical tale for young and old.',
  'حكاية شعرية وفلسفية خالدة للصغار والكبار.'
FROM categories c WHERE c.slug = 'litterature-jeunesse'
ON CONFLICT DO NOTHING;