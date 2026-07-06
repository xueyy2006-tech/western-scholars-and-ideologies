import { useState, useEffect } from 'react'
import { Quote } from 'lucide-react'
import { dailyQuotes } from '../data/quotes'

export default function QuoteBanner() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * dailyQuotes.length))

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % dailyQuotes.length)
    }, 30000) // rotate every 30s
    return () => clearInterval(interval)
  }, [])

  const quote = dailyQuotes[index]

  if (!quote) return null

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-950 dark:via-gray-900 dark:to-accent-950 border border-gray-200 dark:border-gray-800 p-5">
      <Quote size={32} className="absolute -top-2 -left-2 text-primary-200 dark:text-primary-800 opacity-50" />
      <blockquote className="relative">
        <p className="text-base leading-relaxed italic mb-2 text-gray-700 dark:text-gray-300">
          「{quote.text}」
        </p>
        <footer className="text-sm font-medium text-primary-600 dark:text-primary-400">
          — {quote.thinker} {quote.source && <span className="text-gray-400 font-normal">· {quote.source}</span>}
        </footer>
      </blockquote>
    </div>
  )
}
