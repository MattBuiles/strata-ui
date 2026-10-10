import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../cn'

/** On/off toggle (native checkbox with role="switch") with an inline label. */
export function Switch({
  children,
  className,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'> & {
  children?: ReactNode
}) {
  return (
    <label className={cn('inline-flex cursor-pointer select-none items-center gap-3', className)}>
      <input type="checkbox" role="switch" className="peer sr-only" {...props} />
      <span
        aria-hidden
        className={cn(
          'relative h-6 w-10 shrink-0 rounded-full bg-border-strong transition-colors',
          "after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform after:content-['']",
          'peer-checked:bg-accent peer-checked:after:translate-x-4',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[color:var(--iv-bg)]',
          'peer-disabled:opacity-50 motion-reduce:transition-none motion-reduce:after:transition-none'
        )}
      />
      {children}
    </label>
  )
}
