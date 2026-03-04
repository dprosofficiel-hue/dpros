import React, { useState, useEffect } from 'react'
import { useLanguage } from './i18n/LanguageContext.jsx'

/* ─── Monochrome SVG icons ───────────────────────────────────────────── */
const Ico = {
  target: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  orders: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  brand: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  product: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/>
    </svg>
  ),
  mail: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  lock: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  chart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  rocket: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
}

const Q_ICONS = [Ico.orders, Ico.brand, Ico.product]

/* ─── Progress bar ───────────────────────────────────────────────────── */
function ProgressBar({ step, total, t }) {
  return (
    <div style={{ padding: '1.5rem 1.75rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', color: 'var(--gray-400)', fontWeight: 500 }}>
          {t.quiz.questionLabel} {step} / {total}
        </span>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', color: 'var(--gray-600)', fontWeight: 600 }}>
          {Math.round((step / total) * 100)}%
        </span>
      </div>
      <div style={{ height: 3, background: 'var(--gray-100)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${(step / total) * 100}%`,
          background: 'var(--gray-800)',
          borderRadius: 99,
          transition: 'width .4s ease',
        }} />
      </div>
    </div>
  )
}

/* ─── Icon wrapper ───────────────────────────────────────────────────── */
function IconBox({ children, size = 56 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 14,
      background: 'var(--gray-100)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--gray-700)', marginBottom: '1.1rem', flexShrink: 0,
    }}>
      {children}
    </div>
  )
}

/* ─── Main Quiz Modal ────────────────────────────────────────────────── */
export default function Quiz({ onClose }) {
  const { t, isRTL } = useLanguage()

  const [step, setStep]       = useState(0) // 0=intro, 1=orders, 2=brand, 3=product, 4=capture, 5=result
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState({ orders: '', brand: '', productType: '' })
  const [contact, setContact] = useState({ method: 'phone', value: '' })
  const [submitting, setSubmitting] = useState(false)
  const [brandInput, setBrandInput] = useState('')

  const totalQ = 3
  const isIntro   = step === 0
  const isCapture = step === totalQ + 1
  const isResult  = step === totalQ + 2

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function next() { setSelected(null); setStep(s => s + 1) }

  // Q1: orders
  const ordersOptions = [
    t.quiz.q1a1, t.quiz.q1a2, t.quiz.q1a3, t.quiz.q1a4, t.quiz.q1a5,
  ]

  // Q3: product type
  const productOptions = [t.quiz.q3a1, t.quiz.q3a2]

  function handleOrderSelect(idx, label) {
    setSelected(idx)
    setTimeout(() => {
      setAnswers(a => ({ ...a, orders: label }))
      next()
    }, 360)
  }

  function handleBrandSubmit(e) {
    e.preventDefault()
    if (!brandInput.trim()) return
    setAnswers(a => ({ ...a, brand: brandInput.trim() }))
    next()
  }

  function handleProductSelect(idx, label) {
    setSelected(idx)
    setTimeout(() => {
      setAnswers(a => ({ ...a, productType: label }))
      next()
    }, 360)
  }

  function handleCapture(e) {
    e.preventDefault()
    setSubmitting(true)
    const label = contact.method === 'phone' ? t.quiz.capturePhone : t.quiz.captureEmail
    const msg = `${t.quiz.captureWhatsapp}\n${label}: ${contact.value}\n${t.quiz.q1}: ${answers.orders}\n${t.quiz.q2}: ${answers.brand}\n${t.quiz.q3}: ${answers.productType}`
    window.open(`https://wa.me/213562940733?text=${encodeURIComponent(msg)}`, '_blank')
    setTimeout(() => { setSubmitting(false); setStep(totalQ + 2) }, 600)
  }

  const introChecks = [
    { icon: Ico.check, text: t.quiz.introCheck1 },
    { icon: Ico.chart, text: t.quiz.introCheck2 },
    { icon: Ico.target, text: t.quiz.introCheck3 },
    { icon: Ico.lock,  text: t.quiz.introCheck4 },
  ]

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(10,22,40,0.55)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn .25s ease',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff', borderRadius: 20,
          width: '100%', maxWidth: 520,
          maxHeight: '90vh', overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.22)',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem',
            [isRTL ? 'left' : 'right']: '1rem',
            background: 'var(--gray-100)', border: 'none', borderRadius: '50%',
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 10, color: 'var(--gray-500)', fontSize: '1rem',
          }}
          aria-label={t.quiz.close}
        >✕</button>

        {/* ── INTRO ── */}
        {isIntro && (
          <div style={{ padding: '2.5rem 1.75rem', textAlign: 'center', animation: 'fadeUp .3s ease both' }}>
            <IconBox size={64}>{Ico.target}</IconBox>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.75rem' }}>
              {t.quiz.introLabel}
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 500, color: 'var(--blue-900)', lineHeight: 1.2, marginBottom: '1rem' }}>
              {t.quiz.introTitle}<br />{t.quiz.introTitleLine2}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: '2rem', fontWeight: 300 }}>
              {t.quiz.introDesc}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem', textAlign: isRTL ? 'right' : 'left' }}>
              {introChecks.map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--gray-600)' }}>{text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: '100%', background: 'var(--blue-600)', color: '#fff',
                border: 'none', borderRadius: 12, padding: '1rem',
                fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600,
                cursor: 'pointer', transition: 'background .2s',
              }}
              onMouseEnter={e => e.target.style.background = 'var(--blue-700)'}
              onMouseLeave={e => e.target.style.background = 'var(--blue-600)'}
            >
              {t.quiz.startButton}
            </button>
          </div>
        )}

        {/* ── Q1: Number of orders ── */}
        {step === 1 && (
          <div key="q1" style={{ animation: 'fadeUp .3s ease both' }}>
            <ProgressBar step={1} total={totalQ} t={t} />
            <div style={{ padding: '1.75rem' }}>
              <IconBox>{Q_ICONS[0]}</IconBox>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.15rem, 3vw, 1.45rem)',
                fontWeight: 500, color: 'var(--blue-900)', lineHeight: 1.3, marginBottom: '1.5rem',
                textAlign: isRTL ? 'right' : 'left',
              }}>
                {t.quiz.q1}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {ordersOptions.map((label, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOrderSelect(idx, label)}
                    style={{
                      background: selected === idx ? 'var(--gray-900)' : 'var(--white)',
                      color: selected === idx ? '#fff' : 'var(--gray-800)',
                      border: `1.5px solid ${selected === idx ? 'var(--gray-900)' : 'var(--gray-200)'}`,
                      borderRadius: 12, padding: '0.9rem 1.1rem',
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 400,
                      textAlign: isRTL ? 'right' : 'left', cursor: 'pointer', transition: 'all .2s',
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      direction: isRTL ? 'rtl' : 'ltr',
                    }}
                    onMouseEnter={e => {
                      if (selected !== idx) {
                        e.currentTarget.style.borderColor = 'var(--gray-400)'
                        e.currentTarget.style.background = 'var(--gray-50)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (selected !== idx) {
                        e.currentTarget.style.borderColor = 'var(--gray-200)'
                        e.currentTarget.style.background = 'var(--white)'
                      }
                    }}
                  >
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: selected === idx ? 'rgba(255,255,255,0.15)' : 'var(--gray-100)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.72rem', fontWeight: 700,
                      color: selected === idx ? '#fff' : 'var(--gray-500)',
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span style={{ direction: 'ltr', unicodeBidi: 'isolate' }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Q2: Brand name ── */}
        {step === 2 && (
          <div key="q2" style={{ animation: 'fadeUp .3s ease both' }}>
            <ProgressBar step={2} total={totalQ} t={t} />
            <div style={{ padding: '1.75rem' }}>
              <IconBox>{Q_ICONS[1]}</IconBox>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.15rem, 3vw, 1.45rem)',
                fontWeight: 500, color: 'var(--blue-900)', lineHeight: 1.3, marginBottom: '1.5rem',
                textAlign: isRTL ? 'right' : 'left',
              }}>
                {t.quiz.q2}
              </h3>
              <form onSubmit={handleBrandSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <input
                  type="text"
                  placeholder={t.quiz.q2placeholder}
                  value={brandInput}
                  onChange={e => setBrandInput(e.target.value)}
                  required autoFocus
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '1rem',
                    border: '1.5px solid var(--gray-200)', borderRadius: 12,
                    padding: '0.9rem 1rem', outline: 'none',
                    transition: 'border-color .2s', width: '100%',
                    textAlign: isRTL ? 'right' : 'left',
                    direction: isRTL ? 'rtl' : 'ltr',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--gray-600)'}
                  onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--blue-600)', color: '#fff',
                    border: 'none', borderRadius: 12, padding: '1rem',
                    fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600,
                    cursor: 'pointer', transition: 'background .2s',
                  }}
                  onMouseEnter={e => e.target.style.background = 'var(--blue-700)'}
                  onMouseLeave={e => e.target.style.background = 'var(--blue-600)'}
                >
                  {isRTL ? '\u2190' : '\u2192'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ── Q3: Product type ── */}
        {step === 3 && (
          <div key="q3" style={{ animation: 'fadeUp .3s ease both' }}>
            <ProgressBar step={3} total={totalQ} t={t} />
            <div style={{ padding: '1.75rem' }}>
              <IconBox>{Q_ICONS[2]}</IconBox>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.15rem, 3vw, 1.45rem)',
                fontWeight: 500, color: 'var(--blue-900)', lineHeight: 1.3, marginBottom: '1.5rem',
                textAlign: isRTL ? 'right' : 'left',
              }}>
                {t.quiz.q3}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {productOptions.map((label, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleProductSelect(idx, label)}
                    style={{
                      background: selected === idx ? 'var(--gray-900)' : 'var(--white)',
                      color: selected === idx ? '#fff' : 'var(--gray-800)',
                      border: `1.5px solid ${selected === idx ? 'var(--gray-900)' : 'var(--gray-200)'}`,
                      borderRadius: 12, padding: '0.9rem 1.1rem',
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 400,
                      textAlign: isRTL ? 'right' : 'left', cursor: 'pointer', transition: 'all .2s',
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      direction: isRTL ? 'rtl' : 'ltr',
                    }}
                    onMouseEnter={e => {
                      if (selected !== idx) {
                        e.currentTarget.style.borderColor = 'var(--gray-400)'
                        e.currentTarget.style.background = 'var(--gray-50)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (selected !== idx) {
                        e.currentTarget.style.borderColor = 'var(--gray-200)'
                        e.currentTarget.style.background = 'var(--white)'
                      }
                    }}
                  >
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: selected === idx ? 'rgba(255,255,255,0.15)' : 'var(--gray-100)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.72rem', fontWeight: 700,
                      color: selected === idx ? '#fff' : 'var(--gray-500)',
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CAPTURE ── */}
        {isCapture && (
          <div style={{ padding: '2.5rem 1.75rem', animation: 'fadeUp .3s ease both', textAlign: isRTL ? 'right' : 'left' }}>
            <IconBox size={64}>{Ico.mail}</IconBox>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', fontWeight: 500, color: 'var(--blue-900)', lineHeight: 1.2, marginBottom: '0.75rem' }}>
              {t.quiz.captureTitle}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: 1.65, marginBottom: '1.75rem', fontWeight: 300 }}>
              {t.quiz.captureDesc}
            </p>

            {/* Toggle */}
            <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 10, padding: '4px', marginBottom: '1.25rem', gap: '4px' }}>
              {[['phone', t.quiz.capturePhone],['email', t.quiz.captureEmail]].map(([method, label]) => (
                <button
                  key={method}
                  onClick={() => setContact(c => ({ ...c, method }))}
                  style={{
                    flex: 1, border: 'none', borderRadius: 8, padding: '0.6rem',
                    fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
                    cursor: 'pointer', transition: 'all .2s',
                    background: contact.method === method ? 'var(--white)' : 'transparent',
                    color: contact.method === method ? 'var(--gray-800)' : 'var(--gray-400)',
                    boxShadow: contact.method === method ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                  }}
                >{label}</button>
              ))}
            </div>

            <form onSubmit={handleCapture} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <input
                key={contact.method}
                type={contact.method === 'phone' ? 'tel' : 'email'}
                placeholder={contact.method === 'phone' ? t.quiz.capturePlaceholderPhone : t.quiz.capturePlaceholderEmail}
                value={contact.value}
                onChange={e => setContact(c => ({ ...c, value: e.target.value }))}
                required autoFocus
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '1rem',
                  border: '1.5px solid var(--gray-200)', borderRadius: 12,
                  padding: '0.9rem 1rem', outline: 'none',
                  transition: 'border-color .2s', width: '100%',
                  textAlign: contact.method === 'phone' ? 'left' : (isRTL ? 'right' : 'left'),
                  direction: contact.method === 'phone' ? 'ltr' : (isRTL ? 'rtl' : 'ltr'),
                }}
                onFocus={e => e.target.style.borderColor = 'var(--gray-600)'}
                onBlur={e => e.target.style.borderColor = 'var(--gray-200)'}
              />
              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: submitting ? 'var(--gray-400)' : 'var(--blue-600)',
                  color: '#fff', border: 'none', borderRadius: 12,
                  padding: '1rem', fontFamily: 'var(--font-body)', fontSize: '1rem',
                  fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'background .2s',
                }}
              >
                {submitting ? t.quiz.captureSubmitting : t.quiz.captureSubmit}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem', color: 'var(--gray-400)' }}>
              {Ico.lock}
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem' }}>{t.quiz.capturePrivacy}</span>
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {isResult && (
          <div style={{ animation: 'fadeUp .35s ease both' }}>
            <div style={{ background: 'var(--blue-800)', padding: '2.5rem 1.75rem 2rem', borderRadius: '20px 20px 0 0', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: '#fff', opacity: 0.9 }}>
                {Ico.rocket}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '0.5rem' }}>
                {t.quiz.resultLabel}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 400, color: '#fff', lineHeight: 1.2, marginBottom: '1.25rem' }}>
                {t.quiz.resultTitle}
              </h3>
            </div>

            <div style={{ padding: '1.75rem' }}>
              <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', textAlign: isRTL ? 'right' : 'left' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--gray-700)', lineHeight: 1.7, fontWeight: 300 }}>{t.quiz.resultDesc}</p>
              </div>

              {/* Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem', textAlign: isRTL ? 'right' : 'left' }}>
                {[
                  [t.quiz.q1, answers.orders],
                  [t.quiz.q2, answers.brand],
                  [t.quiz.q3, answers.productType],
                ].map(([q, a]) => (
                  <div key={q} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid var(--gray-100)' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--gray-500)', maxWidth: '55%' }}>{q}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--blue-700)' }}>{a}</span>
                  </div>
                ))}
              </div>

              <a
                href="tel:0562940733"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  width: '100%', textAlign: 'center',
                  background: 'var(--blue-600)', color: '#fff',
                  borderRadius: 12, padding: '1rem',
                  fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600,
                  textDecoration: 'none', marginBottom: '0.75rem',
                  transition: 'background .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-700)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--blue-600)'}
              >
                {Ico.phone} {t.quiz.resultCta}
              </a>
              <button
                onClick={onClose}
                style={{
                  display: 'block', width: '100%', textAlign: 'center',
                  background: 'transparent', color: 'var(--gray-400)',
                  border: '1px solid var(--gray-200)', borderRadius: 12, padding: '0.8rem',
                  fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer',
                }}
              >{t.quiz.close}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
