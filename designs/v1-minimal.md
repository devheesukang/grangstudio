# Design V1 — Minimal

## Personality
Ultra-minimal. Raw negative space. The work speaks without any decoration around it. Influenced by Japanese design and fine art gallery aesthetics. If something can be removed, it is removed.

## Typography
- **Display (hero name):** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) — Italic, very large, thin weight. Feels handwritten and refined.
- **Body / nav / labels:** [Inter](https://fonts.google.com/specimen/Inter) — Regular, small size, wide letter-spacing. Purely functional.
- **Sizing scale:** Extreme contrast — display type is massive, everything else is small and recedes.
- **Letter-spacing:** Nav and section labels: `tracking-widest` (very wide). Body: normal.

## Colors

### Light theme
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#F8F7F4` | Warm off-white background |
| `--fg` | `#0A0A0A` | Near-black text |
| `--muted` | `#8A8A8A` | Nav links, captions |
| `--border` | `#E0DED9` | Subtle dividers |
| `--accent` | `#0A0A0A` | Active nav indicator (thin underline) |

### Dark theme
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0C0C0C` | Near-black background |
| `--fg` | `#F0EDE8` | Warm white text |
| `--muted` | `#666660` | Nav links, captions |
| `--border` | `#222220` | Subtle dividers |
| `--accent` | `#F0EDE8` | Active nav indicator |

## Layout & Spacing
- Extreme vertical padding between sections (`py-40` or more)
- Images displayed with generous surrounding whitespace — never edge-to-edge (except hero)
- Gallery grid: minimal gap (`gap-2`), no borders, no rounded corners
- Nav: full-width, very thin, stays at top — no background, transparent until scroll
- Section titles: small, uppercase, wide letter-spacing — almost invisible, like a museum label

## Animation Style
- Fade-in only — no slides, no bounces, no scaling
- Slow fade: `duration-700`, `ease-in-out`
- Staggered reveal on gallery images as they enter viewport
- Nav links: subtle opacity change on hover, no underline animation
- Hero text: fades in word by word with a very slow delay

## Hero
- Full viewport height
- Name centered, extremely large Cormorant Italic
- Role in small Inter below, wide tracking, muted color
- No background imagery — pure type on background color
- Scroll indicator: a thin vertical line that pulses slowly at the bottom

## Gallery
- CSS grid, uniform cell sizes (not masonry) — cleanliness over drama
- Hover: image brightens slightly, no overlay text, no scale
- Filter tabs: plain text, no pill/button styling, underline on active

## Nav
- Wordmark: "GRANG STUDIO" in Inter, small, wide tracking
- Links: small, wide tracking, muted by default
- No background until scrolled (then subtle blur + bg)
- Theme toggle + variant switcher: small, right side

## Section Transitions
- No dramatic transitions — sections simply follow each other with generous spacing
- Scroll feels calm and deliberate
