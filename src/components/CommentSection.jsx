import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { defaultComments as defaultCommentsData } from '../data/news'

function CommentItem({ comment, isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl glass-card"
      style={{
        border: '1px solid var(--nova-glass-border)',
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
          style={{
            background: 'var(--nova-accent)',
            color: 'white',
          }}
        >
          {comment.author.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--nova-text)' }}>{comment.author}</p>
          <p className="text-[10px]" style={{ color: 'var(--nova-text-secondary)' }}>
            {new Date(comment.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--nova-text-secondary)' }}>
        {comment.text}
      </p>
    </motion.div>
  )
}

export default function CommentSection({ articleId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isDark } = useTheme()

  // Load comments from localStorage or defaults
  useEffect(() => {
    const stored = localStorage.getItem(`nova-comments-${articleId}`)
    if (stored) {
      try {
        setComments(JSON.parse(stored))
      } catch {
        setComments([])
      }
    } else {
      // Load default comments from data
      const defaults = defaultCommentsData[articleId] || []
      setComments(defaults)
    }
  }, [articleId])

  // Save comments to localStorage
  const saveComments = (newComments) => {
    setComments(newComments)
    localStorage.setItem(`nova-comments-${articleId}`, JSON.stringify(newComments))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newComment.trim() || !authorName.trim()) return

    setIsSubmitting(true)

    const comment = {
      id: `c${Date.now()}`,
      author: authorName.trim(),
      text: newComment.trim(),
      date: new Date().toISOString(),
    }

    saveComments([...comments, comment])
    setNewComment('')
    setIsSubmitting(false)
  }

  const handleClearComments = () => {
    saveComments([])
  }

  // Get user name from stored profile
  useEffect(() => {
    const stored = localStorage.getItem('nova-user')
    if (stored) {
      try {
        const user = JSON.parse(stored)
        if (user.name) setAuthorName(user.name)
      } catch {}
    }
  }, [])

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold font-display flex items-center gap-2" style={{ color: 'var(--nova-text)' }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={isDark ? 'white' : 'black'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          Comments ({comments.length})
        </h3>
        {comments.length > 0 && (
          <button
            onClick={handleClearComments}
            className="text-xs glass-button !py-1 !px-3"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-3">
          <input
            type="text"
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            placeholder="Your name"
            className="comment-input !min-h-[0px] py-2.5 text-sm"
            required
          />
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="comment-input"
            required
          />
          <div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={isSubmitting || !newComment.trim() || !authorName.trim()}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
              style={{ background: 'var(--nova-accent)', color: 'white' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </motion.button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        <AnimatePresence>
          {comments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
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
                No comments yet. Be the first to share your thoughts!
              </p>
            </motion.div>
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} isDark={isDark} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
