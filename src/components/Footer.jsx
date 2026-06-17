import React from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Footer() {
  const { isDark } = useTheme()
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-20 border-t" style={{
      borderColor: 'var(--nova-glass-border)',
      background: 'var(--nova-card-bg)',
    }}>
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center nova-gradient font-extrabold text-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--nova-accent), #00CCFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                N
              </div>
              <span className="font-display font-bold text-lg" style={{ color: 'var(--nova-text)' }}>
                Nova
              </span>
            </div>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: 'var(--nova-text-secondary)' }}>
              Your premium source for gaming, technology, science, and digital culture news.
              We bring you the stories that shape tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--nova-text)' }}>Categories</h4>
            <ul className="space-y-2">
              {['Game', 'Tech', 'Science', 'Business'].map(cat => (
                <li key={cat}>
                  <a
                    href={`/?tab=${cat.toLowerCase()}`}
                    className="text-sm transition-colors hover:text-[var(--nova-accent)]"
                    style={{ color: 'var(--nova-text-secondary)' }}
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--nova-text)' }}>Company</h4>
            <ul className="space-y-2">
              {['About', 'Contact', 'Careers', 'Privacy'].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors hover:text-[var(--nova-accent)]"
                    style={{ color: 'var(--nova-text-secondary)' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{
          borderTop: '1px solid var(--nova-glass-border)',
        }}>
          <p className="text-xs" style={{ color: 'var(--nova-text-secondary)' }}>
            &copy; {year} Nova News. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Twitter', 'GitHub', 'Discord'].map(social => (
              <a
                key={social}
                href="#"
                className="text-xs transition-colors hover:text-[var(--nova-accent)]"
                style={{ color: 'var(--nova-text-secondary)' }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
