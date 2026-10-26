// Comprueba que src/tokens.ts coincide con theme.css (claro en :root, oscuro en :root[data-theme="dark"]).
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../theme.css', import.meta.url), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
const ts = readFileSync(new URL('../src/tokens.ts', import.meta.url), 'utf8')

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
const vars = (block) => Object.fromEntries([...block.matchAll(/--([a-z-]+):\s*([^;]+);/g)].map(([, k, v]) => [camel(k), v.trim()]))
const tokens = (name) => {
  const body = ts.match(new RegExp(`export const ${name} = \\{([\\s\\S]*?)\\} as const`))[1]
  return Object.fromEntries([...body.matchAll(/(\w+):\s*'([^']+)'/g)].map(([, k, v]) => [k, v]))
}

const lightCss = vars(css.match(/:root \{([\s\S]*?)\n\}/)[1])
const darkCss = vars(css.match(/:root\[data-theme="dark"\] \{([\s\S]*?)\n\}/)[1])
let bad = 0
for (const [name, source] of [['light', lightCss], ['dark', darkCss]]) {
  for (const [k, v] of Object.entries(tokens(name))) {
    if (source[k] !== v) {
      console.error(`${name}.${k}: tokens.ts=${v} theme.css=${source[k]}`)
      bad++
    }
  }
}
// Movimiento: duraciones y curvas contra --dur-* y --ease* (y el 0.98 de active:scale del botón).
const motionTs = ts.match(/export const motion = \{([\s\S]*?)\} as const/)[1]
const num = (k) => Number(motionTs.match(new RegExp(`${k}:\\s*(\\d+)`))[1])
const curve = (k) => motionTs.match(new RegExp(`${k}:\\s*\\[([^\\]]+)\\]`))[1].split(',').map((x) => Number(x))
const cssCurve = (v) => v.match(/cubic-bezier\(([^)]+)\)/)[1].split(',').map((x) => Number(x))
const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])
const checks = [
  ['motion.fast', num('fast'), parseInt(lightCss.durFast)],
  ['motion.base', num('base'), parseInt(lightCss.dur)],
  ['motion.slow', num('slow'), parseInt(lightCss.durSlow)],
]
for (const [name, a, b] of checks) if (a !== b) { console.error(`${name}: tokens.ts=${a} theme.css=${b}`); bad++ }
if (!same(curve('ease'), cssCurve(lightCss.ease))) { console.error('motion.ease no coincide con --ease'); bad++ }
if (!same(curve('easeOut'), cssCurve(lightCss.easeOut))) { console.error('motion.easeOut no coincide con --ease-out'); bad++ }
if (bad) process.exit(1)
console.log('tokens.ts coincide con theme.css')
