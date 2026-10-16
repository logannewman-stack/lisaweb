# Strands of Grace: website

The website for Strands of Grace, Lisa Brunson's business. A static,
multi-page site with no build step: open `index.html` in a browser or put the
folder on any static host. Vercel deploys every pushed branch.

- `BRAND.md`: her logo files, her colour palette and the rules from her brief.
- `COPY.md`: every word on every page, with what is real and what is a
  placeholder.
- `assets/brand/`: the logo, icons and share image.
- `assets/portraits/`: Lisa's portrait.
- `assets/source/`: original uploads, kept for reference, never deployed.

Each design option lives on its own branch and has its own design notes in
`DESIGN.md`.

## This branch: option C, "A string of pearls"

| Page | File |
| --- | --- |
| Home | `index.html` |
| About Me | `about.html` |
| Our Story | `story.html` |
| Work With Me (offerings, breathing minute, oils, booking form) | `work-with-me.html` |

How to edit:
- Words: edit the HTML directly. The header and footer are repeated on every
  page, so change all four files.
- Colours and fonts: `css/theme.css` (her palette, with names and HEX codes).
  Layout and components: `css/site.css`. Behaviour: `js/site.js`.
- Booking form: replace `your-form-id` in the form's `action` on
  `work-with-me.html` with the real Formspree id; the pre-launch guard then
  switches itself off and messages are sent in the page (the fields give way
  to the thank-you and the "What happens next" steps; without JavaScript the
  form posts normally). `?session=sound-bath`, `one-to-one` or `cleansing`
  preselects the session card.
- `404.html` is the not-found page: Vercel serves it for any missing path, so
  its links and assets are root-relative. Nothing links to it.
- Photos: add them to `assets/portraits/` and keep the `width` and `height`
  attributes in step with the file.
