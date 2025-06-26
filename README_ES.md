# Herramienta de Prueba de API LLM

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/stargazers)
[![GitHub license](https://img.shields.io/github/license/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/qjr87/llm-api-test?style=flat-square)](https://github.com/qjr87/llm-api-test/issues)

**🚀 Una herramienta integral para probar y comparar el rendimiento de APIs de Modelos de Lenguaje Grande**

## 🌐 [🚀 Demo en Vivo - ¡Pruébalo Ahora!](https://llmapitest.com)

**Idiomas:** [English](README.md) | [中文](README_CN.md) | [العربية](README_AR.md) | [Deutsch](README_DE.md) | [Español](README_ES.md) | [Français](README_FR.md) | [日本語](README_JA.md)

</div>

## 📖 Descripción General

LLM API Test es una herramienta poderosa basada en web diseñada para hacer benchmarks y comparar el rendimiento de varias APIs de Modelos de Lenguaje Grande. Ya sea que estés evaluando diferentes proveedores, optimizando tus aplicaciones de IA o realizando investigación, esta herramienta proporciona métricas e insights integrales.

## ✨ Características Principales

### 🔌 Soporte de API
- **OpenAI**: GPT-3.5, GPT-4 y modelos más recientes
- **Google Gemini**: Gemini Pro, Gemini Pro Vision
- **APIs Personalizadas**: Cualquier endpoint de API compatible con OpenAI

### 📊 Métricas de Rendimiento
- **Tiempo de Respuesta**: Medición de latencia del primer token
- **Velocidad de Salida**: Cálculo de tokens por segundo
- **Tasa de Éxito**: Seguimiento de confiabilidad de API
- **Evaluación de Calidad**: Herramientas de comparación de respuestas

### 🌐 Experiencia de Usuario
- **Interfaz Multiidioma**: Soporte para 7 idiomas
- **Diseño Responsivo**: Funciona en escritorio y móvil
- **Resultados en Tiempo Real**: Monitoreo de rendimiento en vivo
- **Seguimiento de Historial**: Registros de prueba persistentes

### ☁️ Opciones de Despliegue
- **Desarrollo Local**: Configuración simple de servidor HTTP
- **Hosting Estático**: Compatible con cualquier host estático

## 🚀 Inicio Rápido

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Node.js y npm instalados
- Claves API para los servicios que deseas probar

### Desarrollo Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/qjr87/llm-api-test.git
   cd llm-api-test
   ```

2. **Instalar dependencias e iniciar el servidor**
   ```bash
   npm install
   npm start
   ```

   **Métodos alternativos:**
   ```bash
   # Usando Python 3
   python -m http.server 8000
   
   # Usando PHP
   php -S localhost:8000
   ```

3. **Abrir en el navegador**
   Navegar a `http://localhost:8000`

### 🔧 Guía de Configuración

#### Configuración de API
1. **Seleccionar Protocolo**: Elige tu proveedor de API (OpenAI, Gemini o Personalizado)
2. **Ingresar Endpoint**: URL de API (auto-completado para proveedores estándar)
3. **Agregar Clave API**: Tu clave de autenticación
4. **Configurar Modelos**: Especifica qué modelos probar

#### Parámetros de Prueba
- **Rondas de Prueba**: Número de iteraciones por modelo
- **Prompts**: Prompts de prueba personalizados o usar predeterminados
- **Concurrencia**: Manejo de solicitudes paralelas

#### Ejemplo de Configuración
```javascript
// Configuración OpenAI
Protocolo: "openai"
URL API: "https://api.openai.com/v1/chat/completions"
Clave API: "sk-..."
Modelos: "gpt-3.5-turbo,gpt-4"

// Configuración Gemini
Protocolo: "gemini"
URL API: "https://generativelanguage.googleapis.com/v1beta/models"
Modelos: "gemini-pro"
```

## 🚀 Despliegue

### Hosting Estático

Despliega en cualquier servicio de hosting estático:

- **Vercel**: `vercel --prod`
- **Netlify**: Arrastra y suelta la carpeta del proyecto
- **GitHub Pages**: Habilita en la configuración del repositorio
- **Firebase Hosting**: `firebase deploy`

### Despliegue con Docker

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

## 📁 Estructura del Proyecto

```
llm-api-test/
├── 📄 index.html          # Interfaz principal de la aplicación
├── 🧠 app.js             # Lógica central de la aplicación y orquestación de pruebas
├── 🔌 api-handlers.js    # Implementaciones de protocolos API
├── 🎨 styles.css         # Estilos de UI responsivos
├── 🌍 i18n.js           # Internacionalización y soporte de idiomas
└── 📜 LICENSE           # Licencia MIT
```

### Componentes Principales

- **Clase APITester**: Orquestación principal de pruebas y gestión de UI
- **Clase APIHandler**: Implementaciones de API específicas por protocolo
- **Sistema I18n**: Soporte multiidioma con carga dinámica
- **Motor de Resultados**: Cálculo de métricas de rendimiento en tiempo real

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5**: Marcado semántico y accesibilidad
- **CSS3**: Estilos modernos con Flexbox/Grid
- **JavaScript Vanilla**: Sin dependencias de frameworks
- **APIs Web**: Fetch, LocalStorage, Internacionalización

### Arquitectura
- **Diseño Modular**: Separación de responsabilidades
- **Orientado a Eventos**: Actualizaciones reactivas de UI
- **Mejora Progresiva**: Funciona sin JavaScript
- **Mobile-First**: Principios de diseño responsivo

### Despliegue
- **Hosting Estático**: Compatibilidad universal
- **Listo para CDN**: Distribución global de contenido

## 📊 Explicación de Métricas de Rendimiento

| Métrica | Descripción | Rango Bueno |
|---------|-------------|-------------|
| **Tiempo del Primer Token** | Tiempo para recibir el primer token de respuesta | < 2 segundos |
| **Velocidad de Salida** | Tokens generados por segundo | > 10 tokens/seg |
| **Tasa de Éxito** | Porcentaje de solicitudes exitosas | > 95% |
| **Tiempo Total** | Tiempo completo de generación de respuesta | Varía según longitud |

## 🤝 Contribuir

¡Damos la bienvenida a las contribuciones! Así es como puedes ayudar:

### Configuración de Desarrollo
1. **Hacer Fork** del repositorio
2. **Clonar** tu fork localmente
3. **Crear** una rama de característica
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Realizar** tus cambios
5. **Probar** exhaustivamente
6. **Hacer Commit** con mensajes claros
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Hacer Push** a tu fork
8. **Enviar** un Pull Request

### Pautas de Contribución
- Seguir el estilo de código existente
- Agregar pruebas para nuevas características
- Actualizar documentación
- Asegurar compatibilidad entre navegadores

### Áreas para Contribución
- 🌐 Traducciones de idiomas adicionales
- 🔌 Soporte para nuevos proveedores de API
- 📊 Métricas y visualizaciones mejoradas
- 🎨 Mejoras de UI/UX
- 🐛 Corrección de errores y optimizaciones

## ❓ Preguntas Frecuentes

<details>
<summary><strong>¿Cómo obtengo claves API?</strong></summary>

- **OpenAI**: Visita [platform.openai.com](https://platform.openai.com/api-keys)
- **Google Gemini**: Comienza en [ai.google.dev](https://ai.google.dev/)
- **APIs Personalizadas**: Consulta la documentación de tu proveedor

</details>

<details>
<summary><strong>¿Por qué fallan mis pruebas?</strong></summary>

- Verifica que la clave API sea correcta y tenga créditos suficientes
- Comprueba si la URL del endpoint API es precisa
- Asegúrate de que tu IP no esté bloqueada por el proveedor
- Intenta reducir la concurrencia o las rondas de prueba

</details>

<details>
<summary><strong>¿Puedo probar modelos personalizados?</strong></summary>

¡Sí! Usa la opción de protocolo "Personalizado" y proporciona:
- Tu URL de endpoint API
- Método de autenticación
- Nombres de modelos

</details>

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- Gracias a todos los contribuyentes que ayudan a mejorar esta herramienta
- Inspirado por la necesidad de pruebas transparentes de rendimiento de IA
- Construido con ❤️ para la comunidad de desarrollo de IA

---

<div align="center">

**[⭐ Dale estrella a este repo](https://github.com/qjr87/llm-api-test) si te resulta útil!**

Hecho con ❤️ por [qjr87](https://github.com/qjr87)

</div>