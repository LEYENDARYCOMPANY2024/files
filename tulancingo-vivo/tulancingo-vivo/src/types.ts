export type Kind = 'lugares' | 'gastronomia' | 'cultura' | 'eventos' | 'negocios'
export interface Item {
  slug: string; kind: Kind; title: string; category: string; summary: string; body: string
  zone?: string; address?: string; hours?: string; price?: string; accessibility?: string; date?: string
  verified: boolean; hue: string
}
export const KINDS: Record<Kind, { label: string; intro: string }> = {
  lugares: { label: 'Lugares', intro: 'Qué visitar en Tulancingo.' },
  gastronomia: { label: 'Gastronomía', intro: 'Dónde y qué comer.' },
  cultura: { label: 'Cultura', intro: 'Historia, tradiciones y curiosidades.' },
  eventos: { label: 'Eventos', intro: 'Agenda local.' },
  negocios: { label: 'Negocios', intro: 'Comercios y servicios de la ciudad.' },
}
