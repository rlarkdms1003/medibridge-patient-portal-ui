---
name: Medical Trust & Accessibility
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#444651'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#00128d'
  on-tertiary: '#ffffff'
  tertiary-container: '#001ec9'
  on-tertiary-container: '#9ba5ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#dfe0ff'
  tertiary-fixed-dim: '#bdc2ff'
  on-tertiary-fixed: '#000964'
  on-tertiary-fixed-variant: '#1129d0'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  ink-black: '#111827'
  ink-secondary: '#666666'
  ink-muted: '#999999'
  hairline: '#e1e5eb'
  canvas-white: '#ffffff'
typography:
  display-1:
    fontFamily: Noto Sans KR
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.02rem
  headline-1:
    fontFamily: Noto Sans KR
    fontSize: 26px
    fontWeight: '700'
    lineHeight: '1.4'
    letterSpacing: '0'
  headline-1-mobile:
    fontFamily: Noto Sans KR
    fontSize: 22px
    fontWeight: '700'
    lineHeight: '1.4'
    letterSpacing: '0'
  headline-2:
    fontFamily: Noto Sans KR
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  title:
    fontFamily: Noto Sans KR
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0'
  body-md:
    fontFamily: Noto Sans KR
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Noto Sans KR
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  button:
    fontFamily: Noto Sans KR
    fontSize: 16px
    fontWeight: '700'
    lineHeight: '1.4'
    letterSpacing: '0'
  eyebrow:
    fontFamily: Noto Sans KR
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: 0.02rem
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  grid-unit: 8px
  container-max: 1320px
  container-min: 1200px
  margin-desktop: 40px
  margin-mobile: 16px
  gutter: 24px
---

## Brand & Style
The design system for this patient-centric medical portal is anchored in **Medical Trust** and **Digital Accessibility**. It prioritizes clarity, reliability, and ease of use for a diverse demographic, including elderly patients and those with visual impairments.

The visual style is a blend of **Corporate Modernism** and **Functional Minimalism**. It avoids trendy, organic shapes in favor of a structured, square-based layout that projects stability. The interface utilizes a high-contrast environment with generous whitespace to eliminate cognitive load and ensure that critical medical tasks—such as appointment booking and document issuance—are immediately identifiable.

## Colors
The color palette is designed for maximum legibility and functional signaling.
- **Primary (Deep Blue):** Reserved exclusively for core patient tasks and primary Call-to-Action (CTA) buttons.
- **Secondary (Midnight Slate):** Used for structural grounding, such as the Global Navigation Bar (GNB) and section headers.
- **Tertiary (Active Blue):** A high-visibility shade used solely for interactive states like hover and focus.
- **Neutral (Clinical Soft):** A refined light gray for dashboard backgrounds and secondary surfaces.

**Accessibility Standard:** All text-to-background combinations must maintain a minimum contrast ratio of 4.5:1. Primary content uses "True Ink Charcoal" (#111827) to ensure high-performance readability across all display types.

## Typography
The system employs a hybrid typography stack: **Noto Sans KR** for all Korean text to ensure clean rendering, and **Helvetica/Arial** for English characters and numerals to maintain a professional, clinical feel.

- **Body Text:** A mandatory line-height of 1.6x is enforced for the `body-md` level to assist elderly users and prevent visual crowding.
- **Hierarchy:** Headlines are bold and clear to facilitate quick scanning of medical information.
- **Numbers:** In data-heavy contexts (like billings or results), system sans-serif fonts are preferred for their tabular alignment properties.

## Layout & Spacing
This design system is built on a rigorous **8px grid system**. All padding, margins, and component dimensions must be multiples of 8.

- **Grid Model:** A 12-column fluid grid within a fixed container range of 1200px to 1320px for desktop. 
- **Quick Task Matrix:** The central dashboard uses a 4-column layout for high-priority actions.
- **Touch Targets:** For accessibility, interactive elements in the main navigation or quick panels must maintain a minimum hit area of 120px x 120px to accommodate users with limited motor precision.
- **Reflow:** On mobile devices, the 4-column matrix collapses to a 2x2 grid, and horizontal margins reduce to 16px.

## Elevation & Depth
Depth is used sparingly to maintain the platform's authoritative and public-service character. 

- **Level 0 (Flat):** All data tables, forms, and secondary content blocks are completely flat, using 1px `hairline` borders for separation.
- **Level 1 (Raised):** Applied to the main 'Quick Task' cards and doctor profile cards. Uses a very soft, diffused shadow (`rgba(0,0,0,0.05)`) with a 12px blur to suggest interactivity.
- **Level 2 (Overlay):** Reserved for critical focus moments, such as appointment calendars or consent forms. These use a darker scrim to dim the background and focus the user's attention entirely on the task at hand.

## Shapes
The shape language is primarily **square-based** to evoke professional stability. 

- **Sharp (0px):** Mandatory for all data tables, input fields, and the footer. This reinforces the "official" and "formal" nature of hospital administration.
- **Rounded (8px):** The standard for profile images and information cards to provide a subtle "human" touch without sacrificing professional rigor.
- **Modal (12px):** Used for large container overlays to distinguish them from the underlying page structure.

## Components

### Buttons
- **Primary:** Filled with `primary` (#1e3a8a), white text, 8px radius. Hover state shifts to `tertiary` (#172dd2). Used for "Confirm Appointment" or "Apply".
- **Secondary:** Outlined with 1px `primary` color. Used for "Cancel" or "Back".

### Navigation
- **Global Header:** A heavy `secondary` (#0f172a) background for the navigation bar ensures high contrast. Dropdown menus should use the same dark background to maintain visual continuity.
- **Breadcrumbs:** Required on every sub-page to prevent user disorientation, rendered in `body-sm`.

### Input Fields & Search
- **Search Bar:** Large-scale input with a 1px `primary` border. Sharp corners (0px) are required. The search icon should be housed in a square, primary-colored block at the end of the field.
- **Forms:** Labels must be positioned above the input. All inputs use 0px radius.

### Specialized Cards
- **Task Matrix:** Large 4-column cards with an icon, `title` text, and a Level 1 elevation.
- **Doctor Card:** Features a profile image with an 8px radius, detailed career text in `body-md`, and an integrated primary button for immediate booking.
- **Tables:** No rounded corners. 1px `hairline` borders. Header row background set to `neutral` (#f8f9fa).