// Tokens de strata como datos puros, sin React ni DOM: para plataformas donde no vale CSS (React Native).
// Espejo de theme.css: `pnpm tokens:check` falla si dejan de coincidir.

export const light = {
  bg: '#fafafa',
  bgElevated: '#ffffff',
  bgSubtle: '#f4f4f5',
  fg: '#18181b',
  fgMuted: '#52525b',
  fgSubtle: '#a1a1aa',
  border: '#e4e4e7',
  borderStrong: '#d4d4d8',
  accent: '#4c1d95',
  accentHover: '#6d28d9',
  accentSoft: '#ede9fe',
  accentFg: '#ffffff',
  positive: '#059669',
  negative: '#dc2626',
  warning: '#d97706',
} as const

export const dark = {
  bg: '#0a0a0a',
  bgElevated: '#141416',
  bgSubtle: '#1c1c1f',
  fg: '#fafafa',
  fgMuted: '#a1a1aa',
  fgSubtle: '#71717a',
  border: '#27272a',
  borderStrong: '#3f3f46',
  accent: '#a78bfa',
  accentHover: '#c4b5fd',
  accentSoft: 'rgba(167, 139, 250, 0.14)',
  accentFg: '#0a0a0a',
  positive: '#34d399',
  negative: '#f87171',
  warning: '#fbbf24',
} as const

export type Palette = { [K in keyof typeof light]: string }

/** Radios en px. */
export const radius = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, full: 9999 } as const

/** Escala tipográfica en px (el CSS la da en rem sobre 16 px). */
export const fontSize = { '2xs': 11, xs: 12, sm: 14, base: 17, lg: 20, xl: 24, '2xl': 30, '3xl': 40 } as const

export const fontFamily = { serif: 'Fraunces', sans: 'Inter', mono: 'Geist Mono' } as const
