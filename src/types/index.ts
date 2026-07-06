// ===== 核心类型定义 =====

/** 时期 */
export type Era = '19th' | 'early20th' | 'mid20th' | 'late20th' | 'contemporary'

/** 思潮/学派 */
export interface School {
  id: string
  name: string
  nameEn: string
  era: Era
  color: string        // tailwind color class for node
  summary: string       // 一句话概括
  description: string   // 详细介绍
  keyThinkers: string[] // thinker ids
  keyConcepts: string[] // concept ids
  timeline: string      // 活跃时期描述
}

/** 思想家 */
export interface Thinker {
  id: string
  name: string
  nameEn: string
  years: string         // "1889-1976"
  nationality: string
  avatar: string        // emoji or initials placeholder
  schools: string[]     // school ids
  oneLiner: string      // 一句话概括
  biography: string
  keyIdeas: string[]
  majorWorks: string[]
  quotes: Quote[]
  relatedThinkers: { id: string; relation: 'influenced' | 'influenced_by' | 'opposed' | 'contemporary' }[]
  difficulty: 1 | 2 | 3 // 1=入门 2=进阶 3=硬核
}

/** 名言 */
export interface Quote {
  text: string
  source?: string
}

/** 核心概念 */
export interface Concept {
  id: string
  name: string
  nameEn: string
  definition: string
  thinkers: string[]    // thinker ids
  schools: string[]     // school ids
  relatedConcepts: string[] // concept ids
  examples: string[]
  difficulty: 1 | 2 | 3
}

/** 闪卡 */
export interface FlashCard {
  id: string
  type: 'concept' | 'thinker' | 'compare'
  front: string         // 正面内容
  back: string          // 背面内容
  hint?: string         // 提示
  category: string      // school id or 'general'
  difficulty: 1 | 2 | 3
  // for compare type
  compareItems?: { label: string; left: string; right: string }[]
}

/** 知识树节点 */
export interface TreeNode {
  id: string
  type: 'school' | 'thinker' | 'concept'
  label: string
  refId: string         // reference to school/thinker/concept id
  position: { x: number; y: number }
  style?: Record<string, string>
}

/** 知识树连线 */
export interface TreeEdge {
  id: string
  source: string
  target: string
  label?: string
  type?: 'influence' | 'belongs_to' | 'opposes'
}

/** 测验题 */
export interface QuizQuestion {
  id: string
  type: 'choice' | 'matching' | 'fill'
  question: string
  difficulty: 1 | 2 | 3
  // choice
  options?: string[]
  correctIndex?: number
  // matching
  leftItems?: string[]
  rightItems?: string[]
  correctPairs?: [number, number][] // [leftIndex, rightIndex]
  // fill
  answer?: string
  acceptableAnswers?: string[]
  explanation: string
}

/** SM-2 复习记录 */
export interface ReviewRecord {
  cardId: string
  interval: number      // days until next review
  easeFactor: number    // starting at 2.5
  repetitions: number
  nextReview: string    // ISO date
  lastQuality: number   // 0-5
}

/** 收藏项 */
export interface Bookmark {
  id: string
  type: 'flashcard' | 'quiz'
  itemId: string        // flashcard id or quiz question id
  timestamp: string     // ISO date
  note?: string         // optional user note
}

/** 学习进度 */
export interface Progress {
  totalCards: number
  masteredCards: number  // interval >= 21 days
  learningCards: number  // interval < 21 days
  newCards: number
  quizScores: { date: string; score: number; total: number }[]
  streak: number         // consecutive days studied
  lastStudyDate: string
}
