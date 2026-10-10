import { useId, type ReactNode } from 'react'
import { cn } from '../cn'

/** Titled page section: serif h2, optional description, optional right-side slot. */
export function Section({
  title,
  description,
  aside,
  children,
  className,
}: {
  title: string
  description?: ReactNode
  aside?: ReactNode
  children: ReactNode
  className?: string
}) {
  const id = useId()
  return (
    <section aria-labelledby={id} className={cn('space-y-4', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id={id} className="font-serif text-xl font-semibold tracking-tight text-fg">
            {title}
          </h2>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
        {aside && <div className="shrink-0">{aside}</div>}
      </div>
      {children}
    </section>
  )
}
