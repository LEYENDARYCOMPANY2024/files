import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import { Detail, Home, List, NotFound, SearchPage, Static } from './pages'
export default function App() {
  return (
    <Routes><Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="buscar" element={<SearchPage />} />
      <Route path="acerca-de" element={<Static t="Acerca de" text="Tulancingo Vivo es una plataforma independiente para descubrir Tulancingo, Hidalgo. No es un sitio gubernamental. Esta primera versión usa contenido de demostración." />} />
      <Route path="privacidad" element={<Static t="Aviso de privacidad" text="Esta versión no recopila datos personales ni usa cookies de seguimiento. Texto legal pendiente de redacción." />} />
      <Route path="terminos" element={<Static t="Términos de uso" text="Texto legal pendiente de redacción." />} />
      <Route path=":kind" element={<List />} />
      <Route path=":kind/:slug" element={<Detail />} />
      <Route path="*" element={<NotFound />} />
    </Route></Routes>
  )
}
