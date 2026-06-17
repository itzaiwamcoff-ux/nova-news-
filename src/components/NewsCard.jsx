import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const categoryColors = {
  game: '#0066FF',
  tech: '#00CCFF',
  science: '#7C3AED',
  business: '#059669',
  entertainment: '#DC2626',
  sports: '#F59E0B',
}

export default function NewsCard({ article, index = 0, featured = false }) {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const accent = categoryColors[article.category] || '#0066FF'

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => navigate(`/article/${article.id}`)}
        className="glass-card overflow-hidden cursor-pointer group relative col-span-2"
        style={{
          border: '1px solid var(--nova-glass-border)',
          borderRadius: '20px',
        }}
        whileHover={{ y: -6 }}
      >
        <div className="relative h-[320px] md:h-[400px] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, var(--nova-bg) 0%, transparent 50%, transparent 100%)',
          }} />
          <div className="absolute top-4 left-4">
            <span className="nova-badge text-xs px-3 py-1" style={{
              background: `${accent}20`,
              borderColor: `${accent}40`,
              color: accent,
            }}>
              {article.category}
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-3 text-xs mb-3" style={{ color: 'var(--nova-text-secondary)' }}>
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full" style={{ background: 'var(--nova-text-secondary)' }} />
            <span>{article.readTime}</span>
            <span className="w-1 h-1 rounded-full" style={{ background: 'var(--nova-text-secondary)' }} />
            <span>{article.author}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-display mb-2 line-clamp-2" style={{ color: 'var(--nova-text)' }}>
            {article.title}
          </h3>
          <p className="text-sm line-clamp-2 max-w-2xl" style={{ color: 'var(--nova-text-secondary)' }}>
            {article.excerpt}
          </p>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(`/article/${article.id}`)}
      className="glass-card overflow-hidden cursor-pointer group flex flex-col"
      style={{
        border: '1px solid var(--nova-glass-border)',
        borderRadius: '20px',
      }}
      whileHover={{ y: -6 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, var(--nova-bg) 0%, transparent 60%)',
        }} />
        <div className="absolute top-3 left-3">
          <span className="nova-badge text-[10px] px-2 py-0.5" style={{
            background: `${accent}20`,
            borderColor: `${accent}40`,
            color: accent,
          }}>
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[11px] mb-2" style={{ color: 'var(--nova-text-secondary)' }}>
          <span>{article.date}</span>
          <span className="w-1 h-1 rounded-full" style={{ background: 'var(--nova-text-secondary)' }} />
          <span>{article.readTime}</span>
        </div>
        <h3 className="text-base font-bold font-display mb-1.5 line-clamp-2 group-hover:text-[var(--nova-accent)] transition-colors" style={{ color: 'var(--nova-text)' }}>
          {article.title}
        </h3>
        <p className="text-xs line-clamp-2 mb-3 flex-1" style={{ color: 'var(--nova-text-secondary)' }}>
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--nova-text-secondary)' }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>{article.author}</span>
        </div>
      </div>
    </motion.article>
  )
}
