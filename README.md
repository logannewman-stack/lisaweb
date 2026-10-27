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

## This branch: option C, "A string of pearls"

| Page | File |
| --- | --- |
| Home (the emblem, the origin story, the six strands, ways to work together, what's coming, kind words) | `index.html` |
| About Me (background, the six strands of my life and their chapters, at a glance, credentials) | `about.html` |
| Our Story (the story behind Strands of Grace) | `story.html` |
| Wellness Philosophy (in my own words and the tree of life, the seven colours, what I believe, the quotes, the breathing minute) | `philosophy.html` |
| Explore Possibilities (offerings, a session, skills, the oils, good to know) | `explore.html` |
| Stay Connected (the booking form, events, coming soon, announcements) | `connect.html` |
| Page not found | `404.html` |

How to edit:
- Words: edit the HTML directly. The header, footer and the hidden SVG
  sprite at the top of each page are repeated on every page, so change all
  seven files (the 404 uses root-relative links).
- Colours and fonts: `css/theme.css` (her palette, with names and HEX codes).
  Layout and components: `css/site.css`. Behaviour: `js/site.js`.
- The emblem: the home page shows `assets/brand/emblem.webp` above "Welcome
  to Strands of Grace". It is a stand-in (the lotus from the logo); when the
  celestial woman emblem arrives, replace that one file with a transparent
  WebP of the same name. If its proportions differ from 724 x 313, update the
  `width` and `height` on its `<img>` in `index.html`. The soft fade on the
  emblem's left and right edges (`.hero__emblem` in `css/site.css`) is there
  for the stand-in's cropped petals; remove it if the new emblem has room
  around it.
- Life photos for the six chapters on About Me: put an `<img>` inside each
  `.chapter__frame` (4:5 for Roots, Heart and Discovery; 3:2 for Calling,
  Growth and Becoming) and replace the bracketed caption.
- Booking form: replace `your-form-id` in the form's `action` on
  `connect.html` with the real Formspree id; the pre-launch guard then
  switches itself off and messages are sent in the page (the fields give way
  to the thank-you and the "What happens next" steps; without JavaScript the
  form posts normally). `?session=sound-bath`, `one-to-one` or `cleansing`
  preselects the session card.
- `vercel.json` redirects the retired `/work-with-me.html` and
  `/work-with-me` addresses to `/explore.html`.
- Previews for Lisa (not linked anywhere): add `?ink=charcoal` to any address
  to see charcoal headings for the rest of the visit (`?ink=plum` to go back),
  and `?tagline=2` to the home page to see the second story line
  (`?tagline=1` to go back).
- `404.html` is the not-found page: Vercel serves it for any missing path, so
  its links and assets are root-relative. Nothing links to it.
- Photos: add them to `assets/portraits/` and keep the `width` and `height`
  attributes in step with the file.
