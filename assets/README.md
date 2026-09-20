# Lisa's files

| Folder | What is in it |
| --- | --- |
| `assets/source/` | The original uploads, untouched (large). |
| `assets/photos/` | Web-sized versions used by the site: a 1600px version and an `-800` version of each. Named by what they show. |
| `assets/portraits/` | Empty. A portrait of Lisa goes here, then swap it into the "My story" block in `index.html`. |
| `assets/instruments/` | Empty. Photos of her instruments go here, then set `photo` on each instrument in `js/content.js`. |
| `assets/logo.svg` | The mark, for the favicon and social previews. |

To add a new photo, make a copy no wider than 1600px, save it as a JPEG in
`assets/photos/`, and point to it from `js/content.js` or `index.html`.
