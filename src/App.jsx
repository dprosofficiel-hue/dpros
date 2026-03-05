import React, { useEffect, useRef, useState } from 'react'
import Quiz from './Quiz.jsx'
import AboutPage from './AboutPage.jsx'
import PricingPage from './PricingPage.jsx'
import { useLanguage } from './i18n/LanguageContext.jsx'

/* ─── tiny hook: reveal on scroll ─────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Check if already in viewport on mount
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── SVG Icons ─────────────────────────────────────────────────────── */
const icons = {
  deals: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  closing: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z"/>
    </svg>
  ),
  alert: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  speed: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  dataEntry: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  barChart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  consultation: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  location: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  menu: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue-700)" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  close: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--blue-700)" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  globe: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
}

/* ─── Scroll-linked water fill hook ──────────────────────────────────── */
function useScrollFill(offset = 0) {
  const ref = useRef(null)
  const [fill, setFill] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        // Start filling when card top hits bottom of viewport
        // Fully filled when card top reaches ~40% from top
        const start = vh
        const end = vh * 0.35
        const raw = (start - rect.top) / (start - end)
        setFill(Math.max(0, Math.min(1, raw)))
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return [ref, fill]
}

/* ─── Water wave SVG ──────────────────────────────────────────────────── */
const WaveSVG = () => (
  <svg viewBox="0 0 1200 20" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
    <path
      d="M0 14 C150 4, 300 20, 450 10 C600 0, 750 18, 900 8 C1050 -2, 1150 16, 1200 6 L1200 20 L0 20Z"
      fill="rgba(219,234,254,0.35)"
    />
  </svg>
)

/* ─── Feature card with scroll-linked water fill ─────────────────────── */
function FeatureCard({ icon, title, desc, delay = 0 }) {
  const [scrollRef, fill] = useScrollFill()
  const [hovered, setHovered] = useState(false)
  const showBubbles = fill > 0.05
  const pct = fill * 100

  return (
    <div
      ref={scrollRef}
      style={{
        background: 'var(--white)',
        border: `1px solid ${hovered ? 'var(--blue-200)' : 'var(--gray-100)'}`,
        borderRadius: 16, padding: '2.25rem',
        boxShadow: hovered ? '0 8px 32px rgba(37,99,235,0.08)' : '0 2px 8px rgba(0,0,0,0.03)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color .25s, box-shadow .25s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Water fill — follows scroll */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: `${pct}%`,
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'height 0.08s linear',
      }}>
        {/* Wave at top edge */}
        <div className="feature-card-wave"
          style={{ position: 'absolute', top: -10, left: '-10%', width: '220%', height: 20 }}
        >
          <WaveSVG />
        </div>
        {/* Water body */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(219,234,254,0.3) 0%, rgba(191,219,254,0.4) 40%, rgba(147,197,253,0.22) 100%)',
        }} />
        {/* Surface shimmer */}
        <div className="feature-card-shimmer" />
        {/* Bubbles */}
        {showBubbles && (
          <>
            <div className="feature-card-bubble" style={{ width: 5, height: 5, left: '18%', bottom: '20%', animationDuration: '2.2s', animationDelay: '0s' }} />
            <div className="feature-card-bubble" style={{ width: 4, height: 4, left: '52%', bottom: '30%', animationDuration: '2.6s', animationDelay: '0.4s' }} />
            <div className="feature-card-bubble" style={{ width: 6, height: 6, left: '72%', bottom: '12%', animationDuration: '2s', animationDelay: '0.8s' }} />
            <div className="feature-card-bubble" style={{ width: 3, height: 3, left: '38%', bottom: '40%', animationDuration: '2.4s', animationDelay: '1.2s' }} />
          </>
        )}
      </div>

      {/* Content on top */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: fill > 0.5 ? 'rgba(219,234,254,0.6)' : 'var(--gray-100)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.5rem', color: 'var(--gray-500)',
          transition: 'background .4s ease',
        }}>{icon}</div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: '1.35rem',
          fontWeight: 500, color: 'var(--blue-900)', marginBottom: '0.6rem',
        }}>{title}</div>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: '0.9rem',
          color: 'var(--gray-600)', lineHeight: 1.7, fontWeight: 300,
        }}>{desc}</div>
      </div>
    </div>
  )
}

/* ─── Mobile Nav Drawer ──────────────────────────────────────────────── */
/* ─── TrustedBy ──────────────────────────────────────────────────────── */
const BRANDS = [
  {
    name: 'Djezzy',
    color: '#FF6B00',
    src: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Djezzy_Logo_2015.svg',
  },
  {
    name: 'Mobilis',
    color: '#00A651',
    src: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Mobilis_Logo.svg',
  },
  {
    name: 'Ooredoo',
    color: '#E2001A',
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Ooredoo_logo_2017.svg',
  },
  {
    name: 'WhatsApp',
    color: '#25D366',
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
  },
]

function HeroBrands() {
  const [activeIdx, setActiveIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActiveIdx(i => (i + 1) % BRANDS.length), 2000)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
      marginTop: '3rem', alignItems: 'center',
      animation: 'fadeUp .6s ease .4s both',
    }}>
      {BRANDS.map((b, i) => (
        <div key={b.name} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0.45rem 0.85rem', borderRadius: 10,
          border: `1.5px solid ${i === activeIdx ? b.color + '44' : 'var(--gray-200)'}`,
          background: i === activeIdx ? b.color + '0d' : 'var(--white)',
          transition: 'all .6s ease', cursor: 'default', flexShrink: 0,
        }}>
          <img src={b.src} alt={b.name} style={{
            height: 22, maxWidth: 72, objectFit: 'contain', display: 'block',
            filter: i === activeIdx ? 'none' : 'grayscale(100%) opacity(0.35)',
            transition: 'filter .6s ease',
          }} />
        </div>
      ))}
    </div>
  )
}

function BrandLogo({ name, color, src, compact = false }) {
  const [active, setActive] = useState(false)
  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive(true)}
      onTouchEnd={() => setTimeout(() => setActive(false), 800)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: compact ? '0.45rem 0.85rem' : '1rem 1.5rem',
        borderRadius: compact ? 10 : 14,
        border: `1.5px solid ${active ? color + '44' : 'var(--gray-200)'}`,
        background: active ? color + '0d' : 'var(--white)',
        transition: 'all .3s ease',
        cursor: 'default', flexShrink: 0,
      }}
    >
      <img
        src={src}
        alt={name}
        style={{
          height: compact ? 22 : 36,
          maxWidth: compact ? 72 : 110,
          objectFit: 'contain',
          filter: active ? 'none' : 'grayscale(100%) opacity(0.35)',
          transition: 'filter .3s ease',
          display: 'block',
        }}
      />
    </div>
  )
}

function TrustedBy() {
  const [ref, visible] = useReveal()
  return (
    <section style={{ padding: '3rem 6vw 3.5rem', borderBottom: '1px solid var(--gray-100)' }}>
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(16px)',
          transition: 'opacity .5s ease, transform .5s ease',
        }}
      >
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center', alignItems: 'center',
          gap: '1rem',
        }}>
          {BRANDS.map((b, i) => (
            <div
              key={b.name}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(12px)',
                transition: `opacity .45s ease ${i * 0.08}s, transform .45s ease ${i * 0.08}s`,
              }}
            >
              <BrandLogo {...b} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MobileDrawer({ open, onClose, onNavigate, currentPage }) {
  const { t, isRTL } = useLanguage()
  if (!open) return null
  const links = ['#features', '#process', '#contact']
  const labels = [t.nav.services, t.nav.process, t.nav.contact]
  const pageLinks = [
    { page: 'about', label: t.nav.about },
    { page: 'pricing', label: t.nav.pricing },
  ]

  const handleSectionClick = (href) => {
    if (currentPage !== 'home') {
      onNavigate('home')
      setTimeout(() => { window.location.hash = href }, 50)
    }
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(10,22,40,0.5)',
      backdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <div
        style={{
          position: 'absolute', top: 0,
          [isRTL ? 'left' : 'right']: 0,
          bottom: 0,
          width: '75vw', maxWidth: 280,
          background: 'var(--white)',
          padding: '5rem 2rem 2rem',
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
          boxShadow: isRTL ? '8px 0 32px rgba(0,0,0,0.12)' : '-8px 0 32px rgba(0,0,0,0.12)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {labels.map((label, i) => (
          <a
            key={label}
            href={links[i]}
            onClick={() => handleSectionClick(links[i])}
            style={{
              fontFamily: 'var(--font-display)', fontSize: '1.6rem',
              fontWeight: 400, color: 'var(--blue-900)',
              textDecoration: 'none', padding: '0.75rem 0',
              borderBottom: '1px solid var(--gray-100)',
            }}
          >{label}</a>
        ))}
        {pageLinks.map(({ page, label }) => (
          <a
            key={page}
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate(page); onClose() }}
            style={{
              fontFamily: 'var(--font-display)', fontSize: '1.6rem',
              fontWeight: 400, color: 'var(--blue-900)',
              textDecoration: 'none', padding: '0.75rem 0',
              borderBottom: '1px solid var(--gray-100)',
            }}
          >{label}</a>
        ))}
        <a
          href="https://wa.me/213562940733"
          style={{
            marginTop: '1.5rem',
            background: 'var(--blue-600)', color: '#fff',
            borderRadius: 10, padding: '0.85rem',
            fontFamily: 'var(--font-body)', fontWeight: 600,
            textDecoration: 'none', textAlign: 'center', fontSize: '0.95rem',
          }}
        >
          {t.nav.callNow}
        </a>
      </div>
    </div>
  )
}

/* ─── Main App ───────────────────────────────────────────────────────── */
export default function App() {
  const { t, isRTL, toggleLang } = useLanguage()
  const [featRef, featVisible] = useReveal()
  const [procRef, procVisible] = useReveal()
  const [ctaRef,  ctaVisible]  = useReveal()
  const [conRef,  conVisible]  = useReveal()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [quizOpen,   setQuizOpen]   = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [page, setPage] = useState('home')

  const navigateTo = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const tel = '213562940733'
    const msg = `${t.contact.whatsappMsg}\nNom: ${formData.name}\nTéléphone: ${formData.phone}\nMessage: ${formData.message}`
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onNavigate={navigateTo} currentPage={page} />

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.1rem 5vw',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #e5e7eb',
        direction: isRTL ? 'rtl' : 'ltr',
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home') }} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <img src="/logo.jpg" alt="Dpros" style={{ width: 34, height: 34, borderRadius: 8, objectFit: 'cover' }} />
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '1.4rem',
            fontWeight: 600, color: 'var(--blue-700)', letterSpacing: '-0.01em',
          }}>Dpros</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links" style={{ gap: '2rem', listStyle: 'none' }}>
          {[['#features', t.nav.services],['#process', t.nav.process]].map(([href, label]) => (
            <li key={href}>
              <a href={href} onClick={(e) => {
                if (page !== 'home') { e.preventDefault(); navigateTo('home'); setTimeout(() => { window.location.hash = href }, 50) }
              }} style={{
                fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                fontWeight: 500, color: 'var(--gray-600)', textDecoration: 'none',
              }}>{label}</a>
            </li>
          ))}
          {[['about', t.nav.about],['pricing', t.nav.pricing]].map(([pg, label]) => (
            <li key={pg}>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(pg) }} style={{
                fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                fontWeight: 500, color: page === pg ? 'var(--blue-600)' : 'var(--gray-600)',
                textDecoration: 'none',
              }}>{label}</a>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={(e) => {
              if (page !== 'home') { e.preventDefault(); navigateTo('home'); setTimeout(() => { window.location.hash = '#contact' }, 50) }
            }} style={{
              fontFamily: 'var(--font-body)', fontSize: '0.875rem',
              fontWeight: 500, color: 'var(--gray-600)', textDecoration: 'none',
            }}>{t.nav.contact}</a>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              background: 'var(--gray-100)', border: '1px solid var(--gray-200)',
              borderRadius: 8, padding: '0.4rem 0.75rem',
              fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
              color: 'var(--gray-600)', cursor: 'pointer',
              transition: 'background .2s, border-color .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-50)'; e.currentTarget.style.borderColor = 'var(--blue-200)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--gray-100)'; e.currentTarget.style.borderColor = 'var(--gray-200)' }}
          >
            {icons.globe}
            <span>{t.langSwitch}</span>
          </button>

          {/* Desktop CTA */}
          <a
            href="https://wa.me/213562940733"
            className="nav-cta"
            style={{
              background: 'var(--blue-600)', color: '#fff',
              borderRadius: 8, padding: '0.55rem 1.3rem',
              fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            {t.nav.call}
          </a>

          {/* Hamburger (mobile only) */}
          <button
            className="hamburger"
            onClick={() => setDrawerOpen(true)}
            style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', padding: '4px', lineHeight: 0,
            }}
            aria-label="Menu"
          >
            {icons.menu}
          </button>
        </div>
      </nav>

      {/* ── PAGE CONTENT ─────────────────────────────────────────── */}
      {page === 'about' && <AboutPage />}
      {page === 'pricing' && <PricingPage />}
      {page === 'home' && <>
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        className="hero-section"
        style={{
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '10rem 6vw 6rem',
          position: 'relative', overflow: 'hidden',
          background: 'var(--white)',
          direction: isRTL ? 'rtl' : 'ltr',
          textAlign: isRTL ? 'right' : 'left',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `
            radial-gradient(ellipse 60% 60% at 80% 20%, #dbeafe55 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 10% 80%, #eff6ff88 0%, transparent 70%)
          `,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div
            className="hero-badge"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--blue-50)', border: '1px solid var(--blue-100)',
              borderRadius: 100, padding: '0.35rem 1rem',
              fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 500,
              color: 'var(--blue-600)', marginBottom: '2rem',
              animation: 'fadeUp .6s ease both',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            {t.hero.badge}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.6rem, 7vw, 6.5rem)',
            fontWeight: 300, lineHeight: 1.08,
            color: 'var(--blue-900)',
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
            animation: 'fadeUp .6s ease .1s both',
          }}>
            {t.hero.titleLine1}<br />
            {t.hero.titleLine2} <span style={{ color: 'var(--blue-600)', fontStyle: isRTL ? 'normal' : 'italic' }}>{t.hero.titleHighlight}</span><br />
            {t.hero.titleLine3}
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)',
            color: 'var(--gray-600)', maxWidth: 520,
            lineHeight: 1.75, marginBottom: '2.5rem',
            animation: 'fadeUp .6s ease .2s both', fontWeight: 300,
          }}>
            {t.hero.desc}
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: '1rem', flexWrap: 'wrap',
            animation: 'fadeUp .6s ease .3s both',
          }}>
            <a
              href="#contact"
              style={{
                background: 'var(--blue-600)', color: '#fff',
                borderRadius: 10, padding: '0.85rem 1.75rem',
                fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600,
                textDecoration: 'none', display: 'inline-block',
                transition: 'background .2s, transform .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--blue-700)'; e.currentTarget.style.transform='translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--blue-600)'; e.currentTarget.style.transform='translateY(0)' }}
            >
              {t.hero.cta1}
            </a>
            <a
              href="#features"
              style={{
                background: 'transparent', color: 'var(--blue-700)',
                border: '1.5px solid var(--blue-200)', borderRadius: 10,
                padding: '0.85rem 1.75rem',
                fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 500,
                textDecoration: 'none', display: 'inline-block',
                transition: 'border-color .2s, background .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--blue-50)'; e.currentTarget.style.borderColor='var(--blue-400)' }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='var(--blue-200)' }}
            >
              {t.hero.cta2}
            </a>
          </div>

          {/* Stats */}
          <div
            className="hero-stats"
            style={{
              display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
              marginTop: '2rem',
              animation: 'fadeUp .6s ease .5s both',
              borderTop: '1px solid var(--gray-100)', paddingTop: '2rem',
            }}
          >
            {[[t.hero.stat1Num, t.hero.stat1Label],[t.hero.stat2Num, t.hero.stat2Label],[t.hero.stat3Num, t.hero.stat3Label]].map(([num, label]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                  fontWeight: 600, color: 'var(--blue-700)', lineHeight: 1,
                }}>{num}</span>
                <span style={{
                  fontSize: '0.72rem', color: 'var(--gray-400)',
                  textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500,
                }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────── */}
      <section id="features" className="section-alt" style={{ padding: '6rem 6vw', direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left' }}>
        <div
          ref={featRef}
          style={{
            opacity: featVisible ? 1 : 0,
            transform: featVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity .5s ease, transform .5s ease',
          }}
        >
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
            {t.features.label}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 400, color: 'var(--blue-900)', lineHeight: 1.15, marginBottom: '1rem' }}>
            {t.features.title}<br />{t.features.titleLine2}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--gray-600)', maxWidth: 560, lineHeight: 1.75, fontWeight: 300 }}>
            {t.features.desc}
          </p>
        </div>

        <div className="feature-grid">
          <FeatureCard icon={icons.closing}      title={t.features.card1Title} desc={t.features.card1Desc} delay={0} />
          <FeatureCard icon={icons.alert}        title={t.features.card2Title} desc={t.features.card2Desc} delay={0.1} />
          <FeatureCard icon={icons.dataEntry}    title={t.features.card3Title} desc={t.features.card3Desc} delay={0.2} />
          <FeatureCard icon={icons.barChart}     title={t.features.card4Title} desc={t.features.card4Desc} delay={0.3} />
          <FeatureCard icon={icons.consultation} title={t.features.card5Title} desc={t.features.card5Desc} delay={0.4} />
        </div>
      </section>

      {/* ── QUIZ BANNER ─────────────────────────────────────────── */}
      <section style={{
        padding: '4rem 6vw',
        background: 'linear-gradient(135deg, var(--blue-600) 0%, var(--blue-800) 100%)',
        position: 'relative', overflow: 'hidden',
        direction: isRTL ? 'rtl' : 'ltr',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '20%', width: 280, height: 280, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.25rem' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
            </svg>
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            {t.quizBanner.label}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', fontWeight: 400, color: '#fff', lineHeight: 1.2, maxWidth: 560 }}>
            {t.quizBanner.title}<br />
            <span style={{ fontStyle: isRTL ? 'normal' : 'italic', color: '#93c5fd' }}>{t.quizBanner.titleHighlight}</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 440, fontWeight: 300 }}>
            {t.quizBanner.desc}
          </p>
          <button
            onClick={() => setQuizOpen(true)}
            style={{
              background: '#fff', color: 'var(--blue-700)',
              border: 'none', borderRadius: 12, padding: '0.95rem 2.25rem',
              fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700,
              cursor: 'pointer', transition: 'transform .2s, box-shadow .2s',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              marginTop: '0.5rem',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)' }}
          >
            {t.quizBanner.button}
          </button>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────────────── */}
      <section id="process" className="section" style={{ padding: '6rem 6vw', direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left' }}>
        <div
          ref={procRef}
          style={{
            opacity: procVisible ? 1 : 0,
            transform: procVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity .5s ease, transform .5s ease',
          }}
        >
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
            {t.process.label}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 400, color: 'var(--blue-900)', lineHeight: 1.15, marginBottom: '0.5rem' }}>
            {t.process.title}<br />{t.process.titleLine2}
          </h2>
        </div>

        <div className="process-row" style={{ marginTop: '3.5rem' }}>
          {[
            { n: t.process.step1Num, title: t.process.step1Title, desc: t.process.step1Desc },
            { n: t.process.step2Num, title: t.process.step2Title, desc: t.process.step2Desc },
            { n: t.process.step3Num, title: t.process.step3Title, desc: t.process.step3Desc },
            { n: t.process.step4Num, title: t.process.step4Title, desc: t.process.step4Desc },
            { n: t.process.step5Num, title: t.process.step5Title, desc: t.process.step5Desc },
          ].map(({ n, title, desc }, i) => (
            <div
              key={n}
              style={{
                display: 'flex', flexDirection: 'column', gap: '1rem',
                opacity: procVisible ? 1 : 0,
                transform: procVisible ? 'none' : 'translateY(24px)',
                transition: `opacity .55s ease ${i * 0.1}s, transform .55s ease ${i * 0.1}s`,
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 300, color: 'var(--blue-100)', lineHeight: 1 }}>{n}</div>
              <div style={{ width: 32, height: 2, background: 'var(--blue-400)', borderRadius: 2 }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 500, color: 'var(--blue-900)' }}>{title}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.7, fontWeight: 300 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUOTE STRIP ─────────────────────────────────────────── */}
      <div className="quote-strip" style={{
        background: 'var(--blue-800)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: '1.5rem',
        direction: isRTL ? 'rtl' : 'ltr',
      }}>
        <div style={{ color: 'rgba(255,255,255,0.5)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="8 2 2 2 2 8"/><path d="M22 2h-6"/><path d="M22 2v6"/><path d="M2 22l7-7"/><path d="M22 22l-7-7"/><path d="M8 22h8"/><path d="M12 17v5"/><path d="M6 8a6 6 0 0 0 12 0V2H6v6z"/>
          </svg>
        </div>
        <blockquote style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.3rem, 3.5vw, 2.8rem)',
          fontWeight: 300, color: 'var(--white)',
          lineHeight: 1.4, maxWidth: 800, fontStyle: isRTL ? 'normal' : 'italic',
        }}>
          {t.quote.text}
        </blockquote>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: '#93c5fd', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {t.quote.author}
        </div>
      </div>

      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section className="section" style={{ padding: '6rem 6vw', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
        <div
          ref={ctaRef}
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity .5s ease, transform .5s ease',
          }}
        >
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
            {t.cta.label}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 400, color: 'var(--blue-900)', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            {t.cta.title}<br />
            <span style={{ color: 'var(--blue-600)', fontStyle: isRTL ? 'normal' : 'italic' }}>{t.cta.titleHighlight}</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', color: 'var(--gray-600)', maxWidth: 480, margin: '0 auto 2.5rem', lineHeight: 1.75, fontWeight: 300 }}>
            {t.cta.desc}
          </p>
          <div className="cta-row">
            <a
              href="https://wa.me/213562940733"
              style={{
                background: 'var(--blue-600)', color: '#fff',
                borderRadius: 10, padding: '0.85rem 1.75rem',
                fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                transition: 'background .2s, transform .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--blue-700)'; e.currentTarget.style.transform='translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--blue-600)'; e.currentTarget.style.transform='translateY(0)' }}
            >
              {icons.phone} <span style={{ direction: 'ltr', unicodeBidi: 'embed' }}>0562 94 07 33</span>
            </a>
            <a
              href="https://www.instagram.com/dpros_officiel"
              target="_blank" rel="noreferrer"
              style={{
                background: 'transparent', color: 'var(--blue-700)',
                border: '1.5px solid var(--blue-200)', borderRadius: 10,
                padding: '0.85rem 1.75rem',
                fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 500,
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                transition: 'border-color .2s, background .2s',
                direction: 'ltr', unicodeBidi: 'isolate',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--blue-50)'; e.currentTarget.style.borderColor='var(--blue-400)' }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='var(--blue-200)' }}
            >
              {icons.instagram} @dpros_officiel
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────── */}
      <section id="contact" className="section-alt" style={{ padding: '6rem 6vw', direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left' }}>
        <div
          ref={conRef}
          style={{
            opacity: conVisible ? 1 : 0,
            transform: conVisible ? 'none' : 'translateY(20px)',
            transition: 'opacity .5s ease, transform .5s ease',
          }}
        >
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>
            {t.contact.label}
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 400, color: 'var(--blue-900)', lineHeight: 1.15 }}>
            {t.contact.title}
          </h2>
        </div>

        <div className="contact-grid" style={{ marginTop: '3rem' }}>
          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: icons.phone,    label: t.contact.phone,    val: '0562 94 07 33',           href: 'tel:0562940733' },
              { icon: icons.mail,     label: t.contact.email,    val: 'commercial.dpros@gmail.com', href: 'mailto:commercial.dpros@gmail.com' },
              { icon: icons.location, label: t.contact.location, val: t.contact.locationVal,      href: null },
            ].map(({ icon, label, val, href }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--gray-500)' }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--gray-400)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                    {label}
                  </div>
                  {href
                    ? <a href={href} style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--blue-900)', fontWeight: 500, textDecoration: 'none', direction: 'ltr', unicodeBidi: 'isolate' }}>{val}</a>
                    : <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--blue-900)', fontWeight: 500 }}>{val}</span>
                  }
                </div>
              </div>
            ))}

            {/* Instagram */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--gray-500)' }}>
                {icons.instagram}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--gray-400)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{t.contact.instagram}</div>
                {['dpros_officiel','dpros.officiel'].map(h => (
                  <div key={h}>
                    <a href={`https://instagram.com/${h}`} target="_blank" rel="noreferrer"
                      style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--blue-600)', fontWeight: 500, textDecoration: 'none', direction: 'ltr', unicodeBidi: 'isolate' }}>
                      @{h}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Always open */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#dcfce7', border: '1px solid #bbf7d0',
              borderRadius: 100, padding: '0.4rem 1rem',
              fontSize: '0.8rem', fontWeight: 600, color: '#166534',
              width: 'fit-content',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              {t.contact.available}
            </div>
          </div>

          {/* Form */}
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
            {[
              { key: 'name',    type: 'text', placeholder: t.contact.formName },
              { key: 'phone',   type: 'tel',  placeholder: t.contact.formPhone },
            ].map(({ key, type, placeholder }) => (
              <input
                key={key}
                type={type}
                placeholder={placeholder}
                value={formData[key]}
                onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                onFocus={e => e.target.style.borderColor = 'var(--blue-400)'}
                onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                required
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                  border: '1px solid var(--gray-200)', borderRadius: 10,
                  padding: '0.85rem 1rem', color: 'var(--gray-800)',
                  outline: 'none', transition: 'border-color .2s',
                  background: 'var(--white)', width: '100%',
                  textAlign: type === 'tel' ? 'left' : (isRTL ? 'right' : 'left'),
                  direction: type === 'tel' ? 'ltr' : (isRTL ? 'rtl' : 'ltr'),
                }}
              />
            ))}
            <textarea
              placeholder={t.contact.formMessage}
              value={formData.message}
              onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
              onFocus={e => e.target.style.borderColor = 'var(--blue-400)'}
              onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
              required
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                border: '1px solid var(--gray-200)', borderRadius: 10,
                padding: '0.85rem 1rem', color: 'var(--gray-800)',
                outline: 'none', transition: 'border-color .2s',
                background: 'var(--white)', resize: 'vertical', minHeight: 120, width: '100%',
                textAlign: isRTL ? 'right' : 'left',
                direction: isRTL ? 'rtl' : 'ltr',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'var(--blue-600)', color: '#fff',
                border: 'none', borderRadius: 10, padding: '0.9rem',
                fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600,
                cursor: 'pointer', transition: 'background .2s, transform .15s',
                width: '100%',
              }}
              onMouseEnter={e => { e.target.style.background='var(--blue-700)'; e.target.style.transform='translateY(-1px)' }}
              onMouseLeave={e => { e.target.style.background='var(--blue-600)'; e.target.style.transform='translateY(0)' }}
            >
              {t.contact.formSubmit}
            </button>
          </form>
        </div>
      </section>

      </>}

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--gray-100)', padding: '2.5rem 5vw 5rem', position: 'relative', overflow: 'hidden', direction: isRTL ? 'rtl' : 'ltr' }}>
        {/* Big watermark */}
        <div style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 20vw, 14rem)',
          fontWeight: 700,
          lineHeight: 1,
          background: 'linear-gradient(135deg, var(--blue-400), var(--blue-700))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: 0.20,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.03em',
        }}>
          Dpros
        </div>

        <div className="footer-inner" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--blue-700)' }}>Dpros</div>
          <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', flexWrap: 'wrap' }}>
            {[['#features', t.nav.services],['#process', t.nav.process]].map(([href, label]) => (
              <li key={href}><a href={href} onClick={(e) => {
                if (page !== 'home') { e.preventDefault(); navigateTo('home'); setTimeout(() => { window.location.hash = href }, 50) }
              }} style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem', color: 'var(--gray-400)', textDecoration: 'none' }}>{label}</a></li>
            ))}
            {[['about', t.nav.about],['pricing', t.nav.pricing]].map(([pg, label]) => (
              <li key={pg}><a href="#" onClick={(e) => { e.preventDefault(); navigateTo(pg) }} style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem', color: 'var(--gray-400)', textDecoration: 'none' }}>{label}</a></li>
            ))}
            {[['#contact', t.nav.contact]].map(([href, label]) => (
              <li key={href}><a href={href} onClick={(e) => {
                if (page !== 'home') { e.preventDefault(); navigateTo('home'); setTimeout(() => { window.location.hash = href }, 50) }
              }} style={{ fontFamily: 'var(--font-body)', fontSize: '0.825rem', color: 'var(--gray-400)', textDecoration: 'none' }}>{label}</a></li>
            ))}
          </ul>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--gray-400)' }}>
            {t.footer.copyright}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--gray-300)', marginTop: '0.5rem' }}>
            {isRTL ? 'تطوير بواسطة' : 'Développé par'}{' '}
            <a href="https://sitedz.store" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-500)', textDecoration: 'none', fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >Site<span style={{ color: '#22c55e' }}>DZ</span></a>
          </div>
        </div>
      </footer>

      {/* ── FLOATING QUIZ BUTTON ─────────────────────────────────── */}
      <button
        onClick={() => setQuizOpen(true)}
        style={{
          position: 'fixed', bottom: '1.5rem',
          [isRTL ? 'left' : 'right']: '1.5rem',
          zIndex: 90,
          background: 'var(--blue-600)', color: '#fff',
          border: 'none', borderRadius: 50,
          padding: '0.75rem 1.25rem',
          fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          boxShadow: '0 4px 20px rgba(30,79,163,0.4)',
          transition: 'transform .2s, box-shadow .2s',
          animation: 'fadeUp .6s ease 1s both',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(30,79,163,0.5)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(30,79,163,0.4)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          </svg>
          <span>{t.floatingQuiz}</span>
      </button>

      {/* ── QUIZ MODAL ───────────────────────────────────────────── */}
      {quizOpen && <Quiz onClose={() => setQuizOpen(false)} />}

      {/* Hamburger visibility via CSS */}
      <style>{`
        @media (max-width: 768px) {
          .hamburger { display: block !important; }
          .nav-cta   { display: none !important; }
        }
      `}</style>
    </>
  )
}
