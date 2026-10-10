import type { ReactNode } from 'react'
import { cn } from '../cn'

/**
 * Top-of-page header: optional eyebrow, serif title, optional description and
 * a slot for actions (theme toggle, secondary links) aligned to the right.
 */
export function PageHeader({
  title,
  eyebrow,
  description,
  actions,
  className,
}: {
  title: string
  eyebrow?: string
  description?: ReactNode
  actions?: ReactNode
  className?: string
}) {
  return (
    <header className={cn('flex items-start justify-between gap-3 pb-6 pt-8', className)}>
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-[1.75rem] font-semibold leading-tight tracking-tight text-fg text-balance [overflow-wrap:anywhere]">
          {title}
        </h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  )
}
