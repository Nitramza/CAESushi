---
agent: "agent"
description: "Configura SEO técnico completo, OpenGraph, Schema.org JSON-LD (LocalBusiness/Restaurant/Person), sitemap.xml y robots.txt en sitios estáticos de Next.js."
---

## 2. Reglas de Implementación Obligatoria

### 1. Metadata Base y Social (`src/app/layout.tsx`)

- Configura `metadataBase` usando `process.env.NEXT_PUBLIC_SITE_URL || "https://nitramza.github.io/CAESushi"`. Al migrar a Cloudflare Pages o a un dominio propio, define `NEXT_PUBLIC_SITE_URL` en el entorno de build correspondiente.
- Define `title` con `default` y `template`, una `description` orientada a conversión y palabras clave locales, `keywords`, `alternates.canonical` y `robots` (`index: true, follow: true`).
- Configura `openGraph` (`type: "website"`, `locale: "es_MX"`, `siteName`, `title`, `description`, `url`, `images`) y `twitter` (`card: "summary_large_image"`, `title`, `description`, `images`) para crear tarjetas visuales profesionales al compartir en WhatsApp, Facebook o Instagram.
- Usa una imagen social real, disponible en `public/`, con texto alternativo descriptivo. Asegúrate de que sus URLs incluyan el `basePath` del build de exportación cuando corresponda.

### 2. Datos Estructurados JSON-LD (`Schema.org`)

- Inyecta un bloque `<script type="application/ld+json">` en `layout.tsx` o en la página principal, serializando datos locales controlados y sin entradas de usuario sin sanitizar.
- Para un restaurante o negocio local, usa `@type: "Restaurant"` (o `"LocalBusiness"`) con `name`, `description`, `servesCuisine: "Japanese, Sushi"`, `telephone`, `address`, `geo` con coordenadas verificadas, `openingHoursSpecification`, `priceRange: "$$"` y `hasMenu`.
- Para un portafolio profesional, usa `@type: "Person"` y solo publica datos personales que el titular haya autorizado.
- No inventes coordenadas, horarios, precios ni datos de contacto. Si no se pueden verificar, repórtalos y pide confirmación antes de publicarlos como Schema.org.

### 3. Rastreo e Indexación Estática (`sitemap.ts` y `robots.ts`)

- Crea o actualiza `src/app/robots.ts` con `export const dynamic = "force-static";`, permitiendo todos los user-agents (`allow: "/"`) y apuntando al `sitemap.xml` usando `NEXT_PUBLIC_SITE_URL`.
- Crea o actualiza `src/app/sitemap.ts` con `export const dynamic = "force-static";`, listando todas las rutas públicas con `lastModified`, `changeFrequency` y `priority`. En un sitio de una sola página, lista solo la URL canónica; no agregues fragmentos de ancla como rutas independientes.
- Usa una URL base configurable y compatible con el dominio temporal, el `basePath` de GitHub Pages y el dominio comercial definitivo.

### 4. SEO Semántico en Componentes (HTML5 y Accesibilidad)

- Garantiza un único `<h1>` principal por página con las palabras clave principales.
- Mantén una jerarquía lógica de encabezados (`h1` → `h2` → `h3`).
- Todas las imágenes `<img>` deben tener un atributo `alt` descriptivo (por ejemplo, `Rollo de sushi empanizado con camarón y queso crema - CAE Sushi`). Para imágenes de fondo con semántica, proporciona un equivalente accesible, como `role="img"` y `aria-label`; deja vacíos los textos alternativos de imágenes puramente decorativas.

### 5. Analítica y Verificación Lista para Especialistas SEO

- Deja soporte opcional para `NEXT_PUBLIC_GA_ID` (Google Analytics 4) y `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (Google Search Console) en `layout.tsx`, sin romper la exportación estática.
- Carga Google Analytics solo cuando la variable correspondiente esté configurada y con el componente `next/script` y una estrategia no bloqueante. No añadas un ID ficticio.
- Incluye `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` en `metadata.verification.google` solo cuando exista.

## 3. Ejecución

- Aplica esta guía al proyecto actual usando los datos tipados de `src/data/` y las imágenes reales de `public/`.
- Ejecuta `npm run typecheck` cuando esté disponible y `npm run build` para verificar que `out/sitemap.xml` y `out/robots.txt` se generen correctamente.
- Comprueba los metadatos renderizados, el JSON-LD y las URLs de OpenGraph, canonical, sitemap y robots tanto con el `basePath` del build actual como con `basePath` vacío para Cloudflare Pages.
- Presenta un resumen de lo aplicado y cualquier dato local (horario, coordenadas, precio o dominio) que requiera confirmación del restaurante.
