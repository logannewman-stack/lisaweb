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

## This option: Watercolour bloom (branch `option-b`)

| Page | File |
| --- | --- |
| Home | `index.html` |
| About Me | `about.html` |
| Our Story (2017 to 2026) | `story.html` |
| Work With Me (offerings, breathing exercise, oils, booking form) | `work-with-me.html` |
| Page not found (served by Vercel for any missing path; linked nowhere) | `404.html` |

How to edit:
- **Words:** edit the text in the HTML. Placeholders are in [square brackets].
  `COPY.md` is the source for all copy.
- **Header, footer and the SVG drawing kit** appear on all four pages. Change
  every copy, and move `aria-current="page"` to the current page's link.
- **Colours:** `css/theme.css` (her named palette). **Layout:** `css/site.css`.
  **Behaviour:** `js/site.js` (menu, quotes, breathing, booking form, timeline
  strand).
- **Timeline:** add or remove an `<li class="timeline__item">` in
  `story.html`. The gold strand redraws itself.
- **Booking form:** to switch it on, replace `your-form-id` in the form's
  `action` with the real Formspree id. Until then the form shows a notice and
  does not send. Once switched on, the page sends the message in the
  background and shows the thank-you with "What happens next"; if sending
  fails it says so and keeps what was typed. The links `?session=sound-bath`,
  `one-to-one` and `cleansing` preselect the session card.
- **404 page:** `404.html` uses root-relative links (`/css/...`, `/index.html`)
  because it is served at any missing address. Keep them that way.
