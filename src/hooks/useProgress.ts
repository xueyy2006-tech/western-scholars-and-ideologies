import { useLocalStorage } from './useLocalStorage'
import type { Progress } from '../types'

const defaultProgress: Progress = {
  totalCards: 0,
  masteredCards: 0,
  learningCards: 0,
  newCards: 0,
  quizScores: [],
  streak: 0,
  lastStudyDate: '',
}

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<Progress>('study-progress', defaultProgress)

  const recordStudy = (today: string) => {
    setProgress(prev => {
      if (prev.lastStudyDate === today) return prev
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]
      const streak = prev.lastStudyDate === yesterdayStr ? prev.streak + 1 : 1
      return { ...prev, streak, lastStudyDate: today }
    })
  }

  const recordQuizScore = (score: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: [...prev.quizScores, { date: new Date().toISOString().split('T')[0], score, total }].slice(-50),
    }))
  }

  return { progress, setProgress, recordStudy, recordQuizScore }
}
