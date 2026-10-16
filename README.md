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

## This branch: option A, "Classic grace"

| Page | File |
| --- | --- |
| Home | `index.html` |
| About Me | `about.html` |
| Our Story | `story.html` |
| Work With Me (offerings, Good to know, breathing exercise, booking form) | `work-with-me.html` |
| Page not found | `404.html` (Vercel serves it for any missing path; it is linked from nowhere) |

How to edit:
- **Words:** edit the HTML directly. The header, footer and the SVG sprite
  (pearl strands and icons) are repeated at the top and bottom of all four
  pages, so change them in each.
- **Colours, fonts and spacing:** `css/theme.css`.
- **Layout:** `css/site.css`, in page order: base, shared pieces, header,
  home, about, story, work with me, footer, then all motion at the end.
- **Behaviour:** `js/site.js` (menu, reading-progress line, the carousels,
  breathing exercise, booking form and session cards, Good to know
  accordion, scroll reveal, the phone booking bar, Back to top).
- **Booking form:** to switch it on, replace `your-form-id` in the form's
  `action` in `work-with-me.html` with the real Formspree id. While the
  placeholder is there, Send shows a notice and nothing is sent. Once it is
  replaced, the form posts with `fetch` (Accept: application/json), shows
  "Sending..." while it waits, then the thank-you with "What happens next",
  or the error line if the post fails. Without JavaScript it posts natively.
  The hidden `website` field is a honeypot: leave it empty in the Formspree
  settings (or ignore it).
- Design notes and what to avoid: `DESIGN.md`.
