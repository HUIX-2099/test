# Amaratech Core Website

  
> **Lead Developer**: Adebiyi Samuel  
> **Last Updated**: January 10, 2026

Welcome to the **Amaratech Core Website** repository — the official web presence for AmaraTech IT Solutions. This project is a complete redesign based on the [resend.com](https://resend.com) design aesthetic with a sophisticated dark theme.

---

##  About

This repository contains the source code for the AmaraTech corporate website, showcasing our services, solutions, and expertise in IT consulting, cybersecurity, and cloud technology services.

**Design References**:
- [resend.com](https://resend.com) — Primary layout and UX patterns
- [security.amaratechit.com](https://security.amaratechit.com) — Dark theme and visual effects
- [amaratechit.com](https://amaratechit.com) — Content source

---

##  Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x | React framework with SSR/SSG for SEO |
| React | 18.x | Core UI framework |
| TypeScript | 5.x | Type safety |
| Framer Motion | Latest | Animations and transitions |
| Three.js + Vanta.js | Latest | 3D background effects |
| next-seo | Latest | SEO meta tags management |
| next-sitemap | Latest | Automatic sitemap generation |

---

##  Project Structure

```
Amaratech-Core-Website/
├── README.md                    # This file
├── DESIGN_GUIDE.md              # Brand guidelines & component specs
├── implementation_plan.md       # Detailed technical blueprint
│
└── amaratech-website/           # Next.js application
    ├── public/
    │   ├── favicon/
    │   ├── images/
    │   │   ├── logo.svg
    │   │   ├── logo-white.svg
    │   │   ├── hero-3d.png
    │   │   ├── products/
    │   │   │   └── impactiq-dashboard.png
    │   │   ├── testimonials/
    │   │   └── client-logos/
    │   ├── og-image.png
    │   └── fonts/
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx        # Root layout with SEO
    │   │   ├── page.tsx          # Home page
    │   │   ├── about/
    │   │   ├── services/
    │   │   │   └── [slug]/       # Dynamic service pages
    │   │   ├── products/
    │   │   │   └── impactiq/     # ImpactIQ product page
    │   │   └── contact/
    │   ├── components/
    │   │   ├── common/           # Button, Card, GlassCard, ProductCard
    │   │   ├── layout/           # Navbar, Footer
    │   │   └── sections/         # Hero, Services, Products, etc.
    │   ├── lib/
    │   │   ├── seo.ts            # SEO configuration
    │   │   └── schema.ts         # JSON-LD structured data
    │   ├── styles/
    │   │   ├── globals.css       # Global styles & CSS variables
    │   │   └── variables.css     # Design tokens
    │   └── hooks/
    │       └── useVanta.ts       # Vanta.js background hook
    ├── next.config.js
    ├── next-sitemap.config.js
    ├── package.json
    └── tsconfig.json
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- Code editor (VS Code recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/AmaraTech-IT-Solutions/Amaratech-Core-Website.git

# Navigate to the project directory
cd Amaratech-Core-Website/amaratech-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

The development server will start at [http://localhost:3000](http://localhost:3000).

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Generate sitemap (runs automatically after build)
npx next-sitemap
```

---

## 📄 Home Page Sections

The home page consists of **10 sections** (see implementation_plan.md for details):

1. **Navigation Header** — Sticky nav with dropdowns
2. **Hero Section** — 3D image, headline, CTAs
3. **Trusted By** — Client/industry logos
4. **Services Integration** — Tabbed service descriptions
5. **Features Grid** — Key differentiators
6. **Process** — 3-step security process
7. **See Our Products** — ImpactIQ showcase (ultra-dark card)
8. **Testimonials** — Client testimonial carousel
9. **FAQ Accordion** — Common questions
10. **CTA Banner** — Final call-to-action
11. **Footer** — Links, contact info, social

---

## 🎨 Design Resources

| Document | Description |
|----------|-------------|
| [DESIGN_GUIDE.md](./DESIGN_GUIDE.md) | Color palette, typography, components, CSS snippets |
| [implementation_plan.md](./implementation_plan.md) | Section layouts, wireframes, SEO config, content mapping |

### Key Design Principles

- **Dark Theme**: Pure black (`#000000`) background with red accents
- **Glassmorphism**: Semi-transparent cards with blur effects
- **3D Elements**: Vanta.js background, rendered hero images
- **Elegant Typography**: Serif headings (like Resend), sans-serif body

---

## 🔍 SEO Implementation

This project uses `next-seo` and `next-sitemap` for comprehensive SEO:

```typescript
// Example: Using NextSeo in a page
import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo
        title="AmaraTech IT Solutions | Cybersecurity & Cloud Services"
        description="Enterprise-grade cybersecurity and IT solutions..."
        canonical="https://amaratechit.com/"
      />
      {/* Page content */}
    </>
  );
}
```

### Sitemap Configuration

The `next-sitemap.config.js` is pre-configured to:
- Generate sitemap automatically on build
- Create robots.txt with AI crawler allowlist
- Exclude admin/API routes

---

## 🤝 Contributing

1. Review the **DESIGN_GUIDE.md** before making UI changes
2. Follow the component patterns in `src/components/common/`
3. Use CSS variables from `globals.css` for all colors
4. Test responsive layouts at all breakpoints
5. Ensure accessibility compliance (WCAG 2.1 AA)

### Branch Naming

- `feature/section-name` — New sections
- `fix/issue-description` — Bug fixes
- `style/component-name` — Styling updates

---

## 📞 Contact

**AmaraTech IT Solutions**

- Website: [amaratechit.com](https://amaratechit.com)
- Email: info@amaratechit.com
- Phone: +1 410 855 2206

---

## 📄 License

This project is proprietary to AmaraTech IT Solutions. All rights reserved.

---

*Design  by Adebiyi Samuel*

*Built with ❤️ by AmaraTech IT Solutions*
