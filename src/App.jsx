import { useEffect, useState } from 'react'
import Hero from './components/Hero.jsx'
import Scene from './components/Scene.jsx'
import Rsvp from './components/Rsvp.jsx'
import Menu from './components/Menu.jsx'
import Playlist from './components/Playlist.jsx'
//import Photos from './components/Photos.jsx'

const load = (k, d) => { try { const v = localStorage.getItem('diwali:' + k); return v ? JSON.parse(v) : d } catch { return d } }
const useStored = (k, d) => {
  const [v, setV] = useState(() => load(k, d))
  useEffect(() => { try { localStorage.setItem('diwali:' + k, JSON.stringify(v)) } catch {} }, [k, v])
  return [v, setV]
}

export default function App() {
  const [lit, setLit] = useState(false)
  const [name, setName] = useStored('name', '')
  return (
    <div className="wrap">
      <Hero lit={lit} setLit={setLit} />
      <Scene />
      <Rsvp name={name} setName={setName} />
      <Menu name={name} setName={setName} />
      <Playlist name={name} setName={setName} />
      {/* <Photos /> */}
    </div>
  )
}
