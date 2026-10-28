import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getBusinessSchema, getSeo, getSeoTags, seoPages } from '../config/seo.js'

export default function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = getSeo(pathname).title
    document.head.querySelectorAll('[data-cueva-seo]').forEach(node => node.remove())
    for (const [tag, attributes] of getSeoTags(pathname)) {
      const node = document.createElement(tag)
      node.setAttribute('data-cueva-seo', '')
      for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value)
      document.head.append(node)
    }
    const path = pathname.replace(/\/+$/, '') || '/'
    if (Object.hasOwn(seoPages, path)) {
      const node = document.createElement('script')
      node.type = 'application/ld+json'
      node.setAttribute('data-cueva-seo', '')
      node.textContent = JSON.stringify(getBusinessSchema())
      document.head.append(node)
    }
  }, [pathname])
  return null
}
