import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, ArrowLeftRight, Star } from 'lucide-react'
import { allQuizQuestions } from '../data/quiz'
import { shuffle } from '../utils/shuffle'
import { useBookmarks } from '../hooks/useBookmarks'
import type { QuizQuestion } from '../types'

interface Props {
  onComplete: (score: number, total: number) => void
}

export default function QuizEngine({ onComplete }: Props) {
  const [mode, setMode] = useState<'select' | 'playing' | 'done'>('select')
  const [questionCount, setQuestionCount] = useState(10)
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number | null>>({})
  const [showResults, setShowResults] = useState(false)
  const [fillAnswers, setFillAnswers] = useState<Record<string, string>>({})
  const [canAdvance, setCanAdvance] = useState(false)

  const startQuiz = useCallback(() => {
    const selected = shuffle(allQuizQuestions).slice(0, questionCount)
    setQuestions(selected)
    setCurrentIndex(0)
    setAnswers({})
    setFillAnswers({})
    setShowResults(false)
    setCanAdvance(false)
    setMode('playing')
  }, [questionCount])

  const currentQuestion = questions[currentIndex]

  const goNext = useCallback(() => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1)
      setCanAdvance(false)
    } else {
      // Last question — notify parent and finish
      const total = Object.values(answers).reduce((sum: number, v) => sum + (v ?? 0), 0)
      const mp = questions.length * 5
      onComplete(total, mp)
      setShowResults(true)
      setMode('done')
    }
  }, [currentIndex, questions.length, answers, onComplete])

  const handleChoice = (optionIndex: number) => {
    if (!currentQuestion || currentQuestion.type !== 'choice') return
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }))
    setCanAdvance(true)
    // If last question, mark for finish on next click
  }

  const handleMatching = (pairs: [number, number][]) => {
    if (!currentQuestion || currentQuestion.type !== 'matching') return
    const correctPairs = currentQuestion.correctPairs!
    const correctCount = pairs.filter(([l, r]) =>
      correctPairs.some(([cl, cr]) => cl === l && cr === r)
    ).length
    const score = correctPairs.length > 0 ? Math.round((correctCount / correctPairs.length) * 5) : 0
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: score }))
    setCanAdvance(true)
  }

  const handleFill = () => {
    if (!currentQuestion || currentQuestion.type !== 'fill') return
    const userAnswer = fillAnswers[currentQuestion.id] || ''
    const acceptable = [currentQuestion.answer ?? '', ...(currentQuestion.acceptableAnswers || [])]
    const isCorrect = acceptable.some(a => userAnswer.trim().toLowerCase().includes(a.toLowerCase()))
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: isCorrect ? 5 : 0 }))
    setCanAdvance(true)
  }

  // Compute score from answers (used in done mode)
  const score: number = useMemo(() => Object.values(answers).reduce((sum: number, v) => sum + (v ?? 0), 0), [answers])
  const maxPossible = questions.length * 5
  const pct = maxPossible > 0 ? Math.round((score / maxPossible) * 100) : 0

  // Select mode
  if (mode === 'select') {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <h2 className="text-2xl font-bold">测验挑战</h2>
        <p className="text-sm text-gray-500 -mt-4">随机抽取题库，检验你的西方思想掌握度</p>
        <div className="flex gap-4">
          {[5, 10, 15, 25, 50].map(n => (
            <button
              key={n}
              onClick={() => setQuestionCount(n)}
              className={`px-5 py-3 rounded-xl text-lg font-bold transition-all ${
                questionCount === n
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {n}题
            </button>
          ))}
        </div>
        <button
          onClick={startQuiz}
          className="mt-2 px-10 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          开始挑战！
        </button>
      </div>
    )
  }

  // Done mode
  if (mode === 'done') {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-6xl"
        >
          {pct >= 80 ? '🎉' : pct >= 60 ? '👏' : '📚'}
        </motion.div>
        <h2 className="text-2xl font-bold">测验完成！</h2>
        <p className="text-4xl font-black text-primary-600 dark:text-primary-400">{pct}%</p>
        <p className="text-gray-500">{score}/{maxPossible} 分</p>

        {showResults && (
          <div className="w-full max-w-lg mt-4 space-y-3">
            <h3 className="font-bold text-lg">错题回顾</h3>
            {questions.filter(q => (answers[q.id] ?? 0) < 3).map(q => (
              <div key={q.id} className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-sm">
                <p className="font-medium mb-1">{q.question}</p>
                <div className="text-red-700 dark:text-red-400 mt-2 leading-relaxed whitespace-pre-line">{q.explanation}</div>
              </div>
            ))}
            {questions.filter(q => (answers[q.id] ?? 0) < 3).length === 0 && (
              <p className="text-emerald-600 dark:text-emerald-400 text-center py-4">全部正确！西方思想大家非你莫属！🧠</p>
            )}
          </div>
        )}

        <button
          onClick={() => setMode('select')}
          className="mt-4 px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <RotateCcw size={16} /> 再来一轮
        </button>
      </div>
    )
  }

  // Playing mode
  if (!currentQuestion) return null

  return (
    <div className="flex flex-col gap-4">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentIndex / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 font-mono">{currentIndex + 1}/{questions.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          {/* Question */}
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm">
            <span className="text-xs text-gray-400 mb-2 block">
              {currentQuestion.type === 'choice' ? '单选题' : currentQuestion.type === 'matching' ? '连线题' : '填空题'}
              {currentQuestion.difficulty === 1 ? ' · 入门' : currentQuestion.difficulty === 2 ? ' · 进阶' : ' · 硬核'}
            </span>
            <p className="text-lg font-bold">{currentQuestion.question}</p>
          </div>

          {/* Choice options */}
          {currentQuestion.type === 'choice' && currentQuestion.options && (
            <div className="grid gap-2">
              {currentQuestion.options.map((opt, i) => {
                const answered = currentQuestion.id in answers
                const isSelected = answers[currentQuestion.id] === i
                const isCorrect = i === currentQuestion.correctIndex
                let btnClass = 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                if (answered) {
                  if (isCorrect) btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                  else if (isSelected) btnClass = 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  else btnClass = 'opacity-50 border-gray-200'
                }
                return (
                  <button
                    key={i}
                    onClick={() => !answered && handleChoice(i)}
                    disabled={answered}
                    className={`p-3 rounded-xl border text-left text-sm font-medium transition-all ${btnClass}`}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                    {answered && isCorrect && <CheckCircle2 size={16} className="inline ml-2 text-emerald-500" />}
                    {answered && isSelected && !isCorrect && <XCircle size={16} className="inline ml-2 text-red-500" />}
                  </button>
                )
              })}
              {currentQuestion.id in answers && (
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line flex-1">{currentQuestion.explanation}</p>
                    <button
                      onClick={() => toggleBookmark('quiz', currentQuestion.id)}
                      className={`p-1 rounded-lg transition-colors flex-shrink-0 ${
                        isBookmarked('quiz', currentQuestion.id) ? 'text-amber-500' : 'text-gray-400 hover:text-amber-500'
                      }`}
                      title={isBookmarked('quiz', currentQuestion.id) ? '取消收藏' : '加入收藏'}
                    >
                      <Star size={16} fill={isBookmarked('quiz', currentQuestion.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Matching */}
          {currentQuestion.type === 'matching' && (
            <MatchingQuestion
              question={currentQuestion}
              onSubmit={handleMatching}
            />
          )}

          {/* Fill */}
          {currentQuestion.type === 'fill' && (
            <div className="space-y-3">
              <input
                type="text"
                value={fillAnswers[currentQuestion.id] || ''}
                onChange={e => setFillAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                placeholder="输入你的答案..."
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-lg text-center focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                onKeyDown={e => { if (e.key === 'Enter') handleFill() }}
                disabled={currentQuestion.id in answers}
                autoFocus
              />
              {currentQuestion.id in answers ? (
                <div className="space-y-3">
                  <p className="text-sm">
                    {(answers[currentQuestion.id] ?? 0) >= 3 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">✅ 正确！</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">❌ 正确答案：{currentQuestion.answer}</span>
                    )}
                  </p>
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line flex-1">{currentQuestion.explanation}</p>
                      <button
                        onClick={() => toggleBookmark('quiz', currentQuestion.id)}
                        className={`p-1 rounded-lg transition-colors flex-shrink-0 ${
                          isBookmarked('quiz', currentQuestion.id) ? 'text-amber-500' : 'text-gray-400 hover:text-amber-500'
                        }`}
                        title={isBookmarked('quiz', currentQuestion.id) ? '取消收藏' : '加入收藏'}
                      >
                        <Star size={16} fill={isBookmarked('quiz', currentQuestion.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleFill}
                  className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  确认 <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}

          {/* Manual advance button — appears after answering, user controls pace */}
          {currentQuestion.id in answers && canAdvance && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={goNext}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {currentIndex + 1 < questions.length ? '下一题' : '查看结果'} <ArrowRight size={18} />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

//  ===== Matching Question (with shuffling) =====
function MatchingQuestion({ question, onSubmit }: { question: QuizQuestion; onSubmit: (pairs: [number, number][]) => void }) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [pairs, setPairs] = useState<[number, number][]>([])
  const [submitted, setSubmitted] = useState(false)

  // Shuffle left & right items on mount, compute transformed correctPairs
  const { shuffledLeft, shuffledRight, transformedCorrectPairs, leftMapping, rightMapping } = useMemo(() => {
    const origLeft = question.leftItems ?? []
    const origRight = question.rightItems ?? []
    const origPairs = question.correctPairs ?? []

    // Create shuffled indices
    const leftIndices = origLeft.map((_, i) => i)
    const rightIndices = origRight.map((_, i) => i)
    const shufLeftIndices = shuffle(leftIndices)
    const shufRightIndices = shuffle(rightIndices)

    // Build display items
    const shufLeft = shufLeftIndices.map(i => origLeft[i])
    const shufRight = shufRightIndices.map(i => origRight[i])

    // Build inverse mapping: originalIndex → shuffledDisplayIndex
    const leftOrigToShuffled = new Map<number, number>()
    shufLeftIndices.forEach((origIdx, dispIdx) => leftOrigToShuffled.set(origIdx, dispIdx))
    const rightOrigToShuffled = new Map<number, number>()
    shufRightIndices.forEach((origIdx, dispIdx) => rightOrigToShuffled.set(origIdx, dispIdx))

    // Transform correctPairs to shuffled display indices
    const transformed: [number, number][] = origPairs.map(([ol, or]) => [
      leftOrigToShuffled.get(ol) ?? ol,
      rightOrigToShuffled.get(or) ?? or,
    ])

    return {
      shuffledLeft: shufLeft,
      shuffledRight: shufRight,
      transformedCorrectPairs: transformed,
      leftMapping: leftOrigToShuffled,
      rightMapping: rightOrigToShuffled,
    }
  }, [question.id])

  const handleLeftClick = (index: number) => {
    if (submitted) return
    if (pairs.some(([l]) => l === index)) return
    setSelectedLeft(index)
  }

  const handleRightClick = (index: number) => {
    if (submitted) return
    if (selectedLeft === null) return
    if (pairs.some(([, r]) => r === index)) return
    setPairs(prev => [...prev, [selectedLeft, index]])
    setSelectedLeft(null)
  }

  const isCorrectPair = (li: number, ri: number) =>
    transformedCorrectPairs.some(([cl, cr]) => cl === li && cr === ri)

  const cancelPair = (li: number) => {
    if (submitted) return
    setPairs(prev => prev.filter(([l]) => l !== li))
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500 flex items-center gap-1">
        <ArrowLeftRight size={14} /> 点击左边一项，再点击右边对应项完成配对。点击已配对项取消。
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <div className="space-y-1.5">
          {shuffledLeft.map((item, i) => {
            const paired = pairs.some(([l]) => l === i)
            const isSelected = selectedLeft === i
            return (
              <button
                key={i}
                onClick={() => paired && !submitted ? cancelPair(i) : handleLeftClick(i)}
                className={`w-full p-2.5 rounded-lg border text-sm font-medium transition-all text-left ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 ring-2 ring-primary-500/30'
                    : paired
                      ? submitted
                        ? isCorrectPair(i, pairs.find(([l]) => l === i)?.[1] ?? -1)
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                        : 'border-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-primary-300'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>
        {/* Right column */}
        <div className="space-y-1.5">
          {shuffledRight.map((item, i) => {
            const pairLeft = pairs.find(([, r]) => r === i)?.[0]
            const paired = pairLeft !== undefined
            return (
              <button
                key={i}
                onClick={() => handleRightClick(i)}
                className={`w-full p-2.5 rounded-lg border text-sm font-medium transition-all text-left ${
                  paired
                    ? submitted
                      ? isCorrectPair(pairLeft, i)
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30'
                        : 'border-red-500 bg-red-50 dark:bg-red-900/30'
                      : 'border-accent-500 bg-accent-50 dark:bg-accent-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-accent-300'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>

      {!submitted && (
        <button
          onClick={() => { setSubmitted(true); onSubmit(pairs) }}
          disabled={pairs.length !== shuffledLeft.length}
          className="w-full py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-40 transition-all"
        >
          提交配对 ({pairs.length}/{shuffledLeft.length})
        </button>
      )}

      {submitted && <MatchingExplanation question={question} />}
    </div>
  )
}

// Matching result with star bookmark
function MatchingExplanation({ question }: { question: QuizQuestion }) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  return (
    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line flex-1">{question.explanation}</p>
        <button
          onClick={() => toggleBookmark('quiz', question.id)}
          className={`p-1 rounded-lg transition-colors flex-shrink-0 ${
            isBookmarked('quiz', question.id) ? 'text-amber-500' : 'text-gray-400 hover:text-amber-500'
          }`}
          title={isBookmarked('quiz', question.id) ? '取消收藏' : '加入收藏'}
        >
          <Star size={16} fill={isBookmarked('quiz', question.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  )
}
