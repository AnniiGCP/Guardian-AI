# Frontend AI Agent Instructions

**Guardian AI** is a risk detection dashboard for parents. The frontend is a **React 19 + Vite + Tailwind** application that displays ML risk analysis results in a responsive, animated web interface.

---

## 1. Quick Start

### Commands
```bash
npm run dev          # Start Vite dev server with HMR (port 5173)
npm run build        # Optimize production build
npm run lint         # ESLint check
npm run preview      # Test production build locally
```

### Environment Variables
```bash
# Point to your backend API (default: http://localhost:8000)
VITE_API_BASE_URL=http://localhost:8000

# Use mock data instead of real backend (useful for UI development)
VITE_USE_MOCK=true

# WebSocket URL for real-time alerts (e.g., ws://localhost:8000/ws/alerts)
VITE_WS_URL=ws://localhost:8000/ws/alerts
```

### Dev Proxy
Vite automatically proxies these paths to the backend:
- `/ingest` → upload chat JSON or audio for analysis
- `/session/:id` → fetch a single session result
- `/sessions` → list all sessions
- `/health` → backend health check

---

## 2. Architecture & Patterns

### Pages Structure (React Router v7)
```
/                    → Home (landing page)
/dashboard           → Main app shell (Layout.jsx + nested routes)
  /upload            → Upload chat JSON or audio file
  /history           → View all past analysis sessions
  /location          → Map/timeline view (if implemented)
  /social-media      → Social platform detection (if implemented)
  /settings          → Theme toggle, config
  /support           → Help & documentation
```

**Key rule**: All pages under `/dashboard` render inside `Layout.jsx` (sidebar + navbar).

### Component Hierarchy
```
src/
├── App.jsx                          # Route definitions
├── components/
│   ├── Layout.jsx                   # Dashboard shell (nav + sidebar)
│   ├── DotField.jsx                 # Animated particle background
│   └── ui/                          # shadcn/Radix UI components
├── pages/
│   ├── Home.jsx, Dashboard.jsx, Upload.jsx, etc.
├── services/
│   └── api.js                       # ← Single source for ALL API calls
└── mock/
    └── demoSession.json             # Mock data for VITE_USE_MOCK mode
```

---

## 3. Critical: API Integration Pattern

**Rule**: Always use the `api.js` adapter. Never make direct fetch/axios calls.

### Why
1. **Normalization**: Converts backend snake_case → UI contract (e.g., `risk_score`, `grooming_stage`, `flags`)
2. **Mock mode**: Swap real backend with JSON file by setting `VITE_USE_MOCK=true`
3. **Error handling**: Consistent error parsing and user-facing messages
4. **Single point of change**: If backend shape changes, only `api.js` needs updates

### Functions
```javascript
import { api } from '../services/api.js';

// Fetch one session
const session = await api.getSession(sessionId);

// List all sessions
const sessions = await api.getSessions();

// Upload chat JSON (normalized to {"messages": [{sender, text, timestamp}, ...]})
const {session_id} = await api.ingestJson({platform, messages});

// Upload audio file for analysis
const {session_id} = await api.ingestAudio(audioFile, platform);

// Check if backend is live
const isHealthy = await api.checkHealth();

// Get WebSocket URL for real-time alerts
const wsUrl = api.getWsAlertsUrl();
```

### Example: Correct Usage
```jsx
// ✅ DO THIS
import { api } from '../services/api.js';

export function Upload() {
  const handleSubmit = async (messages) => {
    try {
      const result = await api.ingestJson({platform: 'json_upload', messages});
      setSessionId(result.session_id);
    } catch (err) {
      setError(err.message);
    }
  };
  // ...
}
```

### Example: Incorrect Usage
```jsx
// ❌ DON'T DO THIS
fetch('/ingest', {
  method: 'POST',
  body: JSON.stringify({messages})
}).then(r => r.json()).then(r => {
  // Backend might return different field names, mock mode breaks, errors are unparsed
});
```

---

## 4. Styling & Tailwind

### Theme (CSS Variables)
Dark mode is class-based. Colors defined in `tailwind.config.js` via HSL variables:
- `--background` (page background)
- `--foreground` (text color)
- `--primary` (accent color)
- `--destructive` (error red)
- `--muted` (secondary text)
- etc.

### How to Use
```jsx
// ✅ Use Tailwind classes (auto-respects dark mode + theme variables)
<div className="bg-background text-foreground border border-muted">
  <h1 className="text-primary font-bold">Risk Score</h1>
</div>

// ✅ Custom CSS for complex layouts
<style jsx>{`
  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
`}</style>
```

### Animations
- **GSAP**: For complex animations (DotField particles, smooth number transitions)
- **Tailwind**: For simple animations (fade-in, slide, etc.)
- **CSS transitions**: For hover states and micro-interactions

### Fonts
- **Body**: Instrument Sans (var(--font-sans))
- **Headings**: Instrument Serif (var(--font-serif))

---

## 5. Data Flow & State Management

### No Global State Library
Guardian AI uses **local component state** only (no Redux/Zustand). This keeps the codebase lightweight.

### Typical Flow
1. User navigates to a page
2. Page component calls `api.getSession()` or `api.ingestJson()` in `useEffect`
3. Result stored in `useState`
4. Render from local state
5. Pass callbacks to children for interactions

### Example
```jsx
export function Dashboard() {
  const {sessionId} = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSession(sessionId)
      .then(setSession)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <RiskScoreCard risk_score={session.risk_score} />
      <FlagsList flags={session.flags} />
    </div>
  );
}
```

### localStorage
- Theme preference (light/dark)
- Session cache (when `VITE_USE_MOCK=true`)

### WebSocket (Optional)
For real-time alerts, connect to `api.getWsAlertsUrl()`:
```javascript
const ws = new WebSocket(api.getWsAlertsUrl());
ws.onmessage = (event) => {
  const alert = JSON.parse(event.data);
  // Handle real-time alert
};
```

---

## 6. JSON Contract (Frontend ↔ Backend)

**See [docs/API_CONTRACT.md](../docs/API_CONTRACT.md) and [docs/PROJECT_GUIDE.md](../docs/PROJECT_GUIDE.md#the-json-contract) for full contract.**

**Session object shape** (what `api.getSession()` returns):
```javascript
{
  "session_id": "uuid-v4",
  "platform": "json_upload",      // or "audio_upload"
  "timestamp": "2025-01-01T00:00:00Z",
  "risk_score": 78,               // 0–100
  "confidence": 0.91,             // 0.0–1.0
  "grooming_stage": "isolation",  // trust_building | isolation | secrecy | escalation
  "flags": [
    {
      "type": "isolation_tactic",
      "snippet": "don't tell your parents about this",
      "severity": "high",         // low | medium | high
      "message_index": 14
    },
    // ... more flags
  ],
  "categories": ["isolation", "gift_lure", "trust_building"],
  "stage_progression": {
    "trust_building": true,
    "isolation": true,
    "secrecy": true,
    "escalation": false
  },
  "recommendation": "alert_parent",  // or "monitor" | "safe"
  "drift_signals": {
    "late_night_messages": true,
    "message_frequency_spike": false,
    "new_unknown_contact": true
  }
}
```

---

## 7. ESLint & Code Quality

### Run Linter
```bash
npm run lint
```

### Rules
- React hooks must follow rules of hooks
- All functions should be refreshable (react-refresh)
- Browser globals (`window`, `document`, etc.) allowed

### Auto-Fix
ESLint does not have `--fix` configured. Fix issues manually.

---

## 8. Testing & Validation

### Mock Mode (Fastest)
```bash
VITE_USE_MOCK=true npm run dev
```
Uses `src/mock/demoSession.json` and localStorage. Perfect for UI work without backend.

### Live Backend
```bash
npm run dev
```
Requires backend running on `http://localhost:8000` (or `VITE_API_BASE_URL`).

### Production Build
```bash
npm run build
npm run preview  # Test locally
```

---

## 9. Common Pitfalls & Solutions

| Problem | Solution |
|---------|----------|
| API calls fail, mock mode works | Check `VITE_API_BASE_URL` and backend health (`/health` endpoint) |
| Component not re-rendering | Ensure you're updating state with `setState()`, not mutating directly |
| Theme not applying | Check dark mode class on `<html>`. Use Tailwind classes, not inline styles. |
| Animations janky | GSAP for complex, Tailwind for simple. Avoid `requestAnimationFrame` in React components. |
| Form submission doesn't work | Always use `api.ingestJson()` or `api.ingestAudio()`, never raw fetch. |
| Old data displayed after API change | Clear localStorage or restart dev server |

---

## 10. Key Files & Responsibilities

| File | Purpose |
|------|---------|
| [src/services/api.js](src/services/api.js) | **← USE THIS FOR ALL API CALLS**. Normalizes backend responses, handles errors, supports mock mode. |
| [src/App.jsx](src/App.jsx) | Route definitions and layout. Add new pages here. |
| [src/components/Layout.jsx](src/components/Layout.jsx) | Dashboard shell with sidebar and navbar. All `/dashboard/*` pages render here. |
| [vite.config.js](vite.config.js) | Vite settings, dev proxy config, path aliases. |
| [tailwind.config.js](tailwind.config.js) | Theme colors, fonts, animations. Change CSS variables here. |
| [src/mock/demoSession.json](src/mock/demoSession.json) | Mock data for UI development. Matches session JSON contract. |
| [package.json](package.json) | Dependencies and scripts. |

---

## 11. Adding New Pages

### Steps
1. Create `src/pages/MyPage.jsx` (PascalCase)
2. Add route to `src/App.jsx`
3. Add link to navigation in `src/components/Layout.jsx`
4. Use `api.*` functions for data fetching
5. Style with Tailwind + theme variables
6. Test with `npm run dev`

### Template
```jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';

export function MyPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getSessions()
      .then(setData)
      .catch(setError);
  }, []);

  if (error) return <div className="text-destructive">{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-background text-foreground">
      <h1 className="text-2xl font-bold text-primary mb-4">My Page</h1>
      {/* Your content */}
    </div>
  );
}
```

---

## 12. Deployment

The frontend is configured for **Vercel** (see `vercel.json`). 

- Build command: `npm run build` → outputs to `dist/`
- Environment variables: Set `VITE_API_BASE_URL` and `VITE_WS_URL` in Vercel dashboard
- Auto-deploy on git push to main

---

## 13. Resources & Links

- **[docs/PROJECT_GUIDE.md](../docs/PROJECT_GUIDE.md)** — Product vision, architecture, phase timeline
- **[docs/API_CONTRACT.md](../docs/API_CONTRACT.md)** — Backend API endpoints and response shape
- **[README.md](README.md)** — React + Vite setup (template docs)
- **Vite docs**: https://vitejs.dev
- **Tailwind docs**: https://tailwindcss.com
- **React Router v7 docs**: https://reactrouter.com
- **shadcn/Radix UI**: https://radix-ui.com (component library used in `src/ui/`)

---

## Summary for AI Agents

✅ **DO**: Use `api.js` for all API calls | Use Tailwind for styling | Test with `VITE_USE_MOCK=true` | Add new pages in `src/pages/` | Follow PascalCase naming

❌ **DON'T**: Make direct fetch calls | Mutate state directly | Use global state libraries | Ignore the JSON contract | Hard-code API URLs

Happy coding! 🚀
