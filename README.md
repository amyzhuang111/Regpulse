# RegPulse

**AI-Powered Regulatory Compliance Monitoring for Financial Services**

RegPulse monitors sales calls in real-time, detecting SEC, FINRA, and FTC violations using AI-powered transcription and analysis. It turns every call into an instant compliance audit with audit-ready evidence.

**Live Demo:** [regpulse-mu.vercel.app](https://regpulse-mu.vercel.app)

---

## Features

- **Voice Monitoring** - Upload recorded sales calls for automatic transcription via ElevenLabs Scribe
- **AI Compliance Analysis** - GPT-4o analyzes transcripts against 8 regulatory frameworks (SEC 10b-5, Reg BI, FINRA 2111, FINRA 2210, FTC Act Sec 5, SEC 206(4)-1, SEC 204-2, Reg S-P)
- **Real-Time Violation Detection** - Flags guaranteed returns, pressure tactics, suitability failures, and more
- **Audit-Ready Evidence** - Every violation includes transcript excerpts, rule citations, AI reasoning, and confidence scores
- **Compliance Analytics** - Track risk trends, violation patterns, agent performance, and compliance scores over time
- **Rules Library** - Searchable database of all regulatory rules with severity levels and keywords
- **Dashboard** - KPI cards, violation breakdowns, risk trends, and recent activity at a glance
- **Reports** - Generate and export compliance reports

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict mode) |
| UI | React 19, Tailwind CSS v4, Framer Motion |
| Auth | NextAuth v5 (Auth.js) with JWT strategy |
| Database | Supabase (PostgreSQL + Row Level Security) |
| Speech-to-Text | ElevenLabs Scribe |
| AI Analysis | OpenAI GPT-4o |
| Hosting | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── calls/upload/     # Audio upload + processing pipeline
│   │   ├── dashboard/        # Dashboard stats API
│   │   ├── rules/            # Rules library API
│   │   └── violations/       # Violations CRUD API
│   ├── auth/
│   │   ├── signin/           # Sign in page
│   │   └── signup/           # Sign up page
│   ├── dashboard/
│   │   ├── analytics/        # Charts, trends, agent performance
│   │   ├── monitor/          # Live monitor + audio upload
│   │   ├── reports/          # Report generation
│   │   ├── rules/            # Searchable rules library
│   │   ├── settings/         # Profile & notification settings
│   │   └── violations/       # Violations list + detail view
│   └── page.tsx              # Landing page
├── components/
│   ├── landing/              # Hero, features, stats, demo, CTA, navbar
│   ├── layout/               # Sidebar, dashboard shell
│   ├── monitor/              # Audio upload component
│   └── ui/                   # Shared UI primitives
├── constants/
│   ├── demo-data.ts          # Demo violations, calls, dashboard stats
│   └── rules.ts              # Severity colors, rule definitions
├── lib/
│   ├── elevenlabs.ts         # ElevenLabs client
│   ├── openai.ts             # OpenAI client + compliance prompt
│   ├── supabase.ts           # Supabase client (browser + server)
│   └── utils.ts              # cn() helper, risk score calculation
├── services/
│   ├── analysis.service.ts   # GPT-4o compliance analysis
│   ├── calls.service.ts      # Call record CRUD
│   ├── dashboard.service.ts  # Dashboard aggregations
│   ├── rules.service.ts      # Rules queries
│   ├── transcription.service.ts  # ElevenLabs Scribe transcription
│   └── violations.service.ts # Violations CRUD + creation from analysis
└── types/
    └── index.ts              # TypeScript interfaces
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### 1. Clone and Install

```bash
git clone https://github.com/amyzhuang111/Regpulse.git
cd Regpulse
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your keys. See the table below for where to get each one.

| Variable | Required | Where to Get It |
|----------|----------|----------------|
| `AUTH_SECRET` | Yes | Run `openssl rand -base64 32` in your terminal |
| `NEXT_PUBLIC_SUPABASE_URL` | No* | [Supabase Dashboard](https://supabase.com/dashboard) > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No* | Same as above |
| `SUPABASE_SERVICE_ROLE_KEY` | No* | Same as above |
| `OPENAI_API_KEY` | No* | [OpenAI API Keys](https://platform.openai.com/api-keys) |
| `ELEVENLABS_API_KEY` | No* | [ElevenLabs Settings](https://elevenlabs.io/app/settings/api-keys) |

*The app works in demo mode without these keys. They're only needed for real audio processing and database storage.

### 3. Run

```bash
make
```

Or manually:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in with any email/password (demo mode).

### 4. (Optional) Set Up Database

If you want to use Supabase for real data:

```bash
make db-setup
```

This will show instructions for running the migration SQL in your Supabase dashboard.

---

## How It Works

### Upload Pipeline

```
Audio File
  -> ElevenLabs Scribe (speech-to-text)
  -> GPT-4o (compliance analysis against 8 regulatory frameworks)
  -> Violations stored in Supabase
  -> Dashboard updated with new risk scores
```

### Regulatory Frameworks

| Code | Rule | Authority | What It Catches |
|------|------|-----------|----------------|
| SEC-10B-5 | Anti-Fraud Provision | SEC | Guaranteed returns, no-risk claims |
| REG-BI | Regulation Best Interest | SEC | Failure to act in customer's best interest |
| FINRA-2111 | Suitability | FINRA | Recommending without assessing needs |
| FINRA-2210 | Communications | FINRA | Misleading or unbalanced statements |
| FTC-ACT-SEC5 | FTC Act Section 5 | FTC | Pressure tactics, false urgency |
| SEC-206-4-1 | Marketing Rule | SEC | Cherry-picked performance data |
| SEC-204-2 | Books and Records | SEC | Skipping required documentation |
| REG-S-P | Privacy | SEC | Mishandling personal financial info |

---

## Deployment

The app is deployed on Vercel. To deploy your own:

```bash
npm install -g vercel
vercel login
vercel --yes --prod
```

Set `AUTH_SECRET` and `AUTH_TRUST_HOST=true` in Vercel's environment variables.

---

## Scripts

| Command | Description |
|---------|------------|
| `make` | Install dependencies and start dev server |
| `make clean` | Delete build artifacts and reinstall |
| `make build` | Production build |
| `make lint` | Run ESLint |
| `make db-setup` | Print database setup instructions |

---

## License

MIT
