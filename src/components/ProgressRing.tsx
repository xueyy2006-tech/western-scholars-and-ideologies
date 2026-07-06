interface Props {
  mastered: number
  learning: number
  untried: number
  size?: number
}

export default function ProgressRing({ mastered, learning, untried, size = 120 }: Props) {
  const total = mastered + learning + untried
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeWidth = 10

  if (total === 0) {
    return (
      <div className="flex flex-col items-center gap-3">
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-gray-200 dark:text-gray-800" />
        </svg>
        <p className="text-sm text-gray-500">开始学习吧！</p>
      </div>
    )
  }

  const masteredPct = mastered / total
  const learningPct = learning / total
  const untriedPct = untried / total

  const masteredDash = masteredPct * circumference
  const learningDash = learningPct * circumference
  const untriedDash = untriedPct * circumference

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} viewBox="0 0 100 100" className="transform -rotate-90">
        {/* Background */}
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-gray-200 dark:text-gray-800" />
        {/* Untried */}
        {untriedDash > 0 && (
          <circle cx="50" cy="50" r={radius} fill="none" strokeWidth={strokeWidth}
            strokeDasharray={`${untriedDash} ${circumference - untriedDash}`}
            className="text-gray-400 dark:text-gray-600"
            strokeLinecap="round"
          />
        )}
        {/* Learning */}
        {learningDash > 0 && (
          <circle cx="50" cy="50" r={radius} fill="none" strokeWidth={strokeWidth}
            strokeDasharray={`${learningDash} ${circumference - learningDash}`}
            strokeDashoffset={-untriedDash}
            className="text-amber-500"
            strokeLinecap="round"
          />
        )}
        {/* Mastered */}
        {masteredDash > 0 && (
          <circle cx="50" cy="50" r={radius} fill="none" strokeWidth={strokeWidth}
            strokeDasharray={`${masteredDash} ${circumference - masteredDash}`}
            strokeDashoffset={-(untriedDash + learningDash)}
            className="text-emerald-500"
            strokeLinecap="round"
          />
        )}
        {/* Center count */}
        <text x="50" y="50" textAnchor="middle" dy="0.35em" className="fill-gray-900 dark:fill-gray-100 text-lg font-bold" transform="rotate(90 50 50)" fontSize="14">
          {mastered}
        </text>
      </svg>
      <div className="flex gap-4 text-xs">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 已掌握 {mastered}</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 学习中 {learning}</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gray-400" /> 未开始 {untried}</span>
      </div>
    </div>
  )
}
