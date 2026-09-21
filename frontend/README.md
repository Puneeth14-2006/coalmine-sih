# MineGuard AI — Frontend Prototype

**AI Powered Governance & Compliance Monitoring for Coal Mines**
Smart India Hackathon 2026

A fully interactive React + Vite frontend prototype for a coal-mine governance and
compliance monitoring platform. All data shown is realistic **mock data** — there is
no live backend, AI model, CCTV, or GPS integration yet (see `src/services/api.js`
for where that would plug in).

## Tech stack

- React 18 (JavaScript, no TypeScript)
- Vite
- React Router (client-side navigation)
- Plain CSS (no Tailwind) — see `src/styles.css`
- Lucide React icons

## Project structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx        # Fixed left navigation
│   │   ├── Header.jsx         # Top bar (date, notifications, avatar)
│   │   ├── StatCard.jsx       # Dashboard KPI card
│   │   ├── RiskChart.jsx      # SVG line trend + donut risk chart
│   │   ├── ViolationTable.jsx # Reusable violations table
│   │   ├── StatusBadge.jsx    # Colored severity/status pill
│   │   └── AIChat.jsx         # Chat widget with mock AI replies
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Inspections.jsx
│   │   ├── Violations.jsx
│   │   ├── CorrectiveActions.jsx
│   │   ├── MinesSites.jsx
│   │   ├── Reports.jsx
│   │   └── AIAssistant.jsx
│   ├── services/
│   │   └── api.js             # Placeholder API layer for future backend
│   ├── App.jsx                # Routing + auth state + layout
│   ├── main.jsx                # React entry point
│   └── styles.css             # All application styling
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Screens implemented

1. **Login** — split-screen layout with mining background, feature highlights, and a
   working login form (any non-empty username/password logs you in).
2. **Dashboard** — KPI stat cards, violations trend chart, mine risk donut chart,
   recent violations table, quick actions.
3. **Inspections** — mine/zone/date fields, interactive checklist, "Start Inspection"
   flow with a success toast.
4. **Violations** — filterable, searchable, paginated violations table.
5. **Corrective Actions** — full action tracker table with priority/status badges.
6. **Mines & Sites** — per-mine cards with location, production, compliance, and risk.
7. **Reports** — four report types, each with a "Generate Report" action and success
   confirmation.
8. **AI Assistant** — chat interface with suggested questions and mocked responses.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Notes for hackathon judges

- All numbers, mine names, and violation/action records are illustrative sample data
  hard-coded in the relevant page components — swap these for real API calls via
  `src/services/api.js` once a backend is available.
- The AI Assistant uses a simple keyword-matched mock response table; it is clearly
  labeled as a prototype and does not call any real model.
- Every navigation item, button, filter, and form on every screen is functional at
  the frontend-state level (React `useState`/`useMemo`), so the whole flow can be
  demoed end-to-end without a backend.
