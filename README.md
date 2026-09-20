# Lisa Brunson — website

A one-page, fully custom site for Lisa Brunson: sound healing, ceremony and
cleansing. It is built from the things she sent: her whitewashed brick wall,
her navy velvet couch and pink velvet chair, the seven chakra flags over her
clock, the signs on her walls, her 2026 vision board and her wrist tattoo.

There is no build step and nothing to install. Open `index.html` in a browser
or put the folder on any static host.

## Deploying (read this first)

Vercel deploys the repository's production branch, which is `main`. The site
lives on the branch this was built on. Until the two are joined, `main` holds
only the uploaded photos and the live URL shows a 404. Either:

- merge the site branch into `main` (a pull request, or a merge from the
  command line), or
- in the Vercel project, Settings, Git, set the Production Branch to the site
  branch.

No other settings are needed: the framework preset is "Other", there is no
build command, and the output directory is the repository root.

## What is real, and what is still placeholder

| What | Where | Status |
| --- | --- | --- |
| Colours | `css/theme.css` | Real. Sampled from her photos: the brick, the velvet, the chair, the gold letters, the seven flags. |
| Quotes | `js/content.js`, `quotes` | Real. The six signs on her walls, the pillow, and lines from the vision board. |
| Vision board | `js/content.js`, `board` | Real. The photo of her 2026 board and the words on it. |
| Her space | `js/content.js`, `space` | Real photos. The captions are example copy. |
| The mark | `assets/logo.svg` and `<symbol id="mark">` in `index.html` | Drawn from her tattoo: crescent moon, moon phases, eye, rays of dots, with a lotus. |
| Her story | `index.html`, "My story" block | Example copy in her voice. Replace with her words. |
| Portrait | `index.html`, "My story" block | The pink chair photo stands in. See the comment there. |
| Sage and palo santo | `index.html`, "Sage and palo santo" block | A drawing stands in. Her photo can replace it. |
| Instruments | `js/content.js`, `instruments` | Example set with drawings and sounds. Her photos have not arrived yet. |
| Sessions | `js/content.js`, `offerings` | Example services and lengths. |
| Email, Instagram, location | `js/content.js`, top of the file | Placeholders. |
| Contact form | `index.html`, the `<form>` | Posts to Formspree. Replace `your-form-id`, or use any form service. The email link works regardless. |

Photos are in `assets/photos/` (web-sized, with an `-800` version of each for
smaller frames). The original uploads are kept untouched in `assets/source/`.

## Changing things

**Colours.** `css/theme.css`. Each colour has a note saying where it came from
and where it is used. The seven flag colours (`--root` to `--crown`) tint the
seven sections after the quotes, and colour the flags in the navigation.

**Quotes.** The `quotes` list in `js/content.js`. The shortest ones turn
around the centre in two rings; the ones with a `photo` also appear in "On my
walls".

**Vision board.** `board` in `js/content.js`: the photo, its caption, and the
`words` (each with a `face` of `serif`, `sans` or `hand`, an optional `big`,
and an optional `tint` from the flag colours).

**Her space.** `space` in `js/content.js`: photo, caption, and a `shape`
(`wide`, `tall` or `square`). `frame: "petal"` gives the lotus-petal frame.

**Instruments.** `instruments` in `js/content.js`. Each has a drawing (`art`)
and a sound (`voice`) made in the browser. Set `photo` to show a photo.

**Copy.** Longer prose is in `index.html`; each block starts with a comment.

**The mark.** Drawn once as `<symbol id="mark">` at the top of `index.html`
and reused in the navigation, hero, "The mark" section and footer.
`assets/logo.svg` is the same drawing as a standalone file for the favicon.

**Fonts.** Cormorant Garamond, Nunito Sans and Caveat (for the hand-written
words on the board), from Google Fonts, with system fallbacks.

## Running it locally

```
python3 -m http.server 8080
```

then open `http://localhost:8080`. Opening `index.html` from the file system
also works.

## Good to know

- The flags, the turning quotes, the gold dots and the hero entrance all
  switch off for visitors who have "reduce motion" turned on. The breath
  exercise still works because the visitor starts it.
- Sounds only play when an instrument is tapped. Nothing autoplays.
- The whole page works with a keyboard, and every interactive element has a
  visible focus ring.
- `DESIGN.md` records the design decisions so future edits stay coherent.
