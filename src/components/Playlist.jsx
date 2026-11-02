import { useEffect, useRef, useState } from "react";
import { CONFIG } from "../config";
import { api } from "../api";
import Wave from "./Wave.jsx";

const isHost = typeof location !== "undefined" && location.hash === "#host"; // open your-site/#host for host tools

export default function Playlist({ name, setName }) {
  const [q, setQ] = useState("");
  const [res, setRes] = useState([]);
  const [busy, setBusy] = useState(false);
  const [songs, setSongs] = useState([]);
  const [now, setNow] = useState(null);
  const [msg, setMsg] = useState("");
  const audio = useRef(null);

  const load = () =>
    api
      .list("songs")
      .then(setSongs)
      .catch(() => {});
  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  // Apple's public iTunes Search API: no key needed, returns artwork + 30s previews + Apple Music links
  useEffect(() => {
    if (q.trim().length < 3) {
      setRes([]);
      return;
    }
    let live = true;
    const t = setTimeout(async () => {
      setBusy(true);
      try {
        //const u = `https://itunes.apple.com/search?media=music&entity=song&limit=8&country=${CONFIG.storeCountry}&term=${encodeURIComponent(q)}`;
        const results = await api.search(q);
        if (!live) return;
        setRes(results);
        setMsg("");
      } catch (e) {
        if (live) setMsg("Search failed: " + e.message);
      }
      if (live) setBusy(false);
    }, 700);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [q]);

  const add = async (s) => {
    if (!name.trim()) {
      setMsg("Add your name first 🙂");
      return;
    }
    if (songs.some((x) => String(x.trackId) === String(s.trackId))) {
      setMsg("Already in the queue 🎶");
      return;
    }
    const row = {
      title: s.trackName,
      artist: s.artistName,
      by: name.trim(),
      trackId: s.trackId,
      art: s.artworkUrl100,
      preview: s.previewUrl,
      link: s.trackViewUrl,
    };
    try {
      await api.add("songs", row);
      setSongs((o) => [...o, row]);
      setQ("");
      setRes([]);
      setMsg("Added! 🎉");
    } catch (e) {
      setMsg("Couldn’t save: " + e.message);
    }
  };

  const play = (s) => {
    if (now === s.trackId) {
      audio.current.pause();
      setNow(null);
      return;
    }
    audio.current.src = s.preview;
    audio.current.play().catch(() => {});
    setNow(s.trackId);
  };

  const copy = () =>
    navigator.clipboard
      .writeText(songs.map((s) => `${s.title} – ${s.artist}`).join("\n"))
      .then(() => setMsg("Copied the list ✓"));

  return (
    <section className="sec t-night stars">
      <Wave color="#EA6F1E" />
      <h2>The playlist 🎶</h2>
      <p className="sub">
        Search any song and add it. Everyone’s picks end up in one queue for the
        night.
      </p>
      {!name.trim() && (
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="text"
        className="search"
        placeholder="Search a song or artist…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {busy && <p className="note">Searching…</p>}
      {res.length > 0 && (
        <ul className="results">
          {res.map((s) => (
            <li key={s.trackId}>
              <img src={s.artworkUrl100} alt="" />
              <div>
                <b>{s.trackName}</b>
                <small>{s.artistName}</small>
              </div>
              <button onClick={() => add(s)} aria-label="Add">
                ＋
              </button>
            </li>
          ))}
        </ul>
      )}
      {msg && (
        <p className="note" role="status">
          {msg}
        </p>
      )}
      <div className="lab">Up next · {songs.length}</div>
      <div className="queue">
        {songs.length === 0 && (
          <p className="empty">The queue is empty. Start the party.</p>
        )}
        {songs.map((s, i) => (
          <div className="track" key={s.trackId + "-" + i}>
            <img src={s.art} alt="" />
            <div>
              <b>{s.title}</b>
              <small>
                {s.artist} · added by {s.by}
              </small>
            </div>
            {s.preview && (
              <button
                className="play"
                onClick={() => play(s)}
                aria-label="Preview"
              >
                {now === s.trackId ? "❚❚" : "▶"}
              </button>
            )}
            {isHost && s.link && (
              <a className="am" href={s.link} target="_blank" rel="noreferrer">
                Apple Music ↗
              </a>
            )}
          </div>
        ))}
      </div>
      <audio ref={audio} onEnded={() => setNow(null)} />
      <div className="acts">
        {CONFIG.applePlaylistUrl && (
          <a
            className="btn"
            href={CONFIG.applePlaylistUrl}
            target="_blank"
            rel="noreferrer"
          >
            Join the Apple Music playlist
          </a>
        )}
        {isHost && (
          <button className="btn" onClick={copy}>
            Copy full list
          </button>
        )}
      </div>
    </section>
  );
}