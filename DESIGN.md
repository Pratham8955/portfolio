# DESIGN SYSTEM — "PRATHAM — BUILD / SHIP / SCALE"
*Awwwards-Level Interactive & Editorial Software Engineering Portfolio*

## 1. Brand Essence & Visual Personality
- **Identity**: Software Engineer specializing in scalable full-stack & backend systems, microservices, and modern web architectures.
- **Mood**: Obsidian Noir, Cinematic, Technical, Confident, Architectural, Ultra-Modern (2026).
- **Core Aesthetic**: High-contrast editorial display typography juxtaposed with crisp monospace telemetry, layered interactive 3D digital sculpture, and multi-layer mouse parallax.

---

## 2. Color Tokens & Surface Palette
```css
--bg-obsidian: #050505;          /* Deepest canvas backdrop */
--bg-surface-1: #090a0f;         /* Secondary layer */
--bg-surface-2: #10121a;         /* Elevated card surface */
--bg-surface-3: #181b26;         /* Hover / Highlighted card surface */

--border-subtle: rgba(255, 255, 255, 0.07);
--border-medium: rgba(255, 255, 255, 0.14);
--border-accent: rgba(59, 130, 246, 0.4);

--accent-primary: #3b82f6;       /* Electric Cyan-Blue */
--accent-primary-glow: rgba(59, 130, 246, 0.25);
--accent-secondary: #6366f1;     /* Royal Indigo */
--accent-status-live: #10b981;    /* System Online Emerald */

--text-primary: #f8fafc;         /* High-contrast crisp white */
--text-secondary: #94a3b8;       /* Subtle muted slate */
--text-tertiary: #64748b;        /* Low-priority metadata */
--text-monospace: #38bdf8;       /* Code token highlight */
```

---

## 3. Typography Hierarchy
- **Display Headlines (Editorial)**:
  - Hero Statement: `clamp(3.5rem, 9vw, 8.5rem)` / Line height `0.9` / Tracking `-0.04em` / Bold 900.
  - Section Headlines: `clamp(2.5rem, 6vw, 4.75rem)` / Tracking `-0.03em` / Bold 800.
- **Monospace Technical Labels**:
  - `font-mono` / Tracking `0.08em` / Uppercase / Font sizes `0.75rem` - `0.875rem`.
- **Body & Narrative**:
  - `font-sans` (Inter/Geist) / Relaxed line height `1.7` / Slate secondary text.

---

## 4. Layering & Depth Architecture (Z-Index Hierarchy)
```
z-0    : Mesh Gradient Ambient Canvas & Floating Particles
z-5    : Oversized Editorial Typography (Background Layer)
z-10   : Central Interactive 3D System Sculpture (Foreground Intersection)
z-20   : Section Content & Interactive Cards
z-50   : Minimal Sticky Floating Navigation Bar
z-90   : Full-Screen Cinematic Menu Drawer
z-100  : Full-Screen Project Case Study & Resume Modals
z-[9999]: Contextual Morphing Custom Cursor (Desktop Only)
```

---

## 5. Motion Principles & Choreography
- **Spring Physics**: Fast snappy response for hover interactions (`stiffness: 400, damping: 25`).
- **Parallax Curve**: Restrained linear interpolation for mouse offset (`depth offsets: bg 0.02, text 0.05, sculpture 0.12`).
- **Reduced Motion**: If `prefers-reduced-motion: reduce` is active, all continuous loops, 3D tilts, and parallax translations are disabled, rendering a pristine, high-performance static layout.
