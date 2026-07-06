import type { ReviewRecord } from '../types'

export function createNewRecord(cardId: string): ReviewRecord {
  return {
    cardId,
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0,
    nextReview: new Date().toISOString().split('T')[0],
    lastQuality: 0,
  }
}

export function calculateSM2(record: ReviewRecord, quality: number): ReviewRecord {
  // quality: 0-5, where 0=complete blackout, 5=perfect recall
  const clamped = Math.max(0, Math.min(5, quality))

  let { interval, easeFactor, repetitions } = record

  if (clamped >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1
  } else {
    // Incorrect response - reset
    repetitions = 0
    interval = 1
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - clamped) * (0.08 + (5 - clamped) * 0.02))
  if (easeFactor < 1.3) easeFactor = 1.3

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)

  return {
    cardId: record.cardId,
    interval,
    easeFactor,
    repetitions,
    nextReview: nextReview.toISOString().split('T')[0],
    lastQuality: clamped,
  }
}

export function getDueCards<T extends { id: string }>(
  cards: T[],
  records: Map<string, ReviewRecord>
): T[] {
  const today = new Date().toISOString().split('T')[0]
  return cards.filter(card => {
    const record = records.get(card.id)
    if (!record) return true // new card
    return record.nextReview <= today
  })
}

export function getProgressStats(cards: { id: string }[], records: Map<string, ReviewRecord>) {
  let mastered = 0
  let learning = 0
  let untried = 0

  for (const card of cards) {
    const record = records.get(card.id)
    if (!record || record.repetitions === 0) {
      untried++
    } else if (record.interval >= 21) {
      mastered++
    } else {
      learning++
    }
  }

  return { mastered, learning, untried, total: cards.length }
}
