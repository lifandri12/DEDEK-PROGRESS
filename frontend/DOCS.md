# Frontend Documentation

## Overview
Full-stack Gym Progress Tracker frontend built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## Pages

### `/` (Home)
- Welcome page after login
- Quick stats overview
- Links to main features

### `/dashboard`
- Main dashboard with progress widgets
- Recent activity
- Quick actions

### `/progress`
- Log body measurements (weight, height)
- Upload progress photos
- View progress history
- Weight trend visualization

### `/equipment`
- Log workouts with exercise details
- Track sets, reps, muscle groups
- Upload equipment photos
- View workout history by category

### `/quotes`
- Random motivational quote display
- Add custom quotes
- View all saved quotes
- Shuffle through quotes

### `/settings`
- Account information
- Logout functionality
- Profile management

### `/auth/login`
- Google OAuth login page
- Redirect to dashboard on success

## Components

### Layout Components
- **Sidebar** – Navigation menu with active route highlighting
- **Header** – App title and user info
- **Layout** – Main layout wrapper with auth protection

### Common Components
- **Button** – Primary/secondary button with variants
- **Input** – Labeled input field with styling
- **Card** – Container with consistent styling

### Feature Components
- **DashboardPanel** – Stats and overview
- **ProgressOverview** – Body progress summary
- **WorkoutLogger** – Exercise logging form
- **EquipmentList** – Equipment display
- **QuoteBanner** – Quote display

## API Hooks & Utils

### `utils/api.ts`
Axios-based API client with pre-configured endpoints for:
- Workouts CRUD
- Progress tracking
- Equipment management
- Quotes management

### `utils/supabase.ts`
Supabase client functions for direct database access.

### `hooks/useAuth.ts`
Custom hook for authentication state management.

### `context/AuthContext.tsx`
React Context for auth state and user data.

## Styling

### Tailwind Config (`tailwind.config.ts`)
- Custom navy color palette
- Inter font family
- Dark mode enabled

### Global Styles (`styles/globals.css`)
- Tailwind directives
- Component utilities (.card, .btn-primary, etc.)
- Smooth animations (fadeIn, slideUp)

## Environment Variables

Required in `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Scripts

- `npm run dev` – Start development server (http://localhost:3000)
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## File Structure

```
frontend/
├── pages/           # Next.js pages
├── components/      # React components
├── utils/           # Utility functions
├── hooks/           # Custom hooks
├── context/         # Context providers
├── styles/          # CSS files
├── public/          # Static assets
├── .env.local       # Environment variables
├── package.json     # Dependencies
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── SETUP_GUIDE.md   # Setup instructions
```

## Development Workflow

1. Start dev server: `npm run dev`
2. Edit files in `pages/`, `components/`, `utils/`, etc.
3. Browser auto-refreshes on save
4. Check console for TypeScript/linting errors
5. Test API endpoints with Insomnia/Postman or browser DevTools

## Key Dependencies

- **next** – React framework
- **react & react-dom** – UI library
- **next-auth** – Authentication
- **@supabase/supabase-js** – Database client
- **axios** – HTTP client
- **tailwindcss** – CSS framework
- **chart.js** – Chart visualization

## Notes

- All API routes require NextAuth session (Google OAuth login)
- Supabase handles database, auth, and file storage
- Tailwind CSS provides styling without additional CSS files
- TypeScript ensures type safety across the codebase
