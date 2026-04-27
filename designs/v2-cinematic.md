# Design V2 — Cinematic

## Personality
Dark, immersive, dramatic. Feels like entering a film or a gallery at night. Full-bleed imagery dominates. Light is used sparingly — almost everything lives in shadow. Influenced by film title sequences and high-end fashion photography presentation.

## Typography
- **Display (hero name):** [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) — All-caps, heavy, wide. Commanding presence.
- **Subheadings / section titles:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) — Italic, contrasts with the bold display.
- **Body / nav / labels:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) — Light weight, clean, modern.
- **Sizing:** Display is huge and fills horizontal space. Subheadings are medium. Everything else is small.
- **Letter-spacing:** Display: tight (`tracking-tight`). Nav: normal. Labels: slightly wide.

## Colors

### Light theme
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#F2F0EB` | Warm pale background |
| `--fg` | `#111111` | Deep black text |
| `--muted` | `#777777` | Secondary text |
| `--border` | `#D8D5CF` | Dividers |
| `--accent` | `#C8A96E` | Gold — active state, hover highlights |

### Dark theme
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080808` | True near-black |
| `--fg` | `#EBEBEB` | Bright white text |
| `--muted` | `#555555` | Secondary text |
| `--border` | `#1A1A1A` | Subtle dividers |
| `--accent` | `#C8A96E` | Gold — same accent in dark, consistent identity |

## Layout & Spacing
- Hero: full viewport, full-bleed — a single dominant hero image behind the text with dark overlay
- Gallery: tight grid, edge-to-edge on mobile, small gaps on desktop (`gap-1`)
- Images can overflow section edges (break out of grid) for dramatic effect on featured shots
- Sections separated by full-bleed dividers or a single featured image between them
- Nav: fixed, very thin, semi-transparent dark blur background always visible

## Animation Style
- Dramatic reveals: images slide up from below with a clip-path mask animation
- Hero text: slides in from left with a slight delay per word
- Gallery entrance: staggered clip-path reveal — feels like a curtain lifting
- Hover on gallery: subtle dark overlay appears with image title in Cormorant Italic
- Parallax: hero image moves at 0.5x scroll speed for depth
- Transitions feel weighty — `duration-800` to `duration-1000`, `ease-out`

## Hero
- Full viewport, full-bleed background — use one of the strongest portfolio images
- Dark gradient overlay (bottom-heavy) so text reads clearly
- Name in large Bebas Neue, white, left-aligned
- Role in Cormorant Italic below, muted warm white
- Scroll indicator: animated downward chevron or dot that pulses

## Gallery
- Tight mosaic grid — varying heights (CSS grid with `grid-row: span 2` on some items)
- Hover: overlay with title text fades in, image slightly dims
- Filter tabs: pill-style buttons, dark fill on active
- Featured images can be full-width spanning the grid

## Nav
- Wordmark: "GRANG STUDIO" in Bebas Neue, medium weight
- Fixed position, always visible
- Background: dark blur (`backdrop-blur`, semi-transparent dark)
- Links: small DM Sans, muted — bright on hover
- Gold accent on active link

## Section Transitions
- Between sections: a brief full-width dark fade or a single dramatic image break
- Scroll feels intentional and slightly weighty — not snappy
