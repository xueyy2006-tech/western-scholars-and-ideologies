import { useCallback, useMemo } from 'react'
import type { Bookmark } from '../types'
import { useLocalStorage } from './useLocalStorage'

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('bookmarks', [])

  const bookmarksMap = useMemo(() => new Map(bookmarks.map(b => [`${b.type}:${b.itemId}`, b])), [bookmarks])

  const isBookmarked = useCallback((type: string, itemId: string): boolean => {
    return bookmarksMap.has(`${type}:${itemId}`)
  }, [bookmarksMap])

  const toggleBookmark = useCallback((type: 'flashcard' | 'quiz', itemId: string) => {
    const key = `${type}:${itemId}`
    if (bookmarksMap.has(key)) {
      setBookmarks(prev => prev.filter(b => !(b.type === type && b.itemId === itemId)))
    } else {
      const newBookmark: Bookmark = {
        id: key,
        type,
        itemId,
        timestamp: new Date().toISOString(),
      }
      setBookmarks(prev => [...prev, newBookmark])
    }
  }, [bookmarksMap, setBookmarks])

  const getBookmarksByType = useCallback((type: 'flashcard' | 'quiz'): Bookmark[] => {
    return bookmarks.filter(b => b.type === type)
  }, [bookmarks])

  return { bookmarks, isBookmarked, toggleBookmark, getBookmarksByType }
}
