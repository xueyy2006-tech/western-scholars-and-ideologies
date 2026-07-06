import { NavLink, useLocation } from 'react-router-dom'
import { ReactNode, useState, useEffect } from 'react'
import { LayoutDashboard, Network, Brain, FileQuestion, BookOpen, Star, Sun, Moon } from 'lucide-react'

const tabs = [
  { path: '/', label: '首页', icon: LayoutDashboard },
  { path: '/tree', label: '知识树', icon: Network },
  { path: '/flashcards', label: '刷题', icon: Brain },
  { path: '/quiz', label: '测验', icon: FileQuestion },
  { path: '/thinkers', label: '词典', icon: BookOpen },
  { path: '/bookmarks', label: '收藏', icon: Star },
]

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('dark-mode')
    return saved ? saved === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('dark-mode', String(dark))
  }, [dark])

  // Hide bottom nav on quiz page (fullscreen mode)
  const hideNav = location.pathname === '/quiz'
  const hidden = hideNav ? 'hidden' : ''

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            西方思想冲刺
          </h1>
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="切换主题"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pb-24 pt-4">
        {children}
      </main>

      {/* Bottom Tab Bar */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 ${hidden}`}>
        <div className="max-w-5xl mx-auto px-2 flex justify-around">
          {tabs.map(tab => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-3 rounded-lg transition-colors text-xs ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`
              }
            >
              <tab.icon size={22} strokeWidth={1.8} />
              <span className="mt-0.5">{tab.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
