import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, Star } from 'lucide-react'
import { useBookmarks } from '../hooks/useBookmarks'
import DeepDive from './DeepDive'
import { deepDives } from '../data/deep-dives'
import { extraDeepDives } from '../data/deep-dives-extra'
import { extraDeepDives2 } from '../data/deep-dives-extra2'
import { newDeepDives } from '../data/deep-dives-new'
import type { FlashCard as FlashCardType } from '../types'

interface Props {
  card: FlashCardType
  onResult: (quality: number) => void
  isFlipped: boolean
  onFlip: () => void
}

export default function FlashCard({ card, onResult, isFlipped, onFlip }: Props) {
  const [showHint, setShowHint] = useState(false)
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const diveId = card.id.replace(/^fc-/, '')
  const dive = deepDives.find(d => d.id === diveId) ?? extraDeepDives.find(d => d.id === diveId) ?? extraDeepDives2.find(d => d.id === diveId) ?? newDeepDives.find(d => d.id === diveId)

  const difficultyLabel = card.difficulty === 1 ? '入门' : card.difficulty === 2 ? '进阶' : '硬核'
  const difficultyColor = card.difficulty === 1 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    : card.difficulty === 2 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
      {/* Card type badge */}
      <span className={`text-xs px-2.5 py-1 rounded-full ${difficultyColor}`}>
        {card.type === 'concept' ? '概念卡' : card.type === 'thinker' ? '人物卡' : '对比卡'} · {difficultyLabel}
      </span>

      {/* Card */}
      <div
        className="relative w-full aspect-[4/3] cursor-pointer perspective-1000"
        onClick={onFlip}
      >
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-lg flex flex-col items-center justify-center p-6">
            <p className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">{card.front}</p>
            <p className="mt-4 text-xs text-gray-400">点击翻转查看答案</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-white dark:bg-gray-900 border-2 border-primary-300 dark:border-primary-700 shadow-lg flex flex-col items-center justify-center p-6 overflow-y-auto">
            {/* Bookmark button — top right of card back */}
            <button
              onClick={(e) => { e.stopPropagation(); toggleBookmark('flashcard', card.id) }}
              className={`absolute top-3 right-3 p-1.5 rounded-lg transition-colors z-10 ${
                isBookmarked('flashcard', card.id) ? 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={isBookmarked('flashcard', card.id) ? '取消收藏' : '加入收藏'}
            >
              <Star size={16} fill={isBookmarked('flashcard', card.id) ? 'currentColor' : 'none'} />
            </button>
            {card.type === 'compare' && card.compareItems ? (
              <div className="w-full text-sm">
                <p className="font-bold text-base mb-3 text-gray-900 dark:text-gray-100">{card.back}</p>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="py-1 text-left text-gray-500 w-1/4"></th>
                      <th className="py-1 text-left text-primary-600 dark:text-primary-400">左</th>
                      <th className="py-1 text-left text-accent-600 dark:text-accent-400">右</th>
                    </tr>
                  </thead>
                  <tbody>
                    {card.compareItems.map((item, i) => (
                      <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-1.5 text-gray-500">{item.label}</td>
                        <td className="py-1.5 pr-2">{item.left}</td>
                        <td className="py-1.5 pr-2">{item.right}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {card.back.split('**').map((part, i) =>
                  i % 2 === 1 ? <strong key={i} className="text-primary-600 dark:text-primary-400">{part}</strong> : part
                )}
              </div>
            )}
            {/* Deep-dive expandable — inside card back */}
            {dive && <DeepDive title={dive.title} content={dive.content} />}
          </div>
        </motion.div>
      </div>

      {/* Hint */}
      {card.hint && !isFlipped && (
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2"
            >
              💡 {card.hint}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Actions */}
      <div className="flex gap-3 w-full max-w-sm">
        {card.hint && !isFlipped && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Lightbulb size={16} />
            提示
          </button>
        )}
        {isFlipped && (
          <>
            <button
              onClick={() => onResult(1)}
              className="flex-1 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              再复习 ↻
            </button>
            <button
              onClick={() => onResult(3)}
              className="flex-1 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
            >
              差不多
            </button>
            <button
              onClick={() => onResult(5)}
              className="flex-1 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
            >
              认识 ✓
            </button>
          </>
        )}
      </div>
    </div>
  )
}
