import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import type { FlashCard as FlashCardType } from '../types'
import FlashCard from './FlashCard'
import { useSpacedRepetition } from '../hooks/useSpacedRepetition'

interface Props {
  cards: FlashCardType[]
  onComplete: (stats: { reviewed: number; mastered: number }) => void
}

export default function CardDeck({ cards, onComplete }: Props) {
  const { dueCards, recordQuality, stats } = useSpacedRepetition(cards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [reviewed, setReviewed] = useState(0)
  const [mastered, setMastered] = useState(0)
  const [done, setDone] = useState(false)

  // Use due cards if available, otherwise use all cards (new user)
  const activeCards = dueCards.length > 0 ? dueCards : cards

  const currentCard = activeCards[currentIndex]

  const handleResult = useCallback((quality: number) => {
    if (!currentCard) return
    recordQuality(currentCard.id, quality)
    setReviewed(prev => prev + 1)
    if (quality >= 3) setMastered(prev => prev + 1)

    if (currentIndex + 1 >= activeCards.length) {
      setDone(true)
      onComplete({ reviewed: reviewed + 1, mastered: quality >= 3 ? mastered + 1 : mastered })
    } else {
      setCurrentIndex(prev => prev + 1)
      setIsFlipped(false)
    }
  }, [currentCard, currentIndex, activeCards.length, recordQuality, reviewed, mastered, onComplete])

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setIsFlipped(false)
    }
  }

  if (done || activeCards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <CheckCircle2 size={64} className="text-emerald-500" />
        <h2 className="text-xl font-bold">本轮完成！</h2>
        <p className="text-gray-500">复习了 {reviewed} 张卡片，掌握了 {mastered} 张</p>
        <p className="text-sm text-gray-400">
          总计 {stats.total} 张 · 已掌握 {stats.mastered} · 学习中 {stats.learning} · 未开始 {stats.untried}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
        >
          再来一轮
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Progress bar */}
      <div className="w-full max-w-lg flex items-center gap-2 mb-2">
        <button onClick={goBack} disabled={currentIndex === 0}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex) / activeCards.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 min-w-[3rem] text-right">{currentIndex + 1}/{activeCards.length}</span>
        <button onClick={() => { setCurrentIndex(prev => Math.min(prev + 1, activeCards.length - 1)); setIsFlipped(false); }}
          disabled={currentIndex >= activeCards.length - 1}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          <FlashCard
            card={currentCard}
            onResult={handleResult}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(true)}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
