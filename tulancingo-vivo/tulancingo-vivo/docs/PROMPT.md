# Prompt maestro: Tulancingo Vivo (versión corregida)

Rol: desarrollador full-stack senior (PWA, UI/UX, arquitectura). Construye el MVP de **Tulancingo Vivo**, plataforma independiente (no gubernamental, sin relación con el zoológico) para descubrir Tulancingo, Hidalgo, México. Identidad visual propia, editorial y turística, preparada para crecer.

## Alcance V1
Inicio, catálogo de lugares, gastronomía, cultura, eventos, negocios, búsqueda con filtros, detalle por contenido, responsive desde 320 px, PWA instalable y experiencia básica sin conexión. Prioriza coherencia sobre cantidad. Sin backend, sin panel de administración, sin notificaciones push.

## Diseño
Paleta: azul `#17324D`, verde `#4F7652`, crema `#F5F1E8`, blanco, gris `#30343B`, terracota `#C96F4A`. Fuente expresiva para títulos y fuente legible para texto, **alojadas localmente** (`@fontsource`). Evitar aspecto de plantilla, panel o sitio institucional. Sin modo oscuro en V1.

**Imágenes:** no descargar fotos de internet. Usar placeholders con marca (gradientes) y dejar `public/images/` para fotos propias o con licencia, con atribución.

## Inicio
Header (logotipo, navegación, búsqueda, botón instalar), hero ("Tulancingo, más cerca de lo que imaginas." + buscador "¿Qué quieres descubrir en Tulancingo?" + accesos rápidos), secciones por categoría (lugares, sabores, historias, agenda, negocios) y footer (descripción, enlaces, colaboración, privacidad, términos, año dinámico, redes solo si se configuran). Contacto: enlace `mailto:` o texto pendiente, nunca un formulario sin backend.

## Rutas
`/`, `/:seccion` para `lugares`, `gastronomia`, `cultura`, `eventos`, `negocios`; `/:seccion/:slug` (detalle de cada una); `/buscar?q=`; `/acerca-de`; `/privacidad`; `/terminos`; 404. Deben funcionar al recargar (rewrite a `index.html` según hosting).

## Datos y honestidad
Datos locales tipados + capa de servicios reemplazable por API. Sin verificación externa, usar solo nombres de sitios y tradiciones de conocimiento general; **direcciones, horarios, precios y datos históricos quedan pendientes**. Todo dato no verificado se muestra con la etiqueta visible "Demo" (texto, no solo color). Eventos de demostración: fecha "por confirmar", etiquetados como ficticios. Ocultar campos vacíos.

## Búsqueda y estados
Búsqueda local por nombre, descripción y categoría (sin acentos), filtros por categoría y zona. Estados: cargando, error, sin resultados, con resultados.

## Detalle
Imagen, descripción, categoría, y solo si existen: dirección, horario, costo, accesibilidad. Botón de mapa con enlace de búsqueda sin API key. Relacionados.

## PWA
Manifest (nombre, `start_url`, `standalone`, colores, iconos 192/512 y *maskable*), `apple-touch-icon`, service worker con precaché versionado, caché de imágenes con límite, fallback de navegación, `offline.html`, aviso de sin conexión y aviso de actualización (`registerType: prompt`). iOS: indicación manual "Compartir → Agregar a pantalla de inicio". Caché de datos dinámicos: **diferida hasta tener API** (V1 empaqueta los datos). No cachear datos personales.

## Tecnología (versiones fijas)
React 18, TypeScript, Vite 5, React Router 6, Tailwind **3.4**, Lucide, `vite-plugin-pwa` 0.21. `lang="es-MX"`. Sin dependencias innecesarias.

## Accesibilidad, SEO y rendimiento
Teclado, foco visible, etiquetas en formularios, alt/aria en imágenes, contraste, jerarquía de encabezados, `prefers-reduced-motion`. Título y descripción por página, Open Graph básico, `robots.txt`. **Limitación conocida:** al ser SPA, los rastreadores de redes sociales no leen los metadatos por página; mitigar en V2 con pre-renderizado (p. ej. `vite-react-ssg`) o migrando a Astro/Next. No afirmar que está optimizado sin medirlo (Lighthouse).

## Entregables
Proyecto ejecutable, README, instrucciones de desarrollo y publicación, página offline. Ejecutar comprobaciones disponibles y corregir errores.

## Criterios de aceptación
Se ve bien en móvil y escritorio; todas las rutas funcionan; las tarjetas abren detalle; búsqueda y filtros funcionan; se instala; el service worker se registra en producción; abre sin conexión; sin errores de consola; se instala, ejecuta y compila siguiendo el README.

## Fases sugeridas
1) Base: rutas, layout, datos, servicios. 2) Páginas, búsqueda, filtros. 3) PWA, offline, SEO, README.
