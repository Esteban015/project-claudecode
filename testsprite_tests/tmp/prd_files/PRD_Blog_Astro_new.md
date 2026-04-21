# Documento de Requisitos de Producto
## Blog Estático Impulsado por Astro

| Campo | Valor |
|---|---|
| Versión | 1.1 |
| Fecha | Abril 2026 |
| Stack | Astro · Tailwind CSS · Netlify |
| Estado | Borrador |

---

## 1. Resumen Ejecutivo

Este documento define los requisitos funcionales y técnicos para construir un blog personal moderno utilizando Astro como framework de frontend y Netlify como plataforma de despliegue. El contenido se gestiona localmente mediante archivos Markdown/MDX en el propio repositorio. El producto está concebido para ser construido de forma individual con asistencia de un copiloto de IA.

El blog tendrá un diseño elegante con esquema de color oscuro y matiz púrpura, priorizando la experiencia de lectura, el posicionamiento en buscadores y la facilidad de publicación de contenidos.

---

## 2. Objetivos del Producto

### 2.1 Objetivos Principales

- Publicar y gestionar contenido de blog mediante archivos Markdown/MDX en el repositorio.
- Lograr altas puntuaciones en métricas SEO (Core Web Vitals, meta tags, sitemap, permalinks semánticos).
- Ofrecer a los lectores un formulario de suscripción al boletín informativo en el footer.
- Mantener la pila tecnológica simple: sitio 100% estático, sin servidor ni base de datos.

### 2.2 Fuera del Alcance

- Backend, base de datos o API propia.
- Panel de administración de contenidos.
- Autenticación o gestión de usuarios.
- Monetización o plataforma de pagos.
- Aplicación móvil nativa.
- Comentarios de usuarios o sistema de foro.

---

## 3. Stack Tecnológico

| Capa | Tecnología | Rol |
|---|---|---|
| Framework | Astro 4.x | Generación de sitio estático (SSG), enrutamiento, componentes |
| Estilos | Tailwind CSS | Diseño utilitario con paleta oscura y acento púrpura |
| Contenido | MDX / Markdown | Archivos de posts con frontmatter; gestionados en el repositorio |
| Despliegue | Netlify | CDN global, CI/CD desde Git |
| Búsqueda | Pagefind | Índice de búsqueda generado en build, sin servidor |
| Newsletter | Formulario estático | Integración con servicio externo (Mailchimp, ConvertKit, etc.) vía form action |

---

## 4. Diseño Visual e Identidad

### 4.1 Paleta de Colores

| Token | Hex | Uso |
|---|---|---|
| `--bg-primary` | `#0F0F1A` | Fondo principal de la página |
| `--bg-secondary` | `#1A1A2E` | Fondos de cards y sidebar |
| `--accent-primary` | `#7C3AED` | CTA, links, highlights |
| `--accent-hover` | `#6D28D9` | Estado hover del acento |
| `--text-primary` | `#E5E7EB` | Texto principal |
| `--text-muted` | `#9CA3AF` | Texto secundario y metadatos |
| `--border` | `#2D2B55` | Bordes de componentes |

### 4.2 Principios de Diseño

- Tipografía limpia y espaciado generoso para lectura cómoda en artículos largos.
- Jerarquía visual clara: título, subtítulo, meta-información del post (fecha, categoría, tiempo de lectura).
- Modo oscuro como única variante; sin toggle light/dark para mantener coherencia de marca.
- Animaciones sutiles de entrada (fade-in) sin impactar el rendimiento.
- Diseño responsive: mobile-first con breakpoints para tablet y desktop.

---

## 5. Características y Requisitos Funcionales

### 5.1 Blog Público

| ID | Característica | Descripción | Prioridad |
|---|---|---|---|
| F-01 | Listado de posts | Página de inicio con lista paginada de artículos, ordenada por fecha descendente. | Alta |
| F-02 | Post individual | Renderizado de cada artículo con contenido MDX, metadatos y navegación anterior/siguiente. | Alta |
| F-03 | Categorías | Filtrado de posts por categoría; URL semántica `/blog/categoria/[slug]`. | Alta |
| F-04 | Etiquetas (Tags) | Filtrado por etiquetas; URL semántica `/blog/tag/[slug]`; nube de etiquetas en sidebar. | Alta |
| F-05 | Permalink SEO | Slugs únicos, legibles y en minúsculas. Patrón: `/blog/[año]/[mes]/[slug]`. | Alta |
| F-06 | Página de Archivo | Índice cronológico de todos los posts agrupados por año. | Media |
| F-07 | Búsqueda | Búsqueda en cliente con Pagefind, generada en build sin dependencias de servidor. | Media |
| F-08 | Tiempo de lectura | Cálculo automático mostrado en cada post. | Baja |

### 5.2 SEO y Metadatos

| ID | Característica | Descripción | Prioridad |
|---|---|---|---|
| S-01 | Meta tags por post | `title`, `description`, `og:image`, `og:type`, `twitter:card` generados desde frontmatter. | Alta |
| S-02 | Sitemap XML | Generado automáticamente en `/sitemap.xml` con todas las URLs públicas. | Alta |
| S-03 | robots.txt | Archivo estático que permite indexación completa. | Alta |
| S-04 | Canonical URLs | Etiqueta canonical en cada página para evitar contenido duplicado. | Alta |
| S-05 | Structured Data | JSON-LD Schema.org `Article` en cada post (autor, fecha, imagen). | Alta |
| S-06 | Open Graph Images | Imágenes OG estáticas por post definidas en frontmatter. | Alta |
| S-07 | Core Web Vitals | LCP < 2.5s, FID < 100ms, CLS < 0.1 medidos con Lighthouse. | Alta |
| S-08 | RSS Feed | Feed RSS disponible en `/rss.xml` para lectores de feeds. | Media |

### 5.3 Newsletter

| ID | Característica | Descripción | Prioridad |
|---|---|---|---|
| N-01 | Formulario de suscripción | Formulario en el footer con campo de email y botón de suscripción. | Alta |
| N-02 | Validación de email | Validación en cliente antes de enviar. | Alta |
| N-03 | Integración con servicio externo | El formulario envía a un proveedor de email marketing (Mailchimp, ConvertKit, etc.) vía `form action` o su embed. | Alta |
| N-04 | Mensaje de confirmación | Toast o mensaje inline al suscribirse correctamente. | Alta |
| N-05 | Widget en posts | Bloque de suscripción opcional insertable dentro de artículos MDX. | Media |

---

## 6. Estructura de Contenido (Markdown/MDX)

El contenido se gestiona como archivos `.md` o `.mdx` dentro de `src/content/posts/`. Astro Content Collections valida el frontmatter automáticamente mediante un schema Zod.

### 6.1 Frontmatter de un post

```yaml
---
title: "Título del artículo"
slug: "titulo-del-articulo"
description: "Resumen breve para SEO y listados."
publishedAt: 2026-04-20
updatedAt: 2026-04-21        # opcional
category: "desarrollo-web"
tags: ["astro", "seo", "markdown"]
cover:
  src: "./cover.jpg"
  alt: "Descripción de la imagen"
draft: false
seoTitle: ""                 # opcional, sobrescribe title
seoDescription: ""           # opcional, sobrescribe description
---
```

### 6.2 Estructura de carpetas del proyecto

```
src/
├── content/
│   ├── posts/               # Archivos .md / .mdx de cada artículo
│   └── config.ts            # Schema de Content Collections (Zod)
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── PostCard.astro
│   ├── SEO.astro
│   ├── NewsletterForm.astro
│   └── TagCloud.astro
├── layouts/
│   ├── BaseLayout.astro
│   └── PostLayout.astro
└── pages/
    ├── index.astro
    ├── blog/
    │   ├── index.astro
    │   ├── archivo.astro
    │   └── [año]/[mes]/[slug].astro
    ├── categoria/[slug].astro
    └── tag/[slug].astro
public/
├── robots.txt
└── og/                      # Imágenes OG estáticas
```

---

## 7. Estructura de URLs y Rutas

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio — listado de últimos posts |
| `/blog` | Archivo completo de posts paginado |
| `/blog/[año]/[mes]/[slug]` | Post individual |
| `/blog/archivo` | Índice cronológico completo |
| `/categoria/[slug]` | Posts filtrados por categoría |
| `/tag/[slug]` | Posts filtrados por etiqueta |
| `/sitemap.xml` | Sitemap XML generado automáticamente |
| `/rss.xml` | Feed RSS |
| `/robots.txt` | Directivas para crawlers |

---

## 8. Requisitos No Funcionales

### 8.1 Rendimiento

- Lighthouse Performance Score ≥ 90 en mobile y desktop.
- Tiempo de carga inicial (FCP) < 1.5 segundos en conexión 4G.
- Imágenes optimizadas automáticamente con el componente `<Image>` de Astro.
- Zero JS en el cliente por defecto; JS solo para Pagefind y el formulario del newsletter.

### 8.2 Seguridad

- Sin superficie de ataque de servidor: el sitio es 100% estático.
- Sanitización de entradas en el formulario de newsletter en el lado cliente.
- Headers de seguridad configurados en `netlify.toml` (`X-Frame-Options`, `CSP`, etc.).

### 8.3 Accesibilidad

- Cumplimiento WCAG 2.1 nivel AA.
- Todos los elementos interactivos navegables por teclado.
- Contraste de color mínimo 4.5:1 para texto normal.
- Atributos `alt` en todas las imágenes.

### 8.4 Mantenibilidad

- Componentes Astro reutilizables para `Header`, `Footer`, `PostCard`, `SEO`, `NewsletterForm`.
- Variables de diseño centralizadas en `tailwind.config.js`.
- Schema de Content Collections tipado con TypeScript y Zod para validar frontmatter.
- Añadir un nuevo post = crear un archivo `.md` en `src/content/posts/` y hacer push.

---

## 9. Despliegue en Netlify

### 9.1 Configuración

- Repositorio Git (GitHub/GitLab) conectado a Netlify para CI/CD automático.
- Build command: `astro build` — Output directory: `dist/`.
- Modo de salida: `static` (SSG puro, sin funciones serverless).

### 9.2 `netlify.toml`

```toml
[build]
  command = "astro build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## 10. Criterios de Aceptación

### 10.1 Blog Público

- Un post publicado (con `draft: false`) aparece en el listado de inicio y tiene su propia URL semántica.
- Las páginas de categoría y etiqueta muestran únicamente los posts asociados.
- El archivo lista todos los posts ordenados cronológicamente.

### 10.2 SEO

- Lighthouse SEO Score = 100 en la página de inicio y en al menos 3 posts.
- El sitemap incluye todas las URLs públicas y es accesible en `/sitemap.xml`.
- Compartir un post en redes sociales renderiza correctamente la imagen OG y el título.

### 10.3 Newsletter

- El formulario no se puede enviar sin un email en formato válido.
- Al enviar un email válido, el usuario ve un mensaje de confirmación.
- El formulario conecta correctamente con el proveedor de email marketing elegido.

---

## 11. Glosario

| Término | Definición |
|---|---|
| Astro | Framework web moderno para sitios con contenido estático o híbrido. |
| Content Collections | Sistema de Astro para gestionar y validar contenido local con TypeScript. |
| Frontmatter | Bloque YAML al inicio de un archivo Markdown con metadatos del post. |
| MDX | Formato que combina Markdown con componentes Astro/JSX. |
| Netlify | Plataforma de CDN y despliegue continuo para sitios estáticos. |
| Pagefind | Librería de búsqueda estática que genera un índice en tiempo de build. |
| Permalink | URL permanente y semántica de un recurso en la web. |
| SSG | Static Site Generation: páginas generadas en tiempo de build, no en petición. |
| CWV | Core Web Vitals: métricas de experiencia de usuario de Google. |
| OG Image | Imagen Open Graph mostrada al compartir en redes sociales. |
| Zod | Librería de validación de esquemas TypeScript usada por Content Collections. |

---

*Fin del documento — v1.1 · Abril 2026*
