import type { Item } from './types'
const P = 'Descripción de demostración, pendiente de verificación con fuentes locales.'
// verified:false => se muestra con la etiqueta "Demo". Cambia a true solo con datos confirmados.
export const ITEMS: Item[] = [
  { slug: 'catedral', kind: 'lugares', title: 'Catedral de Tulancingo', category: 'Arquitectura', summary: 'Templo principal del centro de la ciudad.', body: P, zone: 'Centro', verified: false, hue: 'from-azul to-verde' },
  { slug: 'plaza-constitucion', kind: 'lugares', title: 'Plaza de la Constitución', category: 'Espacio público', summary: 'Plaza central para pasear y reunirse.', body: P, zone: 'Centro', verified: false, hue: 'from-verde to-azul' },
  { slug: 'parque-la-floresta', kind: 'lugares', title: 'Parque La Floresta', category: 'Naturaleza', summary: 'Área verde para descansar al aire libre.', body: P, verified: false, hue: 'from-verde to-terracota' },
  { slug: 'barbacoa', kind: 'gastronomia', title: 'Barbacoa hidalguense', category: 'Platillo', summary: 'Platillo tradicional de la región.', body: P, verified: false, hue: 'from-terracota to-azul' },
  { slug: 'pastes', kind: 'gastronomia', title: 'Pastes', category: 'Platillo', summary: 'Empanada típica de Hidalgo.', body: P, verified: false, hue: 'from-terracota to-verde' },
  { slug: 'historia-de-tulancingo', kind: 'cultura', title: 'Historia de Tulancingo', category: 'Historia', summary: 'Artículo de ejemplo sobre el pasado de la ciudad.', body: P, date: 'Por definir', verified: false, hue: 'from-azul to-terracota' },
  { slug: 'tradiciones', kind: 'cultura', title: 'Tradiciones locales', category: 'Tradiciones', summary: 'Artículo de ejemplo sobre costumbres.', body: P, date: 'Por definir', verified: false, hue: 'from-verde to-azul' },
  { slug: 'evento-demo', kind: 'eventos', title: 'Evento de demostración', category: 'Actividad', summary: 'Ejemplo de cómo se verá la agenda.', body: 'Evento ficticio. No es una actividad real.', date: 'Fecha por confirmar', verified: false, hue: 'from-terracota to-azul' },
  { slug: 'negocio-demo', kind: 'negocios', title: 'Negocio de demostración', category: 'Comercio', summary: 'Registro de ejemplo para el directorio.', body: 'Registro ficticio. No es un negocio real.', verified: false, hue: 'from-azul to-verde' },
]
