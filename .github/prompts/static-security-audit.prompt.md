---
agent: "agent"
description: "Audita el código fuente, variables de entorno, dependencias y el build estático (/out) para evitar fugas de secretos, datos sensibles o vulnerabilidades antes de hacer deploy."
---

## 2. Checklist de Auditoría Obligatoria

### 1. Fuga de Secretos y Variables de Entorno

- Verifica que `.gitignore` incluya `.env`, `.env.local`, `.env.*.local` y las carpetas de respaldo usadas por el proyecto.
- Comprueba que ningún archivo rastreado por Git contenga tokens, API Keys privadas, contraseñas o credenciales hardcodeadas. Busca, entre otros, patrones como `sk_`, `ghp_`, `AIza`, tokens de WhatsApp Business o webhooks privados.
- No muestres valores secretos en el reporte ni en la terminal; redacta los hallazgos y limita el contexto al archivo y línea.
- Revisa que solo se expongan variables con prefijo `NEXT_PUBLIC_` cuando sea estrictamente necesario y seguro para el navegador. Recuerda que esas variables se incorporan a los artefactos públicos del cliente.

### 2. Exposición de Datos Sensibles o Metadatos Internos

- Revisa `src/data/`, los comentarios `// TODO` y los archivos en `public/` para asegurar que no haya números telefónicos personales privados (salvo los comerciales autorizados), correos internos, rutas locales de disco (`C:\Users\...` o `/Users/...`) ni archivos temporales (`*.bak`, `.DS_Store`, logs).
- Inspecciona también el build exportado en `out/` para detectar secretos, datos privados, rutas locales o archivos temporales que hayan llegado a los recursos publicados.

### 3. Seguridad en Enlaces Externos y Sanitización

- Verifica que todos los enlaces externos con `target="_blank"`, incluidos WhatsApp, Google Maps y redes sociales, incluyan `rel="noopener noreferrer"`.
- Comprueba que no se use `dangerouslySetInnerHTML` con entradas sin sanitizar. Si se usa para contenido estático controlado, confirma que no pueda incorporar datos externos o proporcionados por usuarios sin sanitización.

### 4. Cabeceras de Seguridad para Cloudflare Pages (`public/_headers`)

- Verifica si existe `public/_headers`. Si falta, prepara el archivo con estas cabeceras recomendadas para Cloudflare Pages y Netlify:

```text
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

- Si el proyecto tiene requisitos de iframe, cámaras, micrófono o geolocalización, repórtalos antes de aplicar cabeceras que puedan bloquearlos.

### 5. Auditoría de Dependencias (`npm audit`)

- Ejecuta `npm audit --audit-level=high` para detectar vulnerabilidades críticas o altas en los paquetes instalados.
- Reporta nombre del paquete, severidad, ruta de dependencia y corrección recomendada; no ejecutes actualizaciones mayores ni cambies el lockfile automáticamente.

## 3. Formato del Reporte de Auditoría

Entrega un resumen claro con uno de estos estados:

- `✅ APROBADO`: no hay hallazgos bloqueantes o advertencias relevantes.
- `⚠️ ADVERTENCIA`: hay observaciones que deben evaluarse, pero no bloquean necesariamente el deploy.
- `❌ BLOQUEANTE`: hay secretos expuestos, datos sensibles publicados o vulnerabilidades críticas/altas que requieren resolución antes del deploy.

Para cada hallazgo, indica el estado, archivo y línea exacta, el riesgo y la corrección recomendada. No incluyas valores secretos ni datos personales completos en el reporte.

Propón las correcciones automáticas necesarias, pero espera confirmación antes de modificar archivos, eliminar datos, rotar credenciales, cambiar dependencias o alterar la configuración del deploy.
