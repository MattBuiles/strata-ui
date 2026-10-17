'use client'

import { useState, type ChangeEvent, type InputHTMLAttributes } from 'react'
import { cn } from '../cn'

/**
 * File picker. The native control writes its own text ("Choose File", "No file
 * chosen") in the browser's language, so it can clash with the page language.
 * This hides it and shows our own labels. The real input stays in the DOM, so
 * forms, keyboard and `<label htmlFor>` work as usual.
 *
 * Labels are props with Spanish defaults (same idea as `Confirm`'s
 * `cancelLabel`). There is no i18n layer.
 */
export function FileInput({
  className,
  buttonLabel = 'Elegir archivo',
  emptyLabel = 'Ningún archivo',
  countLabel = (count: number) => `${count} archivos`,
  onChange,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> & {
  /** Text of the button. */
  buttonLabel?: string
  /** Text shown when no file is chosen. */
  emptyLabel?: string
  /** Text shown when `multiple` and more than one file is chosen. */
  countLabel?: (count: number) => string
}) {
  const [text, setText] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    setText(!files || files.length === 0 ? '' : files.length === 1 ? files[0].name : countLabel(files.length))
    onChange?.(event)
  }

  return (
    <label
      className={cn(
        'flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2 text-sm',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
        className
      )}
    >
      <input type="file" className="sr-only" onChange={handleChange} {...props} />
      <span className="shrink-0 rounded-lg bg-accent px-3 py-2 font-semibold text-[color:var(--iv-bg)]">
        {buttonLabel}
      </span>
      <span className="min-w-0 truncate text-muted">{text || emptyLabel}</span>
    </label>
  )
}
