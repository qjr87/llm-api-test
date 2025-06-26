# LLM API Test-Tool

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/stargazers)
[![GitHub license](https://img.shields.io/github/license/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/issues)

**🚀 Ein umfassendes Tool zum Testen und Vergleichen der Leistung von Large Language Model APIs**

## 🌐 [🚀 Live-Demo - Jetzt ausprobieren!](https://llmapitest.com)

**Sprachen:** [English](README.md) | [中文](README_CN.md) | [العربية](README_AR.md) | [Deutsch](README_DE.md) | [Español](README_ES.md) | [Français](README_FR.md) | [日本語](README_JA.md)

</div>

## 📖 Überblick

LLM API Test ist ein leistungsstarkes, webbasiertes Tool, das entwickelt wurde, um die Leistung verschiedener Large Language Model APIs zu benchmarken und zu vergleichen. Ob Sie verschiedene Anbieter bewerten, Ihre KI-Anwendungen optimieren oder Forschung betreiben - dieses Tool bietet umfassende Metriken und Einblicke.

## ✨ Hauptfunktionen

### 🔌 API-Unterstützung
- **OpenAI**: GPT-3.5, GPT-4 und neueste Modelle
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **Benutzerdefinierte APIs**: Jeder OpenAI-kompatible API-Endpunkt

### 📊 Leistungsmetriken
- **Antwortzeit**: Messung der ersten Token-Latenz
- **Ausgabegeschwindigkeit**: Berechnung der Token pro Sekunde
- **Erfolgsrate**: Verfolgung der API-Zuverlässigkeit
- **Qualitätsbewertung**: Tools zum Vergleich von Antworten

### 🌐 Benutzererfahrung
- **Mehrsprachige Oberfläche**: Unterstützung für 7 Sprachen
- **Responsives Design**: Funktioniert auf Desktop und Mobilgeräten
- **Echtzeitresultate**: Live-Leistungsüberwachung
- **Verlaufsverfolgung**: Persistente Testaufzeichnungen

### ☁️ Bereitstellungsoptionen
- **Lokale Entwicklung**: Einfache HTTP-Server-Einrichtung
- **Statisches Hosting**: Kompatibel mit jedem statischen Host

## 🚀 Schnellstart

### Voraussetzungen
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Node.js und npm installiert
- API-Schlüssel für die Dienste, die Sie testen möchten

### Lokale Entwicklung

1. **Repository klonen**
   ```bash
   git clone https://github.com/qjr87/llm-api-test.git
   cd llm-api-test
   ```

2. **Abhängigkeiten installieren und Server starten**
   ```bash
   npm install
   npm start
   ```

   **Alternative Methoden:**
   ```bash
   # Mit Python 3
   python -m http.server 8000
   
   # Mit PHP
   php -S localhost:8000
   ```

3. **Im Browser öffnen**
   Navigieren Sie zu `http://localhost:8000`

### 🔧 Konfigurationsleitfaden

#### API-Einrichtung
1. **Protokoll auswählen**: Wählen Sie Ihren API-Anbieter (OpenAI, Gemini oder Benutzerdefiniert)
2. **Endpunkt eingeben**: API-URL (automatisch ausgefüllt für Standardanbieter)
3. **API-Schlüssel hinzufügen**: Ihr Authentifizierungsschlüssel
4. **Modelle konfigurieren**: Geben Sie an, welche Modelle getestet werden sollen

#### Testparameter
- **Testrunden**: Anzahl der Iterationen pro Modell
- **Prompts**: Benutzerdefinierte Testprompts oder Standardwerte verwenden
- **Parallelität**: Parallele Anfrageverarbeitung

#### Beispielkonfiguration
```javascript
// OpenAI-Konfiguration
Protokoll: "openai"
API-URL: "https://api.openai.com/v1/chat/completions"
API-Schlüssel: "sk-..."
Modelle: "gpt-3.5-turbo,gpt-4"

// Gemini-Konfiguration
Protokoll: "gemini"
API-URL: "https://generativelanguage.googleapis.com/v1beta/models"
Modelle: "gemini-pro"
```

## 🚀 Bereitstellung

### Statisches Hosting

Bereitstellung auf jedem statischen Hosting-Dienst:

- **Vercel**: `vercel --prod`
- **Netlify**: Projektordner per Drag & Drop
- **GitHub Pages**: In Repository-Einstellungen aktivieren
- **Firebase Hosting**: `firebase deploy`

### Docker-Bereitstellung

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

## 📁 Projektstruktur

```
llm-api-test/
├── 📄 index.html          # Hauptanwendungsschnittstelle
├── 🧠 app.js             # Kernanwendungslogik und Testorchestration
├── 🔌 api-handlers.js    # API-Protokollimplementierungen
├── 🎨 styles.css         # Responsives UI-Styling
├── 🌍 i18n.js           # Internationalisierung und Sprachunterstützung
└── 📜 LICENSE           # MIT-Lizenz
```

### Kernkomponenten

- **APITester-Klasse**: Haupttestorchestration und UI-Verwaltung
- **APIHandler-Klasse**: Protokollspezifische API-Implementierungen
- **I18n-System**: Mehrsprachige Unterstützung mit dynamischem Laden
- **Ergebnis-Engine**: Echtzeitberechnung von Leistungsmetriken

## 🛠️ Tech-Stack

### Frontend
- **HTML5**: Semantisches Markup und Barrierefreiheit
- **CSS3**: Modernes Styling mit Flexbox/Grid
- **Vanilla JavaScript**: Keine Framework-Abhängigkeiten
- **Web-APIs**: Fetch, LocalStorage, Internationalisierung

### Architektur
- **Modulares Design**: Trennung der Belange
- **Ereignisgesteuert**: Reaktive UI-Updates
- **Progressive Verbesserung**: Funktioniert ohne JavaScript
- **Mobile-First**: Responsive Design-Prinzipien

### Bereitstellung
- **Statisches Hosting**: Universelle Kompatibilität
- **CDN-bereit**: Globale Inhaltsverteilung

## 📊 Erklärung der Leistungsmetriken

| Metrik | Beschreibung | Guter Bereich |
|--------|--------------|---------------|
| **Erste Token-Zeit** | Zeit bis zum Empfang des ersten Antwort-Tokens | < 2 Sekunden |
| **Ausgabegeschwindigkeit** | Generierte Token pro Sekunde | > 10 Token/Sek |
| **Erfolgsrate** | Prozentsatz erfolgreicher Anfragen | > 95% |
| **Gesamtzeit** | Vollständige Antwortgenerierungszeit | Variiert je nach Länge |

## 🤝 Mitwirken

Wir begrüßen Beiträge! So können Sie helfen:

### Entwicklungssetup
1. Repository **forken**
2. Ihren Fork lokal **klonen**
3. Feature-Branch **erstellen**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. Änderungen **vornehmen**
5. **Gründlich testen**
6. Mit klaren Nachrichten **committen**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. Zu Ihrem Fork **pushen**
8. Pull Request **einreichen**

### Beitragsrichtlinien
- Bestehenden Code-Stil befolgen
- Tests für neue Features hinzufügen
- Dokumentation aktualisieren
- Cross-Browser-Kompatibilität sicherstellen

### Bereiche für Beiträge
- 🌐 Zusätzliche Sprachübersetzungen
- 🔌 Neue API-Anbieter-Unterstützung
- 📊 Erweiterte Metriken und Visualisierungen
- 🎨 UI/UX-Verbesserungen
- 🐛 Fehlerbehebungen und Optimierungen

## ❓ Häufig gestellte Fragen

<details>
<summary><strong>Wie erhalte ich API-Schlüssel?</strong></summary>

- **OpenAI**: Besuchen Sie [platform.openai.com](https://platform.openai.com/api-keys)
- **Google Gemini**: Beginnen Sie bei [ai.google.dev](https://ai.google.dev/)
- **Benutzerdefinierte APIs**: Überprüfen Sie die Dokumentation Ihres Anbieters

</details>

<details>
<summary><strong>Warum schlagen meine Tests fehl?</strong></summary>

- Überprüfen Sie, ob der API-Schlüssel korrekt ist und ausreichend Guthaben hat
- Prüfen Sie, ob die API-Endpunkt-URL korrekt ist
- Stellen Sie sicher, dass Ihre IP nicht vom Anbieter blockiert wird
- Versuchen Sie, Parallelität oder Testrunden zu reduzieren

</details>

<details>
<summary><strong>Kann ich benutzerdefinierte Modelle testen?</strong></summary>

Ja! Verwenden Sie die "Benutzerdefiniert"-Protokolloption und geben Sie an:
- Ihre API-Endpunkt-URL
- Authentifizierungsmethode
- Modellnamen

</details>

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE)-Datei für Details.

## 🙏 Danksagungen

- Dank an alle Mitwirkenden, die helfen, dieses Tool zu verbessern
- Inspiriert von der Notwendigkeit transparenter KI-Leistungstests
- Mit ❤️ für die KI-Entwicklungsgemeinschaft erstellt

---

<div align="center">

**[⭐ Dieses Repo bewerten](https://github.com/qjr87/llm-api-test), wenn Sie es hilfreich finden!**

Mit ❤️ von [qjr87](https://github.com/qjr87) erstellt

</div>