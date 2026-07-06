import { useState, useMemo } from 'react'
import { Filter } from 'lucide-react'
import CardDeck from '../components/CardDeck'
import { allFlashcards as flashcards } from '../data/flashcards'
import { schools } from '../data/schools'

export default function FlashcardPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [cardType, setCardType] = useState<'all' | 'concept' | 'thinker' | 'compare'>('all')
  const [started, setStarted] = useState(false)
  const [stats, setStats] = useState<{ reviewed: number; mastered: number } | null>(null)

  const filteredCards = useMemo(() => {
    let result = flashcards
    if (selectedCategory !== 'all') {
      result = result.filter(c => c.category === selectedCategory)
    }
    if (cardType !== 'all') {
      result = result.filter(c => c.type === cardType)
    }
    return result
  }, [selectedCategory, cardType])

  const categories = [
    { id: 'all', label: '全部' },
    ...schools.map(s => ({ id: s.id, label: s.name })),
  ]

  if (started && !stats) {
    return (
      <div className="py-4">
        <button
          onClick={() => setStarted(false)}
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mb-4 flex items-center gap-1"
        >
          ← 返回选择
        </button>
        <CardDeck
          cards={filteredCards}
          onComplete={(s) => setStats(s)}
        />
      </div>
    )
  }

  return (
    <div className="space-y-5 py-2">
      <div>
        <h2 className="text-xl font-bold">闪卡刷题</h2>
        <p className="text-sm text-gray-500 mt-1">
          {stats
            ? `上次：复习 ${stats.reviewed} 张，掌握 ${stats.mastered} 张`
            : `${filteredCards.length} 张卡片可用 · SM-2 间隔重复算法`}
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-500 font-medium mb-1.5 flex items-center gap-1">
            <Filter size={12} /> 学派筛选
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => { setSelectedCategory(c.id); setStarted(false); setStats(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 font-medium mb-1.5 block">卡片类型</label>
          <div className="flex gap-1.5">
            {([
              { id: 'all', label: '全部类型' },
              { id: 'concept', label: '概念卡' },
              { id: 'thinker', label: '人物卡' },
              { id: 'compare', label: '对比卡' },
            ] as const).map(t => (
              <button
                key={t.id}
                onClick={() => { setCardType(t.id); setStarted(false); setStats(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  cardType === t.id
                    ? 'bg-accent-600 text-white'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={() => { setStarted(true); setStats(null); }}
        disabled={filteredCards.length === 0}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {filteredCards.length === 0 ? '没有匹配的卡片' : `开始刷题 (${filteredCards.length} 张)`}
      </button>
    </div>
  )
}
