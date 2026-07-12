# parallel perspective

static site — landing / manifesto / the circle / reach-out / 404. no build step, no framework.

## structure
- `index.html` — landing
- `manifesto.html` — the mission
- `circle.html` — deeper mission + audience/community explainer
- `reach-out.html` — the only way in (mailto)
- `404.html` — custom not-found page
- `style.css` — shared design tokens (colors, type). palette is Direction A
  "warm resolved" (see `../Palette & Logo Review - Fixed.html`) — clears the
  two WCAG AA failures the original palette had.
- `assets/` — canonical logo svg, favicon, apple-touch-icon, og-image
- `robots.txt` — noindex (deliberate, per brand's "never a broadcast push")
- `vercel.json` — security headers (CSP, HSTS, X-Frame-Options, etc.)

## deploy
static site, any host works. no env vars, no build command needed.
`vercel.json` headers are Vercel-specific; strip that file if deploying elsewhere
and configure equivalent headers on the host instead.
