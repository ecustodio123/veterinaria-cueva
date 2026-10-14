// Solo habilitar tras verificar que el ID pertenece exclusivamente a Cueva.
// Las variables genéricas de otros consumidores no se utilizan.
const storeId = (import.meta.env.VITE_CUEVA_STORE_ID || '').trim()
export const isCuevaStoreVerified = import.meta.env.VITE_CUEVA_STORE_VERIFIED === 'true'
  && Boolean(storeId)
export const CURRENT_STORE_ID = isCuevaStoreVerified ? storeId : null
