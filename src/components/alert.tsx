import type { ReactNode } from 'react'
import { cn } from '../cn'

export type AlertTone = 'error' | 'success' | 'info'

const TONES: Record<AlertTone, string> = {
  error: 'bg-[color-mix(in_oklab,var(--iv-down)_12%,transparent)] text-down',
  success: 'bg-[color-mix(in_oklab,var(--iv-up)_14%,transparent)] text-up',
  info: 'bg-[var(--iv-accent-soft)] text-accent',
}

/** Inline message banner. Errors are announced assertively, the rest politely. */
export function Alert({
  tone = 'info',
  children,
  className,
}: {
  tone?: AlertTone
  children: ReactNode
  className?: string
}) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn('rounded-xl p-3 text-sm', TONES[tone], className)}
    >
      {children}
    </div>
  )
}
