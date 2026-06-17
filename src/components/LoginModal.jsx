import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'

export default function LoginModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('login')
  const { isDark, loginAdmin } = useTheme()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Check for admin credentials
    const isAdminLogin = loginAdmin(formData.email, formData.password)

    if (isAdminLogin) {
      // Admin login successful
      localStorage.setItem('nova-user', JSON.stringify({
        name: 'Admin',
        email: formData.email,
        isLoggedIn: true,
        isAdmin: true,
      }))
      onClose()
      window.dispatchEvent(new Event('auth-change'))
      navigate('/admin')
      return
    }

    // Regular user login (for signup or non-admin)
    if (formData.email === 'admin@gmail.com') {
      setError('Invalid admin password')
      return
    }

    localStorage.setItem('nova-user', JSON.stringify({
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      isLoggedIn: true,
      isAdmin: false,
    }))
    onClose()
    window.dispatchEvent(new Event('auth-change'))
  }

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl glass overflow-hidden"
              style={{ border: '1px solid var(--nova-glass-border)' }}
            >
              {/* Header */}
              <div className="relative p-8 pb-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full glass-button !p-0"
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
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-2xl font-bold font-display mb-1" style={{ color: 'var(--nova-text)' }}>
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-sm" style={{ color: 'var(--nova-text-secondary)' }}>
                  {mode === 'login'
                    ? 'Sign in to your Nova account'
                    : 'Join the Nova community'}
                </p>
              </div>

              {/* Tabs */}
              <div className="flex mx-8 mb-6 rounded-xl p-1" style={{ background: 'var(--nova-glass-bg)' }}>
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    mode === 'login' ? 'text-white' : ''
                  }`}
                  style={
                    mode === 'login'
                      ? { background: 'var(--nova-accent)' }
                      : { color: 'var(--nova-text-secondary)' }
                  }
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    mode === 'signup' ? 'text-white' : ''
                  }`}
                  style={
                    mode === 'signup'
                      ? { background: 'var(--nova-accent)' }
                      : { color: 'var(--nova-text-secondary)' }
                  }
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--nova-text-secondary)' }}>
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => updateField('name', e.target.value)}
                      placeholder="Your name"
                      className="comment-input !min-h-[0px] py-3"
                      required={mode === 'signup'}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--nova-text-secondary)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    placeholder="you@example.com"
                    className="comment-input !min-h-[0px] py-3"
                    required
                  />
                  <p className="text-[10px] mt-1" style={{ color: 'var(--nova-text-secondary)' }}>
                    Admin: admin@gmail.com
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--nova-text-secondary)' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={e => updateField('password', e.target.value)}
                    placeholder="••••••••"
                    className="comment-input !min-h-[0px] py-3"
                    required
                  />
                  <p className="text-[10px] mt-1" style={{ color: 'var(--nova-text-secondary)' }}>
                    Admin password: admin123
                  </p>
                </div>

                {/* Error message */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-medium"
                    style={{ color: '#DC2626' }}
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-sm relative overflow-hidden group"
                  style={{ background: 'var(--nova-accent)', color: 'white' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                  </span>
                </motion.button>

                <p className="text-xs text-center" style={{ color: 'var(--nova-text-secondary)' }}>
                  {mode === 'login' ? (
                    <>Don't have an account?{' '}
                      <button type="button" onClick={() => setMode('signup')} className="font-medium" style={{ color: 'var(--nova-accent)' }}>
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>Already have an account?{' '}
                      <button type="button" onClick={() => setMode('login')} className="font-medium" style={{ color: 'var(--nova-accent)' }}>
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
