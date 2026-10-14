import { CURRENT_STORE_ID } from '../config/store'
import { supabase } from '../lib/supabase'
import { getProductImageUrl } from './productImages'

export async function getPublicProducts() {
  if (!supabase) {
    throw new Error('Supabase no está configurado. Define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.')
  }

  const { data, error } = await supabase
    .from('products')
    .select('id, store_id, name, description, price, image_path, available, active, created_at')
    .eq('store_id', CURRENT_STORE_ID)
    .eq('active', true)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data.map((product) => ({
    ...product,
    imageUrl: getProductImageUrl(product.image_path),
  }))
}
