import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// The host owns scroll direction and its header; Commerce only receives a CSS offset.
export function useCommerceHeaderNavigation(enabled) {
  const headerRef = useRef(null)
  const catalogRef = useRef(null)
  const [hidden, setHidden] = useState(false)
  const [height, setHeight] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return
    const measure = () => setHeight(header.getBoundingClientRect().height)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!enabled) return
    let previousY = Math.max(0, window.scrollY)
    let distance = 0
    let frame = 0
    let navigatingUntil = 0

    const update = () => {
      frame = 0
      const y = Math.max(0, window.scrollY)
      const delta = y - previousY
      previousY = y
      const bounds = catalogRef.current?.getBoundingClientRect()
      const inCatalog = bounds && bounds.top <= height && bounds.bottom > height + 100
      if (!inCatalog || menuOpen || headerRef.current?.contains(document.activeElement) || Date.now() < navigatingUntil) {
        distance = 0
        setHidden(false)
        return
      }
      distance = Math.sign(distance) === Math.sign(delta) ? distance + delta : delta
      if (Math.abs(distance) >= 8) {
        setHidden(distance > 0)
        distance = 0
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onNavigate = (event) => {
      if (!catalogRef.current?.contains(event.target)) return
      navigatingUntil = Date.now() + 1500
      distance = 0
      setHidden(false)
    }
    const onManualInput = (event) => {
      if (event.type === 'keydown' && !['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) return
      navigatingUntil = 0
    }
    const onFocus = () => setHidden(false)
    const header = headerRef.current
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('wheel', onManualInput, { passive: true })
    window.addEventListener('touchmove', onManualInput, { passive: true })
    window.addEventListener('keydown', onManualInput)
    document.addEventListener('kafka-commerce:navigate', onNavigate)
    header?.addEventListener('focusin', onFocus)
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('wheel', onManualInput)
      window.removeEventListener('touchmove', onManualInput)
      window.removeEventListener('keydown', onManualInput)
      document.removeEventListener('kafka-commerce:navigate', onNavigate)
      header?.removeEventListener('focusin', onFocus)
    }
  }, [enabled, height, menuOpen])

  return {
    headerRef,
    catalogRef,
    headerHidden: enabled && hidden && !menuOpen,
    visibleHeight: enabled && hidden && !menuOpen ? 0 : height,
    setMenuOpen,
  }
}
