// import { useState } from 'react'
// import { img } from '../api'
// import Wave from './Wave.jsx'

// export default function Photos() {
//   const [p, setP] = useState({})
//   const add = (k, f) => f && setP(o => ({ ...o, [k]: URL.createObjectURL(f) }))
//   const Fr = (k, c) => (
//     <label key={k} className={'ph ' + c}>
//       {p[k] ? <img src={p[k]} alt="" /> : '＋'}
//       <input type="file" accept="image/*" hidden onChange={e => add(k, e.target.files[0])} />
//     </label>
//   )
//   return (
//     <>
//       <section className="sec t-peach dots">
//         <Wave color="#241330" />
//         <h2>Add your photos</h2>
//         <p className="sub">Tap a frame to add your favourite shots from the night, then screenshot your collage. 📸</p>
//         <div className="col">{Fr('a', 'ban')}{Fr('b', 'tall')}{Fr('c', 'tall')}{Fr('d', '')}{Fr('e', '')}</div>
//       </section>
//       <footer className="see">
//         <div className="big">See you soon</div>
//         <img src={img('drink')} alt="" />
//       </footer>
//     </>
//   )
// }
