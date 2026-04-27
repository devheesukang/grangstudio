# Design V3 — Editorial

## Personality
Magazine and print-inspired. Structured, sophisticated, confident. Feels like a high-end photography publication — Kinfolk, Apartamento, or a fashion lookbook. Uses a deliberate grid system with intentional tension between images and type. Not cold — warm and considered.

## Typography
- **Display (hero name):** [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — Serif, bold, editorial authority.
- **Section titles / subheadings:** [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — Italic variant for contrast.
- **Body / nav / labels / captions:** [Neue Haas Grotesk](https://fonts.google.com/specimen/Neue+Haas+Grotesk+Display+Pro) or fallback [DM Sans](https://fonts.google.com/specimen/DM+Sans) — Clean grotesque, workhorse font.
- **Sizing:** Display is large but not extreme — proportional and structured. Body is slightly larger than V1/V2 — more readable, editorial.
- **Letter-spacing:** Display: normal to slightly tight. Labels and captions: wide tracking (`tracking-wider`).

## Colors

### Light theme
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#FAFAF8` | Clean warm white |
| `--fg` | `#1A1A1A` | Near-black |
| `--muted` | `#6B6B6B` | Captions, nav links |
| `--border` | `#E8E6E1` | Column rules, dividers |
| `--accent` | `#1A1A1A` | Active states |
| `--rule` | `#1A1A1A` | Thin horizontal rules used as design elements |

### Dark theme
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#141412` | Warm dark, slightly brown-black |
| `--fg` | `#F4F2EE` | Warm off-white |
| `--muted` | `#888880` | Captions, nav links |
| `--border` | `#2A2A28` | Column rules, dividers |
| `--accent` | `#F4F2EE` | Active states |
| `--rule` | `#F4F2EE` | Horizontal rules |

## Layout & Spacing
- Strong baseline grid — sections align to consistent vertical rhythm
- Hero uses an asymmetric split: name/text on left ~40%, large image on right ~60% (desktop) — stacks vertically on mobile
- Gallery uses a deliberate asymmetric magazine layout: mix of 1-col and 2-col rows, not uniform grid
- Thin horizontal rules between sections — a classic editorial device
- Section titles positioned at the column edge, sometimes at 90° rotated vertically (like a magazine spine label)
- Generous but structured margins — not as extreme as V1

## Animation Style
- Clean, precise entrances: elements slide in from slightly below (`translateY(20px)`) with fade
- No dramatic clip-paths or sweeping animations — restrained and purposeful
- Gallery images: simple fade-in staggered, very short delay between items
- Hover on gallery: thin border appears around image (1px), title appears below in caption style
- Section titles: fade in with very slight upward drift
- Transitions: `duration-500`, `ease-out` — crisp, not slow

## Hero
- Asymmetric split layout (desktop): left column has name + role + one short descriptor line; right column is a tall portrait or strong product image
- Name in Playfair Display Bold, large
- Role in DM Sans, small caps style, muted
- A thin horizontal rule above the name — editorial punctuation
- Mobile: image first (full width), then text below
- No full-bleed background — the split itself is the design

## Gallery
- Magazine-style layout: not a uniform grid — uses CSS grid with intentional span variations
- First image in each category is always large (2-col span); subsequent images are smaller
- Hover: thin 1px border, caption appears below with project name in small DM Sans
- Filter tabs: text-only, a thin underline slides under the active tab (animated)

## Nav
- Wordmark: "GRANG STUDIO" in Playfair Display, medium size — feels like a masthead
- A thin 1px horizontal rule under the entire nav — like a newspaper masthead rule
- Links: DM Sans, small, muted, hover underline
- Fixed position, white/dark background always (not transparent) — editorial clarity

## Section Transitions
- Thin full-width horizontal rules between sections
- No dramatic scroll effects — clean, page-turn feeling
- Scroll feels structured and calm — each section is a "page" in the magazine
