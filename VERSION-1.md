# Tulancingo Vivo: documentación de la versión 1 (0.1.0)

## Qué incluye
- Inicio con hero, buscador, accesos rápidos y una sección por categoría.
- Listados con búsqueda (sin acentos) y filtro por categoría, sincronizados con la URL.
- Detalle con campos opcionales (se ocultan si no hay dato), aviso "Demo" y relacionados.
- Búsqueda global `/buscar?q=`, páginas de acerca de, privacidad, términos y 404.
- PWA: manifest, iconos 192/512 (incluye maskable), service worker, precaché, caché de imágenes (60 máx., 30 días), aviso de sin conexión y de actualización, botón instalar, nota para iOS.
- Accesibilidad básica: enlace de salto, foco visible, etiquetas, reducción de movimiento.

## Estructura
```
src/
  App.tsx       rutas
  Layout.tsx    header, footer, avisos PWA, instalación
  pages.tsx     Home, List, SearchPage, Detail, Static, NotFound
  data.ts       contenido de demostración (editar aquí)
  services.ts   acceso a datos (reemplazable por API)
  hooks.ts      useAsync, useHead, useOnline
  types.ts      Item, Kind, KINDS
public/         iconos, offline.html, robots.txt, _redirects
```
Se simplificó la estructura sugerida (un modelo único `Item` con `kind`) para evitar duplicar código entre secciones.

## Decisiones
- **Sin fotos:** gradientes de marca como imagen provisional. Para fotos reales, agrégalas a `public/images/` y añade un campo `image` a `Item`.
- **Datos:** todo con `verified: false`. No hay direcciones, horarios ni precios inventados.
- **Mapa:** enlace de búsqueda de OpenStreetMap, sin API key.
- **Datos dinámicos en caché:** no aplica hasta que exista una API.

## Pendiente / limitaciones
- **No se ejecutó `npm install` ni `build` al crearlo** (el entorno no tenía red). Ejecuta `npm run build` y corrige cualquier error de tipos antes de publicar.
- Metadatos por página solo vía JavaScript (ver limitación de SEO en `PROMPT.md`).
- Textos legales, contacto, redes sociales y fotos pendientes.
- Sin sitemap.xml (agregar cuando haya contenido real y dominio).
- Sin pruebas automáticas.

## Verificar rendimiento, accesibilidad y SEO
Compila y sirve con `npm run build && npm run preview`, abre Chrome DevTools → Lighthouse y ejecuta las categorías Performance, Accessibility, SEO y PWA. Revisa también Application → Manifest y Service Workers, y prueba Offline en Network.
