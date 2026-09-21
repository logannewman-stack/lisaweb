# Lisa Brunson — website

A one-page, custom-designed site for Lisa Brunson: sound healing, ceremony
and cleansing. The look comes from the photos she sent as style references:
whitewashed brick, navy velvet, blush pink, gold, and the seven chakra flag
colours. The content is about her, and all of it is placeholder text until
her own words arrive.

There is no build step and nothing to install. Open `index.html` in a browser
or put the folder on any static host.

## Deploying

Vercel deploys `main`. Push to `main` and the site goes live. The framework
preset is "Other", there is no build command, and the output directory is the
repository root. `.vercelignore` keeps the original photo uploads out of the
deploy.

## What is placeholder

Everything written about Lisa. Each block is marked in the file it lives in.

| What | Where |
| --- | --- |
| Tagline, email, Instagram, location | `js/content.js`, top of the file |
| Quotes (these are the ones she sent) | `js/content.js`, `quotes` |
| What I believe, the cut-out words | `js/content.js`, `values` |
| What a session is like, the five steps | `js/content.js`, `steps` |
| Kind words, the testimonials | `js/content.js`, `testimonials` |
| Work with me, the offerings | `js/content.js`, `offerings` |
| Her story, the at-a-glance facts in [brackets], the sage and palo santo text, the meaning of the mark | `index.html`, each block starts with a comment |
| Her portrait | `index.html`, the hero. A petal-shaped placeholder holds the spot; the comment there says how to swap the photo in. |
| Contact form | `index.html`. Posts to Formspree: replace `your-form-id`, or use any form service. The email link works regardless. |

## Changing the look

**Colours.** `css/theme.css`. Each colour has a note saying where it came
from and where it is used. The seven flag colours (`--root` to `--crown`)
tint the seven sections after the quotes and colour the flags in the
navigation.

**Type.** Cormorant Garamond for headings and quotes, Nunito Sans for
reading, Caveat only for the hand-lettered words in "What I believe". All
from Google Fonts, with system fallbacks.

**The mark.** Drawn once as `<symbol id="mark">` at the top of `index.html`
and reused in the navigation, hero, "The mark" section and footer.
`assets/logo.svg` is the same drawing as a standalone file. It sets a lotus
among the symbols of her tattoo: the crescent moon, the moon phases, the eye,
the rays of dots.

**Paint.** The brush strokes (the rainbow arc, the underlines, the footer
stack) are drawn by `js/paint.js`. To underline anything with a painted
stroke, give it `data-paint="var(--root)"` (or any colour).

**Layout.** `css/site.css`, one block per section. `DESIGN.md` explains the
choices.

## Running it locally

```
python3 -m http.server 8080
```

then open `http://localhost:8080`. Opening `index.html` from the file system
also works.

## Good to know

- The flags, the turning quotes, the gold dots and the hero entrance switch
  off for visitors who have "reduce motion" turned on. The breath exercise
  still works because the visitor starts it.
- The whole page works with a keyboard, and every interactive element has a
  visible focus ring.
