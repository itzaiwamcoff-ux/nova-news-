import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('nova-theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [mounted, setMounted] = useState(false)

  // Admin auth state
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('nova-admin') === 'true'
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('nova-theme', isDark ? 'dark' : 'light')
  }, [isDark, mounted])

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev)
  }, [])

  const loginAdmin = useCallback((email, password) => {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('nova-admin', 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }, [])

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem('nova-admin')
    setIsAdmin(false)
  }, [])

  return (
    <ThemeContext.Provider value={{
      isDark, toggleTheme, mounted,
      isAdmin, loginAdmin, logoutAdmin
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
