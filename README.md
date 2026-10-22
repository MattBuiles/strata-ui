# strata

Design system compartido (portfolio, orbit, market-agent, investment-dashboard, routine-schemer):
tokens de marca claro/oscuro, primitivos y dataviz. Un solo look para todas las apps.

**Demo en vivo:** https://mattbuiles.github.io/strata-ui/ (`pnpm demo:dev` en local).

- **Acento**: violeta editorial (`#4c1d95`).
- **Semántico** (verde/rojo) reservado a P&L, separado del acento.
- Cifras y tickers en **monoespaciada** (`.iv-tabular`).

## Instalar (git dependency)
```bash
pnpm add github:MattBuiles/invest-ui#main
```

## Configurar en una app Next 16 + Tailwind v4
1. `next.config.ts`:
   ```ts
   const nextConfig = { transpilePackages: ['invest-ui'] }
   ```
2. `src/app/globals.css`:
   ```css
   @import "tailwindcss";
   @import "invest-ui/theme.css";
   /* que Tailwind vea las clases usadas por los componentes del paquete */
   @source "../../node_modules/invest-ui/src";
   ```
3. Envuelve la app con el provider de tema y añade el toggle:
   ```tsx
   import { ThemeProvider, ThemeToggle } from 'invest-ui'
   // <html suppressHydrationWarning> ... <ThemeProvider>{children}</ThemeProvider>
   ```

## Componentes
`BottomNav`, `NavCard`, `PageHeader`, `Section`, `Switch`, `Alert`, `SegmentedControl`, `Avatar`, `Button`, `Card`, `SectionTitle`, `Badge`, `Stat`, `Field`/`Input`/`Select`/`Textarea`/`FileInput`, `Tabs`, `Skeleton`,
`EmptyState`, `Table`/`TableWrap`/`Th`/`Td`, `ThemeToggle`.

## Dataviz (Canvas, theme-aware)
`ScoreGauge`, `Snowflake` (radar 5 ejes). Redibujan solos al cambiar tema/tamaño.

## Utilidades de color en Tailwind (del preset)
`bg-bg surface surface-2 border-border text-fg text-muted bg-accent text-up text-down text-warn`.
