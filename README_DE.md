# LLM API Test Tool

**Read this in other languages**: [English](README.md) | [中文](README_CN.md) | [العربية](README_AR.md) | [Español](README_ES.md) | [Français](README_FR.md) | [日本語](README_JA.md)

Ein Tool zum Testen und Vergleichen der Leistung verschiedener Large Language Model APIs.

## Funktionen

- 🚀 **Multi-API-Unterstützung**: Kompatibel mit OpenAI, Google Gemini und anderen wichtigen LLM-APIs
- ⚡ **Leistungstests**: Misst die Antwortzeit des ersten Tokens, Ausgabegeschwindigkeit und Erfolgsrate
- 📊 **Datenvisualisierung**: Echtzeitanzeige von Testergebnissen und Statistiken
- 🌍 **Mehrsprachige Unterstützung**: Verfügbar in Englisch, Chinesisch, Französisch, Japanisch, Deutsch, Spanisch und Arabisch
- 📱 **Responsives Design**: Passt sich an Desktop- und Mobilgeräte an
- 💾 **Verlaufsdatensätze**: Automatisches Speichern der Testhistorie mit Datenexportoptionen
- ☁️ **Cloudflare Workers**: Unterstützt die Bereitstellung auf Edge-Computing-Plattformen

## Schnellstart

### Lokale Einrichtung

1. Repository klonen
```bash
git clone https://github.com/your-username/llm-api-test.git
cd llm-api-test
```

2. Lokalen Server starten
```bash
python -m http.server 8000
```

3. Browser öffnen und zu `http://localhost:8000` navigieren

### API-Konfiguration

1. Wählen Sie den API-Anbieter aus, den Sie im Konfigurationsbereich testen möchten
2. Geben Sie den entsprechenden API-Schlüssel und Endpunkt ein
3. Testparameter festlegen (Runden, Parallelität usw.)
4. Klicken Sie auf die Schaltfläche "Test starten"

## Unterstützte APIs

- **OpenAI**: GPT-3.5, GPT-4 Serie Modelle
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **Benutzerdefinierte APIs**: Unterstützung für andere APIs, die mit dem OpenAI-Format kompatibel sind

## Bereitstellung

### Cloudflare Workers Bereitstellung

1. Wrangler CLI installieren
```bash
npm install -g wrangler
```

2. Bei Cloudflare anmelden
```bash
wrangler login
```

3. Erstellen und bereitstellen
```bash
node build-worker.js
wrangler deploy
```

Detaillierte Bereitstellungsanweisungen finden Sie in [DEPLOYMENT.md](DEPLOYMENT.md)

## Projektstruktur

```
llm-api-test/
├── index.html          # Hauptseite
├── app.js             # Hauptanwendungslogik
├── api-handlers.js    # API-Handler
├── styles.css         # Stylesheet
├── i18n.js           # Internationalisierungskonfiguration
├── worker.js         # Cloudflare Workers Skript
├── build-worker.js   # Workers Build-Skript
└── wrangler.toml     # Cloudflare-Konfiguration
```

## Tech Stack

- **Frontend**: Natives HTML/CSS/JavaScript
- **Bereitstellung**: Cloudflare Workers
- **APIs**: Unterstützung für mehrere LLM-APIs
- **Internationalisierung**: Mehrsprachige Unterstützung

## Mitwirken

Beiträge sind willkommen! Zögern Sie nicht, Issues und Pull Requests einzureichen.

1. Projekt forken
2. Feature-Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Zum Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

## Lizenz

MIT-Lizenz - siehe [LICENSE](LICENSE) Datei für Details