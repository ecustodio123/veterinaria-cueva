// Selección para la web publicada: 'actual', 'propuesta-1' o 'propuesta-2'.
export const DEFAULT_TYPOGRAPHY = 'propuesta-1'

export const typographyOptions = [
  {
    id: 'actual',
    label: 'Actual',
    fonts: 'Tipografía original del sitio',
    description: 'La referencia para comparar.',
  },
  {
    id: 'propuesta-1',
    label: 'Propuesta 1',
    fonts: 'Manrope + DM Sans',
    description: 'Contemporánea, clara y sobria.',
  },
  {
    id: 'propuesta-2',
    label: 'Propuesta 2',
    fonts: 'Nunito + Nunito Sans',
    description: 'Cálida, redondeada y cercana.',
  },
]

const storageKey = 'vet-cueva:typography-preview:v1'
const isValid = value => typographyOptions.some(option => option.id === value)

export function getTypographyPreset() {
  // La elección local de vista previa nunca se aplica al build publicado.
  if (import.meta.env.DEV) {
    try {
      const saved = localStorage.getItem(storageKey)
      if (isValid(saved)) return saved
    } catch { /* La comparación sigue disponible aunque no haya almacenamiento. */ }
  }
  return isValid(DEFAULT_TYPOGRAPHY) ? DEFAULT_TYPOGRAPHY : 'actual'
}

export function applyTypographyPreset(preset, remember = false) {
  const validPreset = isValid(preset) ? preset : 'actual'
  document.documentElement.dataset.fontPreset = validPreset
  if (remember && import.meta.env.DEV) {
    try { localStorage.setItem(storageKey, validPreset) } catch { /* Se mantiene la elección en esta vista. */ }
  }
  return validPreset
}

export function initializeTypography() {
  applyTypographyPreset(getTypographyPreset())
}
