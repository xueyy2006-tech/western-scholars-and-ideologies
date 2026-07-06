import QuizEngine from '../components/QuizEngine'
import { useProgress } from '../hooks/useProgress'

export default function QuizPage() {
  const { recordQuizScore } = useProgress()

  const handleComplete = (score: number, total: number) => {
    recordQuizScore(score, total)
  }

  return (
    <div className="py-2">
      <QuizEngine onComplete={handleComplete} />
    </div>
  )
}
