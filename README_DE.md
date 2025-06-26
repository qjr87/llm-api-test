# LLM API Test

Ein Tool zum Testen und Vergleichen der Leistung verschiedener Large Language Model APIs.

## Funktionen

- **Multi-API-Unterstützung**: Kompatibel mit OpenAI API und Google Gemini API
- **Leistungsmetriken**: Messung der ersten Token-Zeit und Ausgabegeschwindigkeit
- **Batch-Tests**: Teste mehrere Modelle und Prompts gleichzeitig
- **Mehrsprachige Unterstützung**: Verfügbar in Englisch, Chinesisch, Französisch, Japanisch, Deutsch, Spanisch und Arabisch
- **Echtzeit-Ergebnisse**: Live-Anzeige von Testfortschritt und Ergebnissen
- **Responsives Design**: Funktioniert auf Desktop und mobilen Geräten
- **Lokaler Speicher**: Speichert Ihre Konfiguration automatisch

## Schnellstart

### Lokale Entwicklung

1. Repository klonen:
```bash
git clone https://github.com/qjr87/llm-api-test.git
cd llm-api-test
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Lokalen Entwicklungsserver starten:
```bash
npm run dev
```

4. Browser öffnen und `http://localhost:8000` besuchen

### API-Konfiguration

1. **OpenAI-kompatible APIs**:
   - API-URL: `https://api.openai.com/v1/chat/completions`
   - API-Schlüssel: Ihr OpenAI API-Schlüssel (beginnt mit `sk-`)
   - Modelle: `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, etc.

2. **Google Gemini API**:
   - API-URL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
   - API-Schlüssel: Ihr Google AI API-Schlüssel
   - Modelle: `gemini-pro`, `gemini-pro-vision`, etc.

## Unterstützte APIs

- **OpenAI**: GPT-3.5, GPT-4, GPT-4 Turbo
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **Kompatible APIs**: Jeder OpenAI-kompatible API-Endpunkt

## Bereitstellung

### Cloudflare Workers

1. Worker erstellen:
```bash
npm run build
```

2. Auf Cloudflare Workers bereitstellen:
```bash
npm run deploy
```

3. Ihre benutzerdefinierte Domain konfigurieren (optional)

## Projektstruktur

```
llm-api-test/
├── index.html          # Haupt-HTML-Datei
├── app.js             # Anwendungslogik
├── api-handlers.js    # API-Behandlungsklassen
├── styles.css         # Styling
├── i18n.js           # Internationalisierung
├── worker.js         # Cloudflare Worker-Skript
├── worker-complete.js # Vollständiger Worker mit eingebetteten Assets
├── build-worker.js   # Build-Skript
├── package.json      # Abhängigkeiten und Skripte
├── wrangler.toml     # Cloudflare Workers-Konfiguration
└── README.md         # Dokumentation
```

## Tech-Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Bereitstellung**: Cloudflare Workers
- **Build-Tools**: Node.js, Wrangler CLI
- **APIs**: OpenAI API, Google Gemini API

## Mitwirken

1. Repository forken
2. Feature-Branch erstellen (`git checkout -b feature/amazing-feature`)
3. Änderungen committen (`git commit -m 'Add some amazing feature'`)
4. Zum Branch pushen (`git push origin feature/amazing-feature`)
5. Pull Request öffnen

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE)-Datei für Details.

## Kontakt

- GitHub: [@qjr87](https://github.com/qjr87)
- Projekt-Link: [https://github.com/qjr87/llm-api-test](https://github.com/qjr87/llm-api-test)

---

**Hinweis**: Dieses Tool dient Test- und Vergleichszwecken. Bitte stellen Sie sicher, dass Sie die Nutzungsbedingungen der APIs einhalten, die Sie testen.