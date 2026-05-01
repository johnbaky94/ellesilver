# Design Brief: Silver Jewelry E-Commerce Store

## Tone & Differentiation
Premium minimalist luxury. Refined craftsmanship aesthetic emphasizing product imagery. Warm and sophisticated, not cold corporate. Editorial serif typography. Trust-building through elegant simplicity.

## Palette
| Token | OKLCH | Purpose |
|-------|-------|---------|
| Background | `0.97 0.01 70` | Light warm cream, product photography backdrop |
| Foreground | `0.2 0.02 280` | Deep charcoal, primary text, navigation |
| Card | `1.0 0.005 70` | Near-white for product cards, minimal contrast |
| Primary | `0.25 0.04 260` | Deep blue-charcoal, CTAs, headers |
| Accent | `0.62 0.11 55` | Warm bronze/gold, hover states, highlights |
| Destructive | `0.57 0.19 28` | Soft warm red, removal/cancel actions |
| Border | `0.92 0.005 70` | Very light, subtle card/input separation |

## Typography
| Layer | Font | Weight | Use |
|-------|------|--------|-----|
| Display | Fraunces | 600–700 | Product names, section headings, CTAs |
| Body | Lora | 400–500 | Product descriptions, copy, form labels |
| Mono | GeistMono | 400 | SKUs, pricing (if technical context needed) |

## Structural Zones
| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header | `bg-background` with subtle `border-b border-border` | Minimal nav, brand, search |
| Product Grid | `bg-background` with cards on `bg-card` | Center: generous padding, featured products, categories |
| Card Hover | `.shadow-hover` with `text-accent` accent lines | Smooth lift on interaction, warm gold accents |
| Footer | `bg-muted/30` with `border-t border-border` | Contact, policies, minimal copy |

## Spacing & Rhythm
- Grid gap: `2rem` (8px units) for breathing room
- Card padding: `1.5rem` for product cards
- Section padding: `4rem` vertical, `2rem` horizontal
- Button padding: `0.75rem 1.5rem` for premium spacing

## Component Patterns
- **Buttons**: Primary (deep charcoal `bg-primary` with gold accent underline on hover), Secondary (outline, no fill)
- **Cards**: Subtle `shadow-card` on default, lift to `shadow-hover` on hover with smooth transition
- **Images**: 16:9 aspect ratio for product thumbnails, 1:1 for detail views, rounded `sm` corners
- **Forms**: Minimal borders `border-border`, focus ring `ring-accent`

## Motion
- All transitions: `transition-smooth` (0.3s ease-out)
- Hover lift: Cards translate 2px up, shadow increases to `shadow-hover`
- Focus states: Gold ring (`ring-accent`), no scale change
- Loading: Subtle pulse on product cards

## Constraints & Guardrails
- No harsh shadows or glows
- No rainbow or multi-color palettes
- Typography hierarchy through size/weight, not color alone
- Accent color used sparingly: hover states, CTAs, validation
- Serif fonts only (Fraunces + Lora), no sans-serif mixing

## Signature Detail
Warm bronze/gold accent underlines beneath interactive elements on hover, creating a premium jewelry-brand touchstone. Minimal but intentional use signals luxury without excess.
