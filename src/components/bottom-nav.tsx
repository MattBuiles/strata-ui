import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../cn'

export interface BottomNavItem {
  id: string
  href: string
  label: string
  icon?: ReactNode
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/**
 * Persistent mobile tab bar. Router-agnostic: the app decides which item is
 * active (`activeId`) and may swap the anchor for its router link via
 * `renderLink` (e.g. next/link). Respects the iOS/Android safe area.
 */
export function BottomNav({
  items,
  activeId,
  renderLink,
  label = 'Navegación principal',
  className,
}: {
  items: BottomNavItem[]
  activeId?: string
  renderLink?: (props: LinkProps) => ReactNode
  label?: string
  className?: string
}) {
  return (
    <nav
      aria-label={label}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur',
        'pb-[env(safe-area-inset-bottom)]',
        className
      )}
    >
      <ul className="mx-auto flex max-w-xl">
        {items.map((item) => {
          const active = item.id === activeId
          const props: LinkProps = {
            href: item.href,
            'aria-current': active ? 'page' : undefined,
            className: cn(
              'flex min-h-14 flex-col items-center justify-center gap-0.5 px-2 text-xs font-medium transition-colors',
              active ? 'text-accent' : 'text-muted hover:text-fg'
            ),
            children: (
              <>
                {item.icon}
                <span>{item.label}</span>
              </>
            ),
          }
          return (
            <li key={item.id} className="flex-1">
              {renderLink ? renderLink(props) : <a {...props} />}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
