# Outil de Test d'API LLM

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/stargazers)
[![GitHub license](https://img.shields.io/github/license/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/issues)

**🚀 Un outil complet pour tester et comparer les performances des APIs de Modèles de Langage Large**

## 🌐 [🚀 Démo en Direct - Essayez Maintenant !](https://llmapitest.com)

**Langues :** [English](README.md) | [中文](README_CN.md) | [العربية](README_AR.md) | [Deutsch](README_DE.md) | [Español](README_ES.md) | [Français](README_FR.md) | [日本語](README_JA.md)

</div>

## 📖 Aperçu

LLM API Test est un outil puissant basé sur le web conçu pour benchmarker et comparer les performances de diverses APIs de Modèles de Langage Large. Que vous évaluiez différents fournisseurs, optimisiez vos applications IA ou meniez des recherches, cet outil fournit des métriques et des insights complets.

## ✨ Fonctionnalités Principales

### 🔌 Support d'API
- **OpenAI** : GPT-3.5, GPT-4 et modèles les plus récents
- **Google Gemini** : Gemini Pro, Gemini Pro Vision
- **APIs Personnalisées** : Tout endpoint d'API compatible OpenAI

### 📊 Métriques de Performance
- **Temps de Réponse** : Mesure de la latence du premier token
- **Vitesse de Sortie** : Calcul des tokens par seconde
- **Taux de Réussite** : Suivi de la fiabilité de l'API
- **Évaluation de Qualité** : Outils de comparaison des réponses

### 🌐 Expérience Utilisateur
- **Interface Multilingue** : Support de 7 langues
- **Design Responsive** : Fonctionne sur desktop et mobile
- **Résultats en Temps Réel** : Surveillance des performances en direct
- **Suivi d'Historique** : Enregistrements de tests persistants

### ☁️ Options de Déploiement
- **Développement Local** : Configuration simple de serveur HTTP
- **Hébergement Statique** : Compatible avec tout hébergeur statique

## 🚀 Démarrage Rapide

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Node.js et npm installés
- Clés API pour les services que vous souhaitez tester

### Développement Local

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/qjr87/llm-api-test.git
   cd llm-api-test
   ```

2. **Installer les dépendances et démarrer le serveur**
   ```bash
   npm install
   npm start
   ```

   **Méthodes alternatives :**
   ```bash
   # Avec Python 3
   python -m http.server 8000
   
   # Avec PHP
   php -S localhost:8000
   ```

3. **Ouvrir dans le navigateur**
   Naviguer vers `http://localhost:8000`

### 🔧 Guide de Configuration

#### Configuration API
1. **Sélectionner le Protocole** : Choisissez votre fournisseur d'API (OpenAI, Gemini ou Personnalisé)
2. **Entrer l'Endpoint** : URL de l'API (auto-rempli pour les fournisseurs standard)
3. **Ajouter la Clé API** : Votre clé d'authentification
4. **Configurer les Modèles** : Spécifiez quels modèles tester

#### Paramètres de Test
- **Tours de Test** : Nombre d'itérations par modèle
- **Prompts** : Prompts de test personnalisés ou utiliser les défauts
- **Concurrence** : Gestion des requêtes parallèles

#### Exemple de Configuration
```javascript
// Configuration OpenAI
Protocole : "openai"
URL API : "https://api.openai.com/v1/chat/completions"
Clé API : "sk-..."
Modèles : "gpt-3.5-turbo,gpt-4"

// Configuration Gemini
Protocole : "gemini"
URL API : "https://generativelanguage.googleapis.com/v1beta/models"
Modèles : "gemini-pro"
```

## 🚀 Déploiement

### Hébergement Statique

Déployez sur n'importe quel service d'hébergement statique :

- **Vercel** : `vercel --prod`
- **Netlify** : Glisser-déposer le dossier du projet
- **GitHub Pages** : Activer dans les paramètres du dépôt
- **Firebase Hosting** : `firebase deploy`

### Déploiement Docker

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t llm-api-test .
docker run -p 8080:80 llm-api-test
```

## 📁 Structure du Projet

```
llm-api-test/
├── 📄 index.html          # Interface principale de l'application
├── 🧠 app.js             # Logique centrale de l'application et orchestration des tests
├── 🔌 api-handlers.js    # Implémentations des protocoles API
├── 🎨 styles.css         # Styles UI responsifs
├── 🌍 i18n.js           # Internationalisation et support linguistique
└── 📜 LICENSE           # Licence MIT
```

### Composants Principaux

- **Classe APITester** : Orchestration principale des tests et gestion de l'UI
- **Classe APIHandler** : Implémentations d'API spécifiques au protocole
- **Système I18n** : Support multilingue avec chargement dynamique
- **Moteur de Résultats** : Calcul des métriques de performance en temps réel

## 🛠️ Stack Technologique

### Frontend
- **HTML5** : Balisage sémantique et accessibilité
- **CSS3** : Styles modernes avec Flexbox/Grid
- **JavaScript Vanilla** : Aucune dépendance de framework
- **APIs Web** : Fetch, LocalStorage, Internationalisation

### Architecture
- **Design Modulaire** : Séparation des préoccupations
- **Orienté Événements** : Mises à jour réactives de l'UI
- **Amélioration Progressive** : Fonctionne sans JavaScript
- **Mobile-First** : Principes de design responsive

### Déploiement
- **Hébergement Statique** : Compatibilité universelle
- **Prêt pour CDN** : Distribution globale de contenu

## 📊 Explication des Métriques de Performance

| Métrique | Description | Bonne Plage |
|----------|-------------|-------------|
| **Temps du Premier Token** | Temps pour recevoir le premier token de réponse | < 2 secondes |
| **Vitesse de Sortie** | Tokens générés par seconde | > 10 tokens/sec |
| **Taux de Réussite** | Pourcentage de requêtes réussies | > 95% |
| **Temps Total** | Temps complet de génération de réponse | Varie selon la longueur |

## 🤝 Contribuer

Nous accueillons les contributions ! Voici comment vous pouvez aider :

### Configuration de Développement
1. **Forker** le dépôt
2. **Cloner** votre fork localement
3. **Créer** une branche de fonctionnalité
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Effectuer** vos modifications
5. **Tester** minutieusement
6. **Committer** avec des messages clairs
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Pousser** vers votre fork
8. **Soumettre** une Pull Request

### Directives de Contribution
- Suivre le style de code existant
- Ajouter des tests pour les nouvelles fonctionnalités
- Mettre à jour la documentation
- Assurer la compatibilité cross-browser

### Domaines de Contribution
- 🌐 Traductions linguistiques supplémentaires
- 🔌 Support de nouveaux fournisseurs d'API
- 📊 Métriques et visualisations améliorées
- 🎨 Améliorations UI/UX
- 🐛 Corrections de bugs et optimisations

## ❓ FAQ

<details>
<summary><strong>Comment obtenir des clés API ?</strong></summary>

- **OpenAI** : Visitez [platform.openai.com](https://platform.openai.com/api-keys)
- **Google Gemini** : Commencez sur [ai.google.dev](https://ai.google.dev/)
- **APIs Personnalisées** : Consultez la documentation de votre fournisseur

</details>

<details>
<summary><strong>Pourquoi mes tests échouent-ils ?</strong></summary>

- Vérifiez que la clé API est correcte et a suffisamment de crédits
- Vérifiez si l'URL de l'endpoint API est précise
- Assurez-vous que votre IP n'est pas bloquée par le fournisseur
- Essayez de réduire la concurrence ou les tours de test

</details>

<details>
<summary><strong>Puis-je tester des modèles personnalisés ?</strong></summary>

Oui ! Utilisez l'option de protocole "Personnalisé" et fournissez :
- Votre URL d'endpoint API
- Méthode d'authentification
- Noms des modèles

</details>

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour les détails.

## 🙏 Remerciements

- Merci à tous les contributeurs qui aident à améliorer cet outil
- Inspiré par le besoin de tests transparents de performance IA
- Construit avec ❤️ pour la communauté de développement IA

---

<div align="center">

**[⭐ Étoiler ce dépôt](https://github.com/qjr87/llm-api-test) si vous le trouvez utile !**

Fait avec ❤️ par [qjr87](https://github.com/qjr87)

</div>