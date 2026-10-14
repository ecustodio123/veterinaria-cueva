import { useRef, useState } from 'react'
import { ChevronDown, Type } from 'lucide-react'
import { applyTypographyPreset, getTypographyPreset, typographyOptions } from '../config/typography'
import './TypographyPreview.css'

export default function TypographyPreview() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(getTypographyPreset)
  const toggle = useRef(null)
  const active = typographyOptions.find(option => option.id === selected)

  function handleKeyDown(event) {
    if (event.key === 'Escape' && open) {
      setOpen(false)
      toggle.current?.focus()
    }
  }

  return (
    <aside className="font-preview" aria-label="Comparar tipografías" onKeyDown={handleKeyDown}>
      <button
        ref={toggle}
        className="font-preview__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="font-preview-options"
        onClick={() => setOpen(!open)}
      >
        <Type size={17} aria-hidden="true" />
        Tipografías <span>· {active.label}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      {open && (
        <div className="font-preview__panel" id="font-preview-options">
          <p className="font-preview__intro">Prueba cómo se siente Cueva.</p>
          <div className="font-preview__options" role="group" aria-label="Opciones de tipografía">
            {typographyOptions.map(option => (
              <button
                key={option.id}
                className="font-preview__option"
                type="button"
                aria-pressed={selected === option.id}
                onClick={() => setSelected(applyTypographyPreset(option.id, true))}
              >
                <strong>{option.label}</strong>
                <span>{option.fonts}</span>
                <small>{option.description}</small>
              </button>
            ))}
          </div>
          <p className="font-preview__hint">Vista previa local. Se conserva al navegar o recargar.</p>
        </div>
      )}
    </aside>
  )
}
