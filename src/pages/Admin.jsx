import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { articles, CATEGORIES } from '../data/news'

function StatCard({ icon, label, value, accentColor }) {
  return (
    <motion.div
      className="glass-card p-5 flex items-center gap-4"
      style={{ border: '1px solid var(--nova-glass-border)', borderRadius: '16px' }}
      whileHover={{ y: -3 }}
    >
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${accentColor}20` }}>
        <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d={icon} />
        </svg>
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--nova-text-secondary)' }}>{label}</p>
        <p className="text-2xl font-bold font-display" style={{ color: 'var(--nova-text)' }}>{value}</p>
      </div>
    </motion.div>
  )
}

export default function Admin() {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('articles')
  const [commentCount, setCommentCount] = useState(0)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)

  // Count total comments across all articles
  useEffect(() => {
    let total = 0
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('nova-comments-')) {
        try {
          const comments = JSON.parse(localStorage.getItem(key))
          total += comments.length
        } catch {}
      }
    }
    setCommentCount(total)
  }, [])

  const handleDeleteArticle = (id) => {
    // In a real app, this would call an API
    // For demo, we remove from displayed list (data is from a static array)
    alert('Article removed. In production this would call your API.')
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getCommentCount = (articleId) => {
    const stored = localStorage.getItem(`nova-comments-${articleId}`)
    if (stored) {
      try {
        return JSON.parse(stored).length
      } catch {
        return 0
      }
    }
    return 0
  }

  const stats = [
    {
      icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
      label: 'Total Articles',
      value: articles.length,
      accentColor: '#0066FF',
    },
    {
      icon: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
      label: 'Total Comments',
      value: commentCount,
      accentColor: '#00CCFF',
    },
    {
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      label: 'Categories',
      value: CATEGORIES.length - 1,
      accentColor: '#7C3AED',
    },
    {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      label: 'This Week',
      value: Math.ceil(articles.length * 0.6),
      accentColor: '#059669',
    },
  ]

  // Add/Edit form
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'game',
    author: '',
    image: '',
  })

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'game',
      author: '',
      image: '',
    })
    setEditingArticle(null)
    setShowAddForm(false)
  }

  const handleEditArticle = (article) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      author: article.author,
      image: article.image,
    })
    setEditingArticle(article.id)
    setShowAddForm(true)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // In production this would save to a database
    alert(editingArticle
      ? 'Article updated! In production this would save to your database.'
      : 'Article created! In production this would save to your database.'
    )
    resetForm()
  }

  return (
    <div className="min-h-[100dvh]" style={{ background: 'var(--nova-bg)' }}>
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-4 pt-28 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold font-display" style={{ color: 'var(--nova-text)' }}>
              Admin Dashboard
            </h1>
            <div className="flex-1 h-px" style={{ background: 'var(--nova-glass-border)' }} />
            <span className="text-xs font-medium glass-button !py-1 !px-3 cursor-default hover:!transform-none">
              Admin
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--nova-text-secondary)' }}>
            Manage your news articles, comments, and site content.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6"
        >
          {[
            { id: 'articles', label: 'Articles' },
            { id: 'comments', label: 'Comments' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'glass-button'
              }`}
              style={activeTab === tab.id ? { background: 'var(--nova-accent)' } : {}}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content Area */}
        {activeTab === 'articles' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="articles"
            className="space-y-4"
          >
            {/* Add Article Button + Form Toggle */}
            <div className="flex justify-end">
              <button
                onClick={() => { resetForm(); setShowAddForm(!showAddForm) }}
                className="glass-button flex items-center gap-2 text-sm"
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
                  <path d="M12 5v14M5 12h14" />
                </svg>
                {showAddForm ? 'Cancel' : 'New Article'}
              </button>
            </div>

            {/* Add/Edit Form */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass-card p-6 overflow-hidden"
                  style={{ border: '1px solid var(--nova-glass-border)', borderRadius: '16px' }}
                >
                  <h3 className="text-lg font-bold font-display mb-4" style={{ color: 'var(--nova-text)' }}>
                    {editingArticle ? 'Edit Article' : 'Create New Article'}
                  </h3>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--nova-text-secondary)' }}>Title</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={e => setFormData({...formData, title: e.target.value})}
                          className="comment-input !min-h-[0px] py-2.5 text-sm"
                          placeholder="Article title"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--nova-text-secondary)' }}>Category</label>
                        <select
                          value={formData.category}
                          onChange={e => setFormData({...formData, category: e.target.value})}
                          className="comment-input !min-h-[0px] py-2.5 text-sm"
                          style={{ cursor: 'pointer' }}
                        >
                          {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--nova-text-secondary)' }}>Excerpt</label>
                      <input
                        type="text"
                        value={formData.excerpt}
                        onChange={e => setFormData({...formData, excerpt: e.target.value})}
                        className="comment-input !min-h-[0px] py-2.5 text-sm"
                        placeholder="Brief summary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--nova-text-secondary)' }}>Content</label>
                      <textarea
                        value={formData.content}
                        onChange={e => setFormData({...formData, content: e.target.value})}
                        className="comment-input text-sm"
                        placeholder="Full article content..."
                        rows="6"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--nova-text-secondary)' }}>Author</label>
                        <input
                          type="text"
                          value={formData.author}
                          onChange={e => setFormData({...formData, author: e.target.value})}
                          className="comment-input !min-h-[0px] py-2.5 text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--nova-text-secondary)' }}>Image URL</label>
                        <input
                          type="url"
                          value={formData.image}
                          onChange={e => setFormData({...formData, image: e.target.value})}
                          className="comment-input !min-h-[0px] py-2.5 text-sm"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button type="button" onClick={resetForm} className="glass-button text-sm">
                        Cancel
                      </button>
                      <motion.button
                        type="submit"
                        className="px-5 py-2 rounded-xl text-sm font-semibold"
                        style={{ background: 'var(--nova-accent)', color: 'white' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {editingArticle ? 'Update Article' : 'Publish Article'}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Articles Table */}
            <div className="glass-card overflow-hidden" style={{ border: '1px solid var(--nova-glass-border)', borderRadius: '16px' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--nova-glass-border)' }}>
                      <th className="text-left p-4 font-semibold" style={{ color: 'var(--nova-text)' }}>Title</th>
                      <th className="text-left p-4 font-semibold hide-mobile" style={{ color: 'var(--nova-text)' }}>Category</th>
                      <th className="text-left p-4 font-semibold hide-mobile" style={{ color: 'var(--nova-text)' }}>Author</th>
                      <th className="text-left p-4 font-semibold hide-mobile" style={{ color: 'var(--nova-text)' }}>Date</th>
                      <th className="text-center p-4 font-semibold" style={{ color: 'var(--nova-text)' }}>Comments</th>
                      <th className="text-right p-4 font-semibold" style={{ color: 'var(--nova-text)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article, i) => (
                      <motion.tr
                        key={article.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        style={{ borderBottom: '1px solid var(--nova-glass-border)' }}
                        className="hover:bg-[var(--nova-glass-bg)] transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={article.image}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                            <span className="font-medium line-clamp-1" style={{ color: 'var(--nova-text)' }}>
                              {article.title}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 hide-mobile">
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{
                            background: `${'#0066FF'}15`,
                            color: '#0066FF',
                          }}>
                            {article.category}
                          </span>
                        </td>
                        <td className="p-4 hide-mobile" style={{ color: 'var(--nova-text-secondary)' }}>{article.author}</td>
                        <td className="p-4 hide-mobile" style={{ color: 'var(--nova-text-secondary)' }}>{formatDate(article.date)}</td>
                        <td className="p-4 text-center" style={{ color: 'var(--nova-text-secondary)' }}>{getCommentCount(article.id)}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditArticle(article)}
                              className="p-2 rounded-lg transition-colors hover:bg-[var(--nova-glass-bg)]"
                              title="Edit"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke={isDark ? 'white' : 'black'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(article.id)}
                              className="p-2 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20"
                              title="Delete"
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Comments Tab */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key="comments"
          >
            <div className="glass-card p-6" style={{ border: '1px solid var(--nova-glass-border)', borderRadius: '16px' }}>
              <h3 className="text-lg font-bold font-display mb-4" style={{ color: 'var(--nova-text)' }}>
                All Comments
              </h3>
              {commentCount === 0 ? (
                <div className="text-center py-12">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isDark ? 'white' : 'black'}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-12 h-12 mx-auto mb-3 opacity-20"
                  >
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  <p className="text-sm" style={{ color: 'var(--nova-text-secondary)' }}>
                    No comments yet. Comments from readers will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {articles.map(article => {
                    const commentCount = getCommentCount(article.id)
                    if (commentCount === 0) return null
                    return (
                      <div key={article.id} className="p-4 rounded-xl" style={{ background: 'var(--nova-glass-bg)' }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium line-clamp-1" style={{ color: 'var(--nova-text)' }}>
                            {article.title}
                          </span>
                          <span className="text-xs flex-shrink-0 ml-4" style={{ color: 'var(--nova-text-secondary)' }}>
                            {commentCount} comment{commentCount !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
