# Lisa Brunson — website

A one-page, custom-designed site for Lisa Brunson: sound healing, ceremony
and cleansing. This option is an evening ceremony under the stars: one
continuous night sky in navy velvet and gold, her portrait in a tall arch
window with her name in gold foil either side, the moon phases and rays of
dots from her tattoo, and the seven chakra colours as luminous jewels. The
content is about her, and most of it is placeholder text until her own words
arrive.

There is no build step and nothing to install. Open `index.html` in a browser
or put the folder on any static host.

## Deploying

Vercel deploys every pushed branch as its own preview, and `main` as the live
site. The framework preset is "Other", there is no build command, and the
output directory is the repository root. `.vercelignore` keeps the original
photo uploads out of the deploy.

## What is placeholder

Everything written about Lisa, except her quotes and her shop. Each block is
marked in the file it lives in.

| What | Where |
| --- | --- |
| Tagline, email, Instagram, location | `js/content.js`, top of the file |
| Her doTERRA shop (this one is real) | `js/content.js`, `shop`. Linked from the hero, the menu, "The oils I use" and the footer. |
| The oils on the shelf | `js/content.js`, `oils`. Placeholder picks; swap in the ones she uses. `colour` picks the label and halo. |
| Quotes (these are the ones she sent) | `js/content.js`, `quotes` |
| What I believe, the litany of words | `js/content.js`, `values` |
| What a session is like, the five cards | `js/content.js`, `steps`. `jewel` colours each card's window. |
| Kind words, the testimonials | `js/content.js`, `testimonials` |
| Work with me, the offerings | `js/content.js`, `offerings`. `jewel` is the gem at the top of each card. |
| Her story, the at-a-glance facts in [brackets], the sage and palo santo text, the meaning of the mark | `index.html`, each block starts with a comment |
| Her portrait | Real. `assets/portraits/lisa-hero.jpg` fills the arch in the hero; `lisa-portrait.jpg` is the close crop in "My story". |
| Contact form | `index.html`. Posts to Formspree: replace `your-form-id`, or use any form service. The email link works regardless. |

## Changing the look

**Colours.** `css/theme.css`. Each colour has a note saying where it is used.
The seven jewels (`--ruby` to `--moonstone`) are the chakra colours; content
can name them (`"sapphire"`) or use the chakra names (`"throat"`). The stars
in the sky read their colours from the same file.

**Type.** Bodoni Moda for her name, headings, quotes and anything set large;
Jost for reading, navigation, buttons and forms. Both from Google Fonts, with
system fallbacks.

**The mark.** Drawn once as `<symbol id="mark">` at the top of `index.html`
and reused in the header, "The mark" and the footer. Its petals take
`--mark-petal` (blush) and the rest `--mark-ink` (gold). `assets/logo.svg` is
the same drawing as a standalone file, used as the favicon.

**The moon phases.** Eight small drawings, `#moon-0` (new) to `#moon-7`, at the
top of `index.html`. They appear above the arch, in the menu, on the session
cards, in the at-a-glance list, as the dots under the kind words and in the
footer.

**The sky.** `js/stars.js` draws the stars; the knobs (how many, how bright,
how far they drift) are at the top of the file.

**Layout.** `css/site.css`, one block per section in page order. Behaviour is
in `js/site.js`. `DESIGN.md` explains the choices.

## Running it locally

```
python3 -m http.server 8080
```

then open `http://localhost:8080`. Opening `index.html` from the file system
also works.

## Good to know

- With "reduce motion" turned on, the stars hold still, the hero appears
  without its entrance, the quotes stop drifting and gather in the middle,
  and nothing advances on its own. The breath exercise still works because
  the visitor starts it.
- The whole page works with a keyboard, and every interactive element has a
  visible focus ring. The menu closes on Escape and when a link is chosen.
