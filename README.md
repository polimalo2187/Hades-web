# Hades Alpha V2 Promo Web

Landing page promocional premium para Hades Alpha V2, lista para Railway.

## Ejecutar local

```bash
npm install
npm start
```

## Railway

El proyecto incluye `railway.json` y `server.js`. Railway debe ejecutar:

```bash
npm start
```

## Archivos principales

- `public/index.html`
- `public/styles.css`
- `public/app.js`
- `public/assets/hades-alpha-v2-logo.png`

## CTA principal

https://t.me/HADES_ALPHA_bot?start=ref_2010460041

## V3 mobile responsive fix

This build includes a mobile-specific hero/logo fix:

- Prevents horizontal overflow on phones.
- Keeps the Hades Alpha V2 logo contained and centered.
- Hides oversized halo layers on narrow screens.
- Forces CTA buttons and hero layout into a clean single-column mobile view.


## V4 mobile hard fix

This version fixes the mobile hero logo overflow by:

- forcing a cache-busted stylesheet/script reference in `public/index.html`;
- adding an inline emergency mobile CSS block so old CSS cannot keep the desktop layout;
- setting server cache headers to `no-store` for HTML/CSS/JS/assets during deployment validation;
- forcing the hero layout to one column under 768px;
- constraining the logo to `min(72vw, 260px)` on mobile.

## V5 - Comunidad WhatsApp

Se agregó la comunidad oficial de WhatsApp como CTA visible en:

- Hero principal
- Nueva sección `Comunidad oficial`
- CTA final

Enlace:

https://chat.whatsapp.com/KqkL8aDgaHL0TJmVWpYGzD

También se actualizó el cache-busting de `styles.css` y `app.js` a `whatsapp-community-v5`.
