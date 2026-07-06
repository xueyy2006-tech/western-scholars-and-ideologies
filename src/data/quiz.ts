import type { QuizQuestion } from '../types'
import { choiceQuestions1 } from './quiz-choice1'
import { choiceQuestions2 } from './quiz-choice2'
import { choiceQuestions3 } from './quiz-choice3'
import { matchingQuestions } from './quiz-matching'
import { fillQuestions } from './quiz-fill'

// Barrel — combines all question types into one array
// Total: 20 + 24 + 20 + 15 + 25 = 104 questions

export const quizQuestions: QuizQuestion[] = [
  ...choiceQuestions1,
  ...choiceQuestions2,
  ...choiceQuestions3,
  ...matchingQuestions,
  ...fillQuestions,
]

export const allQuizQuestions: QuizQuestion[] = quizQuestions

export function getQuestionsByDifficulty(difficulty: number): QuizQuestion[] {
  return allQuizQuestions.filter(q => q.difficulty === difficulty)
}

export function getQuestionById(id: string): QuizQuestion | undefined {
  return allQuizQuestions.find(q => q.id === id)
}
