---
mode: "agent"
description: "Skill maestra de Diseño UI/UX, regla de color 60-30-10 (+10% acento), escalado 2K, Bento Grids, Floating Dock y microinteracciones con Framer Motion."
---

## 2. Reglas de Arquitectura Estática y SEO

- La exportación estática es obligatoria. Configura Next.js con `output: "export"` e `images: { unoptimized: true }` para desplegar sin costo de servidor en GitHub Pages, Vercel, Cloudflare Pages o Hostinger.
- Mantén el contenido desacoplado de la interfaz en archivos tipados, especialmente `src/data/siteData.ts`. Nunca hardcodees contenido de negocio en los componentes.
- Implementa SEO técnico completo: `metadata` con OpenGraph y Twitter, JSON-LD de Schema.org acorde al giro del negocio, y los archivos `sitemap.ts` y `robots.ts`. En ambos archivos exporta `export const dynamic = "force-static"`.

## 3. Sistema Cromático: Regla 60-30-10 (4 Colores) con soporte Light/Dark Mode

Define cuatro colores semánticos compatibles con Light y Dark Mode y distribuye su uso así:

- **60% Color Dominante:** fondo base limpio y descansado, usando `bg-background`.
- **30% Color Secundario:** contenedores, tarjetas elevadas y superficies, usando `bg-card` y bordes sutiles `border-border/60`.
- **10% Acentos, dividido en 2 tonos:**
  - **7% Acento Primario:** exclusivo para llamados a la acción principales (CTAs, botones de contacto o compra y estados activos).
  - **3% Acento Secundario / Soporte:** para badges de estado, etiquetas de categorías, brillos sutiles (*spotlights*) y microdetalles.

## 4. Responsividad Fluida (De Móvil a Monitores 2K / 4K)

- Define la tipografía base fluida en `globals.css` con `html { font-size: clamp(16px, 0.5vw + 14px, 22px); }`.
- Está prohibido fijar textos importantes en píxeles diminutos, por ejemplo `text-[11px]`; usa siempre escalas `rem`.
- Usa como contenedor principal adaptativo `w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16`.

## 5. Catálogo de Componentes Modernos (Estilo Linear / Vercel)

- **Bento Grid:** usa una cuadrícula asimétrica (`grid-cols-1 md:grid-cols-3` con `col-span-2`) para destacar secciones principales, productos estrella o casos técnicos.
- **Floating Dock (Estilo macOS):** crea una barra de navegación flotante fija en la parte inferior con `backdrop-blur-md bg-background/80 border rounded-2xl shadow-lg`. Añade efecto lupa/focus al pasar el puntero con `whileHover={{ scale: 1.25, y: -6 }}`, tooltips animados e indicador de sección activa.
- **Tabs / Slides Modulares:** agrupa contenido denso en pestañas animadas o slides cortos (`100dvh`) con navegación por teclado (`ArrowLeft` / `ArrowRight`) para evitar scroll infinito.
- **Dot Pattern / Grid Background + Spotlight:** crea fondos sutiles con CSS puro (`radial-gradient`) detrás del Hero y de tarjetas clave.
- **Category / Tech Badges (Pills):** usa etiquetas minimalistas con bordes finos (`border-border/80 rounded-full`).

## 6. Física, Transiciones y Microinteracciones (Framer Motion)

- Usa transiciones con física natural: `type: "spring", stiffness: 300, damping: 25`.
- Envuelve los cambios entre pestañas o slides en `<AnimatePresence mode="wait">` con entradas y salidas suaves mediante `opacity` y desplazamiento `x` o `y`.
- Añade a las tarjetas interactivas elevación (`whileHover={{ y: -4 }}`), borde iluminado (`hover:border-primary/50`) y un efecto *spotlight* radial que siga el cursor.
- Aplica entrada escalonada (`staggerChildren: 0.08`) en listas, cuadrículas y badges, respetando `useReducedMotion`.

## 7. Protocolo de Ejecución

- Antes de escribir código de aplicación, presenta la paleta propuesta de 4 colores (60-30-10) para el negocio y la estructura de componentes, y espera confirmación.
- Valida siempre con `npm run typecheck` y `npm run build`.
