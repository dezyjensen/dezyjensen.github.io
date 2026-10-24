# dezyjensen.github.io

My personal website, live at **https://dezyjensen.github.io**.

A space-themed page with a day mode (plum and peach dawn) and a night mode (aurora sky). It follows the visitor's device setting, and the Day/Night switch in the menu remembers their choice.

Plain HTML, CSS and a little JavaScript. No build step, no frameworks, and no outside requests (the fonts are hosted here).

## Editing

Everything you'd want to change is in `index.html`, marked with clear section comments:

| To change | Look for |
|---|---|
| Welcome text and "Currently" line | `Welcome` section |
| Planets in the solar system | elements with `class="planet"` |
| About text and the four facts | `About` section |
| Constellation stories | the `<ol class="timeline">` list (each `<li>` is one star's story; the stars use these automatically) |
| Sticky notes | `Notes` section |
| Contact links | `Contact` section |

After editing, commit and push to `main`. GitHub Pages updates the live site within a minute or two.

### Adding your photo

1. Save a square-ish photo as `assets/img/dezy.jpg` (about 600 × 600 px is plenty).
2. In `index.html`, find `<span class="mono">DJ</span>` inside the `sun` element and replace it with:
   `<img src="assets/img/dezy.jpg" alt="Dezy Jensen">`

## Files

- `index.html`: the page
- `assets/css/styles.css`: all styling, including the day and night colours (at the top, as variables)
- `assets/js/main.js`: day/night switch, the starry sky, constellation stories, scroll reveals
- `assets/fonts/`: web fonts
- `assets/img/`: favicon and the link-preview image (`og.png`)

## Fonts

- **Latin Modern Roman** (headings): the LaTeX typeface used in physics papers. Distributed under the GUST Font License.
- **Inter** (body text): SIL Open Font License 1.1.

Both licences allow use and redistribution on a website.
