import { useEffect, useState } from "react";
import { CONFIG } from "../config";
import { api, img, wa } from "../api";
import Wave from "./Wave.jsx";

const Rice = () => (
  <svg viewBox="0 0 120 90" width="110">
    <path
      d="M12 42h96q-4 40-48 42q-44-2-48-42z"
      fill="#e8504a"
      stroke="#8f2420"
      strokeWidth="3"
    />
    <path
      d="M20 42q8-30 40-30q32 0 40 30z"
      fill="#fffaf0"
      stroke="#d9c9a8"
      strokeWidth="3"
    />
  </svg>
);
const Curry = () => (
  <svg viewBox="0 0 120 90" width="110">
    <path
      d="M10 38h100q-4 42-50 44q-46-2-50-44z"
      fill="#2f7d6d"
      stroke="#1b4d43"
      strokeWidth="3"
    />
    <ellipse
      cx="60"
      cy="38"
      rx="50"
      ry="10"
      fill="#d9772b"
      stroke="#8a4510"
      strokeWidth="3"
    />
    {[40, 56, 72, 84].map((x) => (
      <circle key={x} cx={x} cy="37" r="5" fill="#f1c26a" />
    ))}
  </svg>
);

const MENU = [
  {
    id: "panipuri",
    n: "Pani puri",
    d: "Crispy shells you fill with spiced water & potato.",
    img: "panipuri.svg",
    tag: "host prepares",
  },
  {
    id: "samosa",
    n: "Samosa",
    d: "Crispy snack stuffed with spiced potato & peas. Dip in the teeki(spicy) and/or meethi(sweet) chutney.",
    img: "samosa.svg",
  },
  {
    id: "rice",
    n: "Rice",
    d: "The best friend of every curry. (maybe like peas pilau, depends on mood LOL)",
    svg: Rice,
    noHelp: true,
    tag: "host prepares",
  },
  {
    id: "chole",
    n: "Chole",
    d: "Chickpeas simmered in a medium-spice gravy/curry.",
    svg: Curry,
    noHelp: true,
    tag: "host prepares",
  },
  {
    id: "gulab",
    n: "Gulab jamun",
    d: "Soft,fried milk-dough balls soaked in sugar & cardamom syrup.",
    img: "gulab.webp",
  },
  {
    id: "jalebi",
    n: "Jalebi + vanilla ice cream",
    d: "Crunchy orange spirals in syrup. Hot jalebi + cold ice cream = magic.",
    img: "sweets.svg",
  },
  {
    id: "cola",
    n: "Coca-Cola",
    d: "Fizz to go with all the spice (hehehe)",
    img: "coke.svg",
  },
  {
    id: "drinks",
    n: "Drinks",
    d: "Juice, or anything you like to sip.",
    img: "cola.svg",
  },
  {
    id: "chips",
    n: "Chips",
    d: "Bring whatever you're craving.",
    img: "chips.webp",
  },
];
const GROUPS = [
  ["★ Stars of the night", 0, 2],
  ["Mains", 2, 4],
  ["Sweets & Sips", 4, 9, "im relying on y'all for this one!"],
];

export default function Menu({ name, setName }) {
  const [picked, setPicked] = useState([]);
  const [pledges, setPledges] = useState([]);
  const [done, setDone] = useState(false);
  useEffect(() => {
    api
      .list("menu")
      .then(setPledges)
      .catch(() => {});
  }, []);
  const toggle = (id) => {
    setDone(false);
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };
  const items = MENU.filter((m) => picked.includes(m.id));
  const confirm = async () => {
    const n = name.trim();
    if (!n) return;
    const rows = items.map((i) => ({ item: i.n, name: n }));
    await Promise.all(rows.map((r) => api.add("menu", r))).catch(() => {});
    setPledges((p) => [...p, ...rows]);
    setPicked([]);
    setDone(true);
    window.open(
      wa(
        `Hi ${CONFIG.host}! It's ${n}. For the Diwali party I can help with: ${items.map((i) => i.n).join(", ")} 🙌`,
      ),
      "_blank",
    );
  };
  const Card = (m) => {
    const helpers = pledges.filter((p) => p.item === m.n).map((p) => p.name);
    const on = picked.includes(m.id);
    return (
      <div key={m.id} className={"mc" + (on ? " picked" : "")}>
        {!m.noHelp && (
          <button
            className="plus"
            aria-label={`Help with ${m.n}`}
            onClick={() => toggle(m.id)}
          >
            {on ? "✓" : "+"}
          </button>
        )}
        <div className="pic">
          {m.img ? (
            <img src={img(m.img)} alt={m.n} />
          ) : m.emoji ? (
            <span className="emoji">{m.emoji}</span>
          ) : (
            <m.svg />
          )}
        </div>
        <h3>{m.n}</h3>
        <p>{m.d}</p>
        {m.tag && <span className="tag">{m.tag}</span>}
        {helpers.length > 0 && (
          <span className="tag help">{helpers.join(", ")}</span>
        )}
      </div>
    );
  };
  return (
    <section className="sec t-orange">
      <Wave color="#F0A91C" />
      <h2>The menu :)</h2>
      <p className="sub">
        You can also help me getting stuff. Tap <b>+</b> on anything you’d like
        to bring or help with.
      </p>
      <p className="warn">
        Warning: There's a real chance I burn everything. If that happens,
        we're ordering pizza.
      </p>
      {GROUPS.map(([label, a, b]) => (
        <div key={label}>
          <div className="lab">
            {label}
            {/* <span className="swipe">swipe →</span> */}
          </div>
          <div className="grid">{MENU.slice(a, b).map(Card)}</div>
        </div>
      ))}
      <div className={"bar" + (items.length ? " show" : "")}>
        {!name.trim() && (
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <button onClick={confirm} disabled={!name.trim()}>
          Send my {items.length} pick{items.length > 1 ? "s" : ""} to{" "}
          {CONFIG.host}
        </button>
      </div>
      {done && <p className="note">Thank you for helping out! See you soon!</p>}
    </section>
  );
}
