# Livro

Page de présentation de Livro, construite avec React, TypeScript, Vite, Tailwind CSS, des composants inspirés de shadcn/ui et Zustand.

## Développement

- `npm install` : installer les dépendances
- `npm run dev` : lancer le serveur local
- `npm run build` : compiler pour la production
- `npm run preview` : prévisualiser le build localement

## Déploiement GitHub Pages

La base Vite et l’URL canonique ciblent le dépôt `iamkepo/livro`.

1. Vérifier que le dépôt distant Git est configuré et que vous avez le droit d’y pousser.
2. Exécuter `npm run deploy`. La commande compile le site puis publie `dist` sur la branche `gh-pages`.
3. Dans les réglages du dépôt, configurer **Settings → Pages → Deploy from a branch**, choisir `gh-pages` et le dossier `/ (root)`.

Le site est servi à l’adresse `https://iamkepo.github.io/livro/` une fois la publication terminée.
