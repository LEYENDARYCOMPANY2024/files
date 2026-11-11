import { ITEMS } from './data'
import type { Item, Kind } from './types'
// Capa de acceso a datos: reemplazable por una API sin tocar las páginas.
const wait = <T,>(v: T) => new Promise<T>((r) => setTimeout(() => r(v), 120))
export const getItems = (kind?: Kind) => wait(ITEMS.filter((i) => !kind || i.kind === kind))
export const getItem = (kind: string, slug: string) => wait(ITEMS.find((i) => i.kind === kind && i.slug === slug) ?? null)
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
export const search = (q: string, kind?: Kind, category?: string): Promise<Item[]> => {
  const n = norm(q)
  return wait(ITEMS.filter((i) => (!kind || i.kind === kind) && (!category || i.category === category) &&
    norm(`${i.title} ${i.summary} ${i.category} ${i.zone ?? ''}`).includes(n)))
}
