# 📚 Système de Gestion de Bibliothèque

Un projet React moderne avec support multilingue (FR/EN/AR) et RTL pour la gestion d'une bibliothèque/librairie.

## 🌟 Fonctionnalités principales

- **Catalogue de produits** : Affichage des livres avec filtrage par catégories et recherche
- **Multilingue (i18n)** : Support complet français, anglais et arabe avec RTL
- **Intégration WhatsApp** : Bouton de contact direct pour chaque produit
- **Interface d'administration** : CRUD complet pour produits et catégories
- **Authentification mock** : Système de connexion sécurisé pour l'administration
- **Design responsive** : Interface optimisée pour tous les appareils
- **Animations fluides** : Transitions et micro-interactions avec Framer Motion

## 🛠️ Technologies utilisées

- **Frontend** : React 18 + TypeScript + Vite
- **Styles** : Tailwind CSS + shadcn/ui
- **Animations** : Framer Motion
- **Formulaires** : React Hook Form + Zod
- **Routing** : React Router DOM
- **i18n** : i18next + react-i18next
- **Notifications** : Sonner
- **Stockage** : JSON + localStorage (mock)

## 🚀 Installation et démarrage

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd library-management-system
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration des variables d'environnement**
   
   Le fichier `.env` est déjà configuré avec les valeurs par défaut :
   ```env
   VITE_ADMIN_EMAIL=admin@librairie.com
   VITE_ADMIN_PASSWORD=admin123
   VITE_WHATSAPP_PHONE=2126XXXXXXXX
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **Important:** Vous devez remplacer les valeurs Supabase par vos vraies clés :
   - `VITE_SUPABASE_URL` : L'URL de votre projet Supabase
   - `VITE_SUPABASE_ANON_KEY` : La clé publique anonyme de votre projet Supabase
   
   Ces valeurs se trouvent dans votre tableau de bord Supabase sous 'Project Settings' -> 'API'.

4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Ouvrir l'application**
   
   L'application sera disponible sur `http://localhost:5173`

## 📁 Structure du projet

```
src/
├── app/
│   └── app.tsx                 # Application principale avec routing
├── components/
│   ├── admin/                  # Composants d'administration
│   │   ├── admin-nav.tsx
│   │   ├── category-form.tsx
│   │   ├── product-form.tsx
│   │   └── protected-route.tsx
│   ├── layout/                 # Composants de mise en page
│   │   ├── container.tsx
│   │   ├── footer.tsx
│   │   ├── language-switcher.tsx
│   │   └── navbar.tsx
│   ├── product/                # Composants produits
│   │   ├── category-filter.tsx
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   └── search-bar.tsx
│   └── ui/                     # Composants UI (shadcn)
├── hooks/                      # Hooks personnalisés
│   ├── useAuth.ts
│   └── useRTL.ts
├── lib/                        # Utilitaires et configuration
│   ├── auth.ts
│   ├── i18n.ts
│   ├── storage.ts
│   ├── utils.ts
│   └── whatsapp.ts
├── pages/                      # Pages de l'application
│   ├── admin/
│   │   ├── categories.tsx
│   │   ├── dashboard.tsx
│   │   ├── login.tsx
│   │   └── products.tsx
│   ├── about.tsx
│   ├── contact.tsx
│   └── home.tsx
└── main.tsx

public/
├── data/                       # Données mock
│   ├── categories.json
│   └── products.json
└── locales/                    # Fichiers de traduction
    ├── fr/common.json
    ├── en/common.json
    └── ar/common.json
```

## 🌍 Internationalisation (i18n)

### Langues supportées
- **Français (fr)** : Langue par défaut
- **English (en)** : Anglais
- **العربية (ar)** : Arabe avec support RTL complet

### Configuration RTL
Le système bascule automatiquement en mode RTL (Right-to-Left) quand l'arabe est sélectionné :
- Direction du document : `dir="rtl"`
- Styles adaptés avec classes Tailwind
- Mise en page inversée pour les composants

### Ajouter une nouvelle langue

1. **Créer le fichier de traduction**
   ```
   public/locales/[code-langue]/common.json
   ```

2. **Ajouter la langue dans la configuration**
   ```typescript
   // src/lib/i18n.ts
   import newLang from '../../public/locales/[code-langue]/common.json';
   
   const resources = {
     // ... autres langues
     [codeLangre]: { translation: newLang },
   };
   ```

3. **Mettre à jour le sélecteur de langue**
   ```typescript
   // src/components/layout/language-switcher.tsx
   const languages = [
     // ... autres langues
     { code: 'nouvelleLangre', name: 'Nom', flag: '🏴‍' },
   ];
   ```

## 👨‍💼 Administration

### Accès à l'espace admin
- **URL** : `/admin`
- **Email** : `admin@librairie.com`
- **Mot de passe** : `admin123`

### Fonctionnalités admin
- **Dashboard** : Vue d'ensemble avec statistiques
- **Gestion des produits** : CRUD complet avec formulaires multilingues
- **Gestion des catégories** : Organisation du catalogue
- **Sécurité** : Protection par authentification et guards de routes

## 📱 Intégration WhatsApp

Les boutons WhatsApp génèrent automatiquement des messages personnalisés :
```
Bonjour, je suis intéressé(e) par ce livre: [TITRE] ([ID]) - Prix: [PRIX] MAD
```

Le numéro de téléphone est configurable via la variable `VITE_WHATSAPP_PHONE`.

## 💾 Stockage des données

Le système utilise un stockage mock basé sur :
- **Données initiales** : Fichiers JSON dans `/public/data/`
- **Persistance** : localStorage pour les modifications
- **Synchronisation** : Les changements sont sauvegardés localement

### Format des données

#### Catégorie
```json
{
  "id": "cat-001",
  "name": {
    "fr": "Romans",
    "en": "Novels", 
    "ar": "روايات"
  },
  "slug": "romans",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

#### Produit
```json
{
  "id": "prod-001",
  "title": {
    "fr": "L'Étranger",
    "en": "The Stranger",
    "ar": "الغريب"
  },
  "price": 129.0,
  "image": "url-image",
  "categoryId": "cat-001",
  "author": "Albert Camus",
  "publisher": "Gallimard",
  "isbn": "9782070360024",
  "description": {
    "fr": "Description en français",
    "en": "Description in English", 
    "ar": "الوصف بالعربية"
  },
  "createdAt": "2025-01-05T10:00:00.000Z"
}
```

## 🎨 Personnalisation du design

### Système de couleurs
Le projet utilise un système de couleurs cohérent basé sur les variables CSS :
- **Primary** : Couleur principale (bleu)
- **Secondary** : Couleur secondaire
- **Accent** : Couleur d'accent
- **Muted** : Couleurs atténuées
- **Destructive** : Couleurs d'erreur/suppression

### Animations
Les animations sont gérées par Framer Motion :
- **Transitions de page** : Fade et slide
- **Hover states** : Élévation des cartes
- **Loading states** : Skeletons animés

## 🧪 Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Linting
npm run lint
```

## 📝 Validation des formulaires

Le projet utilise Zod pour la validation avec des schémas stricts :
- **Validation côté client** : Temps réel avec react-hook-form
- **Messages d'erreur** : Internationalisés
- **Types TypeScript** : Générés automatiquement depuis les schémas

## 🔧 Développement

### Ajouter un nouveau composant UI
```bash
npx shadcn@latest add [component-name]
```

### Structure des hooks
```typescript
// Exemple de hook personnalisé
export function useCustomHook() {
  // ... logique
  return { data, loading, error };
}
```

### Bonnes pratiques
- **Typage strict** : Utilisation de TypeScript partout
- **Composants purs** : Séparation logique/présentation
- **Performance** : Lazy loading et optimisations
- **Accessibilité** : ARIA labels et navigation clavier

## 🚀 Déploiement

Le projet est prêt pour le déploiement sur toute plateforme supportant les SPA React :
- **Netlify** : Drag & drop du dossier `dist`
- **Vercel** : Import GitHub automatique
- **GitHub Pages** : Avec GitHub Actions

## 📄 Licence

Ce projet est sous licence MIT.

---

**Note** : Ce projet utilise des données mock pour la démonstration. Pour un environnement de production, remplacez le système de stockage par une vraie API et base de données.