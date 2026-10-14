// Datos de directorios públicos: confirmar con el cliente antes de publicar.
export const business = {
  name: 'Veterinaria Cueva',
  legalName: 'Veterinaria Pet Shop Cueva E.I.R.L.',
  location: 'San Miguel, Lima, Perú',
  address: 'Federico Gallese Taricchi 895, San Miguel, Lima',
  phone: '51992709298',
  phoneDisplay: '+51 992 709 298',
  hours: 'Lunes a sábado, de 9:00 a. m. a 6:00 p. m.',
  confirmed: { address: false, phone: false, hours: false },
  // Uso provisional autorizado para desarrollo; revisar antes de publicar.
  whatsappMessage: 'Hola, quisiera consultar por los servicios de Veterinaria Cueva',
  instagram: 'https://www.instagram.com/veterinariacuevaperu/',
  facebook: 'https://web.facebook.com/profile.php?id=61593272159549',
  email: null,
  tiktok: null,
  mapsEmbed: 'https://www.google.com/maps?q=Veterinaria+Cueva+Federico+Gallese+895+San+Miguel+Lima+Peru&output=embed',
}

export const whatsappUrl = `https://wa.me/${business.phone}?text=${encodeURIComponent(business.whatsappMessage)}`
