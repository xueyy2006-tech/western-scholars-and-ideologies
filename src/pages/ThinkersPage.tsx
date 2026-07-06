import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookOpen, Lightbulb, Quote, ChevronRight, Filter } from 'lucide-react'
import { thinkers, getThinkerById } from '../data/thinkers'
import { getSchoolById, schools } from '../data/schools'
import SearchBar from '../components/SearchBar'
import type { Thinker } from '../types'

export default function ThinkersPage() {
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null)
  const [schoolFilter, setSchoolFilter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let result = thinkers
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.name.includes(q) ||
        t.nameEn.toLowerCase().includes(q) ||
        t.oneLiner.includes(q) ||
        t.schools.some(sid => getSchoolById(sid)?.name.includes(q))
      )
    }
    if (difficultyFilter !== null) {
      result = result.filter(t => t.difficulty === difficultyFilter)
    }
    if (schoolFilter !== null) {
      result = result.filter(t => t.schools.includes(schoolFilter))
    }
    return result
  }, [search, difficultyFilter, schoolFilter])

  // Count thinkers per school for badges
  const schoolCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    schools.forEach(s => { counts[s.id] = thinkers.filter(t => t.schools.includes(s.id)).length })
    return counts
  }, [])

  const selectedThinker = selectedId ? getThinkerById(selectedId) : null

  return (
    <div className="space-y-4 py-2">
      <div>
        <h2 className="text-xl font-bold">思想家词典</h2>
        <p className="text-sm text-gray-500 mt-1">{thinkers.length} 位思想家 · 点击查看详情</p>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="搜索姓名、学派、关键词..." />

      {/* Difficulty filter */}
      <div className="flex gap-1.5 flex-wrap">
        {[
          { d: null, label: '全部' },
          { d: 1, label: '入门' },
          { d: 2, label: '进阶' },
          { d: 3, label: '硬核' },
        ].map(f => (
          <button
            key={String(f.d)}
            onClick={() => setDifficultyFilter(f.d)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              difficultyFilter === f.d
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* School filter */}
      <div>
        <label className="text-xs text-gray-500 font-medium mb-1.5 flex items-center gap-1">
          <Filter size={12} /> 学派筛选
          {schoolFilter && (
            <button onClick={() => setSchoolFilter(null)} className="ml-1 text-primary-500 hover:underline">(清除)</button>
          )}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {schools.map(school => (
            <button
              key={school.id}
              onClick={() => setSchoolFilter(schoolFilter === school.id ? null : school.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                schoolFilter === school.id
                  ? 'text-white shadow-md scale-105'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              style={schoolFilter === school.id ? { backgroundColor: school.color } : {}}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: school.color }} />
              {school.name}
              <span className="opacity-60">({schoolCounts[school.id]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Thinker Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filtered.map(thinker => (
          <button
            key={thinker.id}
            onClick={() => setSelectedId(thinker.id)}
            className={`relative text-left p-4 rounded-2xl border transition-all hover:shadow-lg ${
              selectedId === thinker.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/20 shadow-lg ring-2 ring-primary-500/20'
                : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary-300'
            }`}
          >
            <span className="text-3xl block mb-2">{thinker.avatar}</span>
            <p className="font-bold text-sm">{thinker.name}</p>
            <p className="text-xs text-gray-500">{thinker.nameEn}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{thinker.years}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {thinker.schools.slice(0, 2).map(sid => {
                const school = getSchoolById(sid)
                return school ? (
                  <button
                    key={sid}
                    onClick={(e) => { e.stopPropagation(); setSchoolFilter(schoolFilter === school.id ? null : school.id) }}
                    className={`text-[10px] px-1.5 py-0.5 rounded-full transition-all ${
                      schoolFilter === school.id
                        ? 'text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    style={schoolFilter === school.id ? { backgroundColor: school.color } : {}}
                    title={`筛选：${school.name}`}
                  >
                    {school.name}
                  </button>
                ) : null
              })}
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-8">没有找到匹配的思想家</p>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selectedThinker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto w-full sm:max-w-lg p-6 shadow-2xl"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-4">
                <div>
                  <span className="text-4xl">{selectedThinker.avatar}</span>
                  <h2 className="text-2xl font-bold mt-2">{selectedThinker.name}</h2>
                  <p className="text-sm text-gray-500">{selectedThinker.nameEn} · {selectedThinker.years} · {selectedThinker.nationality}</p>
                </div>

                <p className="text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30 rounded-lg px-3 py-2">
                  {selectedThinker.oneLiner}
                </p>

                <section>
                  <h3 className="flex items-center gap-1.5 text-sm font-bold mb-2"><BookOpen size={16} /> 生平</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{selectedThinker.biography}</p>
                </section>

                <section>
                  <h3 className="flex items-center gap-1.5 text-sm font-bold mb-2"><Lightbulb size={16} /> 核心思想</h3>
                  <ul className="space-y-1.5">
                    {selectedThinker.keyIdeas.map((idea, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                        <ChevronRight size={14} className="text-primary-500 mt-0.5 flex-shrink-0" />
                        {idea}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="flex items-center gap-1.5 text-sm font-bold mb-2"><BookOpen size={16} /> 代表作</h3>
                  <ul className="space-y-1">
                    {selectedThinker.majorWorks.map((w, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400">📖 {w}</li>
                    ))}
                  </ul>
                </section>

                {selectedThinker.quotes.length > 0 && (
                  <section>
                    <h3 className="flex items-center gap-1.5 text-sm font-bold mb-2"><Quote size={16} /> 名言</h3>
                    <ul className="space-y-2">
                      {selectedThinker.quotes.map((q, i) => (
                        <li key={i} className="text-sm italic text-gray-600 dark:text-gray-400 border-l-2 border-primary-300 dark:border-primary-700 pl-3">
                          「{q.text}」
                          {q.source && <span className="text-xs text-gray-400 not-italic ml-1">— {q.source}</span>}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section>
                  <h3 className="text-sm font-bold mb-2">所属学派</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedThinker.schools.map(sid => {
                      const s = getSchoolById(sid)
                      return s ? (
                        <span key={sid} className="text-xs px-2.5 py-1 rounded-full text-white font-medium" style={{ backgroundColor: s.color }}>
                          {s.name}
                        </span>
                      ) : null
                    })}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold mb-2">关联思想家</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedThinker.relatedThinkers.map((rt, i) => {
                      const related = getThinkerById(rt.id)
                      const labels: Record<string, string> = {
                        influenced: '→影响了',
                        influenced_by: '←受',
                        opposed: '✗对立',
                        contemporary: '↔同时代',
                      }
                      return (
                        <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 text-gray-600 dark:text-gray-400">
                          {labels[rt.relation]} {related?.name ?? rt.id}
                        </span>
                      )
                    })}
                  </div>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
