import { useNavigate } from 'react-router-dom'
import { Brain, Network, FileQuestion, BookOpen, Star, TrendingUp, Flame } from 'lucide-react'
import ProgressRing from '../components/ProgressRing'
import QuoteBanner from '../components/QuoteBanner'
import { useSpacedRepetition } from '../hooks/useSpacedRepetition'
import { useProgress } from '../hooks/useProgress'
import { flashcards } from '../data/flashcards'
import { thinkers } from '../data/thinkers'
import { useEffect } from 'react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { stats } = useSpacedRepetition(flashcards)
  const { progress, recordStudy } = useProgress()

  useEffect(() => {
    recordStudy(new Date().toISOString().split('T')[0])
  }, [])

  const quickLinks = [
    { path: '/flashcards', label: '开始刷题', icon: Brain, color: 'from-primary-500 to-primary-700', desc: `${stats.untried} 张新卡待学习` },
    { path: '/tree', label: '知识树', icon: Network, color: 'from-accent-500 to-accent-700', desc: '查看知识体系全貌' },
    { path: '/quiz', label: '测验挑战', icon: FileQuestion, color: 'from-emerald-500 to-emerald-700', desc: `${progress.quizScores.length} 次完成测验` },
    { path: '/thinkers', label: '思想家词典', icon: BookOpen, color: 'from-amber-500 to-amber-700', desc: `${thinkers.length} 位思想家` },
    { path: '/bookmarks', label: '我的收藏', icon: Star, color: 'from-rose-500 to-pink-600', desc: '收藏 + 错题本' },
  ]

  return (
    <div className="space-y-6 py-2">
      {/* Quote */}
      <QuoteBanner />

      {/* Progress */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">学习进度</h2>
        <ProgressRing mastered={stats.mastered} learning={stats.learning} untried={stats.untried} />
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-sm">
            <Flame size={18} className="text-orange-500" />
            <span className="font-bold">{progress.streak}</span>
            <span className="text-gray-500">天连续学习</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp size={18} className="text-emerald-500" />
            <span className="font-bold">{stats.total}</span>
            <span className="text-gray-500">张卡片</span>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        {quickLinks.map(link => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${link.color} p-4 text-white text-left shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group`}
          >
            <link.icon size={28} className="mb-2 opacity-80" />
            <p className="font-bold">{link.label}</p>
            <p className="text-xs text-white/70 mt-1">{link.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
