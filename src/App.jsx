import { useEffect, useMemo, useRef, useState } from 'react'
import { useCommerceHeaderNavigation } from './hooks/useCommerceHeaderNavigation'
import { useServices } from './hooks/useServices'
import { CommerceStore } from '@ecustodio123/kafka-commerce'
import '@ecustodio123/kafka-commerce/styles.css'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  HeartPulse,
  MapPin,
  MessageCircle,
  PawPrint,
  Menu,
  PackageOpen,
  Phone,
  ShieldCheck,
  Star,
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
import heroBienestar from './assets/img/hero/hero-bienestar.png'
import heroSalud from './assets/img/hero/hero-salud.webp'
import heroCuidado from './assets/img/hero/hero-cuidado.webp'
import heroNosotros from './assets/img/hero/nosotros_hero.png'
import heroServicios from './assets/img/hero/hero-servicios.jpg'
import heroTienda from './assets/img/hero/hero-tienda.jpg'
import { isSupabaseConfigured, supabase } from './lib/supabase'
import { business, createWhatsappUrl, whatsappUrl } from './config/business'
import { CURRENT_STORE_ID } from './config/store'
// import TypographyPreview from './components/TypographyPreview'
import MedicalTeam from './components/MedicalTeam'
import './App.css'

const commerceWhatsappPhone = business.phone
const phoneDisplay = business.phoneDisplay
const businessHours = business.hours
const socialLinks = [
  { name: 'Facebook', url: business.facebook, icon: faFacebookF },
  { name: 'Instagram', url: business.instagram, icon: faInstagram },
]

const pageMetadata = {
  '/': {
    title: 'Veterinaria Cueva | Atención veterinaria en San Miguel',
    description: 'Atención veterinaria en San Miguel, Lima. Consulta una cita en Veterinaria Cueva o explora nuestra tienda y coordina tu pedido por WhatsApp.',
  },
  '/servicios': {
    title: 'Servicios veterinarios en San Miguel | Veterinaria Cueva',
    description: 'Consulta por atención veterinaria, ecografía, cirugía y baño antipulgas en Veterinaria Cueva. Coordina la atención de tu mascota en San Miguel.',
  },
  '/nosotros': {
    title: 'Nosotros | Veterinaria Cueva en San Miguel',
    description: 'Conoce la propuesta de Veterinaria Cueva: respeto por cada mascota, cercanía con su familia y cuidado responsable en San Miguel, Lima.',
  },
  '/tienda': {
    title: 'Tienda para mascotas | Veterinaria Cueva',
    description: 'Explora los productos de Veterinaria Cueva, prepara tu carrito y consulta tu pedido por WhatsApp. Confirma disponibilidad y coordina tu compra con el equipo.',
  },
  '/contacto': {
    title: 'Contacto y ubicación | Veterinaria Cueva',
    description: 'Visita Veterinaria Cueva en Federico Gallese Taricchi 895, San Miguel, Lima. Escríbenos por WhatsApp para consultar una cita y coordinar tu visita.',
  },
}

const heroSlides = [
  {
    title: 'Su bienestar empieza contigo.',
    cta: 'Consultar una cita',
    href: createWhatsappUrl('Hola, quisiera consultar una cita para mi mascota en Veterinaria Cueva.'),
    external: true,
    service: 'Atención veterinaria',
    eyebrow: 'Veterinaria en San Miguel',
    text: 'En Cueva te acompañamos a cuidar de quien siempre está a tu lado. Cuéntanos qué necesita tu mascota y coordinemos su atención.',
    image: heroBienestar,
  },
  {
    title: 'Conocer más de su salud es otra forma de cuidarlo.',
    cta: 'Consultar por ecografía',
    href: createWhatsappUrl('Hola, quisiera consultar por una ecografía veterinaria y la disponibilidad de atención en Veterinaria Cueva.'),
    external: true,
    service: 'Ecografía veterinaria',
    eyebrow: 'Ecografía veterinaria',
    text: 'Si tu mascota necesita una ecografía, en Cueva te ayudamos a coordinar el siguiente paso. Escríbenos para conocer la disponibilidad y cómo preparar su visita.',
    image: heroSalud,
  },
  {
    title: 'Que se sienta tan bien como se ve.',
    cta: 'Consultar por un baño',
    href: createWhatsappUrl('Hola, quisiera consultar por el servicio de baño antipulgas en Veterinaria Cueva.'),
    external: true,
    service: 'Baños y cuidado',
    eyebrow: 'Baño y cuidado',
    text: 'Su cuidado también está en los pequeños detalles. Pregunta por el baño antipulgas y coordinemos una visita.',
    image: heroCuidado,
  },
]

const servicesIntro =
  'Cada mascota tiene sus propias necesidades. Conoce nuestros servicios en San Miguel y conversemos sobre el siguiente paso para su cuidado.'

const technologyContent = {
  title: 'Conocer más de su salud es otra forma de cuidarlo.',
  text: 'Si necesitas coordinar una ecografía para tu mascota, escríbenos. Consulta con el equipo la disponibilidad del servicio y las indicaciones para su atención.',
}

// Incorporar solamente reseñas verificadas y autorizadas de Veterinaria Cueva.
const testimonials = []

const faqs = [
  {
    question: '¿Cómo consulto una cita?',
    answer: 'Escríbenos por WhatsApp con el motivo de tu consulta. El equipo te indicará la disponibilidad y los pasos para coordinar la atención de tu mascota.',
  },
  {
    question: '¿Cómo hago un pedido en la tienda?',
    answer: 'Elige tus productos, agrégalos al carrito y continúa por WhatsApp. Coordina con el equipo la disponibilidad, cómo recibir tu pedido y el pago antes de confirmar tu compra.',
  },
  {
    question: '¿Dónde los encuentro?',
    answer: `Estamos en ${business.address}. Atendemos de ${business.hours.charAt(0).toLowerCase() + business.hours.slice(1)} Escríbenos antes de venir para coordinar la atención.`,
  },
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
  const embeddedCommerce = isStorePage
  const commerceNavigation = useCommerceHeaderNavigation(embeddedCommerce)

  return (
    <div
      className={isStorePage ? `app-shell app-shell--store${embeddedCommerce ? ' app-shell--commerce-embedded' : ''}` : 'app-shell'}
      style={{ '--kafka-commerce-host-header-offset': `${commerceNavigation.visibleHeight}px` }}
    >
      <ScrollToTop />
      <div className={embeddedCommerce ? 'site-header-slot' : undefined}>
        <Header
          headerRef={commerceNavigation.headerRef}
          hidden={commerceNavigation.headerHidden}
          onMenuOpenChange={commerceNavigation.setMenuOpen}
        />
      </div>
      <main>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/tienda" element={<ShopPage catalogRef={commerceNavigation.catalogRef} embeddedCommerce={embeddedCommerce} />} />
            <Route path="/tiendas-prueba" element={<Navigate to="/tienda" replace />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <WhatsAppButton />
      {/* {import.meta.env.DEV && <TypographyPreview />} */}
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    const metadata = pageMetadata[pathname.replace(/\/+$/, '') || '/'] || pageMetadata['/']
    document.title = metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
  }, [pathname])

  return null
}

function Header({ headerRef, hidden, onMenuOpenChange }) {
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 820px)').matches)
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const media = window.matchMedia('(max-width: 820px)')
    const update = () => {
      setMobile(media.matches)
      if (!media.matches) setOpen(false)
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!mobile || !open) return
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      menuButtonRef.current?.focus()
    }
    const onPointerDown = (event) => {
      if (menuRef.current?.contains(event.target) || menuButtonRef.current?.contains(event.target)) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [mobile, open])

  useEffect(() => {
    onMenuOpenChange(open)
  }, [onMenuOpenChange, open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`site-header${hidden ? ' site-header--hidden' : ''}${open ? ' site-header--menu-open' : ''}`}
      ref={headerRef}
      inert={hidden}
      aria-hidden={hidden || undefined}
    >
      <NavLink className="brand-link" to="/" aria-label="Ir al inicio">
        <img src={logo} alt="Veterinaria Cueva" />
      </NavLink>

      <div className="header-actions">
        <button
          className="menu-button"
          ref={menuButtonRef}
          type="button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav
        id="site-navigation"
        ref={menuRef}
        className={open ? 'main-nav is-open' : 'main-nav'}
        inert={mobile && !open}
        aria-hidden={mobile && !open || undefined}
        onClick={(event) => {
          if (mobile && event.target.closest('a')) {
            setOpen(false)
            menuButtonRef.current?.focus()
          }
        }}
      >
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/servicios">Servicios</NavLink>
        <NavLink to="/tienda">Tienda</NavLink>
        <NavLink to="/nosotros">Nosotros</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} />
          Consultar una cita
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
          <a className="primary-button" href={slide.href || whatsappUrl} target={slide.external || !slide.href ? '_blank' : undefined} rel="noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
            {slide.cta}
          </a>
          <NavLink className="secondary-button" to="/servicios">
            Conocer servicios
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
  const { services, loading, error } = useServices()

  return (
    <section className="section-wrap services-section">
      <SectionHeading
        eyebrow="Servicios"
        title="¿Qué necesita tu mascota hoy?"
        text={servicesIntro}
      />
      <div className="featured-grid" aria-busy={loading}>
        {loading || error || services.length === 0 ? (
          <p className="services-state" role={error ? 'alert' : 'status'}>
            {loading ? 'Cargando servicios…' : error || 'Aún no hay servicios publicados.'}
          </p>
        ) : services.slice(0, 3).map((service) => (
          <ServiceCard service={service} key={service.id} />
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
  const [failedImage, setFailedImage] = useState(null)
  const imageUrl = service.image_url?.trim()

  return (
    <article className="service-card">
      {imageUrl && failedImage !== imageUrl ? (
        <img src={imageUrl} alt="" loading="lazy" onError={() => setFailedImage(imageUrl)} />
      ) : (
        <span className="service-image-placeholder" role="img" aria-label="Imagen no disponible">
          Imagen no disponible
        </span>
      )}
      <div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
    </article>
  )
}

function TrustBand() {
  return (
    <section className="trust-band" aria-labelledby="trust-title">
      <div className="trust-inner">
        <div className="trust-copy">
          <p className="eyebrow">Ese vínculo merece cuidado</p>
          <h2 id="trust-title">Detrás de cada mascota<br />hay una <span>familia.</span></h2>
          <p>Sabemos lo que significa para ti. En Cueva queremos acompañarte a cuidar de esos pequeños momentos que hacen grande su historia juntos.</p>
          <div className="trust-principles">
            {[
              { icon: HeartPulse, title: 'Amor y respeto', text: 'Por quien alegra tus días.' },
              { icon: MessageCircle, title: 'Trato cercano', text: 'Un espacio para escucharte.' },
              { icon: ShieldCheck, title: 'Cuidado responsable', text: 'Su bienestar, presente.' },
            ].map(({ icon: Icon, title, text }) => (
              <div className="trust-principle" key={title}>
                <Icon size={24} strokeWidth={1.7} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <NavLink className="trust-link" to="/nosotros">
            Conoce el corazón de Cueva <ArrowRight size={19} aria-hidden="true" />
          </NavLink>
        </div>
        <figure className="trust-visual">
          <div className="trust-photo">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85"
              alt="Dos perros corren y juegan juntos al aire libre"
              loading="lazy"
              width="1000"
              height="1100"
            />
          </div>
          <span className="trust-paw" aria-hidden="true"><PawPrint size={34} strokeWidth={1.7} /></span>
          <figcaption>
            <span className="trust-caption-line" aria-hidden="true" />
            Por más paseos, más juegos<br /><strong>y más momentos juntos.</strong>
          </figcaption>
        </figure>
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
        title="El siguiente paso, más claro."
        text="Para consultar una cita, preparar un pedido o planear tu visita."
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

function CtaSection() {
  return (
    <section className="cta-section">
      <div>
        <p className="eyebrow">Su cuidado empieza con una conversación</p>
        <h2>Cuéntanos qué necesita tu mascota.</h2>
        <p>Una duda, una cita o una visita que quieres coordinar. Estamos para orientarte.</p>
      </div>
      <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} />
        Hablar por WhatsApp
      </a>
    </section>
  )
}

function TechnologySection() {
  return (
    <section className="technology-section">
      <div>
        <p className="eyebrow">Ecografía veterinaria</p>
        <h2>{technologyContent.title}</h2>
      </div>
      <p>{technologyContent.text}</p>
    </section>
  )
}

function ServicesPage() {
  const { services, loading, error } = useServices()

  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Un cuidado para cada etapa."
        text={servicesIntro}
        image={heroServicios}
      />
      <section className="section-wrap services-page-grid" aria-label="Servicios" aria-busy={loading}>
        {loading || error || services.length === 0 ? (
          <p className="services-state" role={error ? 'alert' : 'status'}>
            {loading ? 'Cargando servicios…' : error || 'Aún no hay servicios publicados.'}
          </p>
        ) : services.map((service) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </section>
      <TechnologySection />
      <CtaSection />
    </>
  )
}

function ShopPage({ catalogRef, embeddedCommerce }) {
  const storeId = CURRENT_STORE_ID

  return (
    <>
      <PageHero
        eyebrow="Tienda"
        title="Cuídalo también en casa."
        text="Elige productos para tu mascota, arma tu carrito y continúa por WhatsApp. Confirma con el equipo la disponibilidad y los detalles de tu compra."
        image={heroTienda}
      />
      <section className="section-wrap kafka-commerce-section" ref={catalogRef}>
        {!isSupabaseConfigured || !storeId ? (
          <div className="catalog-state" role="alert">
            <span>
              <PackageOpen size={28} />
            </span>
            <h3>Conversemos sobre lo que necesitas.</h3>
            <p>El catálogo no está disponible en este momento. Escríbenos por WhatsApp para consultar por nuestros productos.</p>
          </div>
        ) : (
          <CommerceStore
            navigationMode={embeddedCommerce ? 'embedded' : 'standalone'}
            checkout={{
              type: 'whatsapp',
              phone: commerceWhatsappPhone,
            }}
            description="Encuentra lo que necesita, agrégalo al carrito y consulta tu pedido por WhatsApp."
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
        title="El cariño también se demuestra cuidando."
        text="Hay mascotas que nos reciben en la puerta, nos acompañan en silencio y nos cambian el día. En Veterinaria Cueva creemos que ese vínculo merece atención, respeto y cariño."
        image={heroNosotros}
      />
      <section className="about-section about-story" aria-labelledby="about-story-title">
        <div className="about-story-visual">
          <div className="staff-photo-wrap">
            <img
              src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=900&q=80"
              alt="Un cachorro disfruta de un paseo al aire libre"
              loading="lazy"
              width="900"
              height="1050"
            />
          </div>
          <div className="about-photo-note">
            <PawPrint size={26} aria-hidden="true" />
            <p>Para ti es parte de la familia.<br /><strong>Para nosotros, su bienestar importa.</strong></p>
          </div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">Nuestro compromiso</p>
          <h2 id="about-story-title">Detrás de cada huellita, hay una historia contigo.</h2>
          <p>
            Tú conoces sus costumbres, sus juegos favoritos y esa mirada que lo dice
            todo. Por eso, cuando algo te preocupa, tu voz también forma parte de su cuidado.
          </p>
          <p>
            En Veterinaria Cueva queremos que encuentres un espacio para hablar de
            tu mascota, resolver tus dudas y dar el siguiente paso en su bienestar.
            Con respeto por ella y cercanía contigo.
          </p>
          <NavLink className="about-text-link" to="/servicios">
            Conoce cómo podemos acompañarte <ArrowRight size={19} aria-hidden="true" />
          </NavLink>
          <div className="about-location-tag">
            <MapPin size={18} aria-hidden="true" />
            Desde San Miguel, cerca de tu familia.
          </div>
        </div>
      </section>

      <section className="about-values" aria-labelledby="about-values-title">
        <div className="about-inner">
          <div className="about-values-heading">
            <div>
              <p className="eyebrow">Lo que nos mueve</p>
              <h2 id="about-values-title">El cuidado está en<br />los pequeños detalles.</h2>
            </div>
            <p>Más que palabras, son los principios que queremos tener presentes en cada encuentro contigo y tu mascota.</p>
          </div>
          <div className="about-values-grid">
            {[
              { icon: MessageCircle, title: 'Escuchar primero', text: 'Lo que notas en casa importa. Queremos conocer tus inquietudes y lo que hace única a tu mascota.' },
              { icon: PawPrint, title: 'Respetar su mundo', text: 'Cada mascota tiene su carácter y su manera de relacionarse. Creemos en un trato atento a esas diferencias.' },
              { icon: HeartPulse, title: 'Hablar con cercanía', text: 'Preguntar también es cuidar. Buscamos que te sientas con confianza para conversar sobre su bienestar.' },
              { icon: ShieldCheck, title: 'Cuidar con responsabilidad', text: 'La atención y los cuidados del día a día se complementan. Queremos acompañarte a tomar decisiones para tu mascota.' },
            ].map(({ icon: Icon, title, text }) => (
              <article className="about-value-card" key={title}>
                <span className="about-value-icon"><Icon size={25} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MedicalTeam />

      <section className="about-first-visit about-inner" aria-labelledby="about-visit-title">
        <div className="about-visit-copy">
          <p className="eyebrow">¿Aún no nos conocemos?</p>
          <h2 id="about-visit-title">Empecemos por<br />un «hola».</h2>
          <p>No necesitas tener todas las respuestas antes de escribirnos. Cuéntanos qué necesita tu mascota y consulta cómo coordinar su atención.</p>
          <ol className="about-visit-steps">
            <li>
              <span aria-hidden="true">01</span>
              <div><h3>Cuéntanos sobre tu mascota</h3><p>Escríbenos por WhatsApp con tu consulta o el servicio que te interesa.</p></div>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <div><h3>Coordina antes de venir</h3><p>Consulta la disponibilidad y qué información conviene traer para su atención.</p></div>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <div><h3>Ven con tus preguntas</h3><p>Sus hábitos, los cambios que has notado y tus dudas son un buen punto de partida.</p></div>
            </li>
          </ol>
        </div>
        <aside className="about-visit-card" aria-label="Visita Veterinaria Cueva">
          <span className="about-visit-symbol"><PawPrint size={38} aria-hidden="true" /></span>
          <p className="eyebrow">Tu próxima visita</p>
          <h3>Te esperamos<br />en San Miguel.</h3>
          <dl>
            <div><dt><MapPin size={18} aria-hidden="true" />Dónde estamos</dt><dd>{business.address}</dd></div>
            <div><dt><Clock size={18} aria-hidden="true" />Nuestro horario</dt><dd>{business.hours}</dd></div>
          </dl>
          <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} /> Conversemos por WhatsApp
          </a>
          <a className="about-visit-map" href={business.mapsUrl} target="_blank" rel="noreferrer">
            Ver cómo llegar <ArrowRight size={18} aria-hidden="true" />
          </a>
        </aside>
      </section>
      <TestimonialsSection />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu mascota."
        text="Cuéntanos qué necesita y coordinemos el siguiente paso para su cuidado. Te esperamos en San Miguel, Lima."
        image="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1800&q=82"
      />
      <section className="contact-section contact-visit" aria-label="Visita Veterinaria Cueva">
        <div className="contact-info">
          <SectionHeading
            eyebrow="Planea tu visita"
            title="Nos vemos en San Miguel."
            text="Una consulta, una duda o su próxima visita. Escríbenos y coordinemos el cuidado de tu mascota."
          />
          <div className="contact-actions">
            <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} />
              Escribir por WhatsApp
            </a>
            <a className="secondary-button contact-directions" href={business.mapsUrl} target="_blank" rel="noreferrer">
              <MapPin size={18} />
              Cómo llegar
            </a>
          </div>
          <a className="contact-phone" href={`tel:+${business.phone}`}>
            <Phone size={15} />
            {phoneDisplay}
          </a>
          <dl className="contact-details">
            <div>
              <dt><MapPin size={17} />Dirección</dt>
              <dd>{business.address}</dd>
            </div>
            <div>
              <dt><Clock size={17} />Horario de atención</dt>
              <dd>{businessHours}</dd>
            </div>
          </dl>
          <div className="contact-socials">
            <span>También estamos en</span>
            <SocialLinks />
          </div>
        </div>
        <div className="map-card" aria-label="Mapa de ubicación">
          <iframe
            title="Ubicación de Veterinaria Cueva en San Miguel, Lima"
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
        <p>© {year} Veterinaria Cueva. Cerca de ti y de tu mascota, en San Miguel.</p>
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
  const { pathname } = useLocation()
  const isContactPage = pathname.replace(/\/+$/, '') === '/contacto'
  const [contactCtaVisible, setContactCtaVisible] = useState(false)

  useEffect(() => {
    if (!isContactPage) return
    const cta = document.querySelector('.contact-actions .primary-button')
    if (!cta) return
    const observer = new IntersectionObserver(([entry]) => setContactCtaVisible(entry.isIntersecting))
    observer.observe(cta)
    return () => observer.disconnect()
  }, [isContactPage])

  return (
    <a
      className={`floating-whatsapp${isContactPage && contactCtaVisible ? ' floating-whatsapp--contact-cta-visible' : ''}`}
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Hablar con Veterinaria Cueva por WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} />
    </a>
  )
}

export default App
