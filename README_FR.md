# Outil de Test d'API LLM

**Read this in other languages**: [English](README.md) | [中文](README_CN.md) | [العربية](README_AR.md) | [Deutsch](README_DE.md) | [Español](README_ES.md) | [日本語](README_JA.md)

Un outil pour tester et comparer les performances de différentes APIs de Modèles de Langage Large.

## Fonctionnalités

- 🚀 **Support Multi-API**: Compatible avec OpenAI, Google Gemini et autres APIs LLM principales
- ⚡ **Tests de Performance**: Mesure le temps de réponse du premier token, la vitesse de sortie et le taux de succès
- 📊 **Visualisation de Données**: Affichage en temps réel des résultats de tests et statistiques
- 🌍 **Support Multilingue**: Disponible en anglais, chinois, français, japonais, allemand, espagnol et arabe
- 📱 **Design Responsive**: S'adapte aux appareils de bureau et mobiles
- 💾 **Enregistrements d'Historique**: Sauvegarde automatique de l'historique des tests avec options d'exportation de données
- ☁️ **Cloudflare Workers**: Supporte le déploiement sur des plateformes de calcul en périphérie

## Démarrage Rapide

### Configuration Locale

1. Cloner le dépôt
```bash
git clone https://github.com/your-username/llm-api-test.git
cd llm-api-test
```

2. Démarrer un serveur local
```bash
python -m http.server 8000
```

3. Ouvrir votre navigateur et naviguer vers `http://localhost:8000`

### Configuration de l'API

1. Sélectionner le fournisseur d'API que vous voulez tester dans la zone de configuration
2. Entrer la clé API et le point de terminaison correspondants
3. Définir les paramètres de test (tours, concurrence, etc.)
4. Cliquer sur le bouton "Démarrer le Test"

## APIs Supportées

- **OpenAI**: Modèles de la série GPT-3.5, GPT-4
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **APIs Personnalisées**: Support pour d'autres APIs compatibles avec le format OpenAI

## Déploiement

### Déploiement Cloudflare Workers

1. Installer Wrangler CLI
```bash
npm install -g wrangler
```

2. Se connecter à Cloudflare
```bash
wrangler login
```

3. Construire et déployer
```bash
node build-worker.js
wrangler deploy
```

Pour des instructions de déploiement détaillées, veuillez vous référer à [DEPLOYMENT.md](DEPLOYMENT.md)

## Structure du Projet

```
llm-api-test/
├── index.html          # Page principale
├── app.js             # Logique principale de l'application
├── api-handlers.js    # Gestionnaires d'API
├── styles.css         # Feuille de style
├── i18n.js           # Configuration d'internationalisation
├── worker.js         # Script Cloudflare Workers
├── build-worker.js   # Script de construction Workers
└── wrangler.toml     # Configuration Cloudflare
```

## Stack Technologique

- **Frontend**: HTML/CSS/JavaScript natif
- **Déploiement**: Cloudflare Workers
- **APIs**: Support pour plusieurs APIs LLM
- **Internationalisation**: Support multilingue

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des Issues et Pull Requests.

1. Forker le projet
2. Créer votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committer vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pousser vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Licence MIT - voir le fichier [LICENSE](LICENSE) pour les détails