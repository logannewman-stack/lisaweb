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
| Work With Me (offerings, breathing exercise, booking form) | `work-with-me.html` |

How to edit:
- **Words:** edit the HTML directly. The header, footer and the SVG sprite
  (pearl strands and icons) are repeated at the top and bottom of all four
  pages, so change them in each.
- **Colours, fonts and spacing:** `css/theme.css`.
- **Layout:** `css/site.css`, in page order: base, shared pieces, header,
  home, about, story, work with me, footer, then all motion at the end.
- **Behaviour:** `js/site.js` (menu, quotes, kind words, breathing exercise,
  booking form).
- **Booking form:** replace `your-form-id` in the form's `action` in
  `work-with-me.html` with the real Formspree id to switch it on.
- Design notes and what to avoid: `DESIGN.md`.
