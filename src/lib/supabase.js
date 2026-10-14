import { createClient } from '@supabase/supabase-js'
import { isCuevaStoreVerified } from '../config/store'

const supabaseUrl = import.meta.env.VITE_CUEVA_SUPABASE_URL
const supabasePublicKey = import.meta.env.VITE_CUEVA_SUPABASE_PUBLISHABLE_KEY
let isPublicKey = Boolean(supabasePublicKey?.startsWith('sb_publishable_'))
try {
  const payload = JSON.parse(atob(supabasePublicKey.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
  isPublicKey = payload.role === 'anon'
} catch { /* Las claves publishable no usan formato JWT. */ }

export const isSupabaseConfigured = Boolean(
  isCuevaStoreVerified && supabaseUrl?.startsWith('https://') && isPublicKey,
)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabasePublicKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
  : null
