import { useEffect } from "react";
import { CONFIG } from "../config";

const Garland = () => (
  <svg className="garland" viewBox="0 0 460 70" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
    <path d="M0 8Q57 38 115 8Q172 38 230 8Q287 38 345 8Q402 38 460 8" fill="none" stroke="#0f4d3a" strokeWidth="3"/>
    {Array.from({ length: 16 }, (_, i) => {
      const x = 14 + i * 28.75,
        y = 14 + 15 * Math.sin(Math.PI * ((x % 115) / 115));
      return (
        <g key={i} transform={`translate(${x} ${y})`}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <ellipse key={a} cx="0" cy="-6" rx="4.2" ry="6.5" transform={`rotate(${a})`} fill={i % 2 ? "#F0A91C" : "#EA6F1E"} stroke="#c9540f" strokeWidth=".6" />
          ))}
          <circle r="3.6" fill="#c9540f" />
        </g>
      );
    })}
  </svg>
);

const Diya = ({ onLight }) => (
  <svg className="diya" viewBox="0 0 200 140" onClick={onLight} role="button" aria-label="Light the diya" >
    <defs>
      <radialGradient id="g">
        <stop offset="0" stopColor="#fff2a8" />
        <stop offset="1" stopColor="#ffb02e" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle className="glow" cx="100" cy="70" r="90" fill="url(#g)" />
    <path
      d="M30 118q-18-8-22-26q24 4 40 18zM170 118q18-8 22-26q-24 4-40 18zM100 128q-26-4-38-20q24-2 38 14q14-16 38-14q-12 16-38 20z"
      fill="#e8504a"
      stroke="#b52c26"
      strokeWidth="2"
    />
    <path
      d="M18 78Q100 60 182 78Q176 124 100 128Q24 124 18 78z"
      fill="#F0A91C"
      stroke="#c9540f"
      strokeWidth="3"
    />
    <path d="M18 78Q100 60 182 78Q100 92 18 78z" fill="#c9540f" />
    <ellipse cx="100" cy="76" rx="62" ry="7" fill="#f6c24a" />
    <path
      d="M44 100q56 14 112 0"
      fill="none"
      stroke="#c9540f"
      strokeWidth="3"
      strokeDasharray="3 6"
      strokeLinecap="round"
    />
    <rect x="96" y="66" width="8" height="10" rx="3" fill="#5a2a12" />
    <g className="flame">
      <path
        d="M100 66C78 46 94 28 100 6C106 28 124 46 100 66z"
        fill="#ff9a1f"
      />
      <path
        d="M100 64C88 52 96 40 100 28C104 40 112 52 100 64z"
        fill="#ffe27a"
      />
      <ellipse cx="100" cy="56" rx="5" ry="7" fill="#fff" />
    </g>
  </svg>
);

export default function Hero({ lit, setLit }) {
  useEffect(() => {
    const t = setTimeout(() => setLit(true), 2800);
    //return () => clearTimeout(t);
  }, [setLit]);

  return (
    <header className={"hero" + (lit ? " lit" : "")}>
      <Garland />
      <div className="copy center">
        <div className="inv">
          YOU ARE INVITED TO<small>(probably your first)</small>
        </div>
        <h1 className="big">
          DIWALI
          <br />
          PARTY
        </h1>
        <p className="inv">
          <small>for an evening of Board Games,<br/>
          indian food, music and fun!</small>
        </p>
      </div>
      <div className="diyawrap">
        <div className="tap">tap the screen to light the diya </div>
        <div className="diyabox">
          <div className="sun" />
          <div className="warmth" />
          <Diya onLight={() => setLit(true)} />
        </div>
        <div className="down">scroll down ↓</div>
      </div>
    </header>
  );
}
