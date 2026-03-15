# System Guidelines

Use this file to guide Figma Make in generating designs consistent with ThreatDash — a cybersecurity asset management platform.

> **Tip**: These guidelines ensure every generated screen matches the dark sidebar + clean white content area pattern with the specific ThreatDash brand tokens.

---

# General Guidelines

* Use responsive, well-structured layouts with flexbox and grid by default
* Only use absolute positioning when strictly necessary (floating menus, tooltips)
* Refactor code as you go to keep files clean and organized
* Put helper functions and components in separate files
* Never use arbitrary values — always reference the design tokens below
* Font is **DM Sans** for all text — always apply negative letter-spacing (-0.5px)
* The layout always follows a fixed dark sidebar (200px) + fluid white content area pattern
* All interactive elements must have visible hover and focus states
* Use skeleton loading states for async content (tables, cards)
* Icons use a consistent 16–18px size throughout the interface

---

# Design System Guidelines

## Colors

### Naming Convention
Colors follow the pattern: `--color-{category}-{role}-{state}`
- **Categories**: bg, text, border, icon
- **Roles**: brand, danger, success, warning, info, neutral
- **States**: hover, active, disabled (optional)

### Primary Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-brand` | #1B7EFF | Primary buttons, active states, links, selected pagination |
| `--color-bg-brand-hover` | #1565D8 | Hover state for brand buttons |
| `--color-text-brand` | #1B7EFF | Link text, active nav text, entity counts |
| `--color-text-onbrand` | #FFFFFF | Text on brand-colored backgrounds |

### Semantic Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-danger` | #FFEFF2 | Danger badge backgrounds, error highlights |
| `--color-text-danger` | #D62828 | Business criticality values, error text |
| `--color-bg-info` | #D4E7FF | Info badge backgrounds, type icon backgrounds |
| `--color-text-info` | #1B7EFF | Info links, entity counts |

### Neutral Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | #FFFFFF | Page background, cards, table, rows |
| `--color-bg-secondary` | #F7F9FB | Input fills, hover states, subtle backgrounds |
| `--color-bg-tertiary` | #ECF0F5 | Alternate row fills, disabled backgrounds |
| `--color-bg-sidebar` | #001837 | Sidebar background (dark navy) |
| `--color-bg-sidebar-hover` | rgba(255,255,255,0.08) | Sidebar nav hover, workspace selector |
| `--color-bg-sidebar-active` | rgba(27,126,255,0.15) | Active sidebar nav item fill |
| `--color-border` | #EDECF9 | Default borders, table dividers, input outlines |
| `--color-border-brand` | #1B7EFF | Focus rings, active pagination border |
| `--color-text` | #001837 | Primary headings, strong text |
| `--color-text-secondary` | #474E62 | Body text, descriptions, dropdown labels |
| `--color-text-muted` | #8F97AC | Placeholders, timestamps, column headers |
| `--color-text-sidebar` | #A1B2BF | Sidebar nav labels, section titles |
| `--color-text-sidebar-active` | #FFFFFF | Active sidebar item text and icon |
| `--color-text-disabled` | #A1B2BF | Disabled text state |

### Color Rules
* Always use semantic tokens, never raw hex values
* Text on dark sidebar backgrounds must use `--color-text-sidebar` or `--color-text-sidebar-active`
* Business Criticality values always use `--color-text-danger` (#D62828)
* Business Entities counts always use `--color-text-brand` (#1B7EFF) and are clickable links
* Hover states on white backgrounds use `--color-bg-secondary` (#F7F9FB)
* Sidebar hover uses semi-transparent white (8% opacity), NOT a solid color

---

## Typography

### Font Families
| Token | Value | Usage |
|-------|-------|-------|
| `--font-family-default` | DM Sans | All UI text — headings, body, labels, buttons |

### Type Scale
| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| H3 / Page Title | 20px | 700 (Bold) | 100% | -0.5px | Page titles ("Assets"), section headings |
| Text-16-med | 16px | 500 (Medium) | 100% | -2px | Section labels, sidebar group titles |
| text-14-semi-bold | 14px | 600 (SemiBold) | 100% | -0.5px | Button labels, bold table values, active nav items |
| text-14-reg | 14px | 400 (Regular) | 100% | -0.5px | Body text, descriptions, nav items, inputs |
| text-12-reg | 12px | 400 (Regular) | 14px | -0.5px | Table column headers, timestamps, metadata, captions |

### Typography Rules
* text-14-reg (14px) is the default for all UI text
* Never use font sizes smaller than 12px
* Use text-12-reg sparingly — only for table headers, timestamps, and metadata
* All typography uses negative letter-spacing: -0.5px default, -2px for medium 16px
* Page titles always use H3 (20px/700)
* Sidebar section labels use text-12-reg in `--color-text-sidebar`
* Asset counter next to page title uses text-14-reg in `--color-text-muted`

---

## Spacing

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| `--space-2xs` | 4px | Tight gaps, icon-to-text micro spacing |
| `--space-xs` | 8px | Icon gaps, inline element spacing, filter gaps |
| `--space-sm` | 12px | Related elements, title-to-counter gap |
| `--space-md` | 16px | Container padding, sidebar padding, table cell padding |
| `--space-lg` | 24px | Section separation, sidebar section group margins |
| `--space-xl` | 32px | Major section breaks |

### Spacing Rules
* Base unit: 4px — all spacing must be multiples of 4
* Table cell padding: 16px horizontal
* Sidebar padding: 16px all sides
* Card/Table container padding: 16px
* Gap between filter elements: 8px
* Gap between sidebar nav items: 4px
* Section header margin-top: 24px

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | 3px | Checkboxes |
| `--radius-sm` | 4px | Type icon badges, context menu items, small elements |
| `--radius-md` | 6px | Buttons, inputs, dropdowns, pagination, sidebar nav items |
| `--radius-lg` | 8px | Context menus, workspace selector |
| `--radius-xl` | 12px | Cards, table container, main content panels |
| `--radius-full` | 9999px | Avatars, circular indicators |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | 0 6px 16px rgba(19, 37, 72, 0.14) | Table container, cards, floating elements |
| `--shadow-menu` | 0 6px 16px rgba(19, 37, 72, 0.14) | Context menus, dropdown menus |

### Shadow Rules
* Shadow color always uses the dark blue base (#132548) at 14% opacity
* Cards and table containers always have `--shadow-card`
* Floating elements (context menus, dropdowns) use `--shadow-menu`
* No shadow on the sidebar — it relies on its dark background for separation

---

# Component Guidelines

## Buttons

### Variants
| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| Primary | `--color-bg-brand` | `--color-text-onbrand` | none | Main CTA ("+ New Asset"), one per section |
| Ghost | transparent | `--color-text-secondary` | 1px `--color-border` | Secondary actions ("Export", "Next") |
| Menu Item | transparent | `--color-text-secondary` | none | Context menu items, dropdown options |

### Button Sizes
| Size | Height | Padding | Font Size | Border Radius |
|------|--------|---------|-----------|---------------|
| Small | 28px | 0 12px | 14px | 6px |

### Button Rules
| ✅ Do | 🚫 Don't |
|-------|----------|
| Use one primary button per header section | Place multiple primary buttons in the same row |
| Use "+" prefix for creation CTAs ("+ New Asset") | Use vague labels like "Add" or "Create" |
| Use ghost style for secondary actions (Export) | Use primary style for non-CTA actions |
| Show loading spinner for async button actions | Leave button enabled during loading |
| Use sentence case for labels | Use ALL CAPS or Title Case |

---

## Inputs

### Input Specifications
| Property | Value |
|----------|-------|
| Height | 28px |
| Padding | 0 10px |
| Background | `--color-bg-secondary` (#F7F9FB) |
| Border | 1px solid `--color-border` (#EDECF9) |
| Border Radius | 6px |
| Font Size | 14px |
| Placeholder Color | `--color-text-muted` (#8F97AC) |

### Input States
| State | Border | Background | Text |
|-------|--------|------------|------|
| Default | `--color-border` | `--color-bg-secondary` | `--color-text-muted` |
| Focus | `--color-border-brand` | `--color-bg` | `--color-text` |
| Error | `--color-text-danger` | `--color-bg` | `--color-text-danger` |
| Disabled | `--color-border` | `--color-bg-tertiary` | `--color-text-disabled` |

### Input Rules
| ✅ Do | 🚫 Don't |
|-------|----------|
| Use search icon inside search inputs | Use labels above search bars |
| Show placeholder text with muted color | Use placeholder as the only label on forms |
| Apply focus ring with brand color | Skip focus indicator |

---

## Data Table

### Table Specifications
| Property | Value |
|----------|-------|
| Container background | `--color-bg` (#FFFFFF) |
| Container border | 1px solid `--color-border` |
| Container border-radius | `--radius-xl` (12px) |
| Container shadow | `--shadow-card` |
| Container padding | 16px |
| Header row height | 30px |
| Data row height | 42px |
| Row border-bottom | 1px solid `--color-border` |

### Table Header
| Property | Value |
|----------|-------|
| Font | text-12-reg (12px/400) |
| Text color | `--color-text-muted` (#8F97AC) |
| Sort icon color | `--color-border` (default), `--color-text-brand` (active) |
| Background | transparent |

### Table Row
| Property | Value |
|----------|-------|
| Font | text-14-reg (14px/400) |
| Primary text | `--color-text` (#001837) for names |
| Secondary text | `--color-text-secondary` (#474E62) for descriptions, types |
| Hover background | `--color-bg-secondary` (#F7F9FB) |

### Table Rules
| ✅ Do | 🚫 Don't |
|-------|----------|
| Use consistent column widths across all rows | Let columns auto-resize unpredictably |
| Show sort arrows on all sortable columns | Hide sort indicators until hover |
| Use type icon badges with colored backgrounds | Use plain text for type values |
| Display criticality in red, entities in blue | Use the same color for all numeric values |
| Include 3-dot menu on every data row | Show all actions inline |

---

## Sidebar Navigation

### Sidebar Specifications
| Property | Value |
|----------|-------|
| Width | 200px (fixed) |
| Background | `--color-bg-sidebar` (#001837) |
| Padding | 16px |

### Nav Item
| Property | Default | Hover | Active |
|----------|---------|-------|--------|
| Background | transparent | rgba(255,255,255,0.08) | rgba(27,126,255,0.15) |
| Text color | `--color-text-sidebar` | `--color-text-sidebar` | `--color-text-sidebar-active` |
| Icon color | `--color-text-sidebar` | `--color-text-sidebar` | `--color-text-sidebar-active` |
| Left border | none | none | 3px solid `--color-bg-brand` |
| Height | 36px | 36px | 36px |
| Border radius | 6px | 6px | 6px |

### Section Labels
| Property | Value |
|----------|-------|
| Font | text-12-reg (12px/400) |
| Color | `--color-text-sidebar` (#A1B2BF) |
| Margin top | 24px |
| Margin bottom | 8px |
| Text transform | none (sentence case) |

### Sidebar Rules
| ✅ Do | 🚫 Don't |
|-------|----------|
| Use section groups with labels | List all nav items in a flat list |
| Show only one active item at a time | Highlight multiple items simultaneously |
| Use icons from a consistent icon set | Mix icon styles or sizes |
| Place Notifications at the very bottom | Place utility items between navigation groups |

---

## Pagination

### Pagination Specifications
| Property | Value |
|----------|-------|
| Container height | 52px |
| Alignment | Center |
| Page button size | ~32×28px |
| Active page border | 1px solid `--color-border-brand` |
| Active page text | `--color-text-brand` (14px/600) |
| Inactive page text | `--color-text-muted` (14px/400) |
| "Next" button | Ghost style with right chevron |

---

## Context Menu

### Context Menu Specifications
| Property | Value |
|----------|-------|
| Width | 180px |
| Background | `--color-bg` (#FFFFFF) |
| Border radius | `--radius-lg` (8px) |
| Shadow | `--shadow-menu` |
| Padding | 4px |
| Item height | 28px |
| Item padding | 6px 12px |
| Item border radius | 4px |
| Icon size | 16px |
| Text | text-14-reg, `--color-text-secondary` |
| Hover | Background `--color-bg-secondary` |

---

# Layout Guidelines

## Auto Layout Rules
* Default gap between elements: 8px (filters, inline groups)
* Container padding: 16px (cards, sidebar, table)
* Use "Fill" for the main content area (fluid)
* Use "Fixed" for the sidebar (200px)
* Use "Hug" for buttons, badges, and inline labels
* Prefer vertical auto layout for sidebar navigation and table rows
* Prefer horizontal auto layout for header controls, filter bars, pagination

## Page Structure
* Sidebar: fixed left, 200px, full height (#001837)
* Content area: starts at x=220 (200px sidebar + 20px margin)
* Header row: top of content area, single row with title left and controls right
* Main panel: below header, contains section title + table + pagination

## Responsive Patterns
* Desktop default: 1440px
* Minimum: 1280px
* At < 1280px: sidebar collapses to icon-only mode (56px wide)
* Content area fills remaining space
* Table scrolls horizontally if columns exceed available width

---

# Interaction Guidelines

## Hover States
* Buttons (primary): Background darkens to #1565D8
* Buttons (ghost): Background changes to `--color-bg-secondary`
* Table rows: Background changes to `--color-bg-secondary`
* Sidebar nav items: Background rgba(255,255,255,0.08)
* Context menu items: Background `--color-bg-secondary`
* Links (blue values): Underline appears

## Transitions
* Default duration: 150ms
* Easing: ease
* Apply to: background-color, border-color, color, box-shadow, opacity

## Focus States
* Always visible for accessibility
* Use `--color-border-brand` (#1B7EFF) for focus ring
* Ring style: 0 0 0 3px rgba(27,126,255,0.1)
* Inputs: border changes to `--color-border-brand` on focus