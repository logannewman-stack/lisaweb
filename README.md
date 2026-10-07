# Lisa Brunson — website

**Option 3: good vibes, hand-made.** A one-page site for Lisa Brunson: sound
healing, ceremony and cleansing. Everything looks made by hand and pinned up,
like the hand-lettered signs, the rainbow brush-stroke sign and the vision
board in the photos she sent, but it is set on a strict grid: her name over a
painted rainbow, her portrait as a polaroid with stickers, her quotes as a
wall of signs, her story on a journal page, and the words she believes in
lettered across a giant painted rainbow. Bright, saturated colour on a white
page. The content is about her, and most of it is placeholder text until her
own words arrive.

There is no build step and nothing to install. Open `index.html` in a browser
or put the folder on any static host.

## Deploying

Vercel deploys every pushed branch as its own preview, and `main` as the live
site. The framework preset is "Other", there is no build command, and the
output directory is the repository root. `.vercelignore` keeps the original
photo uploads out of the deploy.

## What is placeholder

Everything written about Lisa. Each block is marked in the file it lives in.

| What | Where |
| --- | --- |
| Tagline, email, Instagram, location | `js/content.js`, top of the file |
| Her doTERRA shop (this one is real) | `js/content.js`, `shop`. Linked from the hero, the round "Shop my oils" sticker and the footer. |
| The oils on the shelf | `js/content.js`, `oils`. Placeholder picks; swap in the ones she uses. |
| Quotes (these are the ones she sent), and the sign each is painted on | `js/content.js`, `quotes` (`look` picks the sign) |
| What I believe, the words on the rainbow | `js/content.js`, `values` |
| What a session is like, the five steps | `js/content.js`, `steps` |
| Kind words, the testimonials | `js/content.js`, `testimonials` |
| Work with me, the offerings on the tags | `js/content.js`, `offerings` |
| Her story, the at-a-glance facts in [brackets], the polaroid captions, the sage and palo santo text, the meaning of the logo | `index.html`, each block starts with a comment |
| Her portrait | Real. `assets/portraits/lisa-hero.jpg` is the polaroid in the hero; `lisa-portrait.jpg` is the small taped photo in "My story". |
| Contact form | `index.html`. Posts to Formspree: replace `your-form-id`, or use any form service. The email link works regardless. |

## Changing the look

**Colours.** `css/theme.css`. Each colour has a note saying where it came
from and which text colour is safe on it. The rainbow bands, the session
stickers and the luggage tags pick their colours there too (`--band-*`,
`--step-*`, `--tag-*`).

**Type.** Fraunces, set heavy and soft, for headings; Figtree for reading;
Kalam for handwriting (notes, captions, annotations); Bebas Neue only on the
black wooden sign. All from Google Fonts, with system fallbacks.

**The mark.** Drawn once as `<symbol id="mark">` at the top of `index.html`
and reused in the header, the logo section, the postage stamp and the footer.
Each petal can take its own colour (`--petal-1` to `--petal-7`, left to
right). `assets/logo.svg` is the same drawing as a standalone file, used as
the favicon. It sets a lotus among the symbols of her tattoo: the crescent
moon, the moon phases, the eye, the rays of dots.

**Paint.** `js/paint.js` draws every brush stroke (the rainbows, the oil
shelf, the painted yellow and pink blocks, the footer edge) as rough-edged
SVG, sized to its element and seeded so it paints the same way every time.
Give any element `data-paint="stroke"` and `data-colour="var(--pink)"` to
paint it.

**Layout.** `css/site.css`, one block per section. `js/site.js` builds the
repeated parts from `js/content.js`. `DESIGN.md` explains the choices.

## Running it locally

```
python3 -m http.server 8080
```

then open `http://localhost:8080`. Opening `index.html` from the file system
also works.

## Good to know

- The entrance, the floating stickers and the drifting smoke switch off for
  visitors who have "reduce motion" turned on. The breath exercise still
  works because the visitor starts it.
- The whole page works with a keyboard, and every interactive element has a
  visible focus ring. The phone menu closes with Escape or a tap on a link.
