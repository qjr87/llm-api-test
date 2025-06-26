# LLM API Test

Un outil pour tester et comparer les performances de différentes APIs de modèles de langage de grande taille.

## Fonctionnalités

- **Support multi-API** : Compatible avec l'API OpenAI et l'API Google Gemini
- **Métriques de performance** : Mesure du temps du premier jeton et de la vitesse de sortie
- **Tests par lots** : Teste plusieurs modèles et invites simultanément
- **Support multilingue** : Disponible en anglais, chinois, français, japonais, allemand, espagnol et arabe
- **Résultats en temps réel** : Affichage en direct du progrès des tests et des résultats
- **Design réactif** : Fonctionne sur ordinateur et appareils mobiles
- **Stockage local** : Sauvegarde automatiquement votre configuration

## Démarrage rapide

### Développement local

1. Cloner le dépôt :
```bash
git clone https://github.com/qjr87/llm-api-test.git
cd llm-api-test
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer le serveur de développement local :
```bash
npm run dev
```

4. Ouvrir votre navigateur et visiter `http://localhost:8000`

### Configuration de l'API

1. **APIs compatibles OpenAI** :
   - URL de l'API : `https://api.openai.com/v1/chat/completions`
   - Clé API : Votre clé API OpenAI (commence par `sk-`)
   - Modèles : `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, etc.

2. **API Google Gemini** :
   - URL de l'API : `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
   - Clé API : Votre clé API Google AI
   - Modèles : `gemini-pro`, `gemini-pro-vision`, etc.

## APIs supportées

- **OpenAI** : GPT-3.5, GPT-4, GPT-4 Turbo
- **Google Gemini** : Gemini Pro, Gemini Pro Vision
- **APIs compatibles** : Tout point de terminaison d'API compatible OpenAI

## Déploiement

### Cloudflare Workers

1. Construire le worker :
```bash
npm run build
```

2. Déployer sur Cloudflare Workers :
```bash
npm run deploy
```

3. Configurer votre domaine personnalisé (optionnel)

## Structure du projet

```
llm-api-test/
├── index.html          # Fichier HTML principal
├── app.js             # Logique de l'application
├── api-handlers.js    # Classes de gestion des API
├── styles.css         # Styles
├── i18n.js           # Internationalisation
├── worker.js         # Script Cloudflare Worker
├── worker-complete.js # Worker complet avec assets intégrés
├── build-worker.js   # Script de construction
├── package.json      # Dépendances et scripts
├── wrangler.toml     # Configuration Cloudflare Workers
└── README.md         # Documentation
```

## Stack technologique

- **Frontend** : Vanilla JavaScript, HTML5, CSS3
- **Déploiement** : Cloudflare Workers
- **Outils de construction** : Node.js, Wrangler CLI
- **APIs** : API OpenAI, API Google Gemini

## Contribution

1. Forker le dépôt
2. Créer votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commiter vos changements (`git commit -m 'Add some amazing feature'`)
4. Pousser vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contact

- GitHub : [@qjr87](https://github.com/qjr87)
- Lien du projet : [https://github.com/qjr87/llm-api-test](https://github.com/qjr87/llm-api-test)

---

**Note** : Cet outil est destiné aux tests et à la comparaison. Veuillez vous assurer de respecter les conditions d'utilisation des APIs que vous testez.