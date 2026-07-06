import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, BookOpen, FileQuestion, Trash2, XCircle, Lightbulb, ChevronRight } from 'lucide-react'
import { useBookmarks } from '../hooks/useBookmarks'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { allFlashcards as flashcards, getFlashcardById } from '../data/flashcards'
import { allQuizQuestions } from '../data/quiz'

type TabKey = 'bookmarks' | 'wrong-answers'

export default function BookmarksPage() {
  const navigate = useNavigate()
  const { bookmarks, toggleBookmark } = useBookmarks()
  const [activeTab, setActiveTab] = useState<TabKey>('bookmarks')
  const [quizAnswers] = useLocalStorage<Record<string, number | null>>('quiz-answers', {})

  // Wrong answers: quiz answers with score < 3
  const wrongAnswers = Object.entries(quizAnswers)
    .filter(([, score]) => (score ?? 0) < 3)
    .map(([qid]) => allQuizQuestions.find(q => q.id === qid))
    .filter(Boolean)

  const bookmarkedCards = bookmarks
    .filter(b => b.type === 'flashcard')
    .map(b => getFlashcardById(b.itemId))
    .filter(Boolean)

  const bookmarkedQuestions = bookmarks
    .filter(b => b.type === 'quiz')
    .map(b => allQuizQuestions.find(q => q.id === b.itemId))
    .filter(Boolean)

  return (
    <div className="space-y-4 py-2">
      <div>
        <h2 className="text-xl font-bold">我的收藏</h2>
        <p className="text-sm text-gray-500 mt-1">{bookmarks.length} 项收藏 · 错题自动收录</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {([
          { key: 'bookmarks', label: '📑 已收藏', count: bookmarks.length },
          { key: 'wrong-answers', label: '❌ 错题', count: wrongAnswers.length },
        ] as { key: TabKey; label: string; count: number }[]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Bookmarks tab */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-3">
          {bookmarkedCards.length === 0 && bookmarkedQuestions.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <Star size={40} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p>还没有收藏任何内容</p>
              <p className="text-xs mt-1">刷题或看卡片时点击 ⭐ 即可收藏</p>
            </div>
          )}

          {/* Saved flashcards */}
          {bookmarkedCards.length > 0 && (
            <div>
              <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-2">闪卡</h3>
              <div className="space-y-2">
                {bookmarkedCards.map(card => (
                  <div key={card!.id}
                    className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors cursor-pointer group"
                    onClick={() => navigate('/flashcards')}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-sm">{card!.front}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{card!.back.replace(/\*\*/g, '')}</p>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); toggleBookmark('flashcard', card!.id) }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-primary-500"
                      >
                        <Star size={16} fill="currentColor" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-primary-500">
                      <BookOpen size={12} /> 点击去刷题 <ChevronRight size={12} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved quiz questions */}
          {bookmarkedQuestions.length > 0 && (
            <div>
              <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-2 mt-4">测验题</h3>
              <div className="space-y-2">
                {bookmarkedQuestions.map(q => (
                  <div key={q!.id}
                    className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 transition-colors cursor-pointer group"
                    onClick={() => navigate('/quiz')}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium flex-1">{q!.question}</p>
                      <button
                        onClick={e => { e.stopPropagation(); toggleBookmark('quiz', q!.id) }}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-primary-500 flex-shrink-0"
                      >
                        <Star size={16} fill="currentColor" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{q!.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Wrong answers tab */}
      {activeTab === 'wrong-answers' && (
        <div className="space-y-3">
          {wrongAnswers.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <XCircle size={40} className="mx-auto mb-3 text-emerald-400" />
              <p>没有错题！</p>
              <p className="text-xs mt-1">继续保持 🎉</p>
            </div>
          )}
          {wrongAnswers.map(q => {
            if (!q) return null
            const isQuizBookmarked = bookmarks.some(b => b.type === 'quiz' && b.itemId === q.id)
            return (
              <div key={q.id}
                className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-bold text-sm text-red-800 dark:text-red-300">{q.question}</p>
                  <button
                    onClick={() => toggleBookmark('quiz', q.id)}
                    className={`p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 flex-shrink-0 ${isQuizBookmarked ? 'text-primary-500' : 'text-gray-400'}`}
                  >
                    <Star size={14} fill={isQuizBookmarked ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="text-sm text-red-700 dark:text-red-400 leading-relaxed whitespace-pre-line">
                  {q.explanation}
                </div>
                <button
                  onClick={() => navigate('/quiz')}
                  className="mt-2 flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:underline"
                >
                  <Lightbulb size={12} /> 去测验页面重做 <ChevronRight size={12} />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
