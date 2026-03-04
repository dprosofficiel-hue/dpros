import React, { useEffect, useRef, useState } from 'react'
import { useLanguage } from './i18n/LanguageContext.jsx'

function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
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

export default function PricingPage() {
  const { t, isRTL } = useLanguage()
  const p = t.pricing
  const [heroRef, heroVis] = useReveal()
  const [tableRef, tableVis] = useReveal()
  const [svcRef, svcVis] = useReveal()
  const [payRef, payVis] = useReveal()
  const [freeRef, freeVis] = useReveal()
  const [b2bRef, b2bVis] = useReveal()

  const dir = isRTL ? 'rtl' : 'ltr'
  const align = isRTL ? 'right' : 'left'

  const rows = [
    { label: p.rowPhysical, low: p.lowPrices[0], high: p.highPrices[0] },
    { label: p.rowDigital, low: p.lowPrices[1], high: p.highPrices[1] },
    { label: p.rowUpsell, low: '', high: '', isHeader: true },
    { label: p.rowExtra, low: p.lowPrices[3], high: p.highPrices[3], indent: true },
    { label: p.rowAbandoned, low: p.lowPrices[4], high: p.highPrices[4] },
    { label: p.rowConfirmed, low: p.lowPrices[5], high: p.highPrices[5] },
    { label: p.rowLate, low: p.lowPrices[6], high: p.highPrices[6] },
  ]

  const services = [
    { title: p.svc1Title, items: p.svc1Items },
    { title: p.svc2Title, items: p.svc2Items },
    { title: p.svc3Title, items: p.svc3Items },
    { title: p.svc4Title, items: p.svc4Items },
    { title: p.svc5Title, items: p.svc5Items },
  ]

  return (
    <>
      {/* Hero */}
      <section style={{
        padding: '10rem 6vw 5rem', direction: dir, textAlign: 'center',
        background: 'var(--white)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 20%, #dbeafe55 0%, transparent 70%)',
        }} />
        <div ref={heroRef} style={{
          position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto',
          opacity: heroVis ? 1 : 0, transform: heroVis ? 'none' : 'translateY(20px)',
          transition: 'opacity .5s ease, transform .5s ease',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem',
          }}>{p.heroLabel}</div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
            fontWeight: 300, lineHeight: 1.1, color: 'var(--blue-900)', marginBottom: '1.25rem',
          }}>
            {p.heroTitle} <span style={{ color: 'var(--blue-600)', fontStyle: isRTL ? 'normal' : 'italic' }}>{p.heroTitleHighlight}</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
            color: 'var(--gray-600)', lineHeight: 1.75, fontWeight: 300,
          }}>{p.heroDesc}</p>
        </div>
      </section>

      {/* Pricing Table */}
      <section style={{ padding: '4rem 6vw', direction: dir, textAlign: align }}>
        <div ref={tableRef} style={{
          maxWidth: 800, margin: '0 auto',
          opacity: tableVis ? 1 : 0, transform: tableVis ? 'none' : 'translateY(20px)',
          transition: 'opacity .5s ease, transform .5s ease',
        }}>
          {/* Table */}
          <div style={{
            background: 'var(--white)', border: '1px solid var(--gray-100)',
            borderRadius: 16, overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              background: 'var(--blue-800)',
            }}>
              <div style={{ padding: '1.25rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }} />
              <div style={{ padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: '#fff', direction: 'ltr', unicodeBidi: 'isolate' }}>{p.lowTicketTitle}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#93c5fd', fontWeight: 500, direction: 'ltr', unicodeBidi: 'isolate' }}>{p.lowTicketSub}</div>
              </div>
              <div style={{ padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: '#fff', direction: 'ltr', unicodeBidi: 'isolate' }}>{p.highTicketTitle}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#93c5fd', fontWeight: 500, direction: 'ltr', unicodeBidi: 'isolate' }}>{p.highTicketSub}</div>
              </div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                borderTop: '1px solid var(--gray-100)',
                background: row.isHeader ? 'var(--gray-50)' : 'var(--white)',
              }}>
                <div style={{
                  padding: '1rem 1.25rem',
                  fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                  color: row.isHeader ? 'var(--blue-700)' : 'var(--gray-800)',
                  fontWeight: row.isHeader ? 600 : 400,
                  paddingLeft: row.indent && !isRTL ? '2.5rem' : undefined,
                  paddingRight: row.indent && isRTL ? '2.5rem' : undefined,
                }}>{row.label}</div>
                <div style={{
                  padding: '1rem', textAlign: 'center',
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                  color: row.low ? 'var(--blue-600)' : 'transparent', fontWeight: 600,
                  direction: 'ltr',
                }}>{row.low || '-'}</div>
                <div style={{
                  padding: '1rem', textAlign: 'center',
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                  color: row.high ? 'var(--blue-600)' : 'transparent', fontWeight: 600,
                  direction: 'ltr',
                }}>{row.high || '-'}</div>
              </div>
            ))}
          </div>

          {/* Volume note */}
          <div style={{
            marginTop: '1.5rem',
            background: 'var(--blue-50)', border: '1px solid var(--blue-100)',
            borderRadius: 12, padding: '1rem 1.25rem',
            fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            color: 'var(--blue-800)', fontWeight: 500, lineHeight: 1.7,
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            {p.volumeNote}
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section style={{ padding: '5rem 6vw', direction: dir, textAlign: align, background: 'var(--gray-50)' }}>
        <div ref={svcRef} style={{
          opacity: svcVis ? 1 : 0, transform: svcVis ? 'none' : 'translateY(20px)',
          transition: 'opacity .5s ease, transform .5s ease',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem',
          }}>{p.servicesLabel}</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            fontWeight: 400, color: 'var(--blue-900)', lineHeight: 1.15, marginBottom: '2.5rem',
          }}>{p.servicesTitle}</h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}>
          {services.map((svc, i) => (
            <div key={i} style={{
              background: 'var(--white)', border: '1px solid var(--gray-100)',
              borderRadius: 16, padding: '2rem',
              opacity: svcVis ? 1 : 0, transform: svcVis ? 'none' : 'translateY(20px)',
              transition: `opacity .5s ease ${i * 0.08}s, transform .5s ease ${i * 0.08}s`,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem', fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                fontWeight: 700, color: 'var(--blue-500)',
              }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '1.15rem',
                fontWeight: 500, color: 'var(--blue-900)', marginBottom: '1rem',
              }}>{svc.title}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {svc.items.map((item, j) => (
                  <li key={j} style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: 'var(--gray-600)', fontWeight: 400,
                    display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue-400)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 3, flexShrink: 0 }}>
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Free Offers */}
      <section style={{
        padding: '5rem 6vw', direction: dir, textAlign: 'center',
        background: 'linear-gradient(135deg, var(--blue-600) 0%, var(--blue-800) 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div ref={freeRef} style={{
          position: 'relative', zIndex: 1,
          opacity: freeVis ? 1 : 0, transform: freeVis ? 'none' : 'translateY(20px)',
          transition: 'opacity .5s ease, transform .5s ease',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
            color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem',
          }}>{p.freeLabel}</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: '1rem',
          }}>{p.freeTitle}</h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, fontWeight: 300,
            maxWidth: 500, margin: '0 auto 2.5rem',
          }}>{p.freeDesc}</p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem', maxWidth: 700, margin: '0 auto',
          }}>
            {p.freeOffers.map((offer, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 16, padding: '2rem 1.5rem',
                opacity: freeVis ? 1 : 0, transform: freeVis ? 'none' : 'translateY(16px)',
                transition: `opacity .5s ease ${i * 0.1}s, transform .5s ease ${i * 0.1}s`,
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '2.5rem',
                  fontWeight: 600, color: '#fff', lineHeight: 1,
                }}>{offer.free}</div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                  color: '#93c5fd', fontWeight: 500, marginTop: '0.5rem', marginBottom: '1rem',
                }}>{p.freeGet}</div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)', borderRadius: 100,
                  padding: '0.35rem 0.85rem', display: 'inline-block',
                  fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.8)', fontWeight: 500,
                  direction: 'ltr',
                }}>
                  {offer.min}+ {p.freeUnit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment + B2B */}
      <section style={{ padding: '5rem 6vw', direction: dir, textAlign: align }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
        }}>
          {/* Payment */}
          <div ref={payRef} style={{
            opacity: payVis ? 1 : 0, transform: payVis ? 'none' : 'translateY(20px)',
            transition: 'opacity .5s ease, transform .5s ease',
          }}>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
              color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem',
            }}>{p.paymentLabel}</div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 400, color: 'var(--blue-900)', lineHeight: 1.15, marginBottom: '1.5rem',
            }}>{p.paymentTitle}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {p.paymentMethods.map((m, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  background: 'var(--gray-50)', border: '1px solid var(--gray-100)',
                  borderRadius: 10, padding: '0.85rem 1rem',
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                    color: 'var(--gray-800)', fontWeight: 500,
                  }}>{m}</span>
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              color: 'var(--gray-500)', lineHeight: 1.7, fontWeight: 400,
            }}>{p.paymentNote}</p>
          </div>

          {/* B2B */}
          <div ref={b2bRef} style={{
            opacity: b2bVis ? 1 : 0, transform: b2bVis ? 'none' : 'translateY(20px)',
            transition: 'opacity .5s ease .1s, transform .5s ease .1s',
          }}>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
              color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem',
            }}>{p.b2bLabel}</div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 400, color: 'var(--blue-900)', lineHeight: 1.15, marginBottom: '1.5rem',
            }}>{p.b2bTitle}</h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: 'var(--gray-600)', lineHeight: 1.75, fontWeight: 300, marginBottom: '2rem',
            }}>{p.b2bDesc}</p>

            <a
              href="tel:0562940733"
              style={{
                background: 'var(--blue-600)', color: '#fff',
                borderRadius: 10, padding: '0.85rem 1.75rem',
                fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600,
                textDecoration: 'none', display: 'inline-block',
                transition: 'background .2s, transform .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-700)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--blue-600)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {p.ctaButton}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
