import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import TreePage from './pages/TreePage'
import FlashcardPage from './pages/FlashcardPage'
import QuizPage from './pages/QuizPage'
import ThinkersPage from './pages/ThinkersPage'
import BookmarksPage from './pages/BookmarksPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tree" element={<TreePage />} />
        <Route path="/flashcards" element={<FlashcardPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/thinkers" element={<ThinkersPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Routes>
    </Layout>
  )
}
