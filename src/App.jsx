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
  Mail,
  MapPin,
  Menu,
  Microscope,
  Minus,
  PackageOpen,
  Phone,
  Plus,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Trash2,
  X,
} from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import logo from './assets/img/brand/logo-main.png'
import staffDoctor from './assets/img/staff/EnricoCustodio.png'
import banoMascota from './assets/img/services/banoMascota.jpg'
import grooming from './assets/img/services/grooming.jpg'
import petShop from './assets/img/services/petShop.jpg'
import microchip from './assets/img/services/microchip.jpg'
import ecografia2 from './assets/img/services/ecografia2.jpg'
import { getPublicProducts } from './services/products'
import { isSupabaseConfigured, supabase } from './lib/supabase'
import './App.css'

const whatsappNumber = '51999976216'
const commerceWhatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE || whatsappNumber
const phoneDisplay = '+51 999976216'
const businessHours = 'Lun-Sáb 9:00 AM - 8:00 PM'
const whatsappMessage = "Hola Enro's Vet, quisiera agendar una atención para mi mascota."
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/veterinariaenrosvet',
    icon: faFacebookF,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/enrosvet.chilca/?hl=es',
    icon: faInstagram,
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@enros_vet',
    icon: faTiktok,
  },
]

const heroSlides = [
  {
    title: 'Cirugía general con seguridad anestésica',
    service: 'Cirugía general',
    eyebrow: 'Procedimientos seguros',
    text: 'Procedimientos quirúrgicos con tecnología, manejo del dolor y monitoreo para una recuperación más confortable.',
    image:
      'https://images.pexels.com/photos/4587991/pexels-photo-4587991.jpeg?auto=compress&cs=tinysrgb&w=1900',
  },
  {
    title: 'Peluquería y estética canina profesional',
    service: 'Peluquería canina',
    eyebrow: 'Estética e higiene',
    text: 'Baño, corte, higiene, limpieza de oídos y corte de uñas según raza, pelaje y necesidades de cada mascota.',
    image:
      'https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=1900',
  },
  {
    title: 'Rayos X Digital para diagnósticos precisos',
    service: 'Rayos X Digital',
    eyebrow: 'Diagnóstico por imagen',
    text: 'Imágenes de alta definición en pocos segundos para orientar diagnósticos y tratamientos oportunos.',
    image:
      'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=1900',
  },
]

const servicesIntro =
  'En Enros Vet somos una clínica veterinaria especializada exclusivamente en la atención de perros y gatos. Combinamos experiencia médica, tecnología de última generación y un trato cálido para brindar una atención integral en cada etapa de la vida de tu mascota.'

const technologyContent = {
  title: 'Tecnología que marca la diferencia',
  text: 'En Enros Vet creemos que un diagnóstico preciso comienza con la mejor tecnología. Por ello contamos con ecografía veterinaria de alta resolución, radiografía digital, laboratorio clínico automatizado y anestesia inhalatoria con ventilador mecánico, herramientas que nos permiten brindar diagnósticos más rápidos, tratamientos más seguros y una atención médica de excelencia para perros y gatos.',
}

const services = [
  {
    title: 'Consulta general',
    icon: Stethoscope,
    image:
      'https://images.pexels.com/photos/7469214/pexels-photo-7469214.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Realizamos una evaluación médica completa para prevenir, diagnosticar y tratar las enfermedades más frecuentes, ofreciendo un plan de salud personalizado para cada paciente.',
  },
  {
    title: 'Consulta especializada',
    icon: HeartPulse,
    image:
      'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=900&q=80',
    text: 'Atendemos casos de mayor complejidad en áreas como cardiología, dermatología, fisioterapia y rehabilitación veterinaria, desarrollando tratamientos personalizados. Además, contamos con ozonoterapia veterinaria, una terapia complementaria que favorece la cicatrización, disminuye la inflamación, alivia el dolor y acelera la recuperación.',
  },
  {
    title: 'Vacunas',
    icon: Syringe,
    image:
      'https://images.pexels.com/photos/1350591/pexels-photo-1350591.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Planes de vacunación completos para proteger a tu mascota frente a las principales enfermedades infecciosas durante todas las etapas de su vida.',
  },
  {
    title: 'Tratamientos',
    icon: ShieldCheck,
    image:
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=900&q=80',
    text: 'Diseñamos tratamientos médicos individualizados con seguimiento permanente para lograr una recuperación rápida, segura y efectiva.',
  },
  {
    title: 'Hospitalización',
    icon: Activity,
    image:
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80',
    text: 'Disponemos de cuatro áreas de hospitalización independientes, permitiendo una atención más segura y especializada. Cada paciente permanece bajo monitoreo constante y protocolos de bioseguridad que garantizan un manejo adecuado durante su recuperación.',
    bullets: [
      'Hospitalización para pacientes caninos.',
      'Hospitalización exclusiva para pacientes felinos.',
      'Área para pacientes con enfermedades infecciosas.',
      'Área de recuperación y cuidados postquirúrgicos.',
    ],
  },
  {
    title: 'Laboratorio clínico',
    icon: Microscope,
    image:
      'https://images.pexels.com/photos/5731866/pexels-photo-5731866.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Contamos con un laboratorio automatizado de última generación, capaz de realizar hemogramas, perfiles bioquímicos y diversas pruebas diagnósticas con resultados rápidos y altamente confiables, permitiendo tomar decisiones médicas oportunas.',
  },
  {
    title: 'Cirugía general',
    icon: Scissors,
    image:
      'https://images.pexels.com/photos/4587991/pexels-photo-4587991.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Realizamos procedimientos quirúrgicos con altos estándares de seguridad. Disponemos de anestesia inhalatoria con ventilador mecánico para una ventilación controlada y mayor seguridad anestésica, especialmente en pacientes de alto riesgo. Aplicamos modernas estrategias anestésicas y manejo del dolor para priorizar el bienestar y una recuperación confortable.',
  },
  {
    title: 'Traumatología',
    icon: Activity,
    image:
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80',
    text: 'Diagnóstico y tratamiento de fracturas, lesiones articulares y enfermedades del sistema musculoesquelético, buscando recuperar la movilidad y mejorar la calidad de vida de cada paciente.',
  },
  {
    title: 'Ecografía',
    icon: Microscope,
    image: ecografia2,
    text: 'Realizamos estudios ecográficos con equipos de alta resolución que permiten evaluar órganos internos, gestaciones y diversas enfermedades de manera rápida, precisa y no invasiva.',
  },
  {
    title: 'Rayos X Digital',
    icon: Activity,
    image:
      'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Nuestra radiografía digital de alta definición proporciona imágenes de excelente calidad en pocos segundos, facilitando diagnósticos precisos y un tratamiento oportuno.',
  },
  {
    title: 'Implantación de Microchip',
    icon: Sparkles,
    image: microchip,
    text: 'Sistema de identificación permanente y seguro que incrementa las posibilidades de recuperar a una mascota en caso de pérdida.',
  },
  {
    title: 'Pet shop',
    icon: Sparkles,
    image: petShop,
    text: 'Encontrarás una amplia variedad de alimentos premium, dietas terapéuticas, accesorios, juguetes y productos de las mejores marcas para el cuidado integral de tu mascota.',
  },
  {
    title: 'Peluquería y estética canina',
    icon: Bath,
    image: grooming,
    text: 'Servicio profesional de baño, corte, higiene, limpieza de oídos y corte de uñas, adaptado a las características de cada raza y tipo de pelaje.',
  },
  {
    title: 'Baños medicados',
    icon: ShieldCheck,
    image: banoMascota,
    text: 'Tratamientos dermatológicos con productos especializados para el control de alergias, dermatitis, infecciones y otras enfermedades de la piel, siempre bajo supervisión veterinaria.',
  },
  {
    title: 'Farmacia veterinaria',
    icon: HeartPulse,
    image:
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
    text: 'Disponemos de medicamentos veterinarios, suplementos nutricionales y productos especializados, ofreciendo asesoría profesional para garantizar tratamientos seguros y eficaces.',
  },
]

const testimonials = [
  {
    name: 'María Fernanda',
    pet: 'Mamá de Nala',
    text: 'Siempre nos explican cada paso con paciencia. Salimos tranquilos porque sentimos que Nala está en buenas manos.',
    image:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Luis Enrique',
    pet: 'Papá de Milo',
    text: 'Mi gatito se recuperó muy bien. Me gustó la atención cercana y el seguimiento después de la consulta.',
    image:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=500&q=80',
  },
  {
    name: 'Rosa Valverde',
    pet: 'Mamá de Bruno',
    text: 'Reservamos por WhatsApp y todo fue rápido. El equipo trató a Bruno con mucho cariño.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
  },
]

const faqs = [
  {
    question: '¿Cada cuánto debo llevar mi mascota al veterinario?',
    answer:
      'Al menos una vez al año, aunque parezca sana. Cachorros, adultos mayores o mascotas con enfermedades necesitan controles más frecuentes.',
  },
  {
    question: '¿Necesita vacunas si no sale de casa?',
    answer:
      'Sí. Los virus y bacterias pueden ingresar mediante la ropa, los zapatos o el contacto con otros animales.',
  },
  {
    question: '¿Cuándo debes llevarlo de inmediato?',
    answer: 'Acude a una veterinaria si presenta:',
    items: [
      'Dificultad para respirar',
      'Convulsiones',
      'Sangrado abundante',
      'No puede levantarse',
      'Ingerió un objeto o sustancia tóxica.',
    ],
  },
]

const doctors = [
  {
    name: 'Dr. Carlos Enrico',
    role: 'Médico veterinario',
    focus: 'Medicina interna y cirugías',
    text: 'Acompaña cada caso con una mirada integral, explicando el diagnóstico y el plan de atención con claridad.',
    image: staffDoctor,
  },
  {
    name: 'Dra. Andrea Salazar',
    role: 'Médica veterinaria',
    focus: 'Consulta general y prevención',
    text: 'Enfocada en controles, vacunación y seguimiento preventivo para perros y gatos en cada etapa.',
    image:
      'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Dr. Diego Torres',
    role: 'Médico veterinario',
    focus: 'Diagnóstico por imagen',
    text: 'Apoya la evaluación clínica con estudios de imagen y lectura cuidadosa para tomar decisiones oportunas.',
    image:
      'https://images.pexels.com/photos/6235233/pexels-photo-6235233.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    name: 'Tec. Valeria Ríos',
    role: 'Estética y bienestar',
    focus: 'Baño, cortes y cuidado de pelaje',
    text: 'Cuida la experiencia de mascotas que necesitan higiene, estética y un trato paciente durante su visita.',
    image:
      'https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    name: 'Dr. Mateo Rivera',
    role: 'Médico veterinario',
    focus: 'Traumatología y recuperación',
    text: 'Evalúa lesiones, movilidad y dolor para proponer un tratamiento claro y seguimiento progresivo.',
    image:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Dra. Camila Núñez',
    role: 'Médica veterinaria',
    focus: 'Dermatología y medicina preventiva',
    text: 'Atiende problemas de piel, alergias y controles preventivos con orientación práctica para casa.',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
  },
]

const stats = [
  ['15+', 'años de experiencia'],
  ['8', 'servicios clave'],
  ['1', 'familia veterinaria'],
]

const currencyFormatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
})

const kafkaCommerceTheme = {
  primary: '#f00000',
  primaryText: '#ffffff',
  background: '#ffffff',
  surface: '#fbfaf8',
  text: '#171717',
  mutedText: '#6c6c6c',
  border: '#ece7df',
  radius: '8px',
  fontFamily: 'inherit',
}

function App() {
  const [cartItems, setCartItems] = useState({})
  const [cartOpen, setCartOpen] = useState(false)

  const cartSummary = useMemo(() => {
    const items = Object.values(cartItems)
    const itemCount = items.reduce((total, item) => total + item.quantity, 0)
    const subtotal = items.reduce(
      (total, item) => total + Number(item.product.price || 0) * item.quantity,
      0,
    )

    return { items, itemCount, subtotal }
  }, [cartItems])

  const addToCart = (product) => {
    if (!product.available) return

    setCartItems((current) => {
      const existing = current[product.id]

      return {
        ...current,
        [product.id]: {
          product,
          quantity: existing ? existing.quantity + 1 : 1,
        },
      }
    })
  }

  const reduceCartItem = (productId) => {
    setCartItems((current) => {
      const existing = current[productId]
      if (!existing) return current

      if (existing.quantity === 1) {
        const next = { ...current }
        delete next[productId]
        return next
      }

      return {
        ...current,
        [productId]: {
          ...existing,
          quantity: existing.quantity - 1,
        },
      }
    })
  }

  const removeCartItem = (productId) => {
    setCartItems((current) => {
      const next = { ...current }
      delete next[productId]
      return next
    })
  }

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header cartCount={cartSummary.itemCount} onCartOpen={() => setCartOpen(true)} />
      <main>
        <PageTransition>
          <Routes>
            <Route
              path="/"
              element={<Home cartItems={cartItems} onAddToCart={addToCart} />}
            />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route
              path="/tienda"
              element={<ShopPage cartItems={cartItems} onAddToCart={addToCart} />}
            />
            <Route path="/tiendas-prueba" element={<TiendasPruebaPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/contacto" element={<ContactPage />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <CartSummary
        cartSummary={cartSummary}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onAdd={addToCart}
        onReduce={reduceCartItem}
        onRemove={removeCartItem}
      />
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

function Header({ cartCount, onCartOpen }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="site-header">
      <NavLink className="brand-link" to="/" aria-label="Ir al inicio">
        <img src={logo} alt="Enro's Vet Veterinaria" />
      </NavLink>

      <div className="header-actions">
        <button
          className="header-cart-button"
          type="button"
          aria-label={`Abrir carrito con ${cartCount} productos`}
          onClick={onCartOpen}
        >
          <ShoppingBag size={21} />
          {cartCount > 0 ? <span>{cartCount}</span> : null}
        </button>

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
        <NavLink to="/tiendas-prueba">Prueba</NavLink>
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

function Home({ cartItems, onAddToCart }) {
  return (
    <>
      <HeroCarousel />
      <FeaturedServices />
      <ProductCatalog cartItems={cartItems} onAddToCart={onAddToCart} />
      <TrustBand />
      <FaqSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  )
}

function ProductCatalog({ cartItems = {}, onAddToCart, showAction = true }) {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadProducts() {
      try {
        setStatus('loading')
        const publicProducts = await getPublicProducts()

        if (!ignore) {
          setProducts(publicProducts)
          setStatus('success')
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message)
          setStatus('error')
        }
      }
    }

    loadProducts()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="section-wrap shop-section" id="tienda">
      <div className="shop-heading">
        <SectionHeading
          eyebrow="Tienda veterinaria"
          title="Productos para cuidar a tu engreído en casa"
          text="Alimentos, accesorios y productos de cuidado recomendados para acompañar la salud de perros y gatos."
        />
        {showAction ? (
          <NavLink className="secondary-button" to="/tienda">
            Ver tienda
          </NavLink>
        ) : null}
      </div>

      {status === 'loading' ? <CatalogState type="loading" /> : null}
      {status === 'error' ? <CatalogState type="error" message={errorMessage} /> : null}
      {status === 'success' && products.length === 0 ? <CatalogState type="empty" /> : null}
      {status === 'success' && products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              product={product}
              quantity={cartItems[product.id]?.quantity || 0}
              onAdd={onAddToCart}
              key={product.id}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}

function ProductCard({ product, quantity, onAdd }) {
  return (
    <article className={product.available ? 'product-card' : 'product-card is-sold-out'}>
      <div className={product.imageUrl ? 'product-media has-image' : 'product-media'}>
        {product.imageUrl ? (
          <img className="product-backdrop" src={product.imageUrl} alt="" aria-hidden="true" />
        ) : null}
        <div className="product-image-frame">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} loading="lazy" />
          ) : (
            <span>
              <ShoppingBag size={34} />
            </span>
          )}
        </div>
        <strong className={product.available ? 'promo-badge' : 'promo-badge is-muted'}>
          {product.available ? '20% dcto' : 'Agotado'}
        </strong>
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p>{product.description || 'Producto veterinario disponible en tienda.'}</p>
        <div className="product-meta">
          <strong>{currencyFormatter.format(Number(product.price || 0))}</strong>
          <span>En tienda</span>
        </div>
        <button
          className="cart-add-button"
          type="button"
          disabled={!product.available}
          onClick={() => onAdd(product)}
        >
          <ShoppingBag size={18} />
          {product.available ? (quantity > 0 ? `Agregar otro (${quantity})` : 'Agregar al carrito') : 'Agotado'}
        </button>
      </div>
    </article>
  )
}

function CartSummary({ cartSummary, isOpen, onClose, onAdd, onReduce, onRemove }) {
  const { items, itemCount, subtotal } = cartSummary
  if (!isOpen) return null

  return (
    <div className="cart-drawer is-open">
      <button className="cart-drawer-backdrop" type="button" aria-label="Cerrar carrito" onClick={onClose} />
      <aside className="cart-panel" aria-label="Carrito simulado">
        <div className="cart-panel-heading">
          <span>
            <ShoppingBag size={22} />
          </span>
          <div>
            <strong>Carrito</strong>
            <p>{itemCount === 1 ? '1 producto agregado' : `${itemCount} productos agregados`}</p>
          </div>
          <button className="cart-close-button" type="button" aria-label="Cerrar carrito" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <PackageOpen size={30} />
            <p>Agrega productos para simular tu pedido.</p>
          </div>
        ) : (
          <div className="cart-items">
            {items.map(({ product, quantity }) => (
              <div className="cart-item" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <span>{currencyFormatter.format(Number(product.price || 0))}</span>
                </div>
                <div className="cart-item-actions">
                  <button type="button" aria-label={`Quitar una unidad de ${product.name}`} onClick={() => onReduce(product.id)}>
                    <Minus size={15} />
                  </button>
                  <span>{quantity}</span>
                  <button type="button" aria-label={`Agregar una unidad de ${product.name}`} onClick={() => onAdd(product)}>
                    <Plus size={15} />
                  </button>
                  <button type="button" aria-label={`Retirar ${product.name}`} onClick={() => onRemove(product.id)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-total">
          <span>Total estimado</span>
          <strong>{currencyFormatter.format(subtotal)}</strong>
        </div>
        <button className="cart-continue-button" type="button">
          Continuar
        </button>
        <p className="cart-note">Simulación visual. Este botón no procesa compras ni envía pedidos.</p>
      </aside>
    </div>
  )
}

function CatalogState({ type, message }) {
  const stateContent = {
    loading: {
      icon: ShoppingBag,
      title: 'Cargando productos',
      text: 'Estamos consultando el catálogo público de Supabase.',
    },
    error: {
      icon: PackageOpen,
      title: 'No pudimos cargar la tienda',
      text: message || 'Revisa las variables de entorno y las policies públicas de Supabase.',
    },
    empty: {
      icon: PackageOpen,
      title: 'Aún no hay productos visibles',
      text: 'Cuando existan productos activos para esta tienda, aparecerán aquí automáticamente.',
    },
  }
  const content = stateContent[type]
  const Icon = content.icon

  return (
    <div className="catalog-state" role={type === 'error' ? 'alert' : 'status'}>
      <span>
        <Icon size={28} />
      </span>
      <h3>{content.title}</h3>
      <p>{content.text}</p>
    </div>
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
          <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} />
            Agenda por WhatsApp
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
        <p className="eyebrow">Enro's Vet Chilca</p>
        <h2>15 años cuidando a tu mascota como parte de la familia.</h2>
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
  return (
    <section className="section-wrap testimonials-block">
      <SectionHeading
        eyebrow="Testimonios"
        title="Confianza que se nota en cada visita"
        text="Mensajes de referencia para estructurar la sección. Más adelante podemos reemplazarlos por reseñas reales del cliente."
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
        title="Guía rápida para cuidar a tu mascota"
        text="Respuestas simples para saber cuándo prevenir, vacunar o acudir de inmediato a una veterinaria."
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
          title="Doctores que atienden con experiencia y cercanía"
          text="Esta sección queda preparada para reemplazar fotos, nombres y especialidades cuando el cliente confirme la información final."
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

function DoctorsCarouselAlternative() {
  const [page, setPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth <= 580) return 1
    if (window.innerWidth <= 1080) return 2
    return 3
  })
  const pages = Math.ceil(doctors.length / itemsPerPage)

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 580) {
        setItemsPerPage(1)
      } else if (window.innerWidth <= 1080) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  useEffect(() => {
    setPage((value) => Math.min(value, pages - 1))
  }, [pages])

  const goToPage = (direction) => {
    setPage((value) => {
      const next = value + direction
      if (next < 0) return pages - 1
      return next % pages
    })
  }

  return (
    <section className="team-rail-section">
      <div className="team-rail-heading">
        <div>
          <p className="eyebrow">Equipo veterinario</p>
          <h2>Nuestro Staff</h2>
        </div>
      </div>
      <div className="team-rail-viewport" aria-label="Carrusel de staff">
        <div className="team-rail-controls" aria-label="Cambiar grupo de staff">
          <button type="button" aria-label="Staff anterior" onClick={() => goToPage(-1)}>
            <ArrowLeft size={20} />
          </button>
          <button type="button" aria-label="Staff siguiente" onClick={() => goToPage(1)}>
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="team-rail-track" style={{ transform: `translateX(-${page * 100}%)` }}>
          {Array.from({ length: pages }).map((_, pageIndex) => (
            <div className="team-rail-page" key={pageIndex}>
              {doctors
                .slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage)
                .map((doctor) => (
                  <article className="team-rail-card" key={doctor.name}>
                    <img src={doctor.image} alt={doctor.name} />
                    <div>
                      <span>{doctor.role}</span>
                      <h3>{doctor.name}</h3>
                      <p>{doctor.focus}</p>
                    </div>
                  </article>
                ))}
            </div>
          ))}
        </div>
      </div>
      <div className="team-rail-dots" aria-label="Páginas de staff">
        {Array.from({ length: pages }).map((_, index) => (
          <button
            className={index === page ? 'is-active' : ''}
            type="button"
            aria-label={`Ver staff ${index + 1}`}
            key={index}
            onClick={() => setPage(index)}
          />
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
        <h2>Cuéntanos qué necesita tu mascota y coordinamos la mejor hora.</h2>
      </div>
      <a className="primary-button" href={whatsappUrl} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} />
        Escribir por WhatsApp
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

function ShopPage({ cartItems, onAddToCart }) {
  return (
    <>
      <PageHero
        eyebrow="Tienda"
        title="Catálogo Enro's Vet"
        text="Productos activos de la veterinaria, leídos de forma pública desde Supabase con permisos de solo lectura."
        image="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1800&q=82"
      />
      <ProductCatalog cartItems={cartItems} onAddToCart={onAddToCart} showAction={false} />
      <CtaSection />
    </>
  )
}

function TiendasPruebaPage() {
  const storeId = import.meta.env.VITE_STORE_ID

  return (
    <>
      <PageHero
        eyebrow="Kafka Commerce"
        title="Tiendas prueba"
        text="Ruta aislada para validar la tienda completa de Kafka Commerce leyendo productos activos desde Supabase."
        image="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1800&q=82"
      />
      <section className="section-wrap kafka-commerce-section">
        {!isSupabaseConfigured || !storeId ? (
          <div className="catalog-state" role="alert">
            <span>
              <PackageOpen size={28} />
            </span>
            <h3>Falta configuración</h3>
            <p>Define VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY y VITE_STORE_ID para cargar esta prueba.</p>
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
            title="Tienda"
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
        title="Una veterinaria cercana para las familias de Chilca"
        text="En Enro's Vet cuidamos mascotas con experiencia, trato humano y orientación clara para cada familia."
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
          <p className="eyebrow">Nuestra historia</p>
          <h2>Más que una veterinaria, un espacio de confianza.</h2>
          <p>
            Acompañamos a cada mascota con atención médica, prevención,
            diagnóstico y seguimiento. Creemos en explicar con claridad, tratar
            con paciencia y cuidar el vínculo que cada familia tiene con su
            engreído.
          </p>
          <div className="value-list">
            <span>
              <ShieldCheck size={18} />
              Atención responsable
            </span>
            <span>
              <Sparkles size={18} />
              Trato cercano
            </span>
            <span>
              <CalendarCheck size={18} />
              Seguimiento del caso
            </span>
          </div>
        </div>
      </section>
      <DoctorsCarousel />
      <DoctorsCarouselAlternative />
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
        title="Estamos listos para atender a tu mascota"
        text="Escríbenos por WhatsApp, visítanos en Chilca o revisa nuestra ubicación en el mapa."
        image="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1800&q=82"
      />
      <section className="contact-section">
        <div className="contact-info">
          <SectionHeading
            eyebrow="Datos de atención"
            title="Av. Salaverry 277 - Chilca"
            text={`Agenda por WhatsApp o visítanos en nuestro horario de atención: ${businessHours}.`}
          />
          <div className="contact-list">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <Phone size={18} />
              {phoneDisplay}
            </a>
            <a href="mailto:contacto@enrosvet.com">
              <Mail size={18} />
              contacto@enrosvet.com
            </a>
            <span>
              <Clock size={18} />
              Horario de atención: {businessHours}
            </span>
            <span>
              <MapPin size={18} />
              Chilca, Cañete
            </span>
          </div>
          <SocialLinks />
        </div>
        <div className="map-card" aria-label="Mapa de ubicación">
          <iframe
            title="Ubicación referencial Enro's Vet"
            src="https://www.google.com/maps?q=Av.%20Salaverry%20277%20Chilca%20Ca%C3%B1ete%20Peru&output=embed"
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
          {services.map((service) => (
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
        <img src={logo} alt="Enro's Vet Veterinaria" />
        <p>© {year} Enro's Vet Veterinaria. Cuidando mascotas en Chilca.</p>
      </div>
      <div className="footer-hours">
        <strong>Horario de atención</strong>
        <span>{businessHours}</span>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          {phoneDisplay}
        </a>
      </div>
      <div className="footer-links">
        <nav>
          <NavLink to="/servicios">Servicios</NavLink>
          <NavLink to="/tienda">Tienda</NavLink>
          <NavLink to="/tiendas-prueba">Prueba</NavLink>
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
      aria-label="Escribir por WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} />
    </a>
  )
}

export default App
