---
name: Zacky Achmad
description: Personal engineering portfolio, résumé, and digital contact card.
colors:
  light-background: '#f6f8fb'
  light-surface: '#ffffff'
  light-text: '#162238'
  light-secondary-text: '#526078'
  light-primary: '#225ab5'
  light-muted: '#eaf0f7'
  light-accent: '#e1eafa'
  light-border: '#d4deeb'
  light-input: '#a7b5c9'
  dark-background: '#101722'
  dark-surface: '#1b2636'
  dark-text: '#edf2fa'
  dark-secondary-text: '#a6b4c8'
  dark-primary: '#93b9ff'
  dark-primary-text: '#101e35'
  dark-muted: '#182231'
  dark-accent: '#233249'
  dark-border: '#2b3749'
  dark-input: '#61718b'
typography:
  display:
    fontFamily: 'Geist, sans-serif'
    fontSize: 'clamp(2.7rem, 4.5vw, 4.25rem)'
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Geist, sans-serif'
    fontSize: 'clamp(2rem, 3.5vw, 3.4rem)'
    fontWeight: 580
    lineHeight: 1.06
    letterSpacing: '-0.035em'
  body:
    fontFamily: 'Geist, sans-serif'
    fontSize: '16px'
    lineHeight: 1.7
rounded:
  action: '5px'
  field: '6px'
  skill-tree: '14px'
  portrait: '16px'
---

# Design System: Zacky Achmad

## Overview

**Creative North Star: "The engineer's personal workspace"**

A personal portfolio, résumé, and digital business card with an expressive developer identity. The owner’s name, real portrait, engineering practice, selected work, and contact actions establish the hierarchy. Technical writing supports that identity.

The world combines navy and charcoal surfaces, clear sans-serif typography, fine dividing rules, and selective blue feedback. Gamification represents exploration of real engineering disciplines; it never invents proficiency scores. The current implementation supersedes the earlier seeded direction.

**Key Characteristics:**

- Identity before publication.
- Device-following light and dark themes with a persistent explicit choice.
- Connected skill discovery grounded in actual work.
- Purposeful, interruptible interaction feedback with reduced-motion equivalents.

## Colors

The frontmatter records the implemented light and dark palette; CSS custom properties in `src/app/globals.css` remain the implementation source of truth.

### Primary

Blue identifies links, primary actions, selected skill nodes, explored branches, progress, and focus. Dark mode uses a lighter blue with a dark primary-action foreground; light mode uses a stronger blue with white action text.

### Neutral

Cool near-white and white separate light-mode background and raised surfaces. Navy-charcoal backgrounds, muted navy, and slightly lighter card surfaces create the dark hierarchy. Secondary text stays distinct from borders. Popovers use card colors; secondary controls use the matching theme's secondary surface and foreground.

**The Theme Pair Rule.** Use semantic foreground/background pairs rather than carrying a light-theme color into a dark surface. The portrait caption intentionally retains its navy identity plate in both themes.

## Typography

**Display and body:** Geist, self-hosted through `next/font`, with sans-serif fallback. Monospace is reserved for technical details and the skill-tree core.

The hero heading names “Zacky Achmad.” first, followed by “Software engineer.” in secondary text and lighter weight. There is no eyebrow above it. The display role in frontmatter describes this hero; section headings use the headline role. Body text uses relaxed leading; the hero summary uses a slightly larger size (1.05rem), line height (1.8), and a constrained measure (48ch).

At intermediate widths the hero heading becomes (3rem); on mobile it uses `clamp(2.45rem, 8.5vw, 3.5rem)`. Article text uses a generous reading rhythm (1.075rem, line height 1.85), distinct from compact interface labels.

## Layout

The shared container tops out at (1120px), with desktop gutters (40px) and mobile gutters (20px). The desktop hero pairs identity and actions with portrait, location, and contact card in a (1.4fr / 1fr) grid. At the mobile breakpoint (640px), the composition stacks and preserves every action. The portrait remains centered within a maximum width (400px).

Fine rules organize projects, experience, and supporting writing. Project rows adapt from multiple columns to a single readable column. The skill tree pairs a map and detail panel on desktop, then stacks on mobile; its five nodes remain visible. Responsive adjustments also occur at (900px). Avoid turning every section into an interchangeable card grid.

## Elevation & Depth

Tonal surfaces and fine borders provide most depth. Rounded portrait and contact-card layers add physical character; overlays use elevation where needed. This is not a globally shadow-free system.

Motion clarifies arrival, selection, and exploration. Hero text and the small contact-card layer translate upward from (12px) over (500ms); interior introductions use (300ms). The portrait itself does not animate on arrival, so its LCP rendering is not delayed. Arrivals preserve full opacity. The main easing is `cubic-bezier(0.23, 1, 0.32, 1)`. Fine-pointer hover shifts project rows and portrait/card layers; button presses scale to (.97). Touch does not inherit hover transforms.

**The Motion Equivalence Rule.** Reduced motion removes entrances, positional movement, rotation, and drawing animations while preserving final state, selected content, navigation, progress, and completion. No looping animation or scroll hijacking is part of this world.

## Shapes

Actions use compact, gently rounded corners; fields and command results use a slightly softer field radius. The portrait and combined skill map/detail container have larger corners. Skill icons are compact rounded squares, connected by drawn SVG branches. Thin borders and horizontal rules organize content without heavy framing.

## Components

### Actions and navigation

Primary hero actions use the theme's blue pair, a minimum height (48px), and padding (10px 22px). Outline actions use the input border and the same dimensions. Text links carry blue with an underline treatment. Visible keyboard focus uses the semantic ring (2px outline, 5px offset).

Desktop navigation uses restrained text links with visible current/hover treatment. Mobile navigation is a disclosure with Escape support. Primary mobile controls retain targets of at least (44px).

### Portrait and contact card

Use the authentic `public/zacky-achmad.jpg` portrait, with reserved dimensions and responsive sizing. Its source is the owner's public GitHub avatar, downloaded 2026-10-22. The navy caption plate, location, monogram, name, and working save-contact action form a personal contact composition rather than a decorative profile mockup.

### Skill tree

Five buttons expose Back end, Data, Interfaces, Operations, and Tools. Selection updates an adjacent live detail region with description, stack, and a real related-work link. Selected icons become blue and activate with a small rotation/scale; branches draw into their explored state. The selected button exposes `aria-pressed` and points to the detail region.

Exploration starts with the first node selected and counts distinct nodes for the current mounted interaction; it is not stored as career progress. Five segments and a live count reflect this state. Exploring all five reveals “Full map explored.” with a drawn circle and check, followed by a prompt to inspect the work. Reduced motion shows the same complete geometry and status immediately.

### Command menu

The visible Navigate control and Ctrl/⌘ K open a functional page-navigation dialog. Search normalizes accents so “résumé” finds About & experience. Enter follows the first result; Tab reaches individual links; Escape closes and focus returns to the trigger. Empty results provide a useful prompt. Dialog surface, input, result hover, and focus colors follow the active theme.

## Do's and Don'ts

### Do:

- **Do** lead with the owner's identity, authentic portrait, real work, résumé access, and contact.
- **Do** make developer motifs functional: selectable disciplines, real routes, and truthful exploration state.
- **Do** preserve light/dark semantic pairs, keyboard focus, touch targets, and reduced-motion outcomes.
- **Do** keep case studies and articles suited to their different reading needs.

### Don't:

- **Don't** invent availability, clients, achievements, publications, or measured outcomes.
- **Don't** replace the owner’s portrait with a generated likeness or decorative placeholder.
- **Don't** use fake terminal output or proficiency scores to simulate engineering credibility.
- **Don't** add an eyebrow above the identity heading or make publication the homepage's primary identity.
