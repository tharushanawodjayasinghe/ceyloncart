import { createBrowserClient } from '@supabase/ssr';

// Safe fallbacks for build-time static generation when env vars are not set
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url'
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : 'https://placeholder.supabase.co';

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_supabase_anon_key' &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your_publishable_or_anon_key'
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : 'sb_publishable_placeholder_key_for_build';

// Supabase browser client — used in Client Components
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
