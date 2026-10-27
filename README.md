# Strands of Grace: website

The website for Strands of Grace, Lisa Brunson's business. A static,
multi-page site with no build step: open `index.html` in a browser or put the
folder on any static host. Vercel deploys every pushed branch.

- `BRAND.md`: her logo files, her colour palette and the rules from her brief.
- `COPY.md`: every word on every page, with what is real and what is a
  placeholder.
- `assets/brand/`: the logo, the emblem, icons and the share image.
- `assets/portraits/`: Lisa's portrait.
- `assets/source/`: original uploads, kept for reference, never deployed.

Each design option lives on its own branch and has its own design notes in
`DESIGN.md`.

## This option: Watercolour bloom (branch `option-b`)

Lisa chose this option: www.mystrandsofgrace.com serves this branch, so
whatever is pushed here goes live. Canonical links and the share image use that
domain.

| Page | File |
| --- | --- |
| Home | `index.html` |
| About Me (her background, the six strands of her life and their chapters, credentials) | `about.html` |
| Our Story (2017 to 2026) | `story.html` |
| Wellness Philosophy (the tree of life, the seven colours, what she believes, her quotes, the breathing exercise) | `philosophy.html` |
| Explore Possibilities (offerings, a session, skills, the oils, questions) | `explore.html` |
| Stay Connected (booking form, events, coming soon, announcements) | `connect.html` |
| Page not found (served by Vercel for any missing path; linked nowhere) | `404.html` |

`vercel.json` sends the old addresses `/work-with-me.html` and `/work-with-me`
to `/explore.html`.

How to edit:
- **Words:** edit the text in the HTML. Placeholders are in [square brackets].
  `COPY.md` is the source for all copy.
- **The emblem:** the home page shows `assets/brand/emblem.webp` above "Welcome
  to Strands of Grace". It is a stand-in (the lotus); replace that one file with
  the celestial woman emblem, a transparent WebP of any proportions, and keep
  the name. If the new emblem should not fade at its sides, delete the two
  `mask-image` lines under `.hero__emblem` in `css/site.css`.
- **Shared parts:** the `<head>` script, the SVG drawing kit, the header and
  the footer (with the phone bar and back-to-top button) are identical on all
  seven pages. Change them on `index.html`, copy them to the others, and keep
  `aria-current="page"` on the current page's links (the 404 uses
  root-relative links such as `/about.html`).
- **Colours:** `css/theme.css` (her named palette; headings take `--heading`).
  **Layout:** `css/site.css`. **Behaviour:** `js/site.js`.
- **Life photos (About, the six chapters):** each chapter has an empty frame,
  `<div class="frame">`. To add a photo, put it in `assets/portraits/` and add
  `<img src="assets/portraits/…" alt="…" loading="lazy">` inside that frame
  (the symbol can stay or go); it fills the window and is cropped by CSS.
  Frames alternate portrait (4:5) and landscape (3:2); then replace the
  bracketed caption.
- **Previews to send Lisa (not linked anywhere):**
  - `?ink=charcoal` on any page shows charcoal headings for the rest of the
    visit, `?ink=plum` goes back.
  - `index.html?tagline=2` shows the second story line ("Together, they share
    a purpose."), `?tagline=1` the first.
  - `about.html?strands=arches` or `?strands=pearls` shows the other two
    templates of the six strands; `?strands=tree` returns to the tree of life,
    the default. The two templates not in use wait in `<template>` elements in
    `about.html`; once Lisa chooses, the chosen one can become the markup and
    the others can be deleted.
- **Timeline:** add or remove an `<li class="timeline__item">` in `story.html`.
  The gold strand redraws itself.
- **Booking form:** to switch it on, replace `your-form-id` in the form's
  `action` (on `connect.html`) with the real Formspree id. Until then the form
  shows a notice and does not send. Once switched on, the page sends the
  message in the background and shows the thank-you with "What happens next";
  if sending fails it says so, offers her email address and keeps what was
  typed. `connect.html?session=sound-bath`, `one-to-one` and `cleansing`
  preselect the session card.
- **Email:** lisa@mystrandsofgrace.com appears in the footer, in the contact
  lines on Stay Connected and in the form's error message (`js/site.js`).
- **404 page:** `404.html` uses root-relative links (`/css/...`, `/index.html`)
  because it is served at any missing address. Keep them that way.
