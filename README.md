# CAE Sushi

Sitio estático de CAE Sushi construido con Next.js App Router, TypeScript, Tailwind CSS y Framer Motion.

## Desarrollo local

```sh
npm ci
npm run dev
```

Validación y exportación:

```sh
npm run typecheck
npm run build
```

El build genera el sitio estático en `out/`.

## Vista previa en GitHub Pages

La rama `master` publica automáticamente en:

`https://nitramza.github.io/CAESushi/`

En GitHub, configura **Settings > Pages > Build and deployment > Source** como **GitHub Actions**. La rama `develop` es para integración; los cambios se publican al incorporarse a `master`.

El workflow deriva `NEXT_PUBLIC_BASE_PATH` del nombre del repositorio y configura la URL pública usada por sitemap y robots.

## Migración a dominio propio

Para servir desde la raíz de un dominio o desde Vercel, Hostinger u otro hosting, compila con `NEXT_PUBLIC_BASE_PATH` vacío o sin definir y establece `NEXT_PUBLIC_SITE_URL` al dominio final. `next.config.ts` y las rutas de imágenes aplicarán automáticamente esos valores.