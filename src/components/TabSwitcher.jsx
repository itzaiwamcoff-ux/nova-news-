import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../data/news'

export default function TabSwitcher({ activeTab, onTabChange }) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const tabsRef = useRef([])
  const navRef = useRef(null)

  useEffect(() => {
    const idx = CATEGORIES.findIndex(c => c.id === activeTab)
    const el = tabsRef.current[idx]
    if (el && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const tabRect = el.getBoundingClientRect()
      setIndicatorStyle({
        left: tabRect.left - navRect.left,
        width: tabRect.width,
      })
    }
  }, [activeTab])

  return (
    <nav
      ref={navRef}
      className="flex items-center gap-1 relative overflow-x-auto scrollbar-none"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {CATEGORIES.map((cat, index) => (
        <button
          key={cat.id}
          ref={el => (tabsRef.current[index] = el)}
          onClick={() => onTabChange(cat.id)}
          className={`
            relative px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap
            transition-colors duration-300 z-10
            ${activeTab === cat.id
              ? 'text-white'
              : 'text-[var(--nova-text-secondary)] hover:text-[var(--nova-text)]'
            }
          `}
        >
          {cat.label}
        </button>
      ))}
      <motion.div
        className="tab-indicator bottom-0"
        animate={indicatorStyle}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'absolute',
          bottom: 0,
          height: 3,
          borderRadius: '3px 3px 0 0',
          background: 'var(--nova-accent)',
        }}
      />
    </nav>
  )
}
