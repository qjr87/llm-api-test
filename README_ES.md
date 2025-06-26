# LLM API Test

Una herramienta para probar y comparar el rendimiento de diferentes APIs de modelos de lenguaje de gran tamaño.

## Características

- **Soporte multi-API**: Compatible con API de OpenAI y API de Google Gemini
- **Métricas de rendimiento**: Mide el tiempo del primer token y la velocidad de salida
- **Pruebas por lotes**: Prueba múltiples modelos y prompts simultáneamente
- **Soporte multiidioma**: Disponible en inglés, chino, francés, japonés, alemán, español y árabe
- **Resultados en tiempo real**: Visualización en vivo del progreso de las pruebas y resultados
- **Diseño responsivo**: Funciona en escritorio y dispositivos móviles
- **Almacenamiento local**: Guarda automáticamente tu configuración

## Inicio rápido

### Desarrollo local

1. Clonar el repositorio:
```bash
git clone https://github.com/qjr87/llm-api-test.git
cd llm-api-test
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo local:
```bash
npm run dev
```

4. Abrir tu navegador y visitar `http://localhost:8000`

### Configuración de API

1. **APIs compatibles con OpenAI**:
   - URL de API: `https://api.openai.com/v1/chat/completions`
   - Clave de API: Tu clave de API de OpenAI (comienza con `sk-`)
   - Modelos: `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, etc.

2. **API de Google Gemini**:
   - URL de API: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
   - Clave de API: Tu clave de API de Google AI
   - Modelos: `gemini-pro`, `gemini-pro-vision`, etc.

## APIs soportadas

- **OpenAI**: GPT-3.5, GPT-4, GPT-4 Turbo
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **APIs compatibles**: Cualquier endpoint de API compatible con OpenAI

## Despliegue

### Cloudflare Workers

1. Construir el worker:
```bash
npm run build
```

2. Desplegar en Cloudflare Workers:
```bash
npm run deploy
```

3. Configurar tu dominio personalizado (opcional)

## Estructura del proyecto

```
llm-api-test/
├── index.html          # Archivo HTML principal
├── app.js             # Lógica de la aplicación
├── api-handlers.js    # Clases de manejo de API
├── styles.css         # Estilos
├── i18n.js           # Internacionalización
├── worker.js         # Script de Cloudflare Worker
├── worker-complete.js # Worker completo con assets integrados
├── build-worker.js   # Script de construcción
├── package.json      # Dependencias y scripts
├── wrangler.toml     # Configuración de Cloudflare Workers
└── README.md         # Documentación
```

## Stack tecnológico

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Despliegue**: Cloudflare Workers
- **Herramientas de construcción**: Node.js, Wrangler CLI
- **APIs**: API de OpenAI, API de Google Gemini

## Contribuir

1. Hacer fork del repositorio
2. Crear tu rama de característica (`git checkout -b feature/amazing-feature`)
3. Hacer commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Hacer push a la rama (`git push origin feature/amazing-feature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## Contacto

- GitHub: [@qjr87](https://github.com/qjr87)
- Enlace del proyecto: [https://github.com/qjr87/llm-api-test](https://github.com/qjr87/llm-api-test)

---

**Nota**: Esta herramienta es para propósitos de prueba y comparación. Por favor, asegúrate de cumplir con los términos de servicio de las APIs que estés probando.