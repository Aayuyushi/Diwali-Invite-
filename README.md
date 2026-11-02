# Diwali party invite (React + Vite)
TO be added : a photowall.
# 🪔 Diwali Party Invite

A mobile-first (mobile only), interactive invite for hosting my first-ever Diwali night: Indian food, board games and good company. 
Built with **React + Vite**.

## ✨ Features

- **The scene:** a small fun game ,a dice you can roll.
- **RSVP:** YES or NO plus a name. The reply is saved to a Google Sheet and sent to the host on WhatsApp directly.
- **The menu:** swipeable cards. (Swiggy is my inspiration) Tap **+** on anything you'd like to bring or help with, and other guests see who is helping with what, to avoid showing up with the same thing to the party.
- **Shared playlist:** search any song (Apple's iTunes Search API), add it to one queue for the night, and preview 30 seconds. Open `/#host` to get Apple Music links and a copy-all button.

## TO DO
- **Photo frames:** a collage area for building a quick photo layout, similar to Pinterest maybe, where everyone at the party can add photos from their gallery..
- Adding real time playlist updates.

## ⚙️ Configure

Everything you'll want to change is in `src/config.js`:


## 📁 Project structure

```
src/
  App.jsx            page layout and shared state
  config.js          all the settings above
  api.js             talks to the Apps Script
  styles.css         colour-block sections, sunburst, cards
  components/
    Hero.jsx         diya, sunburst, garland
    Scene.jsx        ticket, "What is Diwali?", dice
    Rsvp.jsx         YES / NO + WhatsApp
    Menu.jsx         swipeable cards, who is bringing what
    Playlist.jsx     song search + shared queue
    Photos.jsx       photo frames
    Wave.jsx         section dividers
public/stickers/     food and decoration images
```

Made with love for a first Diwali abroad. Food, diya and dice illustrations are from the invite poster.

*Shubh Deepawali!*
