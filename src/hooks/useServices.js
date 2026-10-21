import { useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { CURRENT_STORE_ID } from '../config/store'

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadServices() {
      try {
        if (!isSupabaseConfigured || !CURRENT_STORE_ID) {
          throw new Error('Services configuration unavailable')
        }

        const { data, error: queryError } = await supabase
          .from('services')
          .select('id,title,description,image_url')
          .eq('store_id', CURRENT_STORE_ID)
          .eq('is_active', true)
          .order('sort_order', { ascending: true })
          .order('id', { ascending: true })
          .abortSignal(controller.signal)

        if (queryError) throw queryError
        if (!controller.signal.aborted) setServices(data ?? [])
      } catch {
        if (!controller.signal.aborted) {
          setError('No pudimos cargar los servicios. Intenta nuevamente más tarde o escríbenos por WhatsApp.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadServices()
    return () => controller.abort()
  }, [])

  return { services, loading, error }
}
