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
if (bad) process.exit(1)
console.log('tokens.ts coincide con theme.css')
