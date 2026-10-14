import { supabase } from '../lib/supabase'

const PRODUCT_IMAGES_BUCKET = 'product-images'

export function getProductImageUrl(imagePath) {
  if (!imagePath || !supabase) return null

  const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(imagePath)
  return data.publicUrl
}
