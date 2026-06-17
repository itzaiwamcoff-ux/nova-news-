import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const GlassContext = createContext()

const DEFAULTS = {
  navbarOpacity: 0.15,
  navbarBlur: 20,
  menuOpacity: 0.6,
  menuBlur: 24,
}

export function GlassProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('nova-glass-settings')
    if (saved) {
      try {
        return { ...DEFAULTS, ...JSON.parse(saved) }
      } catch { /* ignore */ }
    }
    return DEFAULTS
  })

  // Persist settings when they change
  useEffect(() => {
    localStorage.setItem('nova-glass-settings', JSON.stringify(settings))
  }, [settings])

  // Apply CSS custom properties to root element
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--glass-navbar-opacity', String(settings.navbarOpacity))
    root.style.setProperty('--glass-navbar-blur', `${settings.navbarBlur}px`)
    root.style.setProperty('--glass-menu-opacity', String(settings.menuOpacity))
    root.style.setProperty('--glass-menu-blur', `${settings.menuBlur}px`)
  }, [settings])

  const updateNavbarGlass = useCallback((opacity, blur) => {
    setSettings(prev => ({ ...prev, navbarOpacity: opacity, navbarBlur: blur }))
  }, [])

  const updateMenuGlass = useCallback((opacity, blur) => {
    setSettings(prev => ({ ...prev, menuOpacity: opacity, menuBlur: blur }))
  }, [])

  const resetDefaults = useCallback(() => {
    setSettings(DEFAULTS)
  }, [])

  return (
    <GlassContext.Provider value={{
      ...settings,
      updateNavbarGlass,
      updateMenuGlass,
      resetDefaults,
    }}>
      {children}
    </GlassContext.Provider>
  )
}

export function useGlass() {
  const context = useContext(GlassContext)
  if (!context) {
    throw new Error('useGlass must be used within a GlassProvider')
  }
  return context
}
