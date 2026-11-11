import { FormEvent, ReactNode, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Async, useAsync, useHead } from './hooks'
import { getItem, getItems, search } from './services'
import { Item, KINDS, Kind } from './types'

const Card = ({ i }: { i: Item }) => (
  <Link to={`/${i.kind}/${i.slug}`} className="block bg-white rounded-xl overflow-hidden border border-azul/10 hover:border-terracota transition-colors">
    <div role="img" aria-label={`Imagen provisional de ${i.title}`} className={`h-40 bg-gradient-to-br ${i.hue}`} />
    <div className="p-4"><p className="text-sm text-verde font-semibold">{i.category}{!i.verified && ' (Demo)'}</p>
      <h3 className="text-xl mt-1">{i.title}</h3><p className="mt-1 text-sm">{i.summary}</p>
      {i.zone && <p className="mt-2 text-sm">Zona: {i.zone}</p>}<p className="mt-3 font-semibold text-terracota">Conocer más</p></div></Link>)

function Grid({ s }: { s: Async<Item[]> }) {
  if (s.loading) return <p role="status">Cargando…</p>
  if (s.error) return <p role="alert">No se pudo cargar el contenido. Revisa tu conexión e inténtalo de nuevo.</p>
  if (!s.data?.length) return <p>No encontramos resultados. Prueba con otra palabra o quita filtros.</p>
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{s.data.map((i) => <Card key={i.slug} i={i} />)}</div>
}
const Wrap = ({ children }: { children: ReactNode }) => <div className="max-w-6xl mx-auto px-4 py-10">{children}</div>

export function Home() {
  useHead('Descubre Tulancingo', 'Lugares, sabores, historias y eventos de Tulancingo, Hidalgo.')
  const nav = useNavigate(), [q, setQ] = useState(''), all = useAsync(() => getItems(), [])
  const go = (e: FormEvent) => { e.preventDefault(); nav(`/buscar?q=${encodeURIComponent(q)}`) }
  return (<>
    <section className="bg-gradient-to-br from-azul via-azul to-verde text-crema"><div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-6xl text-crema max-w-2xl">Tulancingo, más cerca de lo que imaginas.</h1>
      <p className="mt-4 text-lg">Descubre sus lugares, sabores, historias y experiencias.</p>
      <form onSubmit={go} role="search" className="mt-8 flex max-w-xl gap-2"><label htmlFor="hq" className="sr-only">¿Qué quieres descubrir en Tulancingo?</label>
        <input id="hq" value={q} onChange={(e) => setQ(e.target.value)} placeholder="¿Qué quieres descubrir en Tulancingo?" className="flex-1 rounded-full px-5 py-3 text-tinta" />
        <button className="rounded-full bg-terracota px-6 font-semibold">Buscar</button></form>
      <p className="mt-6 flex flex-wrap gap-3">{([['Qué visitar', 'lugares'], ['Dónde comer', 'gastronomia'], ['Qué hacer', 'cultura'], ['Eventos próximos', 'eventos']] as const).map(([t, k]) =>
        <Link key={k} to={`/${k}`} className="border border-crema/60 rounded-full px-4 py-2">{t}</Link>)}</p></div></section>
    <Wrap>{(Object.keys(KINDS) as Kind[]).map((k) => (
      <section key={k} className="mb-12"><div className="flex justify-between items-end mb-4"><div><h2 className="text-3xl">{KINDS[k].label}</h2><p>{KINDS[k].intro}</p></div>
        <Link to={`/${k}`} className="font-semibold text-terracota py-2">Ver todo</Link></div>
        <Grid s={{ ...all, data: all.data?.filter((i) => i.kind === k).slice(0, 3) ?? null }} /></section>))}
      <p className="text-sm">Todo el contenido es de demostración hasta que se verifique con fuentes locales.</p></Wrap></>)
}

export function List() {
  const { kind } = useParams(), k = kind as Kind, [sp, setSp] = useSearchParams()
  const q = sp.get('q') ?? '', cat = sp.get('categoria') ?? ''
  const valid = k in KINDS
  useHead(valid ? KINDS[k].label : 'No encontrado', valid ? KINDS[k].intro : '')
  const s = useAsync(() => search(q, k, cat), [k, q, cat])
  const cats = useAsync(() => getItems(k), [k])
  if (!valid) return <NotFound />
  const set = (n: string, v: string) => { const p = new URLSearchParams(sp); v ? p.set(n, v) : p.delete(n); setSp(p) }
  return (<Wrap><h1 className="text-4xl">{KINDS[k].label}</h1><p className="mb-6">{KINDS[k].intro}</p>
    <div className="flex flex-wrap gap-3 mb-6">
      <div><label htmlFor="q" className="block text-sm">Buscar</label><input id="q" value={q} onChange={(e) => set('q', e.target.value)} className="border rounded px-3 py-2" /></div>
      <div><label htmlFor="c" className="block text-sm">Categoría</label><select id="c" value={cat} onChange={(e) => set('categoria', e.target.value)} className="border rounded px-3 py-2">
        <option value="">Todas</option>{[...new Set(cats.data?.map((i) => i.category))].map((c) => <option key={c}>{c}</option>)}</select></div></div>
    <Grid s={s} /></Wrap>)
}

export function SearchPage() {
  const [sp] = useSearchParams(), q = sp.get('q') ?? '', nav = useNavigate()
  useHead('Buscar', 'Busca lugares, sabores, historias y eventos de Tulancingo.')
  const s = useAsync(() => search(q), [q])
  return (<Wrap><h1 className="text-4xl mb-4">Buscar</h1>
    <form role="search" className="mb-6" onSubmit={(e) => { e.preventDefault(); nav(`/buscar?q=${encodeURIComponent(new FormData(e.currentTarget).get('q') as string)}`) }}>
      <label htmlFor="sq" className="block text-sm">Nombre, descripción o categoría</label>
      <input id="sq" name="q" defaultValue={q} key={q} className="border rounded px-3 py-2 mr-2" /><button className="bg-azul text-white rounded px-4 py-2">Buscar</button></form>
    <Grid s={s} /></Wrap>)
}

export function Detail() {
  const { kind = '', slug = '' } = useParams(), s = useAsync(() => getItem(kind, slug), [kind, slug])
  const rel = useAsync(() => getItems(kind as Kind), [kind])
  const i = s.data
  useHead(i?.title ?? 'Detalle', i?.summary ?? '')
  if (s.loading) return <Wrap><p role="status">Cargando…</p></Wrap>
  if (s.error) return <Wrap><p role="alert">No se pudo cargar. Inténtalo de nuevo.</p></Wrap>
  if (!i) return <NotFound />
  const rows: [string, string | undefined][] = [['Fecha', i.date], ['Zona', i.zone], ['Dirección', i.address], ['Horario', i.hours], ['Costo', i.price], ['Accesibilidad', i.accessibility]]
  return (<Wrap><Link to={`/${kind}`} className="text-terracota font-semibold">Volver a {KINDS[i.kind].label}</Link>
    <div role="img" aria-label={`Imagen provisional de ${i.title}`} className={`h-64 rounded-xl bg-gradient-to-br ${i.hue} mt-4`} />
    <h1 className="text-4xl mt-6">{i.title}</h1><p className="text-verde font-semibold">{i.category}</p>
    {!i.verified && <p className="mt-3 border-l-4 border-terracota bg-white p-3">Contenido de demostración, aún no verificado.</p>}
    <p className="mt-4 max-w-prose">{i.body}</p>
    <dl className="mt-6 grid gap-2 max-w-prose">{rows.filter(([, v]) => v).map(([k, v]) => <div key={k}><dt className="font-semibold inline">{k}: </dt><dd className="inline">{v}</dd></div>)}</dl>
    {!i.address && i.kind === 'lugares' && <p className="mt-3 text-sm">Dirección y horario: información pendiente.</p>}
    {i.kind === 'lugares' && <a className="inline-block mt-4 bg-azul text-white rounded-full px-5 py-3" target="_blank" rel="noopener noreferrer" href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(i.title + ', Tulancingo, Hidalgo')}`}>Buscar en el mapa</a>}
    <h2 className="text-2xl mt-10 mb-4">Relacionados</h2><Grid s={{ ...rel, data: rel.data?.filter((x) => x.slug !== i.slug).slice(0, 3) ?? null }} /></Wrap>)
}

export const Static = ({ t, text }: { t: string; text: string }) => { useHead(t, text.slice(0, 150)); return <Wrap><h1 className="text-4xl mb-4">{t}</h1><p className="max-w-prose">{text}</p></Wrap> }
export function NotFound() { useHead('Página no encontrada', 'Esta página no existe.'); return <Wrap><h1 className="text-4xl">No encontramos esa página</h1><p className="mt-3">Revisa la dirección o <Link className="text-terracota underline" to="/">vuelve al inicio</Link>.</p></Wrap> }
