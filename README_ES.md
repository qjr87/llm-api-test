# Herramienta de Prueba de API LLM

**Read this in other languages**: [English](README.md) | [中文](README_CN.md) | [العربية](README_AR.md) | [Deutsch](README_DE.md) | [Français](README_FR.md) | [日本語](README_JA.md)

Una herramienta para probar y comparar el rendimiento de diferentes APIs de Modelos de Lenguaje Grande.

## Características

- 🚀 **Soporte Multi-API**: Compatible con OpenAI, Google Gemini y otras APIs LLM principales
- ⚡ **Pruebas de Rendimiento**: Mide el tiempo de respuesta del primer token, velocidad de salida y tasa de éxito
- 📊 **Visualización de Datos**: Visualización en tiempo real de resultados de pruebas y estadísticas
- 🌍 **Soporte Multiidioma**: Disponible en inglés, chino, francés, japonés, alemán, español y árabe
- 📱 **Diseño Responsivo**: Se adapta a dispositivos de escritorio y móviles
- 💾 **Registros de Historial**: Guardado automático del historial de pruebas con opciones de exportación de datos
- ☁️ **Cloudflare Workers**: Soporta despliegue en plataformas de computación en el borde

## Inicio Rápido

### Configuración Local

1. Clonar el repositorio
```bash
git clone https://github.com/your-username/llm-api-test.git
cd llm-api-test
```

2. Iniciar un servidor local
```bash
python -m http.server 8000
```

3. Abrir el navegador y navegar a `http://localhost:8000`

### Configuración de API

1. Seleccionar el proveedor de API que deseas probar en el área de configuración
2. Introducir la clave API y endpoint correspondientes
3. Establecer parámetros de prueba (rondas, concurrencia, etc.)
4. Hacer clic en el botón "Iniciar Prueba"

## APIs Soportadas

- **OpenAI**: Modelos de la serie GPT-3.5, GPT-4
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **APIs Personalizadas**: Soporte para otras APIs compatibles con el formato OpenAI

## Despliegue

### Despliegue en Cloudflare Workers

1. Instalar Wrangler CLI
```bash
npm install -g wrangler
```

2. Iniciar sesión en Cloudflare
```bash
wrangler login
```

3. Construir y desplegar
```bash
node build-worker.js
wrangler deploy
```

Para instrucciones detalladas de despliegue, consulte [DEPLOYMENT.md](DEPLOYMENT.md)

## Estructura del Proyecto

```
llm-api-test/
├── index.html          # Página principal
├── app.js             # Lógica principal de la aplicación
├── api-handlers.js    # Manejadores de API
├── styles.css         # Hoja de estilos
├── i18n.js           # Configuración de internacionalización
├── worker.js         # Script de Cloudflare Workers
├── build-worker.js   # Script de construcción de Workers
└── wrangler.toml     # Configuración de Cloudflare
```

## Stack Tecnológico

- **Frontend**: HTML/CSS/JavaScript nativo
- **Despliegue**: Cloudflare Workers
- **APIs**: Soporte para múltiples APIs LLM
- **Internacionalización**: Soporte multiidioma

## Contribuir

¡Las contribuciones son bienvenidas! No dudes en enviar Issues y Pull Requests.

1. Hacer fork del proyecto
2. Crear tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Hacer commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Hacer push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles