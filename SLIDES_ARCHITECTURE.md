# Arquitectura técnica de slides - CAE Sushi

Este documento registra la implementación de la experiencia por pantallas completas. Complementa `PROJECT_CONTEXT.md` y `DESIGN_SYSTEM.md`; se debe consultar antes de modificar navegación, viewport, secciones o comportamiento por hash.

## Objetivo funcional

- Dividir Inicio, Menú, Promociones, Quiénes somos y Ubicación en slides independientes.
- Mostrar una sola sección a la vez en web y móvil.
- Cambiar de sección desde el menú principal, el menú hamburguesa, enlaces internos, CTAs y teclado.
- Permitir swipe horizontal móvil entre slides sin mostrar flechas.
- Mantener fijo el menú superior en todas las secciones.
- Conservar el logo original y visible, sin filtros blancos.
- No mostrar flechas visuales para navegar entre slides.
- Mantener el estado del menú y del pedido al cambiar de sección.

## Estructura de navegación

La navegación se define mediante `navItems` en `src/components/site-experience.tsx`. Cada elemento relaciona una etiqueta visible con un hash estable:

| Slide | Hash |
|---|---|
| Inicio | `#inicio` |
| Menú | `#menu` |
| Promociones | `#promocion` |
| Quiénes somos | `#quienes-somos` |
| Ubicación | `#ubicacion` |

El menú de productos muestra categorías en este orden: Entradas, Arroces, Rollos naturales, Rollos empanizados, Rollos horneados y Bebidas. No existe la opción global `Todos`.

`SlideId` se deriva de `navItems` para impedir que la navegación acepte hashes fuera del sistema. Un nuevo slide requiere agregar una entrada, un wrapper visual y su identificador de sección.

## Estado central

`SiteExperience` es el propietario de `activeSlide`:

- Inicializa en `#inicio`.
- Lee el hash actual al montar.
- Se sincroniza con `hashchange` y `popstate`.
- Usa `history.pushState` al navegar.
- Expone el slide activo mediante `data-active`.
- Marca los slides inactivos con `aria-hidden`.

Los componentes de sección permanecen montados. Esto conserva filtros, cantidades, selección, preview y modal del pedido aun cuando se navega a otra sección.

## Header persistente

`SiteNavigation` se renderiza una sola vez fuera del stage de slides.

- Posición fija superior.
- Logo a la izquierda con colores originales.
- Navegación completa en escritorio.
- Botón hamburguesa y panel compacto en móvil.
- Opción activa indicada mediante `aria-current="page"` y acento naranja.
- Fondo color card con blur y borde sutil para legibilidad sobre cualquier contenido.

El logo no debe regresar al contenido del hero ni aplicar filtros de inversión o brillo.

## Composición de Inicio

- El slide de Inicio usa una composición contenida, no un hero full-bleed.
- El card principal divide contenido y fotografía en dos columnas en escritorio.
- Debajo contiene tres resúmenes navegables: Promos, Quiénes somos y Ubicación y horarios.
- Cada resumen usa una card horizontal con miniatura y conserva la fila única en escritorio.
- La fotografía principal ocupa una fracción mayor del card y aumenta de tamaño y zoom en 2K/4K.
- Los resúmenes enlazan a sus slides completos y no duplican formularios ni lógica de pedido.
- Todos los cards exteriores comparten el ancho máximo y los márgenes laterales del Menú.
- En móvil el card principal apila fotografía y contenido; los resúmenes se sustituyen por un CTA único `Cómo llegar`.
- Los títulos principales de Menú, Promos, Quiénes somos y Ubicación usan el acento naranja.
- En 2K y 4K crecen títulos, cuerpo, paneles, fotos, horarios y CTAs para aprovechar el espacio disponible.

## Stage y visibilidad

`slides-stage` ocupa el viewport disponible debajo del header:

- Escritorio: desde `5.2rem`.
- Móvil: desde `4.4rem`.

Cada `.experience-slide` es una capa absoluta con scroll vertical propio. El slide activo usa:

- `opacity: 1`.
- `visibility: visible`.
- `pointer-events: auto`.
- `transform: translateY(0)`.

Los slides inactivos conservan su árbol React, pero no aceptan interacción ni son visibles. Cada slide conserva scroll vertical independiente; Menú lo habilita al expandir una categoría completa.

## Menú de productos

- Se muestra una categoría a la vez.
- La vista compacta muestra 3 productos, 4 desde 1400 px y 5 desde 1800 px.
- Naturales priorizan Dragón, 777 y California; empanizados Aguachile, Tokio y Flaka; horneados To-Te, Salmoncito Especial y Acá y Allá.
- El grid mantiene las mismas 3/4/5 columnas para evitar espacios vacíos.
- `Ver más` expande la categoría completa dentro del mismo contenedor.
- `Ver menos` vuelve a la cantidad compacta correspondiente al ancho actual.
- No se muestran contadores de página.
- Cambiar de categoría reinicia la expansión.
- Los precios visibles agregan la unidad `MXN` junto al monto.
- La selección y cantidades se conservan al paginar o cambiar de categoría.
- El navegador permite scroll vertical cuando una categoría expandida supera el viewport.

## Responsive

### Web

- Header fijo a 5.2 rem de alto.
- Navegación textual visible.
- Slides con `100dvh` menos la altura del header.
- Menú de productos conserva scroll interno y toolbar sticky.
- Paneles de promoción, historia y ubicación se centran en el viewport disponible.

### Móvil

- Header fijo a 4.4 rem.
- Logo persistente y hamburguesa a la derecha.
- Cada slide conserva scroll vertical independiente; Menú muestra inicialmente tres artículos y permite expandir la categoría completa.
- El menú de productos usa una columna, un ancho máximo de 31 rem y tres tarjetas compactas.
- Un swipe horizontal de al menos 56 px cambia al slide anterior o siguiente cuando el movimiento horizontal domina al vertical.
- El swipe no inicia sobre botones, enlaces, campos, iframe ni diálogos.
- Ubicación, historia y promoción pueden superar el viewport y desplazarse dentro de su slide.
- El botón flotante de pedido no cambia su ubicación ni su relación con el resumen.

## Interacciones admitidas

- Clic en el menú fijo.
- Clic en el menú móvil.
- Enlaces internos como `Ver menú`.
- Swipe horizontal móvil desde áreas no interactivas.
- Teclas `ArrowRight`, `ArrowDown`, `ArrowLeft` y `ArrowUp` cuando el foco no está dentro de controles o diálogos.
- Botones atrás y adelante del navegador.
- Acceso directo mediante hash.

No se renderizan flechas, dots ni botones anterior/siguiente para la navegación entre secciones. Las flechas del modal de detalle de productos pertenecen al carrusel interno de productos y no al sistema de slides.

## Accesibilidad y motion

- El header usa navegación semántica con `aria-label`.
- La sección activa usa `aria-current="page"`.
- Las capas inactivas están marcadas con `aria-hidden`.
- El menú móvil usa `aria-expanded` y `aria-controls`.
- El sistema respeta `prefers-reduced-motion` mediante las reglas globales existentes.
- La transición visual es de opacidad y desplazamiento vertical corto, sin depender de flechas.
- Los diálogos de producto y pedido se montan mediante portal en `body`, fuera del contenedor scrollable de slides.
- Al abrir un diálogo se bloquea el scroll de fondo sin modificar la posición actual del Menú.
- Producto y pedido conservan scroll interno con `overscroll-behavior: contain`.

## Archivos controladores

| Archivo | Responsabilidad |
|---|---|
| `src/components/site-experience.tsx` | Estado de slide, hash, historial, teclado, header y montaje de secciones. |
| `src/app/globals.css` | Viewport, capas, header fijo, scroll interno, estados activos y responsive. |
| `src/data/siteData.ts` | Contenido de negocio y productos, sin cambios por la arquitectura. |

## Reglas de modificación

- Agregar slides únicamente desde `navItems` y `SiteExperience`.
- No mover el header dentro de una sección.
- No aplicar filtros al logo.
- No convertir `.slides-stage` en scroll normal de página.
- Mantener el menú expandido desplazable; la acción `Ver más` revela todos los productos de la categoría.
- No restaurar `Todos` sin definir explícitamente una nueva experiencia y capacidad del viewport.
- No desmontar condicionalmente `MenuSection`; perdería cantidades seleccionadas.
- Mantener hashes estables para deep links, historial y SEO de navegación.
- Evitar controles visuales anteriores/siguientes para el cambio de sección.

## Validación mínima

```sh
npm run typecheck
npm run build
```

Pruebas manuales requeridas:

1. Abrir todos los destinos desde el menú web.
2. Abrir y cerrar el menú móvil en cada slide.
3. Confirmar que el logo conserva color y que el header permanece legible.
4. Seleccionar productos, cambiar de slide y regresar sin perder cantidades.
5. Probar atrás/adelante del navegador y acceso directo por hash.
6. Verificar scroll independiente en viewport móvil pequeño y monitor 2K.
7. Confirmar que no existen flechas ni dots para navegar slides.
