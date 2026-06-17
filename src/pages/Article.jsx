import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import CommentSection from '../components/CommentSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getArticle, articles } from '../data/news'

const categoryColors = {
  game: '#0066FF',
  tech: '#00CCFF',
  science: '#7C3AED',
  business: '#059669',
  entertainment: '#DC2626',
  sports: '#F59E0B',
}

export default function Article() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    setLoading(true)
    // Simulate loading
    const timer = setTimeout(() => {
      const found = getArticle(id)
      setArticle(found)
      setLoading(false)
      window.scrollTo(0, 0)
    }, 300)
    return () => clearTimeout(timer)
  }, [id])

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setReadingProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="min-h-[100dvh]" style={{ background: 'var(--nova-bg)' }}>
        <Navbar />
        <div className="max-w-[800px] mx-auto px-4 pt-28 pb-12">
          <div className="space-y-6">
            <div className="h-6 w-24 shimmer rounded" />
            <div className="h-10 w-3/4 shimmer rounded" />
            <div className="h-80 shimmer rounded-2xl" />
            <div className="space-y-3">
              <div className="h-4 w-full shimmer rounded" />
              <div className="h-4 w-5/6 shimmer rounded" />
              <div className="h-4 w-4/6 shimmer rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-[100dvh]" style={{ background: 'var(--nova-bg)' }}>
        <Navbar />
        <div className="max-w-[800px] mx-auto px-4 pt-28 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={isDark ? 'white' : 'black'}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-16 h-16 mx-auto mb-4 opacity-20"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--nova-text)' }}>
              Article Not Found
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--nova-text-secondary)' }}>
              The article you are looking for does not exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/')}
              className="glass-button"
            >
              Back to Home
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  const accent = categoryColors[article.category] || '#0066FF'

  return (
    <div className="min-h-[100dvh]" style={{ background: 'var(--nova-bg)' }}>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5" style={{ background: 'var(--nova-glass-bg)' }}>
        <motion.div
          className="h-full"
          style={{ width: `${readingProgress}%`, background: 'var(--nova-accent)' }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <Navbar />

      <article className="max-w-[800px] mx-auto px-4 pt-28 pb-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="glass-button !py-2 !px-4 mb-6 flex items-center gap-2 text-sm"
          whileHover={{ x: -4 }}
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
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </motion.button>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="nova-badge text-xs" style={{
              background: `${accent}20`,
              borderColor: `${accent}40`,
              color: accent,
            }}>
              {article.category}
            </span>
            <span className="text-xs" style={{ color: 'var(--nova-text-secondary)' }}>{article.date}</span>
            <span className="w-1 h-1 rounded-full" style={{ background: 'var(--nova-text-secondary)' }} />
            <span className="text-xs" style={{ color: 'var(--nova-text-secondary)' }}>{article.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4 leading-tight" style={{ color: 'var(--nova-text)' }}>
            {article.title}
          </h1>

          <p className="text-lg mb-6" style={{ color: 'var(--nova-text-secondary)' }}>
            {article.excerpt}
          </p>

          <div className="flex items-center gap-3 mb-8 pb-6" style={{ borderBottom: '1px solid var(--nova-glass-border)' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              style={{ background: 'var(--nova-accent)' }}
            >
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--nova-text)' }}>{article.author}</p>
              <p className="text-xs" style={{ color: 'var(--nova-text-secondary)' }}>Staff Writer</p>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 rounded-2xl overflow-hidden glass-card"
          style={{ border: '1px solid var(--nova-glass-border)' }}
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[300px] md:h-[450px] object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-sm md:prose-base max-w-none"
          style={{
            color: 'var(--nova-text)',
            '--tw-prose-body': 'var(--nova-text)',
            '--tw-prose-headings': 'var(--nova-text)',
            '--tw-prose-bold': 'var(--nova-text)',
          }}
        >
          {article.content.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              className="mb-5 leading-relaxed text-[15px] md:text-base"
              style={{ color: 'var(--nova-text-secondary)' }}
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6" style={{ borderTop: '1px solid var(--nova-glass-border)' }}>
          {['news', article.category, 'trending'].map(tag => (
            <span
              key={tag}
              className="text-xs glass-button !py-1 !px-3 cursor-default hover:!transform-none"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-lg font-bold font-display mb-4" style={{ color: 'var(--nova-text)' }}>
            Related Articles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles
              .filter(a => a.category === article.category && a.id !== article.id)
              .slice(0, 2)
              .map(related => (
                <motion.div
                  key={related.id}
                  onClick={() => navigate(`/article/${related.id}`)}
                  className="glass-card p-4 cursor-pointer flex gap-4"
                  style={{ border: '1px solid var(--nova-glass-border)', borderRadius: '16px' }}
                  whileHover={{ y: -3 }}
                >
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold line-clamp-2" style={{ color: 'var(--nova-text)' }}>
                      {related.title}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--nova-text-secondary)' }}>
                      {related.readTime} read
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Comment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 pt-8"
          style={{ borderTop: '1px solid var(--nova-glass-border)' }}
        >
          <CommentSection articleId={article.id} />
        </motion.div>
      </article>

      <Footer />
    </div>
  )
}
