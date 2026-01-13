# AmaraTech Core Website - Design Guide


> **Lead Developer**: Adebiyi Samuel  
> **Last Updated**: January 10, 2026

This document outlines the design standards, brand guidelines, and UI/UX principles for the AmaraTech Core Website redesign. This guide is based on the design aesthetic of [resend.com](https://resend.com) with the advanced dark theme styling from [security.amaratechit.com](https://security.amaratechit.com).

---

## 📋 Implementation Reference

For detailed implementation specifications, section-by-section layouts, and code examples, please refer to:

**[Implementation Plan](./implementation_plan.md)** — Complete technical blueprint with:
- All 10 page sections with ASCII wireframes
- SEO & AI visibility configuration
- ImpactIQ product showcase specifications
- JSON-LD structured data schemas

---

## 🎨 Brand Identity

### Logo Usage

- **Primary Logo**: Full AmaraTech logo with text (use white/red version for dark backgrounds)
- **Icon Only**: For favicons and small applications
- **Clear Space**: Maintain minimum padding around the logo equal to the height of the "A" in AmaraTech

### Brand Values

- **Innovation** — Cutting-edge technology solutions
- **Trust** — Reliable and secure services
- **Excellence** — Commitment to quality
- **Partnership** — Collaborative approach with clients

### Design Philosophy

This website follows the **Resend.com design aesthetic**:
- Dark, sophisticated background (`#000000` pure black)
- Elegant serif headings with sans-serif body text
- 3D rendered hero images with subtle glow effects
- Glassmorphism cards with red accent borders
- Minimal, clean typography with generous white space

---

## 🌈 Color Palette

> ⚠️ **IMPORTANT**: This is a dark theme design. The previous blue palette has been replaced with Amaratech Red + Sophisticated Black.

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
| **Cyan Accent** | `#00D1FF` | Secondary highlights |
| **Success Green** | `#22C55E` | Status indicators |
| **Border Gray** | `rgba(255, 255, 255, 0.1)` | Subtle borders |

### CSS Variables Setup

```css
:root {
  /* Primary Colors */
  --color-primary: #E53935;
  --color-primary-dark: #B71C1C;
  --color-primary-light: #FF5252;
  
  /* Background Colors */
  --color-bg-primary: #000000;
  --color-bg-secondary: #0A0A0A;
  --color-bg-tertiary: #141414;
  
  /* Text Colors */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A1A1AA;
  
  /* Effects */
  --glow-red: rgba(229, 57, 53, 0.5);
  --border-subtle: rgba(255, 255, 255, 0.1);
}
```

---

## 🔤 Typography

### Font Families

```css
/* Hero Headlines - Serif for elegance (like Resend) */
font-family: 'GT Super Display', Georgia, serif;

/* Body & Subheadings - Clean sans-serif */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Code Snippets */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Scale

| Element | Size | Weight | Line Height | Font Family |
|---------|------|--------|-------------|-------------|
| H1 (Hero) | 72px | 400 | 1.1 | Serif |
| H2 | 48px | 600 | 1.2 | Sans-serif |
| H3 | 32px | 600 | 1.3 | Sans-serif |
| H4 | 24px | 500 | 1.4 | Sans-serif |
| Body Large | 18px | 400 | 1.6 | Sans-serif |
| Body | 16px | 400 | 1.6 | Sans-serif |
| Caption | 14px | 400 | 1.5 | Sans-serif |
| Code | 14px | 400 | 1.6 | Monospace |

---

## 📐 Spacing System

Use a consistent 4px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight spacing, inline elements |
| `sm` | 8px | Related elements |
| `md` | 16px | Default component padding |
| `lg` | 24px | Section padding |
| `xl` | 32px | Large section gaps |
| `2xl` | 48px | Major section separations |
| `3xl` | 64px | Hero sections, page margins |

---

## 🧩 Core Components

### Primary Button (Red CTA)

```css
.btn-primary {
  background: var(--color-primary);
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
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--glow-red);
}
```

### Secondary Button (Ghost)

```css
.btn-secondary {
  background: transparent;
  color: var(--color-text-secondary);
  padding: 12px 24px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-secondary:hover {
  color: var(--color-text-primary);
}
```

### Glassmorphism Card

```css
.glass-card {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
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

### Product Card (Ultra-Dark)

```css
.product-card {
  background: #000000;
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
  background: linear-gradient(180deg, rgba(229, 57, 53, 0.1) 0%, transparent 100%);
  pointer-events: none;
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| `xs` | < 480px | Small phones |
| `sm` | ≥ 480px | Large phones |
| `md` | ≥ 768px | Tablets |
| `lg` | ≥ 1024px | Small laptops |
| `xl` | ≥ 1280px | Desktops |
| `2xl` | ≥ 1536px | Large screens |

---

## ✨ Animation Guidelines

### Timing

- **Fast**: 150ms — Micro-interactions, hovers
- **Normal**: 250ms — Standard transitions
- **Slow**: 400ms — Page transitions, modals

### Easing Functions

```css
/* Standard ease */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

/* Entrance animations */
transition-timing-function: cubic-bezier(0, 0, 0.2, 1);

/* Exit animations */
transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
```

### Vanta.js Background Effect

```javascript
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';

HALO({
  el: "#hero-background",
  THREE: THREE,
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  baseColor: 0x0a0a0a,
  backgroundColor: 0x000000,
  amplitudeFactor: 1.50,
  size: 1.50
});
```

---

## ♿ Accessibility Standards

### Requirements

- **WCAG 2.1 AA** compliance minimum
- Color contrast ratio: **4.5:1** for normal text, **3:1** for large text
- All interactive elements must be keyboard accessible
- Provide alt text for all images
- Use semantic HTML elements (`<main>`, `<nav>`, `<article>`, `<section>`)
- Support screen readers with proper ARIA labels

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## 🔍 SEO Requirements

See the **Implementation Plan** for complete SEO configuration including:
- Meta tags with `next-seo`
- JSON-LD structured data (Organization + Service schemas)
- Sitemap & robots.txt configuration
- AI crawler allowlist (GPTBot, ChatGPT-User, etc.)

---

## 📋 Developer Checklist

- [ ] Set up CSS custom properties in `globals.css`
- [ ] Configure typography scale with Inter + Serif fonts
- [ ] Implement Vanta.js background for hero section
- [ ] Create reusable Button, Card, and GlassCard components
- [ ] Build all 10 home page sections per implementation plan
- [ ] Add SEO configuration with `next-seo`
- [ ] Set up `next-sitemap` for automatic sitemap generation
- [ ] Implement responsive layouts for all breakpoints
- [ ] Ensure dark mode is default (no light mode toggle needed)
- [ ] Test accessibility compliance

---

## 📚 Reference Materials

| Resource | Description |
|----------|-------------|
| [resend.com](https://resend.com) | Primary design reference |
| [security.amaratechit.com](https://security.amaratechit.com) | Dark theme & visual effects reference |
| [amaratechit.com](https://amaratechit.com) | Content source |
| [Implementation Plan](./implementation_plan.md) | Detailed technical specs |

---

*This is a living document and will be updated as the design system evolves.*

**Design by Sammy Gold | Development by Adebiyi Samuel**
