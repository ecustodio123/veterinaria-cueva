import { business } from './business.js'

export const siteUrl = 'https://veterinariacueva.com'
export const socialImage = `${siteUrl}/social-logo-cueva.png`
export const seoPages = {
  '/': {
    title: 'Veterinaria Cueva | Veterinaria en San Miguel, Lima',
    description: 'Atención veterinaria en San Miguel, Lima. Conoce los servicios y profesionales de Veterinaria Cueva, consulta una cita y coordina pedidos por WhatsApp.',
  },
  '/servicios': {
    title: 'Servicios veterinarios en San Miguel | Veterinaria Cueva',
    description: 'Conoce los servicios de Veterinaria Cueva en San Miguel, Lima. Consulta la disponibilidad y las indicaciones para la atención de tu mascota por WhatsApp.',
  },
  '/tienda': {
    title: 'Tienda para mascotas en San Miguel | Veterinaria Cueva',
    description: 'Explora la tienda de Veterinaria Cueva, elige productos para tu mascota y coordina tu pedido, disponibilidad y entrega con nuestro equipo por WhatsApp.',
  },
  '/nosotros': {
    title: 'Nuestro equipo veterinario | Veterinaria Cueva, San Miguel',
    description: 'Conoce a Veterinaria Cueva y a su equipo de profesionales en San Miguel, Lima. Atención y cuidado para tu mascota con respeto, cariño y compromiso.',
  },
  '/contacto': {
    title: 'Contacto, dirección y horarios | Veterinaria Cueva',
    description: 'Visítanos en Federico Gallese Taricchi 895, San Miguel, Lima. Consulta horarios, ubicación y coordina una cita con Veterinaria Cueva por WhatsApp.',
  },
}

export function getSeo(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const page = Object.hasOwn(seoPages, path) ? seoPages[path] : null
  return {
    ...(page || { title: 'Página no encontrada | Veterinaria Cueva', description: 'Encuentra los servicios, la tienda y los datos de contacto de Veterinaria Cueva en San Miguel, Lima.' }),
    canonical: page ? `${siteUrl}${path === '/' ? '/' : path}` : path === '/tiendas-prueba' ? `${siteUrl}/tienda` : null,
    robots: page ? 'index, follow, max-image-preview:large' : 'noindex, follow',
  }
}

export function getBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['VeterinaryCare', 'LocalBusiness'],
    '@id': `${siteUrl}/#veterinaria`,
    name: business.name,
    legalName: business.legalName,
    url: `${siteUrl}/`,
    image: socialImage,
    telephone: `+${business.phone}`,
    address: { '@type': 'PostalAddress', streetAddress: business.address, addressCountry: 'PE' },
    openingHours: 'Mo-Sa 09:00-18:00',
    sameAs: [business.instagram, business.facebook].filter(Boolean),
  }
}

export function getSeoTags(pathname) {
  const seo = getSeo(pathname)
  return [
    ['meta', { name: 'description', content: seo.description }],
    ['meta', { name: 'robots', content: seo.robots }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'es_PE' }],
    ['meta', { property: 'og:site_name', content: business.name }],
    ['meta', { property: 'og:title', content: seo.title }],
    ['meta', { property: 'og:description', content: seo.description }],
    ['meta', { property: 'og:image', content: socialImage }],
    ['meta', { property: 'og:image:type', content: 'image/png' }],
    ['meta', { property: 'og:image:width', content: '3375' }],
    ['meta', { property: 'og:image:height', content: '4219' }],
    ['meta', { property: 'og:image:alt', content: 'Logo de Veterinaria Cueva' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: seo.title }],
    ['meta', { name: 'twitter:description', content: seo.description }],
    ['meta', { name: 'twitter:image', content: socialImage }],
    ['meta', { name: 'twitter:image:alt', content: 'Logo de Veterinaria Cueva' }],
    ...(seo.canonical ? [
      ['link', { rel: 'canonical', href: seo.canonical }],
      ['meta', { property: 'og:url', content: seo.canonical }],
    ] : []),
  ]
}
