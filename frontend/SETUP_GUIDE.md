# Gym Progress Tracker – Complete Setup Guide

A modern, full-stack gym progress tracking application with dark navy UI, Google OAuth login, and Supabase backend.

## 📋 Features

✅ **Google OAuth Login** – Seamless sign-in with Google  
✅ **Dashboard** – Quick stats and progress overview  
✅ **Body Progress Tracking** – Log weight, height, upload photos  
✅ **Workout Logging** – Track exercises with sets, reps, muscle groups  
✅ **Gym Equipment Management** – Upload equipment photos, manage workout notes  
✅ **Motivational Quotes** – Store and display inspirational quotes  
✅ **Dark Navy Theme** – Modern, sleek UI with Tailwind CSS  
✅ **Responsive Design** – Mobile-first, works on all devices  

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS 3 |
| **Auth** | NextAuth.js + Google OAuth |
| **Database** | Supabase (PostgreSQL) |
| **Storage** | Supabase Storage (for photos) |
| **API** | Next.js API Routes |

## 📦 Prerequisites

- **Node.js** 18+ (download from https://nodejs.org)
- **Git** (optional, for cloning)
- **Supabase Account** (free tier available at https://supabase.com)
- **Google OAuth Credentials** (already configured)

## 🚀 Quick Start

### Step 1: Install Dependencies

```powershell
cd frontend
npm install
```

### Step 2: Configure Environment Variables

Edit `frontend/.env.local` (already created with Google OAuth credentials):

```env
# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=460435499994-t4phk2oblkk3aavpg139ehunoehi53ev.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NEXTAUTH_SECRET=gym-progress-tracker-secret-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Supabase (update with your project details)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Step 3: Setup Supabase

1. **Create a Supabase Project:**
   - Go to https://supabase.com
   - Click "New project"
   - Choose a name, password, and region
   - Wait for the project to initialize

2. **Get Your Credentials:**
   - Go to **Settings** → **API**
   - Copy `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

3. **Run Database Migrations:**
   - Go to **SQL Editor**
   - Click "New query"
   - Copy & paste content from `backend/supabase/migrations.sql`
   - Click "Run"

### Step 4: Configure Google OAuth in Supabase

1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Add your Google OAuth credentials:
   - **Client ID:** `460435499994-t4phk2oblkk3aavpg139ehunoehi53ev.apps.googleusercontent.com`
   - **Client Secret:** `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`
4. Add Redirect URL:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### Step 5: Start the Development Server

```powershell
cd frontend
npm run dev
```

Visit **http://localhost:3000** in your browser.

## 📍 Project Structure

```
gym-progress-tracker/
├── frontend/                      # Next.js app
│   ├── pages/
│   │   ├── index.tsx             # Home
│   │   ├── dashboard.tsx         # Dashboard
│   │   ├── progress.tsx          # Body Progress
│   │   ├── equipment.tsx         # Workouts & Equipment
│   │   ├── quotes.tsx            # Motivational Quotes
│   │   ├── settings.tsx          # Account Settings
│   │   ├── auth/
│   │   │   └── login.tsx         # Google OAuth Login
│   │   └── api/
│   │       ├── auth/[...nextauth].ts
│   │       ├── workouts.ts
│   │       ├── progress.ts
│   │       └── quotes.ts
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── index.tsx
│   │   ├── Dashboard/
│   │   ├── Progress/
│   │   ├── Workouts/
│   │   ├── Equipment/
│   │   ├── Quotes/
│   │   └── Common/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Card.tsx
│   ├── utils/
│   │   ├── api.ts
│   │   └── supabase.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── .env.local              # Environment variables
│   ├── package.json
│   ├── tailwind.config.ts
│   └── postcss.config.js
│
├── backend/
│   ├── supabase/
│   │   ├── migrations.sql      # Database schema
│   │   └── README.md
│   └── api/
│       └── health.js           # Health check endpoint
│
├── docs/
└── scripts/
```

## 🔑 Key Files Explained

### `.env.local` – Environment Configuration
Stores sensitive credentials (API keys, secrets). **Never commit this file!**

### `pages/api/auth/[...nextauth].ts` – Authentication
Handles Google OAuth login flow with NextAuth.js.

### `pages/api/workouts.ts` – Workout API
CRUD endpoints for workouts. Example:
- `GET /api/workouts` – List user's workouts
- `POST /api/workouts` – Create new workout

### `pages/api/progress.ts` – Progress API
CRUD endpoints for body progress (weight, height, photos).

### `pages/api/quotes.ts` – Quotes API
CRUD endpoints for motivational quotes.

### `components/Layout/Sidebar.tsx` – Navigation
Left sidebar with menu links to Dashboard, Progress, Equipment, Quotes, Settings.

### `tailwind.config.ts` – Theme Configuration
Defines custom colors (navy, navy-light) and fonts (Inter).

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  navy: '#0f1729',              // Main dark color
  'navy-light': '#1a2540',      // Lighter navy
  'navy-lighter': '#253558',    // Even lighter
}
```

### Add New Muscle Groups
Edit `pages/equipment.tsx`:
```typescript
const MUSCLE_GROUPS = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Biceps']
```

### Change App Name
Search & replace "Gym Progress Tracker" with your desired name across all files.

## 📊 Database Schema

### `users` table
```sql
id (UUID)
email (VARCHAR)
name (VARCHAR)
created_at
updated_at
```

### `body_progress` table
```sql
id (UUID)
user_id (VARCHAR)
weight (DECIMAL)
height (DECIMAL)
notes (TEXT)
photo_url (VARCHAR)
created_at
```

### `workouts` table
```sql
id (UUID)
user_id (VARCHAR)
name (VARCHAR)
category (VARCHAR) -- Chest, Back, Legs, etc.
sets (INT)
reps (INT)
notes (TEXT)
created_at
```

### `quotes` table
```sql
id (UUID)
user_id (VARCHAR)
text (TEXT)
created_at
```

## 🔐 Security Notes

1. **Environment Variables** – Never commit `.env.local` to git
2. **NextAuth Secret** – Change `NEXTAUTH_SECRET` in production
3. **Row-Level Security (RLS)** – Enable in Supabase to restrict data access
4. **HTTPS** – Always use HTTPS in production
5. **API Rate Limiting** – Consider adding rate limiting for APIs

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Import Project" and select your repo
4. Add environment variables from `.env.local`
5. Click "Deploy"

### Deploy to Other Platforms

- **Netlify:** Same as Vercel, similar setup
- **Railway:** Push to GitHub, connect Railway, auto-deploys
- **Self-hosted:** Use Docker, run `npm run build && npm run start`

## 🐛 Troubleshooting

### Issue: "Unauthorized" error on /api/workouts
**Solution:** Ensure you're logged in. Check Supabase auth settings.

### Issue: Database tables don't exist
**Solution:** Run migrations.sql in Supabase SQL Editor (see Step 3 above).

### Issue: Photos not uploading
**Solution:** Enable Supabase Storage, configure bucket permissions.

### Issue: Google OAuth redirect error
**Solution:** Check redirect URL in Google Cloud Console matches Supabase callback URL.

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Supabase Docs](https://supabase.com/docs)

## 📝 License

MIT License – Free to use and modify.

## 💬 Support

For issues or questions:
1. Check Supabase logs: **Settings** → **Logs**
2. Check browser console (F12 → Console)
3. Check Next.js dev server output

---

**Made with ❤️ for fitness enthusiasts**
