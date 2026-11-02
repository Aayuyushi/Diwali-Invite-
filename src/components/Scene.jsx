import { useState } from "react";
import { CONFIG } from "../config";
import { img } from "../api";
import Wave from "./Wave.jsx";

const PIPS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};
const Die = ({ n, rolling, onClick }) => (
  <div className={"die" + (rolling ? " roll" : "")} onClick={onClick}>
    {PIPS[n].map((i) => (
      <i
        key={i}
        style={{ gridArea: `${Math.floor(i / 3) + 1}/${(i % 3) + 1}` }}
      />
    ))}
  </div>
);

function Dice() {
  const [v, setV] = useState([5, 3]);
  const [r, setR] = useState(false);
  const roll = () => {
    setR(true);
    setTimeout(() => {
      setV([
        1 + Math.floor(Math.random() * 6),
        1 + Math.floor(Math.random() * 6),
      ]);
      setR(false);
    }, 550);
  };
  return (
    <>
      <div className="dice">
        <Die n={v[0]} rolling={r} onClick={roll} />
        <Die n={v[1]} rolling={r} onClick={roll} />
      </div>
      <div className="hint">
        <b>
          Tap the dice to test your luck. <br />
          if you get the same number twice, you're lucky. <br />
          On Diwali night, luck is the whole point 🎲
        </b>
      </div>
    </>
  );
}

export default function Scene() {
  return (
    <section className="sec t-peach dots">
      <Wave color="#c8201a" />
      <h2>THE SCENE</h2>
      <div className="ticket">
        {/* <img className="fan" src={img("cards")} alt="" /> */}
        <img className="fan" src="../stickers/cards.png" alt="" />
        <div className="top">
          <b>{CONFIG.dateText}</b>
          <span>{CONFIG.timeText} </span>
          <span>at {CONFIG.place} </span>
        </div>
        <div className="bot">
          Bring your appetite <br/> & your spice tolerance.<br/>
          Wear whatever you think is festive (no couch potatoes allowed).<br/>
        </div>
      </div>
      <details className="diw">
        <summary>Wait, what is Diwali?</summary>
        <p>
          Diwali is the Indian festival of lights.(kind of like christmas). Small clay lamps called{" "}
          <b>diyas</b> are lit to celebrate light winning over darkness.
        </p>
        <p>
          Families clean the house, dress up, eat a lot of sweets and, fun fact,
          play cards and dice games together. So tonight’s board games are
          actually very traditional.
        </p>
        <img className="fan2" src="../stickers/diya2.png" alt="diya sticker" />
      </details>
      <Dice />
    </section>
  );
}
