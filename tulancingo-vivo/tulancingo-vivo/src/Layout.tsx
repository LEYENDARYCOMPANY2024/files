import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Download, Menu, Search, X } from 'lucide-react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { KINDS, Kind } from './types'
import { useOnline } from './hooks'
export default function Layout() {
  const [open, setOpen] = useState(false), [inst, setInst] = useState<any>(null)
  const online = useOnline()
  const { needRefresh: [need], updateServiceWorker } = useRegisterSW()
  useEffect(() => { const h = (e: Event) => { e.preventDefault(); setInst(e) }; addEventListener('beforeinstallprompt', h); return () => removeEventListener('beforeinstallprompt', h) }, [])
  const ios = /iphone|ipad/i.test(navigator.userAgent)
  const link = ({ isActive }: { isActive: boolean }) => `px-3 py-3 font-semibold ${isActive ? 'text-terracota underline underline-offset-4' : 'text-azul'}`
  return (<>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-3">Saltar al contenido</a>
    {!online && <p role="status" className="bg-terracota text-white text-center text-sm p-2">Sin conexión: solo verás lo guardado en tu dispositivo.</p>}
    {need && <p role="status" className="bg-azul text-white text-center text-sm p-2">Hay una versión nueva. <button className="underline font-semibold" onClick={() => updateServiceWorker(true)}>Actualizar ahora</button></p>}
    <header className="bg-white border-b border-azul/10"><div className="max-w-6xl mx-auto px-4 flex items-center justify-between flex-wrap">
      <Link to="/" className="font-display text-2xl text-azul py-3">Tulancingo <span className="text-terracota">Vivo</span></Link>
      <button className="md:hidden p-3" aria-expanded={open} aria-label="Menú" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav aria-label="Principal" className={`${open ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto items-start md:items-center`}>
        {(Object.keys(KINDS) as Kind[]).map((k) => <NavLink key={k} to={`/${k}`} className={link} onClick={() => setOpen(false)}>{KINDS[k].label}</NavLink>)}
        <Link to="/buscar" className="p-3" aria-label="Buscar"><Search size={20} /></Link>
        {inst && <button className="flex gap-1 items-center bg-azul text-white rounded-full px-4 py-2 m-2" onClick={() => { inst.prompt(); setInst(null) }}><Download size={16} />Instalar</button>}
      </nav></div></header>
    <main id="main"><Outlet /></main>
    <footer className="bg-azul text-crema mt-16"><div className="max-w-6xl mx-auto p-6 grid gap-6 md:grid-cols-3 text-sm">
      <div><p className="font-display text-xl">Tulancingo Vivo</p><p className="mt-2">Guía independiente de Tulancingo, Hidalgo.</p>
        {ios && <p className="mt-2 opacity-80">En iPhone: Compartir → Agregar a pantalla de inicio.</p>}</div>
      <ul>{(Object.keys(KINDS) as Kind[]).map((k) => <li key={k}><Link className="inline-block py-1 hover:underline" to={`/${k}`}>{KINDS[k].label}</Link></li>)}</ul>
      <ul><li><Link className="inline-block py-1" to="/acerca-de">Acerca de</Link></li><li><Link className="inline-block py-1" to="/privacidad">Privacidad</Link></li><li><Link className="inline-block py-1" to="/terminos">Términos</Link></li><li>Colaboración: contacto pendiente</li></ul>
      <p className="md:col-span-3 opacity-70">© {new Date().getFullYear()} Tulancingo Vivo</p></div></footer></>)
}
