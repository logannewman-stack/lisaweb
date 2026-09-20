# Lisa Brunson — website

A one-page, fully custom site for Lisa Brunson: sound healing, ceremony and
cleansing. The page is built as a journey from night to morning. It opens in
the dark with sage smoke and a struck bowl, turns through a lotus-pink dawn,
and ends in morning light.

There is no build step and nothing to install. Open `index.html` in a browser
or put the folder on any static host.

## What is still placeholder

Lisa's own material (colours, quotes, vision board, instruments, tattoo, life
story) had not arrived when this template was built. Everything below is
example content, chosen to fit what she described, and every piece of it is
in one obvious place so it can be swapped in minutes.

| What | Where | Status |
| --- | --- | --- |
| Colours | `css/theme.css` | Placeholder palette (indigo, plum, lotus, kraft, sage, gold). Swap the hex values for hers. |
| Quotes | `js/content.js`, `quotes` | 10 example quotes. Replace with the ones she sent. |
| Vision board | `js/content.js`, `board` | 13 example items with drawn stand-ins. Point `src` at her photos. |
| Instruments | `js/content.js`, `instruments` | 8 example instruments. Edit names and notes, add `photo` paths. |
| Tagline, email, Instagram, location | `js/content.js`, top of the file | Placeholders. |
| Offerings | `js/content.js`, `offerings` | Example services and lengths. |
| Her story, the cleansing text, the meaning of the mark | `index.html`, each block has a comment above it | Example copy, written in her voice. Replace with her words. |
| Portrait | `index.html`, the "My story" section | "Portrait to come" stand-in. See the comment there. |
| Logo | `assets/logo.svg` and the `<symbol id="lotus">` at the top of `index.html` | Lotus over three rings of sound. Her tattoo symbols still need to be drawn in. |
| Contact form | `index.html`, the `<form>` in the contact section | Posts to Formspree. Replace `your-form-id` with a real form id, or swap in any form service. The email link works regardless. |

Her files go in the `assets/` folders. `assets/README.md` says which folder is
for what.

## Changing things

**Colours.** Open `css/theme.css`. Each colour has a one-line note saying where
it is used. Keep dark grounds with light text and light grounds with dark
text, and the rest takes care of itself. The page moves through the grounds in
this order: `--night`, `--dusk`, `--lotus` (the horizon gradient), `--kraft`,
`--mist`, `--morning`.

**Quotes.** Edit the `quotes` list in `js/content.js`. The shortest quotes are
drawn around the lotus in two slowly turning rings, and all of them take turns
in the centre. Leave `by` empty for a mantra or an unattributed line.

**Vision board.** Edit the `board` list in `js/content.js`. Each item is a
photo (`type: "image"`), a single word (`type: "word"`) or a short note
(`type: "note"`). `w` and `h` set how many columns and rows it takes on a
six-column board, `rot` gives it a small tilt. For a photo, drop the file into
`assets/vision-board/` and set `src`. While `src` is empty a drawn placeholder
stands in.

**Instruments.** Edit the `instruments` list. Each instrument has a line
drawing (`art`) and a sound (`voice`) that is synthesised in the browser when
tapped, so there are no audio files to host. To show a photo instead of the
drawing, set `photo`.

**Copy.** Longer prose is in `index.html`. Every block is introduced by a
comment (`EXAMPLE COPY: replace ...`).

**The mark.** The lotus is drawn once as `<symbol id="lotus">` at the top of
`index.html` and reused in the navigation, hero, "The mark" section and
footer. `assets/logo.svg` is the same drawing as a standalone file for the
favicon and social previews. When her tattoo symbols arrive, draw them into
both places.

**Fonts.** Cormorant Garamond and Nunito Sans are loaded from Google Fonts in
the `<head>` of `index.html`. Both fall back to system faces if the request
fails.

## Running it locally

Any static server works. For example:

```
python3 -m http.server 8080
```

then open `http://localhost:8080`. Opening `index.html` straight from the
file system also works.

## Putting it online

The folder is the site. Drag it onto Netlify Drop, push it to a GitHub Pages
branch, or import the repository into Vercel or Cloudflare Pages. No settings
are required.

## Good to know

- The smoke in the hero, the turning quotes and the hero entrance all switch
  off for visitors who have "reduce motion" turned on. The breath exercise
  still works because the visitor starts it.
- Sounds only play when an instrument is tapped. Nothing autoplays.
- The whole page works with a keyboard, and every interactive element has a
  visible focus ring.
- The design rationale (palette, type, layout, what to keep in mind when
  editing) is in `DESIGN.md`.
