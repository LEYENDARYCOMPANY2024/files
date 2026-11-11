import { useEffect, useState } from 'react'
export type Async<T> = { data: T | null; loading: boolean; error: boolean }
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]): Async<T> {
  const [s, set] = useState<Async<T>>({ data: null, loading: true, error: false })
  useEffect(() => {
    let live = true; set((p) => ({ ...p, loading: true, error: false }))
    fn().then((data) => live && set({ data, loading: false, error: false }), () => live && set({ data: null, loading: false, error: true }))
    return () => { live = false }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
  return s
}
export function useHead(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} · Tulancingo Vivo`
    document.querySelector('meta[name=description]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
  }, [title, description])
}
export function useOnline() {
  const [on, set] = useState(navigator.onLine)
  useEffect(() => { const a = () => set(true), b = () => set(false)
    addEventListener('online', a); addEventListener('offline', b); return () => { removeEventListener('online', a); removeEventListener('offline', b) } }, [])
  return on
}
