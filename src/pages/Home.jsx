import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import NewsCard from '../components/NewsCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getArticlesByCategory, getFeaturedArticles, CATEGORIES } from '../data/news'

function SkeletonCard({ featured = false }) {
  if (featured) {
    return (
      <div className="glass-card overflow-hidden col-span-2" style={{ borderRadius: '20px' }}>
        <div className="h-[400px] shimmer" />
        <div className="p-8 space-y-3">
          <div className="h-3 w-24 shimmer rounded" />
          <div className="h-6 w-3/4 shimmer rounded" />
          <div className="h-4 w-1/2 shimmer rounded" />
        </div>
      </div>
    )
  }
  return (
    <div className="glass-card overflow-hidden" style={{ borderRadius: '20px' }}>
      <div className="h-48 shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 shimmer rounded" />
        <div className="h-5 w-full shimmer rounded" />
        <div className="h-4 w-3/4 shimmer rounded" />
      </div>
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('all')
  const [loading, setLoading] = useState(true)
  const { isDark } = useTheme()

  useEffect(() => {
    // Simulate loading for smooth entrance animation
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Reset loading when tab changes
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [activeTab])

  const filteredArticles = useMemo(() => getArticlesByCategory(activeTab), [activeTab])
  const featuredArticles = useMemo(() => getFeaturedArticles(), [])
  const currentCategory = CATEGORIES.find(c => c.id === activeTab)

  return (
    <div className="min-h-[100dvh]" style={{ background: 'var(--nova-bg)' }}>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-[1400px] mx-auto px-4 pt-28 md:pt-24 pb-12">
        {/* Hero Section - Featured Article */}
        {activeTab === 'all' && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 mt-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-3xl md:text-4xl font-bold font-display" style={{ color: 'var(--nova-text)' }}>
                Top Stories
              </h1>
              <div className="flex-1 h-px" style={{ background: 'var(--nova-glass-border)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--nova-text-secondary)' }}>
                Today
              </span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SkeletonCard featured />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredArticles.slice(0, 1).map((article, i) => (
                  <NewsCard key={article.id} article={article} index={i} featured />
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <h2 className="text-xl font-bold font-display" style={{ color: 'var(--nova-text)' }}>
            {activeTab === 'all' ? 'Latest Stories' : currentCategory?.label || 'Articles'}
          </h2>
          <div className="flex-1 h-px" style={{ background: 'var(--nova-glass-border)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--nova-text-secondary)' }}>
            {filteredArticles.length} articles
          </span>
        </motion.div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
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
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--nova-text)' }}>
              No articles found
            </h3>
            <p className="text-sm" style={{ color: 'var(--nova-text-secondary)' }}>
              No articles in this category yet. Check back soon.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredArticles.map((article, i) => (
              <NewsCard key={article.id} article={article} index={i} />
            ))}
          </div>
        )}

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl glass p-8 md:p-12 text-center relative overflow-hidden"
          style={{ border: '1px solid var(--nova-glass-border)' }}
        >
          <div className="relative z-10 max-w-lg mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold font-display mb-3" style={{ color: 'var(--nova-text)' }}>
              Stay Ahead of the Curve
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--nova-text-secondary)' }}>
              Get the latest stories delivered to your inbox every morning.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="comment-input !min-h-[0px] py-3 text-sm flex-1"
              />
              <motion.button
                className="px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap"
                style={{ background: 'var(--nova-accent)', color: 'white' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
