# Figma Make Prompt — ThreatDash Assets Dashboard

```
TASK: Assets Management Dashboard
Create a full-page asset inventory dashboard for a cybersecurity platform called ThreatDash, featuring a dark sidebar navigation, top header with search and filters, a sortable data table with 15 rows, pagination, and a floating context menu.

CONTEXT:
- Use Case: Security operations team managing and monitoring cloud infrastructure assets (servers, endpoints, applications, storage) with criticality ratings and business entity associations
- Brand Reference: CrowdStrike Falcon, Wiz.io, Datadog — dark sidebar, clean white content area, enterprise SaaS security aesthetic
- Platform: Web, 1440×822px desktop viewport

LAYOUT:
┌──────────┬──────────────────────────────────────────────────────────┐
│          │              Header (28px)                               │
│  Dark    │  [Title "Assets"] [221 total assets]                    │
│  Sidebar │                    [Search] [Asset type ▼]              │
│  (200px) │                    [Business Criticality ▼] | [Export]  │
│          │                    [+ New Asset]                         │
│          ├──────────────────────────────────────────────────────────┤
│ [Logo]   │  Section Title: "Assets List" (28px)                    │
│ [Workspace│                                                        │
│  Selector]│  ┌──────────────────────────────────────────────────┐  │
│          │  │  Table Header Row (30px)                           │  │
│ Risk     │  │  □ Name ↕ | Type ↕ | Description | Business      │  │
│ Insights │  │         Criticality ↕ | Business Entities ↕ |     │  │
│  Overview│  │         Created ↕ | Updated ↕ | ⋮                 │  │
│  Risk    │  ├──────────────────────────────────────────────────┤  │
│  Findings│  │  Data Row 1 (42px) — Server type                  │  │
│  Business│  │  Data Row 2 (42px) — Endpoint type                │  │
│  Entities│  │  Data Row 3 (42px) — Application type             │  │
│  Risks   │  │  Data Row 4-15 (42px each) — Storage type         │  │
│  Assets  │  ├──────────────────────────────────────────────────┤  │
│  Risks   │  │  Pagination (52px)                                │  │
│          │  │  [1] 2 3 4 ··· 125   [Next >]                    │  │
│ Data Mgmt│  └──────────────────────────────────────────────────┘  │
│  Business│                                                        │
│  Entities│  Context Menu (floating, 180×92px)                     │
│ *Assets* │  ┌────────────────────┐                                │
│  Context │  │ ✏️ Edit             │                                │
│  Events  │  │ 🗑️ Delete           │                                │
│          │  │ 🏢 Manage Business  │                                │
│ User Mgmt│  │    Entities         │                                │
│  Manage  │  └────────────────────┘                                │
│  Users   │                                                        │
│          │                                                        │
│ 🔔 Notif. │                                                        │
└──────────┴──────────────────────────────────────────────────────────┘
Total: 1440×822px

ELEMENTS:
- [ ] Dark sidebar (200px wide, full height) with:
  - [ ] ThreatDash logo (white text, "D" styled in teal/cyan accent)
  - [ ] Copy/clipboard icon next to logo
  - [ ] Workspace selector dropdown ("SentraGuard" with teal icon and chevron)
  - [ ] Navigation sections with group labels: "Risk Insights", "Data Management", "User Management"
  - [ ] Nav items with icons: Overview, Risk Findings, Business Entities Risks, Assets Risks, Business Entities, Assets (active), Context Events, Manage Users
  - [ ] Active nav item "Assets" has blue left border + light blue background highlight
  - [ ] Notifications bell icon at bottom
- [ ] Header row with:
  - [ ] Page title "Assets" (bold, 20px) + "221 total assets" counter (grey, 14px)
  - [ ] Search input with magnifying glass icon and placeholder "Search assets..."
  - [ ] "Asset type" filter dropdown
  - [ ] "Business Criticality" filter dropdown
  - [ ] Vertical separator line
  - [ ] "Export" button (ghost style with download icon)
  - [ ] "+ New Asset" primary button (blue, filled)
- [ ] "Assets List" section title
- [ ] Data table with:
  - [ ] Checkbox column for bulk selection
  - [ ] "Name" column — sortable, monospace-style IDs (e.g., MS-WKS-14, NY-WKS-38, CO-WKS-22)
  - [ ] "Type" column — with colored icon badges: Server (blue), Endpoint (purple), Application (purple grid), Storage (blue box)
  - [ ] "Description" column — plain text descriptions
  - [ ] "Business Criticality" column — red numeric value (e.g., "10")
  - [ ] "Business Entities" column — blue numeric link (e.g., "4", "6", "8")
  - [ ] "Created" column — date format MM/DD/YY HH:MM
  - [ ] "Updated" column — date format MM/DD/YY HH:MM
  - [ ] Actions column — 3-dot vertical menu (⋮)
  - [ ] Alternating or clean white rows with subtle border-bottom
- [ ] Pagination bar with:
  - [ ] Active page "1" with blue border
  - [ ] Page numbers 2, 3, 4
  - [ ] Ellipsis (···)
  - [ ] Last page "125"
  - [ ] "Next >" button
- [ ] Floating context menu (appears on ⋮ click) with:
  - [ ] "Edit" with pencil icon
  - [ ] "Delete" with trash icon
  - [ ] "Manage Business Entities" with building icon

COMPONENT SPECS:

**Dark Sidebar** (200×822px)
- Background: #001837 (Dark Blue)
- Padding: 16px
- Logo: "ThreatDash" white text, ~20px, with styled "D" in teal
- Workspace Selector: height 36px, background rgba(255,255,255,0.08), border-radius 8px, padding 8px 12px
  - Icon: teal circular badge (20px)
  - Text: "SentraGuard" 14px/400 #FFFFFF
  - Chevron: 12px #A1B2BF
- Section Labels: 12px/400 #A1B2BF (Silver), uppercase, margin-top 24px, margin-bottom 8px
- Nav Items: height 36px, padding 8px 12px, border-radius 6px, gap 4px
  - Icon: 18px #A1B2BF
  - Text: 14px/400 #A1B2BF
  - Default hover: background rgba(255,255,255,0.08)
  - Active state: left border 3px #1B7EFF, background rgba(27,126,255,0.15), icon #FFFFFF, text #FFFFFF
- Section divider: 1px solid rgba(255,255,255,0.08)
- Notifications: fixed at bottom, icon 18px #A1B2BF, text 14px/400 #A1B2BF

**Header Bar** (1195×28px)
- Background: transparent (inherits #FFFFFF page)
- Left: Title "Assets" 20px/700 #001837 + "221 total assets" 14px/400 #8F97AC with 12px gap
- Right section gap: 8px
- Search Input: width 180px, height 28px, background #F7F9FB, border 1px #EDECF9, border-radius 6px
  - Placeholder: "Search assets..." 14px/400 #8F97AC
  - Search icon: 14px #8F97AC
- Filter Dropdowns: height 28px, background #F7F9FB, border 1px #EDECF9, border-radius 6px, padding 0 10px
  - Text: 14px/400 #474E62
  - Chevron: 12px #8F97AC
- Separator: 1px solid #EDECF9, height 24px, vertical
- Export Button: height 28px, background transparent, border 1px #EDECF9, border-radius 6px
  - Icon: download 14px #474E62
  - Text: "Export" 14px/500 #474E62
- New Asset Button: height 28px, background #1B7EFF, border-radius 6px, padding 0 12px
  - Text: "+ New Asset" 14px/600 #FFFFFF

**Table Container** (1200×724px)
- Background: #FFFFFF
- Border: 1px solid #EDECF9
- Border-radius: 12px
- Padding: 16px
- Shadow: 0 6px 16px rgba(19, 37, 72, 0.14)

**Table Header Row** (1168×30px)
- Background: transparent
- Checkbox: 14px unchecked, border 1px #EDECF9, border-radius 3px
- Column headers: 12px/400 #8F97AC
- Sort icons: 10px #EDECF9 (up/down arrows)
- Border-bottom: 1px solid #EDECF9

**Table Data Row** (1168×42px)
- Background: #FFFFFF
- Border-bottom: 1px solid #EDECF9
- Vertical alignment: center
- Checkbox: 14px unchecked, border 1px #EDECF9
- Name: 14px/400 #001837 (monospace-like, e.g., "MS-WKS-14")
- Type cell:
  - Icon badge: 18×18px, border-radius 4px, colored background
    - Server: #D4E7FF bg, #1B7EFF icon
    - Endpoint: #FFEFF2 bg, #D62828 icon
    - Application: #EDECF9 bg, #474E62 icon
    - Storage: #D4E7FF bg, #1B7EFF icon
  - Text: 14px/400 #474E62, 8px gap from icon
- Description: 14px/400 #474E62
- Business Criticality: 14px/600 #D62828 (red, bold number)
- Business Entities: 14px/600 #1B7EFF (blue, link-style number)
- Created/Updated: 12px/400 #8F97AC
- Actions: 3-dot icon 16px #8F97AC, clickable

**Pagination Bar** (1168×52px)
- Centered horizontally
- Active page: 32×28px, border 1px #1B7EFF, border-radius 6px, background #FFFFFF
  - Text: 14px/600 #1B7EFF
- Inactive pages: 31×28px, no border, background transparent
  - Text: 14px/400 #8F97AC
- Ellipsis: 14px #8F97AC
- Next button: height 28px, border 1px #EDECF9, border-radius 6px
  - Text: "Next" 14px/500 #474E62
  - Chevron: 12px #474E62

**Context Menu** (180×92px)
- Background: #FFFFFF
- Border-radius: 8px
- Shadow: 0 6px 16px rgba(19, 37, 72, 0.14)
- Padding: 4px
- Menu items: height 28px, padding 6px 12px, border-radius 4px
  - Icon: 16px #474E62
  - Text: 14px/400 #474E62
  - Hover: background #F7F9FB

DESIGN SYSTEM:

**Colors**
| Token | Hex | Usage |
|-------|-----|-------|
| Dash Blue | #1B7EFF | Primary CTA, active states, links, badges |
| Dark Blue | #001837 | Sidebar background, primary headings |
| White | #FFFFFF | Page background, cards, table bg |
| Grey | #F7F9FB | Input backgrounds, subtle fills |
| Grey text | #474E62 | Body text, secondary content |
| Light grey text | #8F97AC | Muted text, placeholders, timestamps |
| Silver | #A1B2BF | Sidebar nav text, section labels |
| Border color | #EDECF9 | Borders, dividers, input outlines |
| Bright-Gray | #ECF0F5 | Alternate backgrounds |
| Red | #D62828 | Criticality values, danger states |
| Light Red | #FFEFF2 | Danger badge backgrounds |
| Light Blue | #D4E7FF | Info badge backgrounds, highlights |

**Typography**
| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| H3 / Page Title | DM Sans | 20px | 700 (Bold) | 100% | -0.5px |
| Text-16-med | DM Sans | 16px | 500 (Medium) | 100% | -2px |
| text-14-semi-bold | DM Sans | 14px | 600 (SemiBold) | 100% | -0.5px |
| text-14-reg | DM Sans | 14px | 400 (Regular) | 100% | -0.5px |
| text-12-reg | DM Sans | 12px | 400 (Regular) | 14px | -0.5px |

**Spacing Scale**
- 4px (2xs), 8px (xs), 12px (sm), 16px (md), 24px (lg), 32px (xl)

**Border Radius**
- Inputs/Buttons/Badges: 6px
- Cards/Table container: 12px
- Context menu: 8px
- Sidebar nav items: 6px
- Workspace selector: 8px
- Checkboxes: 3px
- Type icon badges: 4px
- Avatars/Pills: 9999px

**Shadows**
- Card shadow: 0 6px 16px rgba(19, 37, 72, 0.14)
- Context menu: 0 6px 16px rgba(19, 37, 72, 0.14)

BEHAVIOR:
- **Sidebar nav item on hover**: Background rgba(255,255,255,0.08), smooth transition
- **Sidebar nav item active**: Left 3px border #1B7EFF, background rgba(27,126,255,0.15), text and icon turn white
- **Table row on hover**: Background #F7F9FB, 3-dot menu becomes more visible
- **Table header sort on click**: Toggle ascending/descending, arrow icon changes color to #1B7EFF
- **Checkbox on click**: Fill #1B7EFF, checkmark white, row gets subtle blue tint
- **"+ New Asset" button hover**: Background darken to #1565D8
- **Export button hover**: Background #F7F9FB
- **Filter dropdown on click**: Expands option list with checkbox multi-select, 200ms ease-out
- **Search input on focus**: Border color changes to #1B7EFF, shadow 0 0 0 3px rgba(27,126,255,0.1)
- **Pagination page on click**: Blue border appears, text turns #1B7EFF
- **3-dot menu on click**: Context menu appears (180×92px) positioned below-left
- **Context menu item on hover**: Background #F7F9FB
- **Business Entities number on hover**: Underline appears (link behavior)
- **Transitions**: All 150ms ease

CONSTRAINTS:

| Spec | Value |
|------|-------|
| Platform | Web |
| Viewport | 1440×822px |
| Min Width | 1280px |
| Sidebar | Fixed 200px, dark theme |
| Content Area | Fluid, 1240px at 1440 viewport |
| Accessibility | WCAG AA, keyboard nav, focus states |
| Responsive | Sidebar collapses to icons at < 1280px |

**States Required:**
- Default, Hover, Active, Focus, Disabled, Loading (skeleton rows), Error, Empty ("No assets found")

CONTENT:
- Show 15 table rows with varied asset types
- Asset names: MS-WKS-14, NY-WKS-38, MS-WKS-18, CO-WKS-22 (repeated with variations)
- Types: Server, Endpoint, Application, Storage (with corresponding colored icons)
- Descriptions: "Main API gateway for external services", "Endpoint asset description...", "User authentication and authorization", "Cloud-based file storage system"
- Business Criticality: All show "10" in red
- Business Entities: Vary between 1, 2, 4, 6, 8, 12
- Created dates: Mix of 2023 dates (05/15/23, 06/22/23, 07/10/23, 08/05/23)
- Updated dates: Mix of 2024 dates (12/20/24, 12/18/24, 12/15/24, 12/10/24)
- Total assets: 221
- Total pages: 125

NOTES:
1. Sidebar uses a very dark navy (#001837) background — NOT pure black
2. Active sidebar item ("Assets") has both a left blue border AND a translucent blue background
3. The "D" in "ThreatDash" logo has a special teal/cyan styling
4. Table type column uses small colored icon badges before the type text label
5. Business Criticality values are always in red (#D62828), bold weight
6. Business Entities values are always in blue (#1B7EFF), clickable links
7. Context menu floats and overlaps table rows — it has a white background with card shadow
8. Pagination "1" is the active page with blue border outline style (not filled)
9. Font is DM Sans throughout — with negative letter-spacing (-0.5px default)
10. Workspace selector in sidebar has a semi-transparent white background (8% opacity)
```