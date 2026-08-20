const Bar = ({ w = 'w-full', h = 'h-2', className = '' }) => (
  <div className={`${w} ${h} rounded-full bg-white/10 ${className}`} />
)

function Sidebar() {
  return (
    <div className="hidden w-40 shrink-0 flex-col gap-4 border-r border-white/5 bg-white/[0.02] p-4 md:flex">
      <Bar w="w-20" h="h-2.5" className="bg-accent-light/50" />
      <div className="mt-4 flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full ${i === 1 ? 'bg-accent-light' : 'bg-white/20'}`} />
            <Bar w={i === 1 ? 'w-16' : 'w-12'} h="h-1.5" />
          </div>
        ))}
      </div>
    </div>
  )
}

function TopBar({ title }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
      <span className="font-sans text-xs font-medium text-white/60">{title}</span>
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-accent-blue/30" />
        <Bar w="w-16" h="h-2" />
      </div>
    </div>
  )
}

function DashboardBody() {
  return (
    <div className="grid flex-1 grid-cols-3 gap-3 p-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
          <Bar w="w-10" h="h-1.5" />
          <div className="mt-2 font-display text-lg font-bold text-white/80">{[128, 42, 96][i]}</div>
        </div>
      ))}
      <div className="col-span-3 mt-1 flex h-32 items-end gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] p-3">
        {[40, 65, 30, 80, 55, 90, 45, 70, 60, 85].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-accent-blue/60 to-accent-light/60"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}

const INVENTORY_ROWS = [
  { sku: 'SKU-1042', name: 'Panel eléctrico 40A', qty: '128', status: 'Disponible' },
  { sku: 'SKU-1105', name: 'Cable UTP cat.6 (m)', qty: '340', status: 'Disponible' },
  { sku: 'SKU-0987', name: 'Sensor de presión', qty: '12', status: 'Stock bajo' },
  { sku: 'SKU-1201', name: 'Válvula reguladora', qty: '0', status: 'Sin stock' },
  { sku: 'SKU-1330', name: 'Motor 1/2 HP', qty: '54', status: 'Disponible' },
  { sku: 'SKU-1188', name: 'Bomba sumergible', qty: '7', status: 'Stock bajo' },
]

const STATUS_STYLE = {
  Disponible: 'bg-accent-light/15 text-accent-light',
  'Stock bajo': 'bg-amber-400/15 text-amber-300',
  'Sin stock': 'bg-rose-400/15 text-rose-300',
}

function TableBody() {
  return (
    <div className="flex-1 overflow-hidden p-5">
      <div className="grid grid-cols-[1fr,2fr,1fr,1fr] gap-3 border-b border-white/10 pb-3 font-sans text-[11px] uppercase tracking-wide text-white/40">
        <span>SKU</span>
        <span>Producto</span>
        <span>Cantidad</span>
        <span>Estado</span>
      </div>
      {INVENTORY_ROWS.map((row) => (
        <div
          key={row.sku}
          className="grid grid-cols-[1fr,2fr,1fr,1fr] items-center gap-3 border-b border-white/5 py-3 font-sans text-xs text-white/70"
        >
          <span className="text-white/40">{row.sku}</span>
          <span className="truncate">{row.name}</span>
          <span>{row.qty}</span>
          <span className={`w-fit rounded-full px-2 py-0.5 text-[10px] ${STATUS_STYLE[row.status]}`}>
            {row.status}
          </span>
        </div>
      ))}
    </div>
  )
}

function PeopleBody() {
  return (
    <div className="grid flex-1 grid-cols-2 gap-3 p-5 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-3">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-accent-blue/50 to-accent-cyan/30" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Bar w="w-16" h="h-1.5" />
            <Bar w="w-10" h="h-1.5" className="opacity-40" />
          </div>
        </div>
      ))}
    </div>
  )
}

function MapBody() {
  return (
    <div className="relative flex-1 overflow-hidden p-5">
      <div
        className="absolute inset-5 rounded-lg opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(85,214,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(85,214,255,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute inset-5 rounded-lg border border-white/5" />
      {[[20, 30], [55, 60], [72, 25], [38, 72], [85, 55]].map(([x, y], i) => (
        <span
          key={i}
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-light shadow-[0_0_16px_rgba(85,214,255,0.8)]"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      ))}
    </div>
  )
}

function ReportsBody() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-5">
      <div className="flex h-24 items-end gap-2">
        <svg viewBox="0 0 200 60" className="h-full w-full" preserveAspectRatio="none">
          <polyline
            points="0,50 25,35 50,42 75,20 100,28 125,10 150,22 175,8 200,15"
            fill="none"
            stroke="#55D6FF"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
            <Bar w="w-12" h="h-1.5" />
            <Bar w="w-8" h="h-2" className="mt-2 bg-accent-light/40" />
          </div>
        ))}
      </div>
    </div>
  )
}

const KANBAN_COLUMNS = [
  { title: 'Por hacer', accent: 'bg-white/20', cards: ['Revisión de turno', 'Actualizar checklist'] },
  {
    title: 'En curso',
    accent: 'bg-accent-light',
    cards: ['Asignar cuadrilla', 'Cierre de incidencia #204'],
  },
  { title: 'Hecho', accent: 'bg-emerald-400', cards: ['Reporte semanal', 'Entrega de EPP'] },
]

function KanbanBody() {
  return (
    <div className="grid flex-1 grid-cols-3 gap-3 overflow-hidden p-5">
      {KANBAN_COLUMNS.map((col) => (
        <div key={col.title} className="flex flex-col gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
          <div className="flex items-center gap-2 px-1">
            <span className={`h-1.5 w-1.5 rounded-full ${col.accent}`} />
            <span className="font-sans text-[11px] font-medium text-white/60">{col.title}</span>
          </div>
          {col.cards.map((card) => (
            <div key={card} className="rounded-md border border-white/5 bg-base-900/80 p-2.5">
              <span className="font-sans text-[11px] leading-snug text-white/70">{card}</span>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-accent-blue/60 to-accent-cyan/40" />
                <Bar w="w-8" h="h-1" className="opacity-40" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const WORKS_PROGRESS = [
  { name: 'Edificio Norte — Etapa 2', pct: 78, status: 'En plazo' },
  { name: 'Planta de tratamiento', pct: 45, status: 'En plazo' },
  { name: 'Bodega logística km 12', pct: 22, status: 'Atrasado' },
]

function ProgressBody() {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden p-5">
      {WORKS_PROGRESS.map((w) => (
        <div key={w.name}>
          <div className="flex items-center justify-between font-sans text-xs text-white/70">
            <span>{w.name}</span>
            <span className={w.status === 'Atrasado' ? 'text-amber-300' : 'text-accent-light'}>
              {w.pct}%
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan"
              style={{ width: `${w.pct}%` }}
            />
          </div>
        </div>
      ))}
      <div className="mt-1 grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent"
          />
        ))}
      </div>
    </div>
  )
}

const BOOKINGS = [
  { time: '09:00', name: 'M. Rodríguez', service: 'Consulta inicial' },
  { time: '10:30', name: 'C. Fuentes', service: 'Control mensual' },
  { time: '12:00', name: 'J. Silva', service: 'Evaluación' },
  { time: '15:30', name: 'A. Vidal', service: 'Seguimiento' },
]

function CalendarBody() {
  return (
    <div className="flex flex-1 gap-4 overflow-hidden p-5">
      <div className="grid flex-1 grid-cols-5 gap-1.5">
        {['L', 'M', 'X', 'J', 'V'].map((d, col) => (
          <div key={d} className="flex flex-col gap-1.5">
            <span className="text-center font-sans text-[10px] text-white/40">{d}</span>
            {Array.from({ length: 5 }).map((_, row) => {
              const filled = (col + row * 2) % 4 === 0
              return (
                <div
                  key={row}
                  className={`h-5 rounded-md ${filled ? 'bg-gradient-to-r from-accent-blue/50 to-accent-cyan/30' : 'bg-white/[0.03]'}`}
                />
              )
            })}
          </div>
        ))}
      </div>
      <div className="w-32 shrink-0 border-l border-white/5 pl-4">
        <span className="font-sans text-[10px] uppercase tracking-wide text-white/40">Hoy</span>
        <div className="mt-2 flex flex-col gap-2.5">
          {BOOKINGS.map((b) => (
            <div key={b.time} className="text-xs">
              <div className="font-sans font-medium text-accent-light">{b.time}</div>
              <div className="font-sans text-[11px] text-white/60">{b.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ROLES = [
  { user: 'admin@empresa.cl', role: 'Administrador', status: 'Activo' },
  { user: 'finanzas@empresa.cl', role: 'Finanzas', status: 'Activo' },
  { user: 'operaciones@empresa.cl', role: 'Operaciones', status: 'Activo' },
  { user: 'auditor@empresa.cl', role: 'Auditoría', status: 'Suspendido' },
]

function EnterpriseBody() {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden p-5">
      <div>
        <span className="font-sans text-[11px] uppercase tracking-wide text-white/40">
          Usuarios y roles
        </span>
        <div className="mt-2 flex flex-col gap-2">
          {ROLES.map((r) => (
            <div
              key={r.user}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 font-sans text-xs"
            >
              <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-accent-blue/50 to-accent-cyan/30" />
              <span className="flex-1 truncate text-white/70">{r.user}</span>
              <span className="text-white/40">{r.role}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  r.status === 'Activo' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-400/15 text-rose-300'
                }`}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <span className="font-sans text-[11px] uppercase tracking-wide text-white/40">
          Registro de auditoría
        </span>
        <div className="mt-2 flex flex-col gap-2 border-l border-white/10 pl-3">
          {['Permiso modificado · Finanzas', 'Nuevo usuario invitado', 'Exportación de reporte'].map((log) => (
            <div key={log} className="relative font-sans text-[11px] text-white/50">
              <span className="absolute -left-[15px] top-1.5 h-1.5 w-1.5 rounded-full bg-accent-light/60" />
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const BODIES = {
  dashboard: DashboardBody,
  inventario: TableBody,
  personas: PeopleBody,
  mapa: MapBody,
  reportes: ReportsBody,
  kanban: KanbanBody,
  progress: ProgressBody,
  calendar: CalendarBody,
  enterprise: EnterpriseBody,
}

export default function MockScreen({ id, title }) {
  if (id === 'movil') {
    return (
      <div className="mx-auto flex h-[420px] w-[220px] flex-col overflow-hidden rounded-[2rem] border-4 border-white/10 bg-base-900 shadow-[0_30px_80px_rgba(0,0,0,0.5)] md:h-[480px] md:w-[250px]">
        <div className="flex items-center justify-between px-4 pb-1 pt-3">
          <Bar w="w-10" h="h-1.5" />
          <div className="h-1.5 w-1.5 rounded-full bg-accent-light" />
        </div>
        <div className="flex-1 space-y-2 p-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-white/5 bg-white/[0.03] p-2.5">
              <Bar w="w-16" h="h-1.5" />
              <Bar w="w-10" h="h-1.5" className="mt-1.5 opacity-40" />
            </div>
          ))}
        </div>
        <div className="flex justify-around border-t border-white/5 py-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-accent-light' : 'bg-white/15'}`} />
          ))}
        </div>
      </div>
    )
  }

  const Body = BODIES[id] || DashboardBody

  return (
    <div className="mx-auto flex h-[340px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-base-900 shadow-[0_30px_80px_rgba(0,0,0,0.5)] md:h-[420px]">
      <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-white/5 bg-white/[0.02] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
      </div>
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <div className="flex min-h-0 flex-1 flex-col">
          <TopBar title={title} />
          <Body />
        </div>
      </div>
    </div>
  )
}
