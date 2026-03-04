import React, { createContext, useContext, useState, useEffect } from 'react'
import fr from './fr'
import ar from './ar'

const translations = { fr, ar }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('dpros-lang') || 'ar' } catch { return 'ar' }
  })

  const t = translations[lang] || translations.fr
  const dir = t.dir
  const isRTL = dir === 'rtl'

  useEffect(() => {
    try { localStorage.setItem('dpros-lang', lang) } catch {}
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', dir)
    document.body.style.fontFamily = isRTL
      ? "'Noto Sans Arabic', 'DM Sans', system-ui, sans-serif"
      : "'DM Sans', system-ui, sans-serif"
  }, [lang, dir, isRTL])

  const toggleLang = () => setLang(l => l === 'fr' ? 'ar' : 'fr')

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, dir, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
