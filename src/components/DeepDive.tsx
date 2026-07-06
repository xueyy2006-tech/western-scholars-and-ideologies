import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown } from 'lucide-react'

interface Props {
  title: string
  content: string
}

export default function DeepDive({ title, content }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-3">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/40 dark:to-accent-950/40 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-sm font-medium hover:shadow-md transition-all group"
      >
        <BookOpen size={15} className="group-hover:scale-110 transition-transform" />
        {title}
        <ChevronDown size={15} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line max-h-[60vh] overflow-y-auto">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
