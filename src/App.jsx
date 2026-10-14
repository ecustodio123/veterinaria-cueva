import { useEffect, useMemo, useState } from 'react'
import { CommerceStore } from '@ecustodio123/kafka-commerce'
import '@ecustodio123/kafka-commerce/styles.css'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bath,
  CalendarCheck,
  Clock,
  HeartPulse,
  MapPin,
  Menu,
  Microscope,
  PackageOpen,
  Phone,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  X,
} from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import logo from './assets/img/brand/logo.png'
import banoMascota from './assets/img/services/banoMascota.jpg'
import grooming from './assets/img/services/grooming.jpg'
import petShop from './assets/img/services/petShop.jpg'
import microchip from './assets/img/services/microchip.jpg'
import ecografia2 from './assets/img/services/ecografia2.jpg'
import { isSupabaseConfigured, supabase } from './lib/supabase'
import { business, whatsappUrl } from './config/business'
import { CURRENT_STORE_ID } from './config/store'
import './App.css'

const commerceWhatsappPhone = business.phone
const phoneDisplay = business.phoneDisplay
const businessHours = business.hours
const socialLinks = [
  { name: 'Facebook', url: business.facebook, icon: faFacebookF },
  { name: 'Instagram', url: business.instagram, icon: faInstagram },
]

const heroSlides = [
  {
    title: 'Su bienestar es nuestra prioridad',
    cta: 'Agenda una cita',
    service: 'Atención veterinaria',
    eyebrow: 'Atención cercana',
    text: 'En Veterinaria Cueva nos preocupamos por el cuidado y bienestar de tus mascotas',
    image:
      'https://images.pexels.com/photos/4587991/pexels-photo-4587991.jpeg?auto=compress&cs=tinysrgb&w=1900',
  },
  {
    title: 'Cuidamos cada detalle de su salud',
    cta: 'Consultar por WhatsApp',
    service: 'Ecografía veterinaria',
    eyebrow: 'Salud y bienestar',
    text: 'Conoce nuestros servicios de ecografía veterinaria y consulta por la atención de tu mascota',
    image:
      'https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=1900',
  },
  {
    title: 'Porque cada huellita merece lo mejor',
    cta: 'Conoce nuestros servicios',
    href: '/servicios',
    service: 'Baños y cuidado',
    eyebrow: 'Cuidado para tu mascota',
    text: 'Descubre nuestros servicios de baño y cuidado para mascotas',
    image:
      'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=1900',
  },
]

const servicesIntro =
  'Conoce los servicios de Veterinaria Cueva en San Miguel, Lima. Consulta con nuestro equipo la disponibilidad de atención y cuidado para tu mascota.'

const technologyContent = {
  title: 'Cuidamos cada detalle de su salud',
  text: 'Consulta por nuestro servicio de ecografía veterinaria, publicado en nuestras redes. Escríbenos para conocer la disponibilidad y coordinar la atención de tu mascota.',
}

const services = [
  {
    title: 'Consulta veterinaria',
    pendingConfirmation: true,
    icon: Stethoscope,
    image:
      'https://images.pexels.com/photos/7469214/pexels-photo-7469214.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Consulta la disponibilidad de atención veterinaria para tu mascota en San Miguel.',
  },
  {
    title: 'Ecografía veterinaria',
    icon: HeartPulse,
    image:
      'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=900&q=80',
    text: 'Conoce el servicio de ecografía veterinaria y consulta las indicaciones para la atención de tu mascota.',
  },
  {
    title: 'Cirugía veterinaria',
    icon: Syringe,
    image:
      'https://images.pexels.com/photos/1350591/pexels-photo-1350591.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Consulta con el equipo las opciones de atención quirúrgica, sujetas a evaluación veterinaria.',
  },
  {
    title: 'Baño antipulgas',
    icon: ShieldCheck,
    image:
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=900&q=80',
    text: 'Pregunta por el servicio de baño antipulgas y las opciones de cuidado para tu mascota.',
  },
  {
    title: 'Vacunación',
    pendingConfirmation: true,
    icon: Activity,
    image:
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80',
    text: 'Consulta la disponibilidad actual de vacunación y la orientación del equipo para tu mascota.',
  },
  {
    title: 'Desparasitación',
    pendingConfirmation: true,
    icon: Microscope,
    image:
      'https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Escríbenos para consultar la disponibilidad de desparasitación y el cuidado de tu mascota.',
  },
  {
    title: 'Baños y cortes',
    pendingConfirmation: true,
    icon: Scissors,
    image:
      'https://images.pexels.com/photos/4587991/pexels-photo-4587991.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Consulta las opciones de baño y corte y su disponibilidad antes de coordinar tu visita.',
  },
  {
    title: 'Pet shop',
    pendingConfirmation: true,
    icon: Activity,
    image:
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80',
    text: 'Consulta por los productos disponibles para el cuidado de tu mascota.',
  },
  {
    title: 'Servicio pendiente 9',
    published: false,
    icon: Microscope,
    image: ecografia2,
    text: 'Pendiente de confirmación por el cliente; no publicar.',
  },
  {
    title: 'Servicio pendiente 10',
    published: false,
    icon: Activity,
    image:
      'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Pendiente de confirmación por el cliente; no publicar.',
  },
  {
    title: 'Servicio pendiente 11',
    published: false,
    icon: Sparkles,
    image: microchip,
    text: 'Pendiente de confirmación por el cliente; no publicar.',
  },
  {
    title: 'Servicio pendiente 12',
    published: false,
    icon: Sparkles,
    image: petShop,
    text: 'Pendiente de confirmación por el cliente; no publicar.',
  },
  {
    title: 'Servicio pendiente 13',
    published: false,
    icon: Bath,
    image: grooming,
    text: 'Pendiente de confirmación por el cliente; no publicar.',
  },
  {
    title: 'Servicio pendiente 14',
    published: false,
    icon: ShieldCheck,
    image: banoMascota,
    text: 'Pendiente de confirmación por el cliente; no publicar.',
  },
  {
    title: 'Servicio pendiente 15',
    published: false,
    icon: HeartPulse,
    image:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
    text: 'Pendiente de confirmación por el cliente; no publicar.',
  },
]

// Incorporar solamente reseñas verificadas y autorizadas de Veterinaria Cueva.
const testimonials = []

const faqs = [
  { question: '¿Cómo puedo consultar una cita?',
    answer: 'Escríbenos por WhatsApp o a través de nuestras redes oficiales para consultar la disponibilidad de atención.' },
  { question: '¿Qué servicios veterinarios ofrecen?',
    answer: 'Puedes consultar por atención veterinaria, ecografía, cirugía y baño antipulgas. Confirma la disponibilidad con el equipo antes de coordinar tu visita.' },
  { question: '¿Dónde se encuentra Veterinaria Cueva?',
    answer: `Estamos en ${business.location}. La dirección publicada es ${business.address}; confírmala con el equipo antes de visitarnos.` },
]

// Conservar el carrusel existente, sin publicar identidades ni fotos de otro equipo.
// Agregar aquí los perfiles y fotografías cuando el cliente autorice sus datos.
const doctors = []

const stats = [
  ['Amor', 'por los animales'],
  ['Trato', 'cercano'],
  ['Cerca', 'de tu mascota'],
]

const kafkaCommerceTheme = {
  primary: '#21CF0A',
  primaryText: '#000000',
  background: '#ffffff',
  surface: '#fbfaf8',
  text: '#000000',
  mutedText: '#6c6c6c',
  border: '#C79D76',
  radius: '8px',
  fontFamily: 'inherit',
}

function App() {
  const { pathname } = useLocation()
  const isStorePage = pathname.replace(/\/+$/, '') === '/tienda'

  return (
    <div className={isStorePage ? 'app-shell app-shell--store' : 'app-shell'}>
      <ScrollToTop />
      <Header />
      <main>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/tienda" element={<ShopPage />} />
            <Route path="/tiendas-prueba" element={<Navigate to="/tienda" replace />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="site-header">
      <NavLink className="brand-link" to="/" aria-label="Ir al inicio">
        <img src={logo} alt="Veterinaria Cueva" />
      </NavLink>

      <div className="header-actions">
        <button
          className="menu-button"
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav className={open ? 'main-nav is-open' : 'main-nav'}>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/servicios">Servicios</NavLink>
        <NavLink to="/tienda">Tienda</NavLink>
        <NavLink to="/nosotros">Nosotros</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} />
          Agendar
        </a>
      </nav>
    </header>
  )
}

function PageTransition({ children }) {
  const location = useLocation()

  return (
    <section className="route-transition" key={location.pathname}>
      {children}
    </section>
  )
}

function Home() {
  return (
    <>
      <HeroCarousel />
      <FeaturedServices />
      <TrustBand />
      <FaqSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}

function HeroCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % heroSlides.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [])

  const slide = heroSlides[active]

  const goTo = (direction) => {
    setActive((value) => {
      const next = value + direction
      if (next < 0) return heroSlides.length - 1
      return next % heroSlides.length
    })
  }

  return (
    <section className="hero-carousel" aria-label="Servicios principales">
      {heroSlides.map((item, index) => (
        <img
          className={index === active ? 'hero-image is-active' : 'hero-image'}
          src={item.image}
          alt=""
          key={item.service}
        />
      ))}
      <div className="hero-scrim" />

      <div className="hero-content">
        <p className="eyebrow">{slide.eyebrow}</p>
        <h1>{slide.title}</h1>
        <p>{slide.text}</p>
        <div className="hero-actions">
          <a className="primary-button" href={slide.href || whatsappUrl} target={slide.href ? undefined : '_blank'} rel="noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
            {slide.cta}
          </a>
          <NavLink className="secondary-button" to="/servicios">
            Ver servicios
          </NavLink>
        </div>
      </div>

      <div className="hero-controls" aria-label="Cambiar servicio destacado">
        <button type="button" aria-label="Servicio anterior" onClick={() => goTo(-1)}>
          <ArrowLeft size={20} />
        </button>
        <button type="button" aria-label="Servicio siguiente" onClick={() => goTo(1)}>
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="hero-service-tabs">
        {heroSlides.map((item, index) => (
          <button
            className={index === active ? 'is-active' : ''}
            type="button"
            key={item.service}
            onClick={() => setActive(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item.service}
          </button>
        ))}
      </div>
    </section>
  )
}

function FeaturedServices() {
  return (
    <section className="section-wrap">
      <SectionHeading
        eyebrow="Servicios"
        title="Nuestros Servicios"
        text={servicesIntro}
      />
      <div className="featured-grid">
        {services.slice(0, 3).map((service) => (
          <ServiceCard service={service} key={service.title} />
        ))}
      </div>
      <div className="services-more-action">
        <NavLink className="secondary-button" to="/servicios">
          Ver todos los servicios
        </NavLink>
      </div>
    </section>
  )
}

function ServiceCard({ service }) {
  const Icon = service.icon

  return (
    <article className="service-card">
      <img src={service.image} alt="" />
      <div>
        <span className="service-icon">
          <Icon size={20} />
        </span>
        <h3>{service.title}</h3>
        <p>{service.text}</p>
        {service.bullets ? (
          <ul>
            {service.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}

function TrustBand() {
  return (
    <section className="trust-band">
      <div>
        <p className="eyebrow">Veterinaria Cueva</p>
        <h2>Cuidamos a quienes más quieres</h2>
        <p>En Veterinaria Cueva creemos que cada mascota merece atención, cariño y dedicación</p>
      </div>
      <div className="stats-grid">
        {stats.map(([value, label]) => (
          <span key={label}>
            <strong>{value}</strong>
            {label}
          </span>
        ))}
      </div>
    </section>
  )
}

function TestimonialsSection() {
  if (testimonials.length === 0) return null

  return (
    <section className="section-wrap testimonials-block">
      <SectionHeading
        eyebrow="Testimonios"
        title="Confianza que se nota en cada visita"
        text="Experiencias compartidas por las familias de Veterinaria Cueva."
      />
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <TestimonialCard item={item} key={item.name} />
        ))}
      </div>
    </section>
  )
}

function TestimonialCard({ item }) {
  return (
    <article className="testimonial-card">
      <div className="rating" aria-label="5 estrellas">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star fill="currentColor" size={16} key={index} />
        ))}
      </div>
      <p>{item.text}</p>
      <div className="testimonial-author">
        <img src={item.image} alt="" />
        <span>
          <strong>{item.name}</strong>
          {item.pet}
        </span>
      </div>
    </article>
  )
}

function FaqSection() {
  return (
    <section className="section-wrap faq-section">
      <SectionHeading
        eyebrow="Preguntas frecuentes"
        title="Conoce más sobre Veterinaria Cueva"
        text="Información para consultar nuestros servicios y coordinar la atención de tu mascota."
      />
      <div className="faq-grid">
        {faqs.map((faq, index) => (
          <article className="faq-card" key={faq.question}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
            {faq.items ? (
              <ul>
                {faq.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}

function DoctorsCarousel() {
  const [active, setActive] = useState(0)
  const activeDoctor = doctors[active]
  if (!activeDoctor) return null

  const goToDoctor = (direction) => {
    setActive((value) => {
      const next = value + direction
      if (next < 0) return doctors.length - 1
      return next % doctors.length
    })
  }

  return (
    <section className="doctors-section">
      <div className="doctors-heading">
        <SectionHeading
          eyebrow="Nuestro equipo"
          title="Nuestro equipo de Veterinaria Cueva"
          text="Atención cercana y compromiso con el bienestar de tu mascota."
        />
      </div>

      <div className="doctor-feature" key={activeDoctor.name}>
        <div className="doctors-controls" aria-label="Cambiar doctor destacado">
          <button type="button" aria-label="Doctor anterior" onClick={() => goToDoctor(-1)}>
            <ArrowLeft size={20} />
          </button>
          <button type="button" aria-label="Doctor siguiente" onClick={() => goToDoctor(1)}>
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="doctor-photo">
          <img src={activeDoctor.image} alt={activeDoctor.name} />
        </div>
        <div className="doctor-profile">
          <p className="eyebrow">{activeDoctor.role}</p>
          <h3>{activeDoctor.name}</h3>
          <strong>{activeDoctor.focus}</strong>
          <p>{activeDoctor.text}</p>
          <a className="secondary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
            Consultar disponibilidad
          </a>
        </div>
      </div>

      <div className="doctor-strip" aria-label="Lista de doctores">
        {doctors.map((doctor, index) => (
          <button
            className={index === active ? 'is-active' : ''}
            type="button"
            key={doctor.name}
            onClick={() => setActive(index)}
          >
            <img src={doctor.image} alt="" />
            <span>
              <strong>{doctor.name}</strong>
              {doctor.focus}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="cta-section">
      <div>
        <p className="eyebrow">Agenda tu atención</p>
        <h2>¿Tu mascota necesita atención?</h2>
        <p>Estamos aquí para ayudarte a cuidar de tu mejor amigo</p>
      </div>
      <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} />
        Contáctanos por WhatsApp
      </a>
    </section>
  )
}

function TechnologySection() {
  return (
    <section className="technology-section">
      <div>
        <p className="eyebrow">Tecnología veterinaria</p>
        <h2>{technologyContent.title}</h2>
      </div>
      <p>{technologyContent.text}</p>
    </section>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Nuestros Servicios"
        text={servicesIntro}
        image="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1800&q=82"
      />
      <TechnologySection />
      <CtaSection />
    </>
  )
}

function ShopPage() {
  const storeId = CURRENT_STORE_ID

  return (
    <>
      <PageHero
        eyebrow="Tienda"
        title="Tienda Veterinaria Cueva"
        text="Explora nuestros productos para el cuidado de tu mascota y prepara tu pedido por WhatsApp."
        image="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1800&q=82"
      />
      <section className="section-wrap kafka-commerce-section">
        {!isSupabaseConfigured || !storeId ? (
          <div className="catalog-state" role="alert">
            <span>
              <PackageOpen size={28} />
            </span>
            <h3>Próximamente en Veterinaria Cueva</h3>
            <p>Próximamente encontrarás nuestros productos para el cuidado de tu mascota</p>
          </div>
        ) : (
          <CommerceStore
            checkout={{
              type: 'whatsapp',
              phone: commerceWhatsappPhone,
            }}
            description="Explora nuestros productos y prepara tu pedido por WhatsApp."
            features={{
              search: true,
              filters: true,
              cart: true,
            }}
            productImageBucket="product-images"
            storeId={storeId}
            supabase={supabase}
            theme={kafkaCommerceTheme}
            storeName={business.name}
            title="Veterinaria Cueva"
          />
        )}
      </section>
    </>
  )
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Conoce Veterinaria Cueva"
        text="En Veterinaria Cueva nos dedicamos al cuidado y bienestar de las mascotas, ofreciendo un espacio de atención cercana para nuestros amigos de cuatro patas"
        image="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1800&q=82"
      />
      <section className="about-section">
        <div className="staff-photo-wrap">
          <img
            src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=900&q=80"
            alt="Mascota en atención veterinaria"
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">Nuestro compromiso</p>
          <h2>Más que una veterinaria, un espacio de confianza.</h2>
          <p>
            En Veterinaria Cueva creemos que cada mascota merece atención,
            cariño y dedicación. Nos inspiran el amor por los animales y el
            compromiso con su bienestar.
          </p>
          <div className="value-list">
            <span>
              <ShieldCheck size={18} />
              Cuidado responsable
            </span>
            <span>
              <Sparkles size={18} />
              Atención cercana
            </span>
            <span>
              <CalendarCheck size={18} />
              Compromiso con su bienestar
            </span>
          </div>
        </div>
      </section>
      <DoctorsCarousel />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Contáctanos"
        text="Estamos en San Miguel, Lima. Escríbenos para consultar por nuestros servicios y coordinar la atención de tu mascota"
        image="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1800&q=82"
      />
      <section className="contact-section">
        <div className="contact-info">
          <SectionHeading
            eyebrow="Datos de atención"
            title={business.address}
            text="Dirección, teléfono y horario publicados en directorios, pendientes de confirmación. Consulta con el equipo antes de visitarnos."
          />
          <div className="contact-list">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <Phone size={18} />
              {phoneDisplay}{!business.confirmed.phone ? ' (por confirmar)' : ''}
            </a>
            <span>
              <Clock size={18} />
              Horario de atención: {businessHours}{!business.confirmed.hours ? ' (por confirmar)' : ''}
            </span>
            <span>
              <MapPin size={18} />
              {business.location}
            </span>
          </div>
          <SocialLinks />
        </div>
        <div className="map-card" aria-label="Mapa de ubicación">
          <iframe
            title="Ubicación referencial de Veterinaria Cueva, por confirmar"
            src={business.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  )
}

function PageHero({ eyebrow, title, text, image }) {
  return (
    <>
      <section className="page-hero">
        <img src={image} alt="" />
        <div className="page-hero-overlay" />
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
      </section>
      {eyebrow === 'Servicios' ? (
        <section className="section-wrap services-page-grid">
          {services.filter((service) => service.published !== false).map((service) => (
            <ServiceCard service={service} key={service.title} />
          ))}
        </section>
      ) : null}
    </>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <img src={logo} alt="Veterinaria Cueva" />
        <p>© {year} Veterinaria Cueva. Cuidando mascotas en San Miguel, Lima.</p>
      </div>
      <div className="footer-hours">
        <strong>Horario de atención{!business.confirmed.hours ? ' (por confirmar)' : ''}</strong>
        <span>{businessHours}</span>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          {phoneDisplay}{!business.confirmed.phone ? ' (por confirmar)' : ''}
        </a>
      </div>
      <div className="footer-links">
        <nav>
          <NavLink to="/servicios">Servicios</NavLink>
          <NavLink to="/tienda">Tienda</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
        </nav>
        <SocialLinks />
      </div>
    </footer>
  )
}

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Redes sociales">
      {socialLinks.map((link) => (
        <a href={link.url} target="_blank" rel="noreferrer" aria-label={link.name} key={link.name}>
          <FontAwesomeIcon icon={link.icon} />
        </a>
      ))}
    </div>
  )
}

function WhatsAppButton() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir a Veterinaria Cueva por WhatsApp (número provisional por confirmar)"
    >
      <FontAwesomeIcon icon={faWhatsapp} />
    </a>
  )
}

export default App
