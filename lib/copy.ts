// Microcopy centralizat în română pentru întreaga aplicație

export const COPY = {
  // Branding
  appName: "Mr. MealPrep",
  tagline: "Planul tău alimentar, optimizat de AI",
  promise: "Macro-uri atinse fără calcule. Coș gata de livrare în 1 minut.",

  // Navigation
  nav: {
    home: "Acasă",
    onboarding: "Începe",
    plan: "Plan",
    week: "Săptămână",
    checkout: "Coș",
    account: "Cont",
  },

  // Landing
  landing: {
    hero: {
      title: "Planul tău alimentar, optimizat de AI",
      subtitle: "Macro-uri atinse fără calcule. Coș gata în 1 minut.",
      cta: "Începe acum",
    },
    howItWorks: {
      title: "Cum funcționează",
      step1: {
        title: "Completează profilul",
        description: "60 de secunde pentru a ne spune obiectivul tău",
      },
      step2: {
        title: "Primești planul",
        description: "AI calculează macro-urile și alege rețetele perfecte",
      },
      step3: {
        title: "Comandă ingredientele",
        description: "Coș optimizat, livrare rapidă, plată Apple/Google Pay",
      },
    },
    pricing: {
      title: "Alege abonamentul",
      free: {
        name: "Free",
        price: "0 RON/lună",
        features: [
          "4 rețete/săptămână",
          "1 profil",
          "Coș & checkout",
        ],
        cta: "Începe gratuit",
      },
      pro: {
        name: "Pro",
        price: "39 RON/lună",
        features: [
          "6-7 rețete/săptămână",
          "Substituții smart",
          "Lock macros",
          "Always-in-cart",
          "2 profiluri",
        ],
        cta: "Activează trial 7 zile",
      },
      gourmet: {
        name: "Gourmet",
        price: "79 RON/lună",
        features: [
          "10-12 rețete/săptămână",
          "Prioritate livrare",
          "Preferințe brand & health",
          "4+ profiluri",
          "Suport prioritar",
        ],
        cta: "Activează trial 7 zile",
      },
    },
  },

  // Onboarding
  onboarding: {
    title: "Să creăm planul tău",
    subtitle: "Răspunde la câteva întrebări rapide",
    steps: {
      basics: "Date de bază",
      goals: "Obiective",
      preferences: "Preferințe",
      advanced: "Avansat",
    },
    fields: {
      age: {
        label: "Vârstă",
        placeholder: "ani",
        help: "Între 16 și 80 de ani",
      },
      sex: {
        label: "Sex",
        options: {
          M: "Masculin",
          F: "Feminin",
        },
      },
      weight: {
        label: "Greutate",
        placeholder: "kg",
        help: "Greutatea actuală în kilograme",
      },
      height: {
        label: "Înălțime",
        placeholder: "cm",
        help: "Înălțimea în centimetri",
      },
      objective: {
        label: "Obiectiv",
        options: {
          cut: "Slăbire (deficit caloric)",
          maintain: "Menținere",
          bulk: "Masă musculară (surplus)",
        },
      },
      pace: {
        label: "Ritm",
        help: "Cât de agresiv vrei să fii",
      },
      activityLevel: {
        label: "Nivel de activitate",
        options: {
          sedentary: "Sedentar (birou, fără sport)",
          light: "Ușor activ (1-2x/săptămână)",
          moderate: "Moderat activ (3-5x/săptămână)",
          active: "Activ (6-7x/săptămână)",
          very_active: "Foarte activ (2x/zi)",
        },
      },
      allergens: {
        label: "Alergii & restricții",
        help: "Selectează tot ce se aplică",
      },
      mealsPerDay: {
        label: "Număr de mese pe zi",
        help: "2-5 mese",
      },
      cookingTime: {
        label: "Timp disponibil pentru gătit",
        help: "Minute per masă",
      },
      budgetPerServing: {
        label: "Buget per porție",
        help: "RON per masă",
      },
      batchCooking: {
        label: "Batch cooking",
        help: "Gătești pentru mai multe zile deodată?",
      },
    },
    cta: "Calculează planul →",
  },

  // Plan Builder
  plan: {
    title: "Construiește planul",
    subtitle: "Ajustează preferințele și generează planul săptămânal",
    efficiency: {
      label: "Eficiență ↔ Varietate",
      efficient: "Eficient",
      balanced: "Echilibrat",
      variety: "Varietate",
      help: "Eficient = mai puține rețete, cost mai mic. Varietate = mai multe rețete diferite.",
    },
    lockMacros: {
      label: "Lock macros",
      help: "Menține țintele la ±5% în fiecare zi",
    },
    pins: {
      label: "Preseturi rapide",
      performance: "Performanță",
      budget: "Buget",
      time: "Timp",
    },
    generate: "Generează plan",
    regenerate: "Regenerează",
    sendToWeek: "Vezi planul săptămânal →",
    paywall: {
      title: "Upgrade pentru plan complet",
      message: "Free permite 4 rețete/săptămână. Pentru plan complet (7 zile), upgrade la Pro sau Gourmet.",
      cta: "Vezi abonamente",
    },
  },

  // Week View
  week: {
    title: "Planul tău săptămânal",
    subtitle: "Înlocuiește rețete sau adaugă în coș",
    substitute: "Înlocuiește",
    addToCart: "Adaugă în coș",
    days: {
      monday: "Luni",
      tuesday: "Marți",
      wednesday: "Miercuri",
      thursday: "Joi",
      friday: "Vineri",
      saturday: "Sâmbătă",
      sunday: "Duminică",
    },
    mealTypes: {
      breakfast: "Mic dejun",
      lunch: "Prânz",
      dinner: "Cină",
      snack: "Gustare",
    },
  },

  // Checkout
  checkout: {
    title: "Finalizează comanda",
    subtitle: "Verifică coșul și selectează livrarea",
    deliveryWindow: {
      label: "Fereastră de livrare",
      defaultDay: "Sâmbătă",
      slots: {
        morning: "10:00 - 13:00",
        afternoon: "13:00 - 16:00",
        evening: "16:00 - 19:00",
      },
      cutoff: "Cutoff pentru săptămâna curentă: Joi 18:00",
    },
    alwaysInCart: {
      label: "Always-in-cart",
      help: "Refill automat periodic (doar Pro/Gourmet)",
    },
    pricing: {
      subtotal: "Subtotal",
      serviceFee: "Taxă serviciu (3.5%, max 9.99 RON)",
      deliveryFee: "Livrare",
      freeDelivery: "Livrare gratuită",
      total: "Total",
      freeDeliveryRemaining: "Mai adaugă {amount} pentru livrare gratuită",
      minimumCart: "Coș minim: 120 RON",
      minimumRemaining: "Mai adaugă {amount} pentru coș minim",
    },
    payment: {
      label: "Metodă de plată",
      card: "Card bancar",
      applePay: "Apple Pay",
      googlePay: "Google Pay",
    },
    placeOrder: "Plasează comanda",
    orderPlaced: {
      title: "Comandă plasată!",
      message: "Vei primi confirmare pe email și SMS.",
    },
  },

  // Account
  account: {
    title: "Contul meu",
    subscription: {
      title: "Abonament",
      current: "Abonament curent",
      change: "Schimbă abonamentul",
    },
    preferences: {
      title: "Preferințe",
      brandPreferences: "Preferințe brand (doar Gourmet)",
      healthTags: "Tag-uri health",
      quietHours: "Quiet hours (21:00-08:00)",
    },
    export: {
      title: "Export listă cumpărături",
      cta: "Descarcă lista",
    },
    gdpr: {
      title: "Consimțământ GDPR",
      label: "Accept procesarea datelor conform GDPR",
    },
  },

  // Common
  common: {
    loading: "Se încarcă...",
    error: "A apărut o eroare",
    retry: "Încearcă din nou",
    cancel: "Anulează",
    confirm: "Confirmă",
    save: "Salvează",
    back: "Înapoi",
    next: "Continuă",
    close: "Închide",
    yes: "Da",
    no: "Nu",
  },

  // Errors
  errors: {
    required: "Acest câmp este obligatoriu",
    invalidEmail: "Email invalid",
    invalidNumber: "Număr invalid",
    minValue: "Valoare prea mică",
    maxValue: "Valoare prea mare",
    network: "Eroare de rețea. Verifică conexiunea.",
    generic: "Ceva nu a mers bine. Încearcă din nou.",
  },
};

