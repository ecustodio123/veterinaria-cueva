// Datos de contacto confirmados por el cliente el 14 de octubre de 2026.
export const business = {
  name: 'Veterinaria Cueva',
  legalName: 'Veterinaria Pet Shop Cueva E.I.R.L.',
  location: 'San Miguel, Lima, Perú',
  address: 'Federico Gallese Taricchi 895, San Miguel, Lima',
  phone: '51992709298',
  phoneDisplay: '+51 992 709 298',
  hours: 'Lunes a sábado, de 9:00 a. m. a 6:00 p. m.',
  afterHoursNote: 'Para emergencias o atención fuera de horario, incluidos domingos y feriados, coordina previamente al',
  confirmed: { address: true, phone: true, hours: true },
  whatsappMessage: 'Hola, quisiera consultar por la atención para mi mascota en Veterinaria Cueva.',
  instagram: 'https://www.instagram.com/veterinariacuevaperu/',
  facebook: 'https://web.facebook.com/profile.php?id=61593272159549',
  email: null,
  tiktok: null,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Veterinaria+Cueva+Federico+Gallese+895+San+Miguel+Lima+Peru',
  mapsEmbed: 'https://www.google.com/maps?q=Veterinaria+Cueva+Federico+Gallese+895+San+Miguel+Lima+Peru&output=embed',
}

export function createWhatsappUrl(message = business.whatsappMessage) {
  return `https://wa.me/${business.phone}?text=${encodeURIComponent(message)}`
}

export const whatsappUrl = createWhatsappUrl()
