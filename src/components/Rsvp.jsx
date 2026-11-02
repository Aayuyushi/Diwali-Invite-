import { useState } from 'react'
import { CONFIG } from '../config'
import { api, wa } from '../api'
import Wave from './Wave.jsx'

export default function Rsvp({ name, setName }) {
  const [ans, setAns] = useState(null); const [sent, setSent] = useState(false)
  const send = async () => {
    const n = name.trim(); if (!n) return
    api.add('rsvp', { name: n, answer: ans }).catch(() => {})
    setSent(true)
    window.open(wa(ans === 'yes'
      ? `Hi ${CONFIG.host}! It's ${n}. Yes, I'm coming to the Diwali party on ${CONFIG.dateText}! 🪔🎉`
      : `Hi ${CONFIG.host}! It's ${n}. Sadly I can't make the Diwali party 😢 Have a great one!`), '_blank')
  }
  return (
    <section className="sec t-gold">
      <Wave color="#25a244" />
      <h2 className="q">So, are you coming???</h2>
      <div className="row">
        <button className={'btn' + (ans === 'yes' ? ' on' : '')} onClick={() => setAns('yes')}>YES</button>
        <button className={'btn' + (ans === 'no' ? ' on' : '')} onClick={() => setAns('no')}>NO</button>
      </div>
      <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} autoComplete="given-name" />
      {ans && (
        <button className="btn send" onClick={send} disabled={!name.trim()}>
          {sent ? 'Sent! Send again?' : `Tell ${CONFIG.host} on WhatsApp`}
        </button>
      )}
      {ans === 'yes' && <p className="note">Lesgooooo! Scroll down: pick what you’d like to help with, then add songs to the playlist.</p>}
    </section>
  )
}
