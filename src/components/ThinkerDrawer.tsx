import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen, Lightbulb, Quote, Users, ArrowRight } from 'lucide-react'
import { getThinkerById } from '../data/thinkers'
import { getSchoolById } from '../data/schools'
import { getConceptById } from '../data/concepts'

interface Props {
  refId: string | null
  type: string | null
  onClose: () => void
}

export default function ThinkerDrawer({ refId, type, onClose }: Props) {
  const thinker = type === 'thinker' && refId ? getThinkerById(refId) : null
  const school = type === 'school' && refId ? getSchoolById(refId) : null
  const concept = type === 'concept' && refId ? getConceptById(refId) : null

  const open = !!refId

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl z-20 overflow-y-auto"
        >
          <div className="p-5">
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <X size={20} />
            </button>

            {/* Thinker Detail */}
            {thinker && (
              <div className="space-y-4">
                <div>
                  <span className="text-3xl">{thinker.avatar}</span>
                  <h2 className="text-xl font-bold mt-2">{thinker.name}</h2>
                  <p className="text-sm text-gray-500">{thinker.nameEn} · {thinker.years} · {thinker.nationality}</p>
                </div>

                <p className="text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30 rounded-lg px-3 py-2">
                  {thinker.oneLiner}
                </p>

                <section>
                  <h3 className="flex items-center gap-1.5 text-sm font-bold mb-2">
                    <BookOpen size={16} /> 生平
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{thinker.biography}</p>
                </section>

                <section>
                  <h3 className="flex items-center gap-1.5 text-sm font-bold mb-2">
                    <Lightbulb size={16} /> 核心思想
                  </h3>
                  <ul className="space-y-2">
                    {thinker.keyIdeas.map((idea, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                        <span className="text-primary-500 mt-0.5">•</span>
                        {idea}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="flex items-center gap-1.5 text-sm font-bold mb-2">
                    <BookOpen size={16} /> 代表作
                  </h3>
                  <ul className="space-y-1">
                    {thinker.majorWorks.map((work, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400">📖 {work}</li>
                    ))}
                  </ul>
                </section>

                {thinker.quotes.length > 0 && (
                  <section>
                    <h3 className="flex items-center gap-1.5 text-sm font-bold mb-2">
                      <Quote size={16} /> 名言
                    </h3>
                    <ul className="space-y-2">
                      {thinker.quotes.map((q, i) => (
                        <li key={i} className="text-sm italic text-gray-600 dark:text-gray-400 border-l-2 border-primary-300 dark:border-primary-700 pl-3">
                          「{q.text}」
                          {q.source && <span className="text-xs text-gray-400 not-italic ml-1">— {q.source}</span>}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section>
                  <h3 className="flex items-center gap-1.5 text-sm font-bold mb-2">
                    <Users size={16} /> 关联
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {thinker.relatedThinkers.map((rt, i) => {
                      const related = getThinkerById(rt.id)
                      const labels: Record<string, string> = {
                        influenced: '影响了',
                        influenced_by: '受其影响',
                        opposed: '对立',
                        contemporary: '同时代',
                      }
                      return (
                        <span key={i} className="inline-flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1">
                          {labels[rt.relation]} <ArrowRight size={10} /> {related?.name ?? rt.id}
                        </span>
                      )
                    })}
                  </div>
                </section>
              </div>
            )}

            {/* School Detail */}
            {school && (
              <div className="space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-xl mb-2" style={{ backgroundColor: school.color }} />
                  <h2 className="text-xl font-bold">{school.name}</h2>
                  <p className="text-sm text-gray-500">{school.nameEn} · {school.timeline}</p>
                </div>

                <p className="text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30 rounded-lg px-3 py-2">
                  {school.summary}
                </p>

                <section>
                  <h3 className="text-sm font-bold mb-2">概述</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{school.description}</p>
                </section>

                <section>
                  <h3 className="text-sm font-bold mb-2">代表人物</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {school.keyThinkers.map(tid => {
                      const t = getThinkerById(tid)
                      return t ? (
                        <span key={tid} className="text-xs bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full px-2 py-1">
                          {t.name}
                        </span>
                      ) : null
                    })}
                  </div>
                </section>
              </div>
            )}

            {/* Concept Detail */}
            {concept && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold">{concept.name}</h2>
                  <p className="text-sm text-gray-500">{concept.nameEn}</p>
                </div>

                <section>
                  <h3 className="text-sm font-bold mb-2">定义</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{concept.definition}</p>
                </section>

                {concept.examples.length > 0 && (
                  <section>
                    <h3 className="text-sm font-bold mb-2">例子</h3>
                    <ul className="space-y-1">
                      {concept.examples.map((ex, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                          <span className="text-primary-500">💡</span> {ex}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section>
                  <h3 className="text-sm font-bold mb-2">相关思想家</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {concept.thinkers.map(tid => {
                      const t = getThinkerById(tid)
                      return t ? <span key={tid} className="text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1">{t.name}</span> : null
                    })}
                  </div>
                </section>
              </div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
