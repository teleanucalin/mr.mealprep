## Mr. Mealprep — E1 Setup

- Stack: Next.js 15 (App Router) + TypeScript, Tailwind CSS 4, ESLint.
- `data/mock.json` și imaginile din `./images/` sunt conservate în `data/mock.json` și `public/images/`.
- Icon-urile PWA (`192`, `512`, maskable) sunt în `public/icons/` (generate cu `sharp`).
- `app/` — pagini și layout-uri App Router.
- `public/manifest.webmanifest` — manifest PWA light-only (lang `ro`).
- `tailwind.config.ts` — temă custom (paletă verde/amber, fonturi, container fluid).
- `next.config.ts` — importuri optimizate, `poweredByHeader: false`.
- Demo mobile-first; font fallback `SF Pro` -> `system-ui`.

### Instalare

```bash
npm install
npm run dev
```

Rulează implicit pe `http://localhost:3000`.
