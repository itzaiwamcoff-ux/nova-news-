import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'

const menuItems = [
  { label: 'Home', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'Categories', path: '/?tab=all', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { label: 'Admin', path: '/admin', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { label: 'About', path: '/', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
]

export default function MenuPanel({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { isDark } = useTheme()

  const handleNavigate = (path) => {
    navigate(path)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-50 glass overflow-y-auto"
            style={{
              borderLeft: '1px solid var(--nova-glass-border)',
              borderTopLeftRadius: '24px',
              borderBottomLeftRadius: '24px',
            }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold font-display" style={{ color: 'var(--nova-text)' }}>
                  Menu
                </span>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center rounded-full glass-button !p-0"
                    aria-label="Close menu"
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
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-2">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    onClick={() => handleNavigate(item.path)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl glass-card hover:!transform-none group"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'var(--nova-glass-bg)',
                        border: '1px solid var(--nova-glass-border)',
                      }}
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
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium" style={{ color: 'var(--nova-text)' }}>{item.label}</p>
                    </div>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isDark ? 'white' : 'black'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 opacity-40"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </motion.button>
                ))}
              </nav>

              {/* Footer */}
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--nova-glass-border)' }}>
                <p className="text-xs text-center" style={{ color: 'var(--nova-text-secondary)' }}>
                  Nova News v1.0
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
