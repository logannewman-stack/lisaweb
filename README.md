# Strands of Grace: website

The website for Strands of Grace, Lisa Brunson's business. A static,
multi-page site with no build step: open `index.html` in a browser or put the
folder on any static host. Vercel deploys every pushed branch.

- `BRAND.md`: her logo files, her colour palette and the rules from her brief.
- `COPY.md`: every word on every page, with what is real and what is a
  placeholder.
- `assets/brand/`: the logo, the emblem, icons and share image.
- `assets/portraits/`: Lisa's portrait.
- `assets/source/`: original uploads, kept for reference, never deployed.

Each design option lives on its own branch and has its own design notes in
`DESIGN.md`.

## This branch: option A, "Classic grace"

| Page | File |
| --- | --- |
| Home (the emblem, the origin story, six strands, ways to work together, what's coming, kind words, Namaste) | `index.html` |
| About Me (background, the six strands and their chapters, at a glance, credentials, Namaste) | `about.html` |
| Our Story (what the name means, the journey so far) | `story.html` |
| Wellness Philosophy (the tree of life, the seven colours, what I believe, words I keep close, a minute for you) | `philosophy.html` |
| Explore Possibilities (offerings with Good to know, what a session is like, skills and practices, the oils, questions) | `explore.html` |
| Stay Connected (the booking form, events, coming soon, announcements) | `connect.html` |
| Page not found | `404.html` (Vercel serves it for any missing path; it is linked from nowhere) |

- **`vercel.json`** redirects the retired `/work-with-me.html` and
  `/work-with-me` to `/explore.html` (temporary redirects, so they can change).
- **The emblem:** the home page shows `assets/brand/emblem.webp` above
  "Welcome to Strands of Grace". It is a stand-in (the lotus from the logo)
  for the celestial woman emblem; when it arrives, replace that one file
  (a transparent WebP about 724 px wide, or wider at the same proportions)
  and nothing else changes. If its edges must not be feathered, remove the
  mask on `.hero__emblem img` in `css/site.css`.
- **Previews:** add `?ink=charcoal` to any address to see charcoal headings
  for the rest of the visit (`?ink=plum` to go back), and `?tagline=2` to
  the home page to see the second version of the origin line. Neither is
  linked from the site.

How to edit:
- **Words:** edit the HTML directly. The head, header, footer and the SVG
  sprite (pearl strands, symbols and icons) are repeated in all seven pages,
  so change them in each.
- **Photos for the six chapters:** each chapter on About Me has an empty
  arch frame (`.photo-frame__window`); put an `<img>` in it (4:5, with
  `loading="lazy"` and alt text) and remove the faint symbol beside it.
- **Colours, fonts and spacing:** `css/theme.css`.
- **Layout:** `css/site.css`, in page order: base, shared pieces, header,
  home, about, story, philosophy, explore, connect, footer, then all motion
  and the UX states at the end.
- **Behaviour:** `js/site.js` (menu, reading-progress line, the carousels,
  breathing exercise, booking form and session cards, Good to know
  accordion, scroll reveal, the phone booking bar, Back to top, the six
  arches). The two previews are applied by the small script in each page's
  head.
- **Booking form:** to switch it on, replace `your-form-id` in the form's
  `action` in `connect.html` with the real Formspree id. While the
  placeholder is there, Send shows a notice and nothing is sent. Once it is
  replaced, the form posts with `fetch` (Accept: application/json), shows
  "Sending..." while it waits, then the thank-you with "What happens next",
  or the error line if the post fails (its "email me directly" links to
  lisa@mystrandsofgrace.com). Without JavaScript it posts natively.
  The hidden `website` field is a honeypot: leave it empty in the Formspree
  settings (or ignore it).
- Design notes and what to avoid: `DESIGN.md`.
