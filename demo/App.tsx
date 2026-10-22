import { useState, type ReactNode } from 'react'
import {
  Alert,
  Avatar,
  Badge,
  BottomNav,
  Button,
  Card,
  EmptyState,
  Field,
  FileInput,
  Input,
  Modal,
  NavCard,
  PageHeader,
  ScoreGauge,
  Section,
  SegmentedControl,
  Select,
  Skeleton,
  Snowflake,
  Sparkline,
  Stat,
  Switch,
  Table,
  TableWrap,
  Tabs,
  Td,
  Textarea,
  Th,
  ThemeToggle,
  useConfirm,
  useToast,
} from '../src'

const TOKENS = [
  ['bg', 'bg-bg'],
  ['surface', 'bg-surface'],
  ['surface-2', 'bg-surface-2'],
  ['accent', 'bg-accent'],
  ['up', 'bg-up'],
  ['down', 'bg-down'],
  ['warn', 'bg-warn'],
  ['fg', 'bg-fg'],
  ['muted', 'bg-muted'],
] as const

const SERIES = [4, 6, 5, 9, 8, 12, 11, 15, 14, 18]
const AXES = [
  { label: 'Valor', value: 0.8 },
  { label: 'Crecimiento', value: 0.6 },
  { label: 'Salud', value: 0.9 },
  { label: 'Dividendo', value: 0.4 },
  { label: 'Pasado', value: 0.7 },
]

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Section title={title}>
      <Card className="space-y-4">{children}</Card>
    </Section>
  )
}

function Interactive() {
  const [open, setOpen] = useState(false)
  const [on, setOn] = useState(true)
  const [seg, setSeg] = useState('mes')
  const toast = useToast()
  const confirm = useConfirm()
  return (
    <Block title="Interacción">
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Button
          variant="secondary"
          onClick={() => toast({ title: 'Listo', message: 'Cambios guardados', tone: 'success' })}
        >
          Mostrar toast
        </Button>
        <Button
          variant="ghost"
          onClick={async () => {
            const ok = await confirm({ title: '¿Eliminar?', message: 'No se puede deshacer.', danger: true })
            toast({ message: ok ? 'Eliminado' : 'Cancelado', tone: ok ? 'error' : 'info' })
          }}
        >
          Confirmar acción
        </Button>
      </div>
      <Switch checked={on} onChange={(e) => setOn(e.target.checked)}>
        Notificaciones {on ? 'activas' : 'apagadas'}
      </Switch>
      <SegmentedControl
        label="Periodo"
        value={seg}
        onChange={setSeg}
        options={[
          { value: 'semana', label: 'Semana' },
          { value: 'mes', label: 'Mes' },
          { value: 'año', label: 'Año' },
        ]}
      />
      <Modal open={open} onClose={() => setOpen(false)} title="Modal de ejemplo">
        <p className="text-sm text-muted">Se cierra con Escape o haciendo clic fuera.</p>
      </Modal>
    </Block>
  )
}

export function App() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 pb-24">
      <PageHeader
        eyebrow="Sistema de diseño"
        title="strata"
        description="Violeta editorial: tokens claro/oscuro, primitivos y dataviz. Lo usan portfolio, orbit, market-agent, investment-dashboard y routine-schemer."
        actions={
          <>
            <a
              href="https://github.com/MattBuiles/strata-ui"
              className="text-sm font-medium text-muted hover:text-fg"
            >
              GitHub
            </a>
            <ThemeToggle />
          </>
        }
      />

      <Block title="Colores">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {TOKENS.map(([name, cls]) => (
            <div key={name}>
              <div className={`h-12 rounded-xl border border-border ${cls}`} />
              <p className="mt-1 font-mono text-xs text-muted">{name}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Tipografía">
        <p className="font-serif text-3xl font-semibold tracking-tight">Fraunces para títulos</p>
        <p>Inter para el texto de lectura y la interfaz.</p>
        <p className="font-mono text-sm">Geist Mono — AAPL 187.42 +1.3%</p>
      </Block>

      <Block title="Botones y etiquetas">
        <div className="flex flex-wrap gap-3">
          <Button>Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Pequeño</Button>
          <Button size="lg">Grande</Button>
          <Button disabled>Deshabilitado</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="accent">accent</Badge>
          <Badge tone="up">up</Badge>
          <Badge tone="down">down</Badge>
          <Badge tone="warn">warn</Badge>
          <Badge>flat</Badge>
        </div>
      </Block>

      <Block title="Avisos y datos">
        <Alert tone="info">Información general.</Alert>
        <Alert tone="success">Operación completada.</Alert>
        <Alert tone="error">Algo salió mal.</Alert>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="Valor" value="$12,480" />
          <Stat label="Retorno" value="+8.2%" />
          <Stat label="Posiciones" value="14" />
        </div>
        <div className="flex items-center gap-3">
          <Avatar name="Mateo Builes" />
          <Avatar name="Ana" />
        </div>
      </Block>

      <Block title="Formularios">
        <Field label="Nombre" hint="Como aparece en tu perfil.">
          <Input placeholder="Tu nombre" />
        </Field>
        <Field label="Categoría">
          <Select defaultValue="b">
            <option value="a">AI/ML</option>
            <option value="b">Finanzas</option>
          </Select>
        </Field>
        <Field label="Notas">
          <Textarea rows={3} placeholder="Escribe aquí" />
        </Field>
        <FileInput />
      </Block>

      <Interactive />

      <Block title="Navegación">
        <Tabs
          tabs={[
            { id: 'a', label: 'Resumen', content: <p className="text-sm text-muted">Contenido del resumen.</p> },
            { id: 'b', label: 'Detalle', content: <p className="text-sm text-muted">Contenido del detalle.</p> },
          ]}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <NavCard href="#" title="Destacado" description="Destino principal" featured />
          <NavCard href="#" title="Secundario" description="Otra sección" />
        </div>
        <div className="relative h-16 overflow-hidden rounded-xl border border-border">
          <BottomNav
            className="static"
            activeId="inicio"
            items={[
              { id: 'inicio', href: '#', label: 'Inicio' },
              { id: 'citas', href: '#', label: 'Citas' },
              { id: 'clientes', href: '#', label: 'Clientes' },
            ]}
          />
        </div>
      </Block>

      <Block title="Tabla y estados">
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <Th>Ticker</Th>
                <Th>Precio</Th>
                <Th>Cambio</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>AAPL</Td>
                <Td className="iv-tabular">187.42</Td>
                <Td className="iv-tabular text-up">+1.3%</Td>
              </tr>
              <tr>
                <Td>TSLA</Td>
                <Td className="iv-tabular">241.10</Td>
                <Td className="iv-tabular text-down">−2.1%</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrap>
        <EmptyState title="Sin resultados" description="Prueba con otro filtro." action={<Button size="sm">Limpiar</Button>} />
        <div className="space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Block>

      <Block title="Dataviz">
        <div className="flex flex-wrap items-center gap-8">
          <Sparkline data={SERIES} width={160} height={48} />
          <ScoreGauge total={72} />
          <Snowflake axes={AXES} size={240} />
        </div>
      </Block>
    </div>
  )
}
