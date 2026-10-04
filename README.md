# Livro

Site de Livro construit avec Astro, React, TypeScript, Tailwind CSS, des composants inspirés de shadcn/ui et Zustand. Astro génère une page HTML par route pour que les moteurs de recherche et les réseaux sociaux lisent les métadonnées SEO sans exécuter JavaScript.

## Pages et previews SEO

- `/livro/` : accueil
- `/livro/estimation/` : estimation de livraison
- `/livro/zones/` : zones desservies

Les titres, descriptions et images Open Graph/Twitter de chaque route sont configurés dans `src/pages/*.astro`. Le modèle des balises est dans `src/layouts/SiteLayout.astro`.

## Développement

- `npm install` : installer les dépendances
- `npm run dev` : lancer le serveur local
- `npm run build` : compiler pour la production
- `npm run preview` : prévisualiser le build localement

## Déploiement GitHub Pages

La base Astro et l’URL canonique ciblent le dépôt `iamkepo/livro`.

1. Vérifier que le dépôt distant Git est configuré et que vous avez le droit d’y pousser.
2. Exécuter `npm run deploy`. La commande compile le site puis publie `dist` sur la branche `gh-pages`.
3. Dans les réglages du dépôt, configurer **Settings → Pages → Deploy from a branch**, choisir `gh-pages` et le dossier `/ (root)`.

Le site est servi à l’adresse `https://iamkepo.github.io/livro/` une fois la publication terminée.
