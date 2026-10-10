'use client'

import { useId } from 'react'
import { cn } from '../cn'

export interface SegmentOption<T extends string> {
  value: T
  label: string
}

/** Pill-style radio group. Native radios underneath, so keyboard and forms just work. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  label: string
  className?: string
}) {
  const name = useId()
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn('flex gap-1 rounded-xl bg-surface-2 p-1', className)}
    >
      {options.map((o) => (
        <label key={o.value} className="relative flex-1">
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={o.value === value}
            onChange={() => onChange(o.value)}
            className="peer sr-only"
          />
          <span
            className={cn(
              'flex min-h-10 cursor-pointer items-center justify-center rounded-lg px-3 text-center text-sm font-medium text-muted transition-colors',
              'peer-checked:bg-surface peer-checked:text-fg peer-checked:shadow-[var(--iv-shadow)]',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-accent'
            )}
          >
            {o.label}
          </span>
        </label>
      ))}
    </div>
  )
}
