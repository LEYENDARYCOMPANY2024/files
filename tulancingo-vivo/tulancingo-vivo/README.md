# Tulancingo Vivo

PWA para descubrir Tulancingo, Hidalgo. React + TypeScript + Vite + Tailwind + vite-plugin-pwa.

## Requisitos
Node.js 18 o superior.

## Comandos
```
npm install        # instalar dependencias
npm run dev        # desarrollo (http://localhost:5173)
npm run typecheck  # revisar tipos
npm run build      # compilar a dist/
npm run preview    # servir la compilación (aquí se prueba la PWA)
```

## Probar la PWA
El service worker solo se registra en la compilación: `npm run build && npm run preview`. Luego, en Chrome: DevTools → Application (Manifest, Service Workers) y simula Offline.

## GitHub Actions
El workflow `.github/workflows/build.yml`, ubicado en la raíz del repositorio, instala las dependencias de esta aplicación y la compila en cada push a `main` o `master`, pull request y ejecución manual. El resultado valida la compilación, pero no publica el sitio.

## Publicar
Sube `dist/` a un hosting con **HTTPS** y reescritura de rutas a `index.html`.
- Netlify/Cloudflare Pages: ya incluido `public/_redirects`.
- Vercel: agrega `vercel.json` con `{"rewrites":[{"source":"/(.*)","destination":"/index.html"}]}`.

## Editar contenido
`src/data.ts`. Cambia `verified` a `true` solo con datos confirmados.

Más detalle: `docs/VERSION-1.md` y `docs/PROMPT.md`.
