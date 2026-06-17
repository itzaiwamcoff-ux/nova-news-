import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useGlass } from '../context/GlassContext'
import ThemeToggle from './ThemeToggle'
import TabSwitcher from './TabSwitcher'
import MenuPanel from './MenuPanel'
import LoginModal from './LoginModal'

export default function Navbar({ activeTab, onTabChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const { isDark } = useTheme()
  const { navbarOpacity, navbarBlur } = useGlass()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem('nova-user')
      if (stored) {
        try { setUser(JSON.parse(stored)) } catch { setUser(null) }
      } else {
        setUser(null)
      }
    }
    checkUser()
    window.addEventListener('auth-change', checkUser)
    return () => window.removeEventListener('auth-change', checkUser)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogin = () => {
    if (user) {
      localStorage.removeItem('nova-user')
      setUser(null)
      window.dispatchEvent(new Event('auth-change'))
    } else {
      setLoginOpen(true)
    }
  }

  const isHome = location.pathname === '/'

  return (
    <>
      {/* Top Navigation Bar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
          scrolled ? 'pt-2 pb-2' : 'pt-4 pb-2'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4">
          <div
            className={`rounded-2xl px-5 py-2.5 transition-all duration-500 ${
              scrolled ? 'shadow-lg' : ''
            }`}
            style={{
              background: isDark
                ? `rgba(0, 43, 71, ${Math.min(navbarOpacity + 0.3, 0.9)})`
                : `rgba(255, 255, 255, ${navbarOpacity})`,
              backdropFilter: `blur(${navbarBlur}px) saturate(180%)`,
              WebkitBackdropFilter: `blur(${navbarBlur}px) saturate(180%)`,
              border: '1px solid var(--nova-glass-border)',
              boxShadow: scrolled
                ? `inset 0 1px 0 rgba(255,255,255,${isDark ? '0.15' : '0.4'}), 0 8px 32px var(--nova-glass-shadow)`
                : `inset 0 1px 0 rgba(255,255,255,${isDark ? '0.15' : '0.4'})`,
            }}
          >
            <div className="flex items-center justify-between">
              {/* Left: Logo + Auth */}
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center nova-gradient font-extrabold text-lg"
                    style={{
                      background: 'linear-gradient(135deg, var(--nova-accent), #00CCFF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    N
                  </div>
                  <span className="font-display font-bold text-lg hidden sm:block" style={{ color: 'var(--nova-text)' }}>
                    Nova
                  </span>
                </motion.button>

                <motion.button
                  onClick={handleLogin}
                  className="glass-button text-sm !py-1.5 !px-4 !rounded-xl flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isDark ? 'white' : 'black'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    {user ? (
                      <>
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </>
                    ) : (
                      <>
                        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" y1="12" x2="3" y2="12" />
                      </>
                    )}
                  </svg>
                  <span>{user ? user.name : 'Sign In'}</span>
                </motion.button>
              </div>

              {/* Center: Language/Tab Switcher */}
              {isHome && (
                <div className="hidden md:flex items-center">
                  <div className="rounded-full px-2 py-1"
                    style={{
                      background: isDark
                        ? `rgba(0, 43, 71, ${Math.min(navbarOpacity + 0.25, 0.9)})`
                        : `rgba(255, 255, 255, ${Math.min(navbarOpacity + 0.05, 0.5)})`,
                      backdropFilter: `blur(${navbarBlur}px) saturate(180%)`,
                      WebkitBackdropFilter: `blur(${navbarBlur}px) saturate(180%)`,
                      border: '1px solid var(--nova-glass-border)',
                    }}
                  >
                    <TabSwitcher activeTab={activeTab} onTabChange={onTabChange} />
                  </div>
                </div>
              )}

              {/* Right: Theme Toggle + Menu */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:block">
                  <ThemeToggle />
                </div>

                <motion.button
                  onClick={() => setMenuOpen(true)}
                  className="w-10 h-10 flex items-center justify-center rounded-full glass-button !p-0 relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Open menu"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isDark ? 'white' : 'black'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Tab Switcher - below header on home */}
      {isHome && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 z-20 px-4 pt-2 pb-3"
          style={{
            background: 'linear-gradient(to bottom, var(--nova-bg) 0%, transparent 100%)',
          }}
        >
          <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {['all', 'game', 'tech', 'science', 'business', 'entertainment', 'sports'].map(cat => (
              <button
                key={cat}
                onClick={() => onTabChange(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-300 glass-button !py-1.5 ${
                  activeTab === cat ? '!bg-[var(--nova-accent)] !text-white !border-[var(--nova-accent)]' : ''
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Menus & Modals */}
      <MenuPanel isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
