import { cn } from '../cn'

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  const first = words[0][0]
  const last = words.length > 1 ? words[words.length - 1][0] : ''
  return (first + last).toUpperCase()
}

/** Rounded-square initials badge (squircle rather than a circle). */
export function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--iv-accent-soft)] text-sm font-semibold text-accent',
        className
      )}
    >
      {initials(name)}
    </span>
  )
}
