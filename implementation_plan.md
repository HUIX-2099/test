# Amaratech Core Website Redesign - Implementation Plan

> **Objective**: Redesign [amaratechit.com](https://amaratechit.com/) to match the design aesthetic of [resend.com](https://resend.com/), incorporating the advanced dark theme styling from [security.amaratechit.com](https://security.amaratechit.com/) with Amaratech branding (red + sophisticated black).

---

## Design Reference Screenshots

### Resend.com Design System
The following screenshots from resend.com serve as the **primary design template**:

````carousel
![Resend Hero Section - Dark theme with 3D cube, elegant typography, and "Get Started" CTA](/Users/sammygold/.gemini/antigravity/brain/05bd4b86-d4f2-436d-81fd-303bbefae19b/uploaded_image_0_1767997868503.png)
<!-- slide -->
![Resend Trusted Companies - Logo strip with subtle border animation](/Users/sammygold/.gemini/antigravity/brain/05bd4b86-d4f2-436d-81fd-303bbefae19b/uploaded_image_1_1767997868503.png)
<!-- slide -->
![Resend Integration Section - 3D icon, code tabs, SDK selection](/Users/sammygold/.gemini/antigravity/brain/05bd4b86-d4f2-436d-81fd-303bbefae19b/uploaded_image_2_1767997868503.png)
````

### Security.amaratechit.com Visual Reference
The following screenshots show the **advanced dark theme styling** to incorporate:

````carousel
![Security Hero - Red plexus animation, glassmorphism buttons, status badges](/Users/sammygold/.gemini/antigravity/brain/05bd4b86-d4f2-436d-81fd-303bbefae19b/hero_section_dark_theme_1767998055511.png)
<!-- slide -->
![Platform Cards - Glassmorphism UI, connected nodes, dark schematic](/Users/sammygold/.gemini/antigravity/brain/05bd4b86-d4f2-436d-81fd-303bbefae19b/platform_cards_section_1767998121286.png)
<!-- slide -->
![Integrations - Dashboard aesthetic, partner logos, data tables](/Users/sammygold/.gemini/antigravity/brain/05bd4b86-d4f2-436d-81fd-303bbefae19b/integrations_section_1767998202334.png)
````

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.x | React framework with SSR/SSG for SEO |
| React | 18.x | Core UI framework |
| Framer Motion | Latest | Animations and transitions |
| Three.js + Vanta.js | Latest | 3D background effects (plexus/halo) |
| CSS Modules | - | Scoped styling |
| next-seo | Latest | SEO meta tags management |
| next-sitemap | Latest | Automatic sitemap generation |

> [!IMPORTANT]
> **Why Next.js over Vite/React SPA?**
> - Server-Side Rendering (SSR) for better SEO indexing
> - Automatic static optimization for faster page loads
> - Built-in Image Optimization for 3D assets
> - Native sitemap and robots.txt generation
> - Better AI crawler compatibility (Googlebot, GPTBot, etc.)

---

## Brand Identity & Color Palette

> [!IMPORTANT]
> Replace existing blue-based palette with Amaratech's signature **Red + Sophisticated Black** theme.

### Primary Colors

| Color Name | Hex Code | CSS Variable | Usage |
|------------|----------|--------------|-------|
| **Amaratech Red** | `#E53935` | `--color-primary` | Primary CTAs, accents, highlights |
| **Deep Red** | `#B71C1C` | `--color-primary-dark` | Hover states, active elements |
| **Light Red** | `#FF5252` | `--color-primary-light` | Subtle accents, gradients |
| **Pure Black** | `#000000` | `--color-bg-primary` | Main background |
| **Sophisticated Black** | `#0A0A0A` | `--color-bg-secondary` | Card backgrounds, sections |
| **Dark Gray** | `#141414` | `--color-bg-tertiary` | Elevated surfaces |
| **White** | `#FFFFFF` | `--color-text-primary` | Headings, primary text |
| **Light Gray** | `#A1A1AA` | `--color-text-secondary` | Body text, descriptions |

### Accent & Effect Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Neon Red Glow** | `rgba(229, 57, 53, 0.5)` | Box shadows, glows |
| **Cyan Accent** | `#00D1FF` | Secondary highlights (from security site) |
| **Success Green** | `#22C55E` | Status indicators |
| **Border Gray** | `rgba(255, 255, 255, 0.1)` | Subtle borders |

---

## SEO & AI Visibility Strategy

> [!CAUTION]
> This section is CRITICAL for ensuring the website is discoverable by search engines and AI systems.

### Meta Tags (Every Page)

```jsx
// Using next-seo in each page
import { NextSeo } from 'next-seo';

export default function Home() {
  return (
    <>
      <NextSeo
        title="AmaraTech IT Solutions | Cybersecurity & Cloud Services"
        description="Enterprise-grade cybersecurity and IT solutions. Microsoft Azure partner, 24/7 threat monitoring, CMMC/HIPAA compliance. Serving businesses worldwide."
        canonical="https://amaratechit.com/"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://amaratechit.com/',
          siteName: 'AmaraTech IT Solutions',
          title: 'AmaraTech IT Solutions | Cybersecurity & Cloud Services',
          description: 'Enterprise-grade cybersecurity and IT solutions.',
          images: [
            {
              url: 'https://amaratechit.com/og-image.png',
              width: 1200,
              height: 630,
              alt: 'AmaraTech IT Solutions',
            },
          ],
        }}
        twitter={{
          handle: '@amaratechit',
          site: '@amaratechit',
          cardType: 'summary_large_image',
        }}
      />
      {/* Page content */}
    </>
  );
}
```

### Structured Data (JSON-LD)

Add to `layout.js` or individual pages:

```jsx
// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AmaraTech IT Solutions",
  "url": "https://amaratechit.com",
  "logo": "https://amaratechit.com/logo.png",
  "description": "Enterprise-grade cybersecurity and IT solutions",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "8865 Stanford Blvd, Suite 202 #1003",
    "addressLocality": "Columbia",
    "addressRegion": "MD",
    "postalCode": "21045",
    "addressCountry": "US"
  },
  "telephone": "+1-410-855-2206",
  "sameAs": [
    "https://www.facebook.com/AmaraTechITSolutions/",
    "https://www.linkedin.com/company/amaratech-it-solutions/",
    "https://twitter.com/amaratechit",
    "https://github.com/AmaraTech-IT-Solutions"
  ],
  "offers": {
    "@type": "AggregateOffer",
    "itemOffered": [
      { "@type": "Service", "name": "Cybersecurity Services" },
      { "@type": "Service", "name": "Microsoft Azure Solutions" },
      { "@type": "Service", "name": "Cloud Solutions" },
      { "@type": "Service", "name": "IT Consulting" }
    ]
  }
};

// Service Schema (for each service page)
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Cybersecurity",
  "provider": {
    "@type": "Organization",
    "name": "AmaraTech IT Solutions"
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Cybersecurity Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Threat Detection" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Compliance Support" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Penetration Testing" }}
    ]
  }
};
```

### Sitemap & Robots.txt

Use `next-sitemap` for automatic generation:

```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://amaratechit.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },   // Allow AI crawlers
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Anthropic-AI', allow: '/' },
    ],
    additionalSitemaps: [
      'https://amaratechit.com/sitemap-0.xml',
    ],
  },
  exclude: ['/admin/*', '/api/*'],
};
```

### AI Crawlability Best Practices

| Requirement | Implementation |
|-------------|----------------|
| Semantic HTML | Use `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>` |
| Heading Hierarchy | Single `<h1>` per page, logical H2-H6 structure |
| Alt Text | All images have descriptive alt attributes |
| Link Context | Use descriptive anchor text, not "click here" |
| Content Accessibility | Text content visible without JavaScript (SSR) |
| Fast Load Times | Core Web Vitals optimized (LCP < 2.5s) |
| Mobile Responsive | All pages mobile-friendly |

### Page-Specific SEO

| Page | Title | Keywords to Target |
|------|-------|--------------------|
| Home | "AmaraTech IT Solutions \| Cybersecurity & Cloud Services" | cybersecurity, IT solutions, cloud services, Microsoft Azure |
| Services | "Managed IT & Cybersecurity Services \| AmaraTech" | managed IT services, security monitoring, compliance |
| About | "About AmaraTech \| Trusted IT Partner Since 2009" | IT company, cybersecurity experts, certified professionals |
| Contact | "Contact AmaraTech IT Solutions \| Free Security Assessment" | IT consultation, security assessment, contact |
| Products | "ImpactIQ - AI-Powered Vulnerability Management \| AmaraTech" | vulnerability management, risk quantification, security platform |

---

## Typography

| Element | Font Family | Size | Weight | Line Height |
|---------|-------------|------|--------|-------------|
| H1 (Hero) | `'GT Super Display', Georgia, serif` | 72px | 400 | 1.1 |
| H2 | `'Inter', sans-serif` | 48px | 600 | 1.2 |
| H3 | `'Inter', sans-serif` | 32px | 600 | 1.3 |
| H4 | `'Inter', sans-serif` | 24px | 500 | 1.4 |
| Body Large | `'Inter', sans-serif` | 18px | 400 | 1.6 |
| Body | `'Inter', sans-serif` | 16px | 400 | 1.6 |
| Caption | `'Inter', sans-serif` | 14px | 400 | 1.5 |
| Code | `'JetBrains Mono', monospace` | 14px | 400 | 1.6 |

> [!NOTE]
> The hero headline uses a **serif font** (like Resend's "Email for developers") to create contrast with the sans-serif body text.

---

## Page Structure & Sections

### Navigation Header
**Reference**: Resend top navigation

```
┌─────────────────────────────────────────────────────────────────────┐
│ [Logo]    Services ▾  Company ▾  Resources ▾  Docs ▾   │  Log In  [Get Started] │
└─────────────────────────────────────────────────────────────────────┘
```

**Implementation Details**:
- Fixed/sticky navigation on scroll
- Logo: Amaratech logo (red accent version for dark background)
- Dropdown menus with glassmorphism effect
- "Get Started" button with red background, white text
- Subtle border-bottom or gradient line

---

### Section 1: Hero Section
**Reference**: Resend hero with 3D cube

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│   ┌────────────────────────────────┐    ┌────────────────────────┐  │
│   │                                │    │                        │  │
│   │  IT Solutions for             │    │   [3D RENDERED IMAGE]  │  │
│   │  the Future                    │    │   - Shield/Lock icon   │  │
│   │                                │    │   - Cube/Network       │  │
│   │  Tagline: "Enterprise-grade    │    │   - Red accent glow    │  │
│   │  cybersecurity and IT solutions│    │                        │  │
│   │  that safeguard your systems"  │    └────────────────────────┘  │
│   │                                │                                 │
│   │  [Get Started]  [Our Services] │                                 │
│   └────────────────────────────────┘                                 │
│                                                                      │
│   ═══════════════════════════════════════════════════════════════   │
│   (Subtle animated gradient line divider)                            │
└──────────────────────────────────────────────────────────────────────┘
```

**Content to use** (from amaratechit.com):
- Headline: "IT Solutions for the Future" or "Your Trusted Partner in Digital Security"
- Subheadline: "At AmaraTech IT, we deliver enterprise-grade cybersecurity and IT solutions that safeguard your systems, ensure compliance, and give your business the confidence to grow in today's digital world."
- CTA 1: "Get Started" → Contact page
- CTA 2: "Our Services" → Services section

**3D Image Requirements**:
- Generate or source a 3D rendered image similar to Resend's cube
- Suggestions: Shield icon, network nodes, security lock
- Must have red accent glow/reflection
- Dark sophisticated aesthetic

---

### Section 2: Trusted By / Client Logos
**Reference**: Resend "Companies of all sizes trust Resend"

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│          "Trusted by businesses worldwide to secure their future"    │
│                                                                      │
│   [Logo 1]  [Logo 2]  [Logo 3]  [Logo 4]  [Logo 5]  [Logo 6]        │
│   [Logo 7]  [Logo 8]  [Logo 9]  [Logo 10] [Logo 11] [Logo 12]       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Industries to represent** (from amaratechit.com):
- Education
- Government
- Health Care
- Non-Profit
- Retail & Banking

**Notes**:
- Use industry icons if client logos unavailable
- Grayscale/white logos on dark background
- Subtle hover effect to colorize

---

### Section 3: Services Integration Section
**Reference**: Resend "Integrate tonight" with SDK tabs

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                     [3D SERVICE ICON - Glowing]                      │
│                                                                      │
│               "Solutions for Every Business Need"                    │
│                                                                      │
│   A comprehensive suite of IT services designed to transform your   │
│   business. From cloud migration to cybersecurity, we've got you    │
│   covered.                                                          │
│                                                                      │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │ [Azure] [Cloud] [Security] [IT] [E-Gov] [AI]                 │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │ Microsoft Azure │ Cloud Solutions │ Cyber Security │ ...     │  │
│   ├──────────────────────────────────────────────────────────────┤  │
│   │                                                              │  │
│   │  Microsoft Azure                                             │  │
│   │  ─────────────────                                           │  │
│   │  At AmaraTech IT Solutions, we are proud to announce our     │  │
│   │  strategic partnership with Microsoft, a collaboration       │  │
│   │  designed to revolutionize the way businesses embrace        │  │
│   │  cloud technology.                                           │  │
│   │                                                              │  │
│   │  ✓ Azure Migration Strategy                                  │  │
│   │  ✓ Microsoft Office 365                                      │  │
│   │  ✓ Cloud Infrastructure Management                           │  │
│   │                                                              │  │
│   │                                    [Learn More →]            │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Services Tabs** (from amaratechit.com):
1. **Microsoft Azure** - Strategic partnership, cloud technology
2. **Cloud Solutions** - Networking, storage, scalability
3. **Cyber Security** - Threat detection, data protection
4. **IT Consulting** - Technology-driven counsel
5. **E-Governance** - Licensing, compliance, reporting
6. **Artificial Intelligence** - AI solutions

---

### Section 4: Features Grid
**Reference**: Resend features (Test Mode, Webhooks, Contact Management, etc.)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                     "What Sets Us Apart"                             │
│                                                                      │
│   ┌─────────────────────┐   ┌─────────────────────┐                 │
│   │ [Icon]              │   │ [Icon]              │                 │
│   │ 24/7 Threat         │   │ Certified           │                 │
│   │ Monitoring          │   │ Expertise           │                 │
│   │                     │   │                     │                 │
│   │ Always-on protection│   │ CISSP, Microsoft,   │                 │
│   │ against evolving    │   │ AWS certified       │                 │
│   │ cyber risks         │   │ professionals       │                 │
│   │                     │   │                     │                 │
│   │ [Learn more]        │   │ [Learn more]        │                 │
│   └─────────────────────┘   └─────────────────────┘                 │
│                                                                      │
│   ┌─────────────────────┐   ┌─────────────────────┐                 │
│   │ [Icon]              │   │ [Icon]              │                 │
│   │ Compliance          │   │ Customized          │                 │
│   │ Ready               │   │ Solutions           │                 │
│   │                     │   │                     │                 │
│   │ HIPAA, CMMC, ISO,   │   │ Tailored IT         │                 │
│   │ GDPR, NIST          │   │ solutions with      │                 │
│   │ compliance support  │   │ measurable outcomes │                 │
│   └─────────────────────┘   └─────────────────────┘                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Feature Cards** (from amaratechit.com):
1. 24/7 Threat Monitoring
2. Certified Expertise (CISSP, Microsoft, AWS)
3. Compliance Support (HIPAA, CMMC, ISO, GDPR, NIST)
4. Customized Solutions
5. 15+ Years Experience
6. Strong Partnerships

**Card Styling**:
- Glassmorphism effect (like security.amaratechit.com)
- Subtle red glow on hover
- Icon with gradient background

---

### Section 5: Process/How It Works
**Reference**: Combined from Resend's visual flow and security site's process

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                 "Our Proven Security Process"                        │
│                                                                      │
│   ┌────────────┐     ┌────────────┐     ┌────────────┐              │
│   │    01      │────▶│    02      │────▶│    03      │              │
│   │ Assessment │     │ Implement  │     │ Protection │              │
│   │            │     │            │     │            │              │
│   │ Identify   │     │ Deploy     │     │ 24/7       │              │
│   │ vulnerabil-│     │ tailored   │     │ threat     │              │
│   │ ities and  │     │ solutions  │     │ monitoring │              │
│   │ compliance │     │ and        │     │ and rapid  │              │
│   │ gaps       │     │ strengthen │     │ incident   │              │
│   │            │     │ security   │     │ response   │              │
│   └────────────┘     └────────────┘     └────────────┘              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

### Section 6: See Our Products
**NEW SECTION** - Showcase Amaratech's proprietary products

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                     "See Our Products"                               │
│                                                                      │
│   Cutting-edge security tools built by our team to protect          │
│   your business.                                                     │
│                                                                      │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │                                                              │  │
│   │   ██████████████████████████████████████████████████████████ │  │
│   │   ███                                                 ███   │  │
│   │   ███     [IMPACTIQ DASHBOARD SCREENSHOT]             ███   │  │
│   │   ███     Risk Score: 62 | Exposure: $310K            ███   │  │
│   │   ███     Vulnerabilities: 23 | Critical: 7           ███   │  │
│   │   ███                                                 ███   │  │
│   │   ██████████████████████████████████████████████████████████ │  │
│   │                                                              │  │
│   │   ImpactIQ                                                   │  │
│   │   ──────────                                                 │  │
│   │   AI-Powered Vulnerability Management                        │  │
│   │                                                              │  │
│   │   Transform security findings into financial intelligence.  │  │
│   │   Quantify cyber risk in dollars, not just severity levels. │  │
│   │                                                              │  │
│   │   ✓ Real-time Risk Quantification                           │  │
│   │   ✓ Financial Impact Analysis ($310K exposure tracking)     │  │
│   │   ✓ Automated Compliance Tracking                           │  │
│   │   ✓ CFO-Ready Business Intelligence                         │  │
│   │                                                              │  │
│   │                    [Learn More →]  [Access Platform]         │  │
│   │                                                              │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### ImpactIQ Dashboard Screenshots

Use these captured screenshots in the product card:

````carousel
![ImpactIQ Overview - Risk Score 62, 6 apps monitored, $310K exposure](/Users/sammygold/.gemini/antigravity/brain/05bd4b86-d4f2-436d-81fd-303bbefae19b/impactiq_overview_dashboard_1767999405368.png)
<!-- slide -->
![ImpactIQ Analysis - Financial impact per vulnerability](/Users/sammygold/.gemini/antigravity/brain/05bd4b86-d4f2-436d-81fd-303bbefae19b/impactiq_analysis_table_1767999426495.png)
````

### Product Card Styling (Ultra-Dark)

```css
.product-card {
  background: #000000; /* Pure black interior */
  border: 1px solid rgba(229, 57, 53, 0.2);
  border-radius: 24px;
  padding: 48px;
  position: relative;
  overflow: hidden;
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(
    180deg,
    rgba(229, 57, 53, 0.1) 0%,
    transparent 100%
  );
  pointer-events: none;
}

.product-screenshot {
  background: #0A0A0A;
  border-radius: 16px;
  padding: 4px;
  box-shadow:
    0 0 60px rgba(0, 0, 0, 0.8),
    0 0 100px rgba(229, 57, 53, 0.1);
}

.product-screenshot img {
  border-radius: 12px;
  width: 100%;
  height: auto;
}
```

### ImpactIQ Product Copy

**Headline**: "ImpactIQ"
**Subtitle**: "AI-Powered Vulnerability Management"

**Description**:
> We're working at the intersection of cybersecurity intelligence and financial impact analysis to transform every security finding into CFO-ready business intelligence.

**Key Features**:
1. **Comprehensive Risk Assessment** - Overall risk score based on monitored applications
2. **Financial Impact Analysis** - Quantifies security risks in monetary terms ($310K)
3. **Vulnerability Management** - Categorizes by severity (Critical, High, Medium, Low)
4. **SLA Compliance Tracking** - Monitors remediation within service levels
5. **Application-Specific Insights** - Risk distribution by application

**CTA Buttons**:
- "Learn More" → `/products/impactiq`
- "Access Platform" → `https://security.amaratechit.com`

---

### Section 7: Testimonials
**Reference**: Resend "Beyond expectations" testimonial carousel

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                     "Beyond Expectations"                            │
│                                                                      │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                                                             │   │
│   │  "AmaraTech orchestrated a comprehensive enterprise-wide    │   │
│   │   infrastructure transformation that fundamentally          │   │
│   │   enhanced our organization's security posture..."          │   │
│   │                                                             │   │
│   │                              — Preston, Cyber Security      │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│   ● ○ ○ ○ ○ ○  (Carousel indicators)                                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

**Testimonials to include** (from amaratechit.com):
1. Preston - CMMC Level 2 certification
2. Letisha Vinson - Cloud Solutions
3. Kemi Adetola - IT Consulting
4. Folley Fahnbulleh - Microsoft 365
5. Abubakar Kamara - COVID IT restructure
6. Masmina Sirleaf - Snapper Hill Clinic

---

### Section 8: FAQ Accordion
**Reference**: Styled like Resend's clean accordion

Questions from amaratechit.com:
1. What services does AmaraTech IT provide?
2. How is AmaraTech IT different from others?
3. Do you offer 24/7 support?
4. Can you help with compliance requirements?
5. What industries does AmaraTech IT serve?
6. How quickly can you respond to a cyber incident?

---

### Section 9: CTA Banner
**Reference**: Resend "Email reimagined. Available today."

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                "Ready to Secure Your Business Future?"               │
│                                                                      │
│              [Request Free Assessment]    [Contact Us]               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

### Section 10: Footer
**Reference**: Resend footer layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [Company Logo]           Company        Services        Contact     │
│                           ──────         ────────        ───────     │
│  8865 Stanford Blvd       Home           Azure           USA:        │
│  Suite 202 #1003          About Us       Cloud           +1 410 855  │
│  Columbia, MD 21045       Careers        Security        2206        │
│                           Blog           Consulting                  │
│  [Social Icons]           Events         E-Governance    Liberia:    │
│  FB IG X LI YT GH                        AI              +231 77 861 │
│                                                          6504        │
│                                                                      │
│  ─────────────────────────────────────────────────────────────────   │
│  © 2024 AmaraTech IT Solutions. All rights reserved.                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Visual Effects & Animations

### Background Effects
From security.amaratechit.com, implement:

```javascript
// Vanta.js HALO or NET effect with red coloring
VANTA.HALO({
  el: "#hero-background",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  baseColor: 0x0a0a0a,
  backgroundColor: 0x000000,
  amplitudeFactor: 1.50,
  size: 1.50
})
```

### Glassmorphism Effect
```css
.glass-card {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.glass-card:hover {
  border-color: rgba(229, 57, 53, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(229, 57, 53, 0.15);
}
```

### Button Styles
```css
/* Primary CTA - Matches Resend "Get Started" */
.btn-primary {
  background: #E53935;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #B71C1C;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(229, 57, 53, 0.4);
}

/* Secondary CTA - Ghost button */
.btn-secondary {
  background: transparent;
  color: #A1A1AA;
  padding: 12px 24px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-secondary:hover {
  color: #FFFFFF;
}
```

---

## 3D Assets Requirements

The developer needs to generate or source the following 3D assets:

| Asset | Description | Reference | Suggested Tool |
|-------|-------------|-----------|----------------|
| Hero 3D Image | Shield/cube with red glow | Resend cube | Blender, Spline |
| Service Icons | 6 icons for each service | Security site buttons | Spline, Figma 3D |
| Process Graphics | Connected nodes diagram | Platform cards section | Figma/Framer |

> [!TIP]
> Use [Spline](https://spline.design/) for quick 3D web-ready assets or commission from a 3D designer.

---

## Project Setup Commands

```bash
# Create new Next.js 14 project
npx create-next-app@latest amaratech-website --typescript --tailwind=no --eslint --app --src-dir --import-alias "@/*"

# Navigate to project
cd amaratech-website

# Install dependencies
npm install framer-motion three vanta next-seo next-sitemap

# Install dev dependencies
npm install -D @types/three

# Start development server
npm run dev
```

### Post-Setup Configuration

```bash
# Generate sitemap after build
npx next-sitemap
```

Add to `package.json` scripts:
```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

---

## File Structure (Next.js App Router)

```
amaratech-website/
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
│   ├── og-image.png              # Open Graph image for social sharing
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout with SEO defaults
│   │   ├── page.tsx              # Home page
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Dynamic service pages
│   │   ├── products/
│   │   │   ├── page.tsx          # Products overview
│   │   │   └── impactiq/
│   │   │       └── page.tsx      # ImpactIQ product page
│   │   └── contact/
│   │       └── page.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   └── ProductCard.tsx   # NEW: For products section
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── TrustedBy.tsx
│   │       ├── Services.tsx
│   │       ├── Features.tsx
│   │       ├── Process.tsx
│   │       ├── Products.tsx      # NEW: Products showcase
│   │       ├── Testimonials.tsx
│   │       ├── FAQ.tsx
│   │       └── CTA.tsx
│   ├── lib/
│   │   ├── seo.ts                # SEO configuration
│   │   └── schema.ts             # JSON-LD structured data
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   └── hooks/
│       └── useVanta.ts
├── next.config.js
├── next-sitemap.config.js        # Sitemap configuration
├── package.json
└── tsconfig.json
```

---

## Content Mapping Reference

| Resend Section | Amaratech Equivalent | Content Source |
|----------------|---------------------|----------------|
| "Email for developers" | "IT Solutions for the Future" | Hero headline |
| SDK Integration tabs | Services tabs (Azure, Cloud, etc.) | Service descriptions |
| Trusted by logos | Industry/client logos | Client list |
| Test Mode / Webhooks features | 24/7 Monitoring / Compliance features | Unique selling points |
| Testimonials carousel | Client testimonials | Testimonial content |
| Footer with docs/resources | Footer with services/contact | Navigation links |

---

## Verification Plan

### Visual Verification
1. Compare each section side-by-side with resend.com screenshots
2. Verify dark theme consistency matches security.amaratechit.com
3. Test responsive breakpoints (mobile, tablet, desktop)

### Functionality Verification
1. All navigation links work correctly
2. Scroll animations trigger appropriately
3. Vanta.js background renders without performance issues
4. Contact forms submit correctly

### Performance Verification
1. Lighthouse score > 90 for Performance
2. 3D assets optimized (WebP, lazy loading)
3. First Contentful Paint < 1.5s

---

## Summary

This implementation plan provides a comprehensive guide for recreating the Amaratech website with:

1. **Resend.com's elegant layout and UX patterns**
2. **Security.amaratechit.com's dark theme and visual effects**
3. **Amaratech's brand colors (red + black)**
4. **All content from the original amaratechit.com**

The developer should reference this document alongside the visual screenshots to ensure pixel-perfect implementation.
