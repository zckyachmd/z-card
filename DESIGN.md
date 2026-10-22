# Zacky Achmad — design system

## Product direction

Personal engineering portfolio, résumé, and digital contact card. The owner rejected a publication-led homepage. Lead with identity, authentic portrait, engineering practice, projects and career; writing supports the portfolio.

## Visual identity

Navy/charcoal dark surfaces, cool near-white light surfaces, selective blue accents. Dark: background #101722, surface #1b2636, text #edf2fa, secondary #a6b4c8, accent #93b9ff. Light: #f6f8fb, #ffffff, #162238, #526078, #225ab5. Theme defaults to the device via next-themes; explicit choice persists.

Geist is self-hosted through next/font. Strong sans-serif identity replaces publication-like serif typography. Display 40–68px, -0.04em tracking, line height 1.1. Body 16–17px, line height 1.7–1.8. Smaller text uses regular tracking. Articles retain a comfortable reading measure.

## Layout and components

1120px container with 40px desktop and 20px mobile gutters. Desktop hero pairs identity, role and actions with the owner's portrait, location and a working contact-card control. Mobile stacks without hiding identity or actions. Fine rules organize projects and experience without repetitive card grids. Case studies and articles have distinct content structures.

Controls have 44px or larger primary targets, visible focus, meaningful labels, and clear states. Mobile navigation is a disclosure with Escape support. No invented availability, clients, metrics, achievements or publications.

## Motion

The owner additionally requested expressive developer identity and gamification. A real interactive skill tree connects five areas to relevant work; exploration progress is per-session state, never invented expertise scores. A keyboard command menu provides functional navigation (Ctrl/⌘ K), without decorative terminal output. Portrait and contact-card layers provide restrained physical depth. Navy/gray and light mode remain binding.

Purpose: hierarchy and interaction feedback. Hero arrival uses 12px translation with subtle opacity over 500–650ms; interior page introductions use 300ms. Hover/press transitions retarget naturally: project rows shift 6px, portrait/card layers move 3–4px, buttons press to .97. Curve: cubic-bezier(0.23,1,0.32,1). Touch excludes hover transforms. Reduced motion removes positional movement and entrances. No loops, scroll hijacking, or animation dependency.

## Authentic asset

public/zacky-achmad.jpg is the owner's public GitHub portrait from https://avatars.githubusercontent.com/u/31559432?v=4&s=800, downloaded 2026-10-22. Keep reserved dimensions and responsive sizes. Verification evidence must reflect this revised design.
