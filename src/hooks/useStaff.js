import { useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import { CURRENT_STORE_ID } from '../config/store'

export function useStaff() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadStaff() {
      try {
        if (!isSupabaseConfigured || !CURRENT_STORE_ID) {
          throw new Error('Staff configuration unavailable')
        }

        const { data, error: queryError } = await supabase
          .from('staff')
          .select('id,name,title,description,image_url')
          .eq('store_id', CURRENT_STORE_ID)
          .eq('is_active', true)
          .order('sort_order', { ascending: true })
          .order('id', { ascending: true })
          .abortSignal(controller.signal)

        if (queryError) throw queryError
        if (!controller.signal.aborted) setMembers(data ?? [])
      } catch {
        if (!controller.signal.aborted) {
          setError('No pudimos cargar los profesionales. Intenta nuevamente más tarde o escríbenos por WhatsApp.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadStaff()
    return () => controller.abort()
  }, [])

  return { members, loading, error }
}
