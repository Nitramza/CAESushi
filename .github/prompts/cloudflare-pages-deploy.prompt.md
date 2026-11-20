---
agent: "agent"
description: "Configura Next.js para exportación estática en Cloudflare Pages con estrategia de ramas (develop, release, master, maintenance) y limpieza de basePath."
---

## 2. Configuración de Next.js para Cloudflare Pages (`next.config.ts` o `next.config.mjs`)

- Asegura `output: "export"`, `images: { unoptimized: true }` y `trailingSlash: true`.
- Cloudflare Pages sirve la aplicación desde la raíz (`/`) en producción, previews y dominios personalizados. Elimina `basePath` y `assetPrefix` o déjalos explícitamente vacíos (`""`); no uses el nombre del repositorio como prefijo.
- Si existe `.github/workflows/deploy.yml` para publicar en GitHub Pages, elimínalo o desactívalo para que Cloudflare Pages construya desde la integración Git nativa y no haya deploys duplicados. Conserva los workflows que no sean de despliegue de GitHub Pages.
- Conserva las rutas de imágenes y recursos locales para la raíz, verifica que el contenido exportado en `out/` no tenga prefijos del repositorio y mantén `NEXT_PUBLIC_SITE_URL` preparado para el `pages.dev` temporal y para el dominio comercial cuando se configure.

## 3. Estrategia de Ramas y Entornos (Git Flow para Cloudflare Pages)

- **`develop`:** rama de integración diaria. No debe disparar un despliegue público ni una preview para el cliente; se usa para probar localmente.
- **`release`:** entorno automático de Preview / Staging en Cloudflare Pages, con URL de rama `release.<proyecto>.pages.dev`. Al hacer merge de `develop` a `release`, Cloudflare genera la vista previa para que el cliente revise sin tocar producción.
- **`master`:** rama de producción y dominio comercial (`<proyecto>.pages.dev` y el dominio `.com` o `.com.mx`). Solo recibe código aprobado desde `release`.
- **`maintenance`:** rama opcional para preparar una página estática de mantenimiento o aviso temporal. Solo se promueve explícitamente a `master` cuando se requiere activar mantenimiento. Al terminar, restaura la versión estable anterior de `master` mediante un commit de reversión; no reescribas el historial publicado.
- Configura Cloudflare Pages con `master` como rama de producción, `release` como la única rama que genera preview para el cliente y `develop` / `maintenance` excluidas de previews automáticas. Conecta el repositorio mediante la integración Git directa de Cloudflare Pages, sin usar GitHub Actions para compilar o desplegar.
- Si las ramas locales no existen, créalas desde el historial compartido, conserva los commits y usa merges o pull requests; no uses force-push para cambiar el flujo publicado.

## 4. Comandos y Validación

- Ejecuta `npm run build` y verifica que genere `out/` y `out/index.html` sin `basePath`; comprueba que las rutas de imágenes, hojas de estilo, scripts, sitemap y robots funcionen desde la raíz.
- Ejecuta `npm run typecheck` cuando esté disponible y valida que no haya rutas dinámicas, dependencias de servidor ni recursos incompatibles con la exportación estática.
- En el dashboard de Cloudflare, crea un proyecto Pages conectado al repositorio de GitHub y configura:
  - **Production branch:** `master`.
  - **Build command:** `npm run build`.
  - **Build output directory:** `out`.
  - **Preview branches:** incluir `release` y excluir `develop` y `maintenance`.
  - **Environment variables:** `NEXT_PUBLIC_BASE_PATH` vacío y `NEXT_PUBLIC_SITE_URL` con la URL del entorno correspondiente.
- Para conectar el dominio comercial, añádelo en **Workers & Pages > proyecto > Custom domains** y configura los DNS indicados por Cloudflare. Mantén `NEXT_PUBLIC_BASE_PATH` vacío para que la misma exportación funcione en `pages.dev` y en el dominio propio.
