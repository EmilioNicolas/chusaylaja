# CLAUDE.md — chusaylaja.com

## What is this?
Wedding website for **María Jesús ("Chusa") & Paco Pepe ("Laja")**. Wedding date: **3 de octubre de 2026** at **La Mestiza**, La Manga del Mar Menor (Murcia). Time TBC (~13:00).

Bruno is their son (appears in photos and footer signature).

## Stack
- **Pure static**: HTML + CSS + vanilla JS (no framework, no build step)
- **Hosting**: GitHub Pages (branch `main`, auto-deploy on push)
- **Domain**: `chusaylaja.com` via Cloudflare DNS (proxied)
- **HTTPS**: Cloudflare edge certificate
- **Repo**: `EmilioNicolas/chusaylaja`

## Style
- **Theme**: 70s rock / vintage gold-on-dark, inspired by an Elvis & Priscilla wedding invitation
- **Fonts**: Dancing Script (names), Cinzel (headings/uppercase), EB Garamond (body)
- **Colors**: Gold `#D2A14A` / `#C5A028`, dark backgrounds `#080507`, cream text `#F7F1E5`
- **Photos**: AI-generated 70s-style images via Freepik, optimized with `sips` to ~200-600KB JPEGs at 1200px wide
- **Photo filter**: CSS `sepia(0.22) saturate(0.82) contrast(1.06) brightness(0.93)` on section photos (not hero)
- **Hero image**: Darkened via CSS `brightness(0.62)` + overlay gradients for text legibility

## Structure
```
index.html          # Single page, all sections
css/style.css       # All styles
js/main.js          # Countdown, smooth scroll, copy IBAN, modal, mobile menu
img/
  hero-lg.jpg       # Hero background (desktop, 1920→1200px)
  hero-sm.jpg       # Hero background (mobile, 1080px)
  og4.jpg           # OG/social preview image (1200x630)
  historia.jpg      # "Hola a todos" section — Woodstock 74
  lugar.jpg         # "Cuándo y Dónde" section — La Mestiza 76
  dresscode2.jpg    # "Dress Code" section — Aladdin Hotel 67
  familia.jpg       # "Una Fiesta para Todos" — family
  confirmar.jpg     # "Confirma Asistencia" section
  regalo2.jpg       # "El Regalo" section — money
  manga.jpg         # Modal "¿Por qué aquí?" — family at beach
```

## Sections (scroll order)
1. **Hero**: Names "Chusa y Laja", date, venue, countdown, hero photo background
2. **Hola a todos**: Intro text, Woodstock photo
3. **Cuándo y Dónde**: Date, venue, Google Maps embed, buttons "¿Por qué aquí?" (modal) + "Cómo Llegar"
4. **Dress Code**: Beach casual, dresscode photo
5. **Una Fiesta para Todos**: Family-friendly, family photo
6. **Confirma Asistencia**: RSVP → Google Form (`https://forms.gle/KmKfR5YuenqQbF7g6`)
7. **El Regalo**: IBAN with copy button + toast, regalo photo
8. **Footer**: "Chusa & Laja" + "María Jesús, Paco Pepe & Bruno"
9. **Modal**: "¿Por qué La Manga?" — emotional text about Mar Menor + beach photo

## Cache busting
- CSS/JS have `?v=<timestamp>` query strings, auto-updated by `.githooks/pre-commit` on every commit
- Images use unique filenames (e.g. `dresscode2.jpg`, `regalo2.jpg`) because Cloudflare caches aggressively and the DNS token doesn't have purge permissions
- When replacing an image, **rename the file** to bust CDN cache (e.g. `regalo.jpg` → `regalo2.jpg`)

## Known quirks
- **Samsung battery saver**: Breaks `background-clip: text` gradient. Fallback `color: #fff` in place via `@supports`
- **WhatsApp preview caching**: Very aggressive. Rename OG image file to force re-scrape. Send URL with `?N` suffix
- **Cloudflare proxy**: SSL mode is default (not configurable from current API token). "Always Use HTTPS" also not settable — works by default
- **Google Maps embed**: Coordinates `37.6636752, -0.7338776`, Place ID `0xd6319131373a8f9:0x29e9db40c7c90066`

## Commands
```bash
# Local preview (just open the file)
open index.html

# Deploy (just push to main)
git add -A && git commit -m "description" && git push
```

## SEO
- `noindex, nofollow` — private wedding site, not meant to be indexed
- OG tags configured for WhatsApp/social sharing with `og4.jpg` (1200x630)
