import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../cn'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/**
 * Large tappable card that links to a section. Router-agnostic like BottomNav:
 * pass `renderLink` to swap the anchor for the app's router link. `featured`
 * fills the card with the accent colour for the one primary destination.
 */
export function NavCard({
  href,
  title,
  description,
  icon,
  featured = false,
  renderLink,
  className,
}: {
  href: string
  title: string
  description?: string
  icon?: ReactNode
  featured?: boolean
  renderLink?: (props: LinkProps) => ReactNode
  className?: string
}) {
  const props: LinkProps = {
    href,
    className: cn(
      'group flex min-h-28 flex-col justify-between gap-6 rounded-2xl p-5 transition-[transform,box-shadow,background-color] duration-200',
      'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:translate-y-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--iv-bg)]',
      featured
        ? 'bg-accent text-[color:var(--accent-fg)] shadow-[var(--shadow-lg)]'
        : 'bg-surface shadow-[var(--iv-shadow)] hover:shadow-[var(--shadow-lg)]',
      className
    ),
    children: (
      <>
        {icon && (
          <span
            aria-hidden
            className={cn(
              'flex size-10 items-center justify-center rounded-xl',
              featured ? 'bg-white/15' : 'bg-[var(--iv-accent-soft)] text-accent'
            )}
          >
            {icon}
          </span>
        )}
        <span>
          <span className="block font-serif text-xl font-semibold leading-tight tracking-tight">
            {title}
          </span>
          {description && (
            <span
              className={cn(
                'mt-1 block text-sm',
                featured ? 'opacity-80' : 'text-muted'
              )}
            >
              {description}
            </span>
          )}
        </span>
      </>
    ),
  }
  return renderLink ? renderLink(props) : <a {...props} />
}
