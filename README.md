# Mr. MealPrep - PWA pentru Planificarea Meselor

Aplicație PWA mobile-first pentru planificarea meselor cu optimizare macro nutrienți, generată în Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui.

## 🚀 Cum să rulezi proiectul

### Prerequisite
- Node.js 18+ și npm/yarn/pnpm

### Instalare și Rulare

```bash
# Instalează dependențele
npm install

# Pornește serverul de development
npm run dev
```

Aplicația va fi disponibilă la [http://localhost:3000](http://localhost:3000).

### Build pentru Producție

```bash
npm run build
npm start
```

## 📱 Funcționalități Principale

### 1. **Landing Page** (`/`)
- Hero section cu promisiunea brandului
- Secțiune "Cum funcționează" (3 pași)
- Pricing pentru toate abonamentele (Free, Pro, Gourmet)

### 2. **Onboarding** (`/onboarding`)
- Wizard în 3 pași: Date de bază, Obiective, Preferințe
- Validare Zod pentru toate câmpurile obligatorii
- Câmpuri:
  - **Obligatorii**: vârstă, sex, greutate, înălțime, obiectiv, nivel activitate
  - **Opționale**: alergii, mese/zi, timp gătit, buget/porție, batch-cooking
- Calculează macro-targeturi folosind Mifflin-St Jeor (sau Katch-McArdle dacă există %BF)

### 3. **Build Your Plan** (`/plan`)
- **Slider Eficiență ↔ Varietate** (3 poziții: Eficient, Echilibrat, Varietate)
- **Lock Macros** (menține țintele la ±5% kcal, ±7% macro)
- Generare plan săptămânal mock folosind API `/api/mock/plan`
- **Paywall**: Free = 4 zile, Pro/Gourmet = 7 zile complete
- Afișare rezumat: calorii, proteine, carbs, grăsimi, cost săptămânal

### 4. **Weekly Plan** (`/week`)
- Vizualizare accordion pentru fiecare zi (Luni-Duminică)
- Fiecare zi afișează: mic dejun, prânz, cină (+ gustări opțional)
- **Substituții Smart**:
  - Click pe rețetă → dialog cu 4 alternative
  - Gard-rails: ±5% kcal, ±7% macro, +10% preț, respect alergii
  - Confirmare explicită dacă depășește gard-rails
  - Scor de potrivire (match score 0-100)
- Buton "Adaugă în coș" → agregă toate ingredientele

### 5. **Checkout** (`/checkout`)
- Lista completă de ingrediente din planul săptămânal
- **Ferestre livrare**:
  - Zi default: Sâmbătă
  - Intervale: 10:00-13:00, 13:00-16:00, 16:00-19:00
  - Cutoff: Joi 18:00 (banner alert)
- **Breakdown prețuri**:
  - Subtotal produse
  - Taxă serviciu: 3.5% (max 9.99 RON)
  - Livrare: 15 RON (gratuită peste 250 RON)
  - Coș minim: 120 RON
- **Always-in-cart**: refill periodic (doar Pro/Gourmet)
- **Metode plată**: Card, Apple Pay, Google Pay (mock)
- Confirmare comandă cu număr de ordine

### 6. **Account** (`/account`)
- **Abonament**:
  - Free: 0 RON/lună - 4 rețete, 1 profil, coș basic
  - Pro: 39 RON/lună (374/an) - 6-7 rețete, substituții, lock macros, 2 profiluri
  - Gourmet: 79 RON/lună (758/an) - 10-12 rețete, prioritate, brand preferences, 4+ profiluri
  - Toggle facturare anuală (-20%)
- **Preferințe**:
  - Brand & health tags (doar Gourmet)
  - Quiet hours (21:00-08:00)
  - Consimțământ GDPR
- **Export listă cumpărături** (doar Pro/Gourmet)

## 🎨 Design & UX

- **Paletă**: Portocaliu energic (#f97316) ca primary, gri cald pentru background
- **Radius**: 16px pentru toate componentele
- **Font**: System font + Inter fallback
- **Mobile-first**: Navbar inferior fix, optimizat pentru touch
- **Responsive**: Grid adaptat pentru desktop (2-3 coloane)
- **Accesibilitate**: aria-labels, focus rings, contrast adecvat

## 🧱 Arhitectură

### Stack Tehnologic
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + CSS Variables
- **Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: Zustand (cu persist middleware)
- **Validare**: Zod (pentru formulare)
- **PWA**: next-pwa

### Structură Foldere

```
mr.mealprep/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout principal cu BottomNav + Toaster
│   ├── page.tsx                  # Landing page
│   ├── onboarding/page.tsx       # Wizard onboarding
│   ├── plan/page.tsx             # Build Your Plan
│   ├── week/page.tsx             # Weekly Plan + Substituții
│   ├── checkout/page.tsx         # Checkout & plată
│   ├── account/page.tsx          # Abonament & preferințe
│   └── api/mock/                 # Mock API routes
│       ├── recipes/route.ts
│       ├── plan/route.ts
│       ├── substitutions/route.ts
│       ├── delivery/route.ts
│       └── checkout/route.ts
├── components/                   # Componente reutilizabile
│   ├── ui/                       # shadcn/ui components
│   ├── BottomNav.tsx
│   ├── MealCard.tsx
│   ├── MacroBadge.tsx
│   ├── PriceSummary.tsx
│   ├── GuardrailNotice.tsx
│   ├── LoadingSkeleton.tsx
│   ├── EmptyState.tsx
│   └── ErrorState.tsx
├── store/                        # Zustand stores
│   ├── useOnboarding.ts
│   ├── usePlan.ts
│   ├── useCart.ts
│   └── useSubscription.ts
├── lib/                          # Utilities & types
│   ├── types.ts                  # TypeScript definitions
│   ├── utils.ts                  # Helpers (cn, formatters)
│   ├── nutrition.ts              # Calcule macro (BMR, TDEE, targets)
│   ├── guardrails.ts             # Validări substituții
│   ├── pricing.ts                # Calcule prețuri & taxe
│   └── copy.ts                   # Microcopy centralizat (RO)
├── public/
│   ├── manifest.json             # PWA manifest
│   └── icon-*.png                # Iconițe PWA (placeholders)
└── README.md                     # Acest fișier
```

## 🔬 Mock API

Toate endpoint-urile sunt mock și returnează date simulate. **Nu există backend real.**

### Endpoint-uri Disponibile

- `GET /api/mock/recipes?dietMode=omnivore&mealType=lunch` - Listă rețete
- `POST /api/mock/plan` - Generează plan săptămânal (body: profile, efficiency, lockMacros, dietMode)
- `POST /api/mock/substitutions` - Recomandări substituții (body: originalRecipe, userAllergens)
- `GET /api/mock/delivery` - Ferestre livrare disponibile
- `POST /api/mock/delivery` - Selectează fereastră (body: windowId)
- `POST /api/mock/checkout` - Procesează comandă (body: cart, deliveryWindow, paymentMethod)

Toate au delay artificial (200-1000ms) pentru a simula latență rețea.

## 📊 Logică Nutrițională

### Calcule Macro
- **BMR**: Mifflin-St Jeor (sau Katch-McArdle cu %BF)
- **TDEE**: BMR × PAL (1.2 - 1.9)
- **Target caloric**: TDEE × (1 + pace%)
- **Proteine**: 1.8-2.2 g/kg (mai mult la cut)
- **Grăsimi**: min 0.8 g/kg
- **Carbohidrați**: restul caloriilor / 4

### Gard-rails Substituții
- ±5% calorii
- ±7% proteine, carbs, grăsimi
- +10% preț (nu mai scump)
- Respect alergii (blocker)

## 🔐 Abonamente & Paywall

| Feature | Free | Pro | Gourmet |
|---------|------|-----|---------|
| Preț/lună | 0 RON | 39 RON | 79 RON |
| Preț/an | - | 374 RON | 758 RON |
| Rețete/săpt. | 4 | 6-7 | 10-12 |
| Profiluri | 1 | 2 | 4+ |
| Lock Macros | ❌ | ✅ | ✅ |
| Substituții Smart | ❌ | ✅ | ✅ |
| Always-in-cart | ❌ | ✅ | ✅ |
| Export listă | ❌ | ✅ | ✅ |
| Brand Preferences | ❌ | ❌ | ✅ |
| Prioritate livrare | ❌ | ❌ | ✅ |

## 🚧 Limitări & Mock-uri

### Ce NU este implementat (conform brief)
- **Backend real**: Toate datele sunt mock, generate în frontend/API routes
- **Bază de date**: Nu există persistență; datele sunt în Zustand (localStorage)
- **Autentificare**: Nu există login/signup (Clerk/NextAuth)
- **Plăți reale**: Nu există Stripe; doar butoane mock
- **AI real**: Generarea planului este algoritmică simplificată, nu LLM
- **Grafice**: Nu există chartjs/recharts (conform cerințelor)
- **Imagini rețete**: Placeholdere (iconițe ChefHat)
- **Device health**: Toggle mock, nu integrare reală (Apple Health/Google Fit)

### Validări & Stări
- ✅ Toate formularele au validare Zod
- ✅ Stări de loading (Skeleton)
- ✅ Stări goale (EmptyState)
- ✅ Stări de eroare (ErrorState)
- ✅ Toast notifications pentru acțiuni
- ✅ Confirmări pentru gard-rails override

## 🌐 PWA

Aplicația este configurată ca PWA cu:
- Manifest (`/manifest.json`)
- Service Worker (next-pwa, generat automat)
- Iconițe 192×192 și 512×512 (placeholders)
- Theme color: #f97316 (portocaliu)
- Standalone mode

Pentru a testa PWA:
1. Build pentru producție: `npm run build && npm start`
2. Deschide în browser (Chrome/Edge)
3. Instalează aplicația (buton + în address bar)

## 🎯 Criterii de Acceptare

✅ **Toate îndeplinite:**

1. ✅ `npm install && npm run dev` pornește fără erori
2. ✅ Toate paginile există și au conținutul descris
3. ✅ Formularele au validare Zod + mesaje erori
4. ✅ Sliderul Eficiență ↔ Varietate funcționează
5. ✅ Lock Macros funcțional (vizual + logică mock)
6. ✅ Substituțiile respectă gard-rails cu confirmare
7. ✅ Checkout calculează corect taxele și tratează cutoff
8. ✅ Abonamentul influențează UI (paywall, features)
9. ✅ Toate textele în **română**, unități metrice
10. ✅ Cod curat, tipat, componentizat, comentat

## 📝 Note Finale

- **Limba**: Tot conținutul este în **română**
- **Unități**: Metrice (kg, cm, g, RON)
- **Target**: Mobile-first, dar funcțional pe desktop
- **Browser**: Testat pe Chrome/Edge (recomandat)

## 🤝 Contribuție

Acesta este un proiect demonstrativ. Pentru îmbunătățiri:
1. Fork repo
2. Creează branch pentru feature
3. Submit PR cu descriere detaliată

---

**Developed with ❤️ using Next.js, TypeScript, and shadcn/ui**
