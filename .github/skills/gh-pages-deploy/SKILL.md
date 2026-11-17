---
name: gh-pages-deploy
description: "Usar para configurar el despliegue estático de Next.js App Router en GitHub Pages: output export, imágenes sin optimización de servidor, basePath, workflow de GitHub Actions deploy.yml y validación de la carpeta out."
argument-hint: "Configura GitHub Pages para mi CV y pregunta por el repositorio y la rama de publicación."
---

# Configuración de despliegue estático en GitHub Pages

## Resultado y alcance

Configura la exportación estática de un proyecto Next.js y crea o adapta `.github/workflows/deploy.yml` para compilar y publicar `./out` mediante GitHub Actions. No crea la UI ni publica desde la sesión local sin autorización explícita.

## Procedimiento

### 1. Revisar requisitos y confirmar destino

- Lee las instrucciones del proyecto, `package.json`, el lockfile, la configuración existente de Next.js y los workflows de Pages que ya existan. Conserva los cambios del usuario y evita workflows de publicación duplicados.
- Si no existe un proyecto Next.js, explica el requisito y solicita autorización para inicializarlo mediante el flujo de creación de proyectos antes de continuar.
- Pregunta si el destino será un repositorio `usuario.github.io`, un sitio de proyecto como `usuario.github.io/mi-cv` o un dominio propio. Confirma el nombre exacto del repositorio, el dominio si corresponde y la rama de publicación; no asumas `main` ni derives la URL del nombre de la carpeta local.
- Antes de modificar varios archivos, presenta sus rutas y propósito, solicita confirmación y espera la respuesta. Los cambios adicionales en rutas o dependencias requieren ampliar explícitamente el alcance aprobado.
- Este flujo usa npm. Comprueba que exista un `package-lock.json` coherente con `package.json` para `npm ci`. Si falta o el proyecto usa otro gestor, pregunta cómo proceder; no cambies de gestor ni generes un lockfile sin autorización.
- Usa Node.js 24 LTS, elegido por el usuario. Comprueba su compatibilidad con la versión instalada de Next.js, los requisitos de dependencias y la política del proyecto. Si no es compatible, informa y pide autorización para cambiarla. Mantén la misma versión principal en el build local y en CI; si difieren, informa antes de usar el resultado local como validación del entorno de CI.

### 2. Configurar Next.js

- Edita el archivo existente `next.config.ts` o `next.config.mjs`; si el proyecto usa otro formato admitido, consérvalo. No crees una segunda configuración ni reemplaces opciones o plugins ajenos a la tarea.
- Asegura `output: "export"` e `images: { unoptimized: true }`, conservando las demás opciones de imágenes.
- Para un sitio de usuario en la raíz o un dominio propio servido desde la raíz, usa un `basePath` vacío o ausente. Para un sitio de proyecto, usa `basePath: "/nombre-exacto-del-repositorio"`, sin barra final. No impongas `assetPrefix` sin una necesidad comprobada.
- Comprueba enlaces y recursos locales, incluidos imágenes y `/cv.pdf` cuando exista, bajo el prefijo elegido. `basePath` no corrige automáticamente todas las URLs escritas a mano; reutiliza las utilidades de rutas del proyecto y no prefijes URLs externas.
- No uses SSR dinámico, Server Actions ni endpoints que requieran servidor. Los Server Components resueltos en build son válidos. Las rutas dinámicas deben tener sus parámetros generados en build mediante `generateStaticParams` y no depender de peticiones en ejecución.
- Si detectas una incompatibilidad que requiere cambiar componentes o rutas fuera de la configuración, explica el bloqueo y solicita aprobación antes de corregirla.

### 3. Crear o adaptar el workflow

En `.github/workflows/deploy.yml`, usa el patrón de GitHub Pages basado en artefactos:

- Disparadores: `push` únicamente a la rama confirmada y `workflow_dispatch` para ejecución manual.
- Permisos explícitos: `contents: read`, `pages: write` e `id-token: write`. No solicites permisos adicionales sin necesidad.
- Concurrencia de publicación: grupo `pages` con `cancel-in-progress: false`, para no interrumpir un despliegue en curso.
- Job `build` en `ubuntu-latest`, con estos pasos en orden: `actions/checkout@v4`; `actions/setup-node@v4` con `node-version: "24"` y `cache: "npm"`; `npm ci`; `npm run build`; comprobación de que `out/index.html` existe; `actions/configure-pages@v5`; `actions/upload-pages-artifact@v3` con `path: ./out`.
- No permitas que una configuración automática de Pages reescriba el `basePath` confirmado ni genere una segunda configuración de Next.js.
- Job `deploy` en `ubuntu-latest`, dependiente de `build` mediante `needs: build`, con entorno `github-pages` y URL `${{ steps.deployment.outputs.page_url }}`.
- En `deploy`, usa `actions/deploy-pages@v4` con `id: deployment`, para que la URL del entorno corresponda al resultado real de la acción.
- Usa los mismos nombres de artefacto en subida y despliegue si personalizas sus valores. No publiques mediante ramas `gh-pages` ni introduzcas tokens personales cuando el flujo oficial con OIDC sea suficiente.
- Si las versiones solicitadas de las acciones no están disponibles o incumplen la política del repositorio, informa y acuerda las alternativas antes de cambiarlas.

### 4. Validar localmente

- Ejecuta `npm run build` en la terminal y comprueba que termine correctamente y genere `./out`, incluido `out/index.html`. Usa el script del proyecto, no `next export`.
- Ejecuta las comprobaciones de tipos y lint disponibles que correspondan a los archivos modificados. Si faltan dependencias, solicita la autorización necesaria para instalarlas con el lockfile existente.
- Comprueba los archivos exportados para las rutas previstas y los recursos locales. Si existe un PDF, confirma que se incluya en `out/`; no fabriques uno si falta ni invoques el flujo de generación de UI como requisito de despliegue.
- Para un `basePath` no vacío, verifica el sitio servido bajo ese prefijo con las herramientas disponibles; abrir únicamente la raíz local no valida las URLs de GitHub Pages. Comprueba que los recursos no respondan con HTML de error.
- Valida el YAML y las expresiones de Actions con las herramientas del repositorio o del editor disponibles. Un build local correcto no demuestra que el workflow remoto haya publicado el sitio.
- Si el build falla por una incompatibilidad estática, identifica la ruta o funcionalidad responsable y corrige solo el alcance aprobado, volviendo a ejecutar el mismo build. Si requiere ampliar el alcance, pide confirmación.

### 5. Entregar y distinguir configuración de publicación

- Resume los archivos modificados, el destino, la rama y el `basePath`, las comprobaciones ejecutadas y los bloqueos pendientes.
- Indica que en GitHub debe seleccionarse **Settings > Pages > Build and deployment > Source: GitHub Actions**. Si hay un dominio propio, señala los requisitos pendientes de DNS y configuración de Pages sin modificarlos por tu cuenta.
- No hagas commits, pushes ni ejecutes un despliegue remoto sin autorización explícita. El workflow configurado publicará cuando se produzca un push autorizado a la rama elegida o se ejecute manualmente.
- Solo declara la publicación verificada si observaste un workflow remoto exitoso y comprobaste su URL real. Sin acceso a GitHub, entrega la configuración y explica que la validación remota queda pendiente.

## Criterios de finalización

- Next.js exporta estáticamente sin dependencias de servidor y usa el prefijo confirmado.
- El workflow instala con `npm ci`, compila, sube `./out` y despliega mediante las acciones y permisos de Pages.
- El build local genera la exportación esperada; los errores de validación están resueltos o identificados como bloqueos.
- El usuario conoce los pasos pendientes de configuración de Pages y si la publicación remota se verificó o no.