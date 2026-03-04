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

/* ─── Bento card wrapper ─────────────────────────────────── */
function BentoCard({ children, span = 1, bg = 'var(--white)', border = '1px solid var(--gray-100)', delay = 0, visible, style = {} }) {
  return (
    <div style={{
      background: bg, border, borderRadius: 20, padding: '2rem',
      gridColumn: `span ${span}`,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(24px)',
      transition: `opacity .55s ease ${delay}s, transform .55s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

export default function AboutPage() {
  const { t, isRTL } = useLanguage()
  const a = t.about
  const [heroRef, heroVis] = useReveal()
  const [bentoRef, bentoVis] = useReveal()
  const [expRef, expVis] = useReveal()
  const [misRef, misVis] = useReveal()
  const [whyRef, whyVis] = useReveal()
  const [teamRef, teamVis] = useReveal()

  const dir = isRTL ? 'rtl' : 'ltr'
  const align = isRTL ? 'right' : 'left'

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{
        padding: '10rem 6vw 5rem', direction: dir, textAlign: align,
        background: 'var(--white)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 60% 60% at 80% 20%, #dbeafe55 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 10% 80%, #eff6ff88 0%, transparent 70%)',
        }} />
        <div ref={heroRef} style={{
          position: 'relative', zIndex: 1, maxWidth: 700,
          opacity: heroVis ? 1 : 0, transform: heroVis ? 'none' : 'translateY(20px)',
          transition: 'opacity .5s ease, transform .5s ease',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem',
          }}>{a.heroLabel}</div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
            fontWeight: 300, lineHeight: 1.1, color: 'var(--blue-900)', marginBottom: '1.5rem',
          }}>
            {a.heroTitle}<br />
            <span style={{ color: 'var(--blue-600)', fontStyle: isRTL ? 'normal' : 'italic' }}>{a.heroTitleHighlight}</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)',
            color: 'var(--gray-600)', lineHeight: 1.75, fontWeight: 300,
          }}>{a.heroDesc}</p>
        </div>
      </section>

      {/* ── Bento Grid: DPROS + Expertise ─────────────────── */}
      <section style={{ padding: '4rem 6vw', direction: dir, textAlign: align, background: 'var(--gray-50)' }}>
        <div ref={bentoRef} className="about-bento" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>

          {/* Card 1: What is DPROS — spans 2 cols */}
          <BentoCard span={2} bg="var(--white)" delay={0} visible={bentoVis}>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
              color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem',
            }}>{a.whatLabel}</div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
              fontWeight: 400, color: 'var(--blue-900)', lineHeight: 1.15, marginBottom: '0.25rem',
            }}>{a.whatTitle}</h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--blue-600)',
              fontWeight: 500, marginBottom: '1.25rem', fontStyle: isRTL ? 'normal' : 'italic',
            }}>"{a.whatSubtitle}"</p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--gray-600)',
              lineHeight: 1.75, fontWeight: 300, marginBottom: '1.25rem',
            }}>{a.whatDesc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {a.whatSteps.map((step, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  background: 'var(--blue-50)', border: '1px solid var(--blue-100)',
                  borderRadius: 100, padding: '0.35rem 0.9rem',
                  fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 500,
                  color: 'var(--blue-700)',
                }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: 'var(--blue-100)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 700, color: 'var(--blue-600)',
                  }}>{i + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Card 2: Footer highlight — spans 1 col, dark accent */}
          <BentoCard span={1} bg="linear-gradient(135deg, var(--blue-700) 0%, var(--blue-900) 100%)" border="none" delay={0.1} visible={bentoVis}>
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '1.5rem',
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '1rem',
                color: '#fff', fontWeight: 500, lineHeight: 1.7,
              }}>{a.whatFooter}</p>
            </div>
          </BentoCard>

          {/* Card 3: E-commerce expertise */}
          <BentoCard span={1} delay={0.15} visible={bentoVis}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '2.5rem',
              fontWeight: 300, color: 'var(--blue-100)', lineHeight: 1, marginBottom: '0.5rem',
            }}>01</div>
            <div style={{ width: 28, height: 2, background: 'var(--blue-400)', borderRadius: 2, marginBottom: '0.75rem' }} />
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '1.15rem',
              fontWeight: 500, color: 'var(--blue-900)', marginBottom: '0.75rem',
            }}>{a.exp1Title}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {a.exp1Items.map((item, i) => (
                <li key={i} style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                  color: 'var(--gray-600)', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue-400)', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* Card 4: Closing expertise — spans 2 cols */}
          <BentoCard span={2} bg="var(--blue-50)" border="1px solid var(--blue-100)" delay={0.2} visible={bentoVis}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="about-closing-grid">
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '2.5rem',
                  fontWeight: 300, color: 'var(--blue-200)', lineHeight: 1, marginBottom: '0.5rem',
                }}>02</div>
                <div style={{ width: 28, height: 2, background: 'var(--blue-400)', borderRadius: 2, marginBottom: '0.75rem' }} />
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.15rem',
                  fontWeight: 500, color: 'var(--blue-900)', marginBottom: '0.75rem',
                }}>{a.exp2Title}</div>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                  color: 'var(--gray-600)', lineHeight: 1.7, fontWeight: 300,
                }}>{a.exp2Desc}</p>
              </div>
              <div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {a.exp2Items.map((item, i) => (
                    <li key={i} style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                      color: 'var(--blue-800)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.6rem',
                      background: 'var(--white)', borderRadius: 10, padding: '0.65rem 1rem',
                      border: '1px solid var(--blue-100)',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--blue-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </BentoCard>

          {/* Card 5: Management expertise */}
          <BentoCard span={1} delay={0.25} visible={bentoVis}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '2.5rem',
              fontWeight: 300, color: 'var(--blue-100)', lineHeight: 1, marginBottom: '0.5rem',
            }}>03</div>
            <div style={{ width: 28, height: 2, background: 'var(--blue-400)', borderRadius: 2, marginBottom: '0.75rem' }} />
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '1.15rem',
              fontWeight: 500, color: 'var(--blue-900)', marginBottom: '0.75rem',
            }}>{a.exp3Title}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {a.exp3Items.map((item, i) => (
                <li key={i} style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                  color: 'var(--gray-600)', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue-400)', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* Card 6: Expertise label — spans full width, not visible as card */}

        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────── */}
      <section style={{
        padding: '5rem 6vw', direction: dir, textAlign: align,
        background: 'linear-gradient(135deg, var(--blue-600) 0%, var(--blue-800) 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '15%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />
        <div ref={misRef} style={{
          position: 'relative', zIndex: 1,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center',
          opacity: misVis ? 1 : 0, transform: misVis ? 'none' : 'translateY(20px)',
          transition: 'opacity .5s ease, transform .5s ease',
        }} className="about-mission-grid">
          <div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
              color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem',
            }}>{a.missionLabel}</div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: '1.25rem',
            }}>
              {a.missionTitle} <span style={{ color: '#93c5fd', fontStyle: isRTL ? 'normal' : 'italic' }}>{a.missionTitleHighlight}</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.8)', lineHeight: 1.75, fontWeight: 300,
            }}>{a.missionDesc}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {a.missionItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 14, padding: '1rem 1.25rem',
                fontFamily: 'var(--font-body)', fontSize: '0.92rem', fontWeight: 500, color: '#fff',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(147,197,253,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                {item}
              </div>
            ))}
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '0.92rem',
              color: '#fff', fontWeight: 600, lineHeight: 1.7,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14, padding: '1rem 1.25rem', marginTop: '0.25rem',
            }}>{a.missionFooter}</div>
          </div>
        </div>
      </section>

      {/* ── Why Dpros — Bento style ───────────────────────── */}
      <section style={{ padding: '5rem 6vw', direction: dir, textAlign: align }}>
        <div ref={whyRef}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem',
            opacity: whyVis ? 1 : 0, transform: whyVis ? 'none' : 'translateY(20px)',
            transition: 'opacity .5s ease, transform .5s ease',
          }}>{a.whyLabel}</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            fontWeight: 400, color: 'var(--blue-900)', lineHeight: 1.15, marginBottom: '2rem',
            opacity: whyVis ? 1 : 0, transform: whyVis ? 'none' : 'translateY(20px)',
            transition: 'opacity .5s ease, transform .5s ease',
          }}>
            {a.whyTitle}<br />
            <span style={{ color: 'var(--blue-600)', fontStyle: isRTL ? 'normal' : 'italic' }}>{a.whyTitleHighlight}</span>
          </h2>

          <div className="about-why-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}>
            {a.whyItems.map((item, i) => {
              // First item spans 2 cols, last item spans 2 cols
              const isWide = i === 0 || i === a.whyItems.length - 1
              return (
                <div key={i} className={isWide ? 'why-wide' : ''} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  background: i === 0 ? 'var(--blue-50)' : 'var(--white)',
                  border: i === 0 ? '1px solid var(--blue-100)' : '1px solid var(--gray-100)',
                  borderRadius: 16, padding: '1.25rem 1.5rem',
                  gridColumn: isWide ? 'span 2' : 'span 1',
                  opacity: whyVis ? 1 : 0, transform: whyVis ? 'none' : 'translateY(16px)',
                  transition: `opacity .5s ease ${i * 0.08}s, transform .5s ease ${i * 0.08}s`,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: i === 0 ? 'var(--blue-100)' : 'var(--blue-50)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--blue-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                    color: 'var(--blue-900)', fontWeight: 500,
                  }}>{item}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────── */}
      <section style={{ padding: '5rem 6vw', direction: dir, textAlign: 'center', background: 'var(--gray-50)' }}>
        <div ref={teamRef} style={{
          opacity: teamVis ? 1 : 0, transform: teamVis ? 'none' : 'translateY(20px)',
          transition: 'opacity .5s ease, transform .5s ease',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--blue-500)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem',
          }}>{a.teamLabel}</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            fontWeight: 400, color: 'var(--blue-900)', lineHeight: 1.15, marginBottom: '3rem',
          }}>{a.teamTitle}</h2>

          {/* Top row: 3 leaders */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem', maxWidth: 720, margin: '0 auto 1.25rem',
          }} className="about-team-top">
            {a.teamMembers.slice(0, 3).map((m, i) => (
              <div key={i} style={{
                background: 'var(--white)', border: '1px solid var(--gray-100)',
                borderRadius: 20, padding: '2rem 1.5rem',
                opacity: teamVis ? 1 : 0, transform: teamVis ? 'none' : 'translateY(20px)',
                transition: `opacity .5s ease ${i * 0.08}s, transform .5s ease ${i * 0.08}s`,
              }}>
                {m.image ? (
                  <img src={m.image} alt={m.name} style={{
                    width: 88, height: 88, borderRadius: '50%',
                    objectFit: 'cover', margin: '0 auto 1rem', display: 'block',
                    border: '3px solid var(--blue-100)',
                  }} />
                ) : (
                  <div style={{
                    width: 88, height: 88, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--blue-100), var(--blue-200))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1rem', fontSize: '1.5rem', fontWeight: 600,
                    color: 'var(--blue-600)', fontFamily: 'var(--font-display)',
                  }}>{m.name.charAt(0)}</div>
                )}
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                  fontWeight: 500, color: 'var(--blue-900)', marginBottom: '0.3rem',
                }}>{m.name}</div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.75rem',
                  color: 'var(--blue-500)', fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>{m.role}</div>
              </div>
            ))}
          </div>

          {/* Bottom row: 2 managers, centered */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem', maxWidth: 480, margin: '0 auto',
          }} className="about-team-bottom">
            {a.teamMembers.slice(3).map((m, i) => (
              <div key={i} style={{
                background: 'var(--white)', border: '1px solid var(--gray-100)',
                borderRadius: 20, padding: '2rem 1.5rem',
                opacity: teamVis ? 1 : 0, transform: teamVis ? 'none' : 'translateY(20px)',
                transition: `opacity .5s ease ${(i + 3) * 0.08}s, transform .5s ease ${(i + 3) * 0.08}s`,
              }}>
                {m.image ? (
                  <img src={m.image} alt={m.name} style={{
                    width: 80, height: 80, borderRadius: '50%',
                    objectFit: 'cover', margin: '0 auto 1rem', display: 'block',
                    border: '3px solid var(--blue-100)',
                  }} />
                ) : (
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--blue-100), var(--blue-200))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1rem', fontSize: '1.5rem', fontWeight: 600,
                    color: 'var(--blue-600)', fontFamily: 'var(--font-display)',
                  }}>{m.name.charAt(0)}</div>
                )}
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.05rem',
                  fontWeight: 500, color: 'var(--blue-900)', marginBottom: '0.3rem',
                }}>{m.name}</div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.75rem',
                  color: 'var(--blue-500)', fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
