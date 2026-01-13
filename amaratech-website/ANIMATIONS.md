# Advanced Framer Motion Animations & Scroll Effects

This document outlines all the advanced animations and scroll effects implemented in the AmaraTech website.

## 🎬 Animation Components

### ScrollReveal
Reveals content as you scroll with customizable directions and delays.

**Usage:**
```tsx
<ScrollReveal direction="up" delay={0.2}>
  <YourContent />
</ScrollReveal>
```

**Directions:** `up`, `down`, `left`, `right`, `fade`, `scale`

### Parallax
Creates parallax scrolling effects for depth.

**Usage:**
```tsx
<Parallax speed={0.5}>
  <YourContent />
</Parallax>
```

### StaggerContainer
Animates children with staggered delays.

**Usage:**
```tsx
<StaggerContainer staggerDelay={0.1}>
  <Item1 />
  <Item2 />
  <Item3 />
</StaggerContainer>
```

### TextReveal
Animates text word by word.

**Usage:**
```tsx
<TextReveal text="Your text here" delay={0.3} />
```

### FloatingElement
Creates floating effect that follows mouse movement.

**Usage:**
```tsx
<FloatingElement intensity={10}>
  <YourContent />
</FloatingElement>
```

### BlurReveal
Blurs content on scroll, revealing as it enters viewport.

**Usage:**
```tsx
<BlurReveal>
  <YourContent />
</BlurReveal>
```

### RotateOnScroll
Rotates element based on scroll position.

**Usage:**
```tsx
<RotateOnScroll rotation={360}>
  <YourContent />
</RotateOnScroll>
```

### Magnetic
Creates magnetic hover effect.

**Usage:**
```tsx
<Magnetic strength={0.3}>
  <YourContent />
</Magnetic>
```

### ScrollProgress
Shows scroll progress bar at top of page.

**Usage:**
```tsx
<ScrollProgress />
```

## 🎯 Scroll Effects by Section

### Hero Section
- Parallax scrolling on hero content
- Floating text animation
- Word-by-word text reveal
- Animated SVG with rotation
- Pulsing glow effects
- Fade out on scroll

### Services Section
- Staggered tab animations
- Smooth tab switching with AnimatePresence
- Rotating service icon
- Feature list fade-in animations

### Features Section
- Staggered card animations
- Hover scale and lift effects
- Icon rotation on hover
- Smooth entrance animations

### Process Section
- Staggered step animations
- Animated arrows with movement
- Scale animations on step numbers
- Hover effects on cards

### Products Section
- Blur reveal effect
- Scale on hover
- Smooth entrance animations

## 🎨 Animation Features

1. **Scroll Progress Bar** - Red gradient bar at top showing scroll position
2. **Smooth Scrolling** - Enhanced scroll behavior with easing
3. **Intersection Observer** - Efficient viewport detection
4. **GPU Acceleration** - Hardware-accelerated animations
5. **Reduced Motion Support** - Respects user preferences
6. **Performance Optimized** - Uses `will-change` and transforms

## 📊 Performance

- All animations use `transform` and `opacity` for GPU acceleration
- Passive scroll listeners for better performance
- `requestAnimationFrame` for smooth animations
- Lazy loading of heavy animations
- Viewport-based triggering to reduce unnecessary animations

## 🎭 Custom Hooks

### useScrollAnimation
Detects when element enters viewport.

### useParallax
Calculates parallax offset based on scroll.

### useScrollProgress
Tracks overall page scroll progress.

## 🚀 Usage Examples

### Basic Scroll Reveal
```tsx
<ScrollReveal direction="up" delay={0.2}>
  <h2>Title</h2>
</ScrollReveal>
```

### Advanced Staggered Animation
```tsx
<StaggerContainer staggerDelay={0.15}>
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</StaggerContainer>
```

### Parallax Effect
```tsx
<Parallax speed={0.3}>
  <Image src="/hero.jpg" />
</Parallax>
```

## 🎪 Animation Timing

- **Fast**: 0.2s - Micro-interactions
- **Normal**: 0.5-0.6s - Standard animations
- **Slow**: 0.8-1s - Major transitions

All animations use cubic-bezier easing for natural motion.
