import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from './context/ThemeContext'
import { GlassProvider } from './context/GlassContext'
import Home from './pages/Home'
import Article from './pages/Article'
import Admin from './pages/Admin'

// Loading Screen Component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'var(--nova-bg)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, var(--nova-accent), #00CCFF)',
        }}>
          <span className="text-white font-bold text-xl">N</span>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: 'var(--nova-accent)',
                animation: `fadeIn 0.6s ease ${i * 0.15}s infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Protected Admin Route
function AdminRoute({ children }) {
  const { isAdmin } = useTheme()
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }
  return children
}

export default function App() {
  const { mounted } = useTheme()

  if (!mounted) {
    return <LoadingScreen />
  }

  return (
    <GlassProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </GlassProvider>
  )
}
