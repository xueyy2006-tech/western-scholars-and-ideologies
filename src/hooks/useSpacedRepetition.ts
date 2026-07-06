import { useCallback, useMemo } from 'react'
import type { ReviewRecord, FlashCard } from '../types'
import { useLocalStorage } from './useLocalStorage'
import { calculateSM2, createNewRecord, getDueCards, getProgressStats } from '../utils/sm2'
import { shuffle } from '../utils/shuffle'

export function useSpacedRepetition(cards: FlashCard[]) {
  const [recordsJson, setRecordsJson] = useLocalStorage<Record<string, ReviewRecord>>('sm2-records', {})

  const recordsMap = useMemo(() => new Map(Object.entries(recordsJson)), [recordsJson])

  const getRecord = useCallback((cardId: string): ReviewRecord => {
    return recordsJson[cardId] ?? createNewRecord(cardId)
  }, [recordsJson])

  const recordQuality = useCallback((cardId: string, quality: number) => {
    const current = getRecord(cardId)
    const updated = calculateSM2(current, quality)
    setRecordsJson(prev => ({ ...prev, [cardId]: updated }))
  }, [getRecord, setRecordsJson])

  const dueCards = useMemo(() => shuffle(getDueCards(cards, recordsMap)), [cards, recordsMap])

  const stats = useMemo(() => getProgressStats(cards, recordsMap), [cards, recordsMap])

  const resetAll = useCallback(() => {
    setRecordsJson({})
  }, [setRecordsJson])

  return { getRecord, recordQuality, dueCards, stats, resetAll }
}
