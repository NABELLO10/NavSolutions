export const NAV_LINKS = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export const CHAOS_ITEMS = [
  '17 planillas Excel',
  '42 correos pendientes',
  '8 sistemas diferentes',
  'Información duplicada',
  'Procesos manuales',
  'Reportes que toman horas',
]

export const TRANSFORM_BLOCKS = [
  {
    title: 'Centraliza',
    text: 'Toda la información en un mismo lugar.',
  },
  {
    title: 'Automatiza',
    text: 'Menos tareas repetitivas.',
  },
  {
    title: 'Decide',
    text: 'Información disponible cuando realmente la necesitas.',
  },
]

export const SYSTEM_SCREENS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'inventario', label: 'Inventario' },
  { id: 'personas', label: 'Gestión de personas' },
  { id: 'mapa', label: 'Mapa' },
  { id: 'reportes', label: 'Reportes' },
  { id: 'movil', label: 'Móvil' },
]

export const PROJECTS = [
  {
    id: '01',
    title: 'Gestión de operaciones',
    tags: ['Operaciones', 'Personas', 'Estados', 'Documentos', 'Reportes', 'Indicadores'],
    screen: 'ops',
  },
  {
    id: '02',
    title: 'Control de obras',
    tags: ['Proyectos', 'Avances', 'Contratistas', 'Fotografías', 'Materiales', 'Reportes'],
    screen: 'works',
  },
  {
    id: '03',
    title: 'Inventario',
    tags: ['Stock', 'Movimientos', 'Productos', 'Alertas', 'Bodegas'],
    screen: 'inventory',
  },
  {
    id: '04',
    title: 'Reservas',
    tags: ['Agenda', 'Clientes', 'Profesionales', 'Horarios', 'Confirmaciones'],
    screen: 'bookings',
  },
  {
    id: '05',
    title: 'Plataformas empresariales',
    tags: ['Usuarios', 'Roles', 'Permisos', 'Procesos', 'Indicadores', 'Auditoría'],
    screen: 'enterprise',
  },
]

export const TRANSFORM_PHRASES = [
  { from: 'Excel', to: 'Plataforma', text: 'Un Excel puede convertirse en una plataforma.' },
  { from: 'Proceso manual', to: 'Automatización', text: 'Un proceso manual puede convertirse en automatización.' },
  { from: 'Correo', to: 'Flujo', text: 'Un correo puede convertirse en un flujo.' },
  { from: 'Reporte', to: 'Dashboard', text: 'Un reporte puede convertirse en un dashboard.' },
  { from: 'Idea', to: 'Producto', text: 'Una idea puede convertirse en un producto.' },
]

export const SOLUTION_TYPES = [
  'Sistemas empresariales',
  'Automatización',
  'Plataformas web',
  'Dashboards',
  'Gestión de procesos',
  'Integraciones',
  'Aplicaciones de terreno',
  'Sitios web',
  'Portales',
  'Intranets',
]

// Las tres formas de contratar. La del medio va marcada como destacada
// porque es la combinación que el resto del sitio viene explicando:
// la página capta y el sistema gestiona lo que entra por ella.
export const SERVICE_TRACKS = [
  {
    id: 'landing',
    kicker: 'Presencia',
    title: 'Landing page',
    lead: 'La cara visible de tu negocio.',
    text: 'Una página que explica con claridad qué haces, a quién le sirve y cómo contactarte. Pensada para que una visita termine en una conversación.',
    points: [
      'Diseño a medida, sin plantillas',
      'Se ve igual de bien en celular y escritorio',
      'Carga rápida y preparada para buscadores',
      'Formulario y WhatsApp conectados',
    ],
    forWho: 'Para negocios que necesitan mostrarse y captar contactos.',
    featured: false,
  },
  {
    id: 'landing-sistema',
    kicker: 'Lo más completo',
    title: 'Landing + Sistema',
    lead: 'La cara visible y el motor, conectados.',
    text: 'La página capta al cliente y el sistema gestiona lo que viene después. Cada contacto o solicitud entra directo a tu operación, sin copiar y pegar entre herramientas.',
    points: [
      'Todo lo de la landing page',
      'Sistema a medida por detrás',
      'Lo que entra por la web llega al sistema',
      'Usuarios, roles y reportes',
    ],
    forWho: 'Para negocios que captan clientes y además necesitan ordenar la operación.',
    featured: true,
  },
  {
    id: 'sistema',
    kicker: 'Operación',
    title: 'Sistema a medida',
    lead: 'Tu operación, ordenada.',
    text: 'La plataforma interna con la que trabaja tu equipo todos los días: información en un solo lugar, procesos definidos y reportes que se generan solos.',
    points: [
      'Diseñado sobre tu proceso real',
      'Información centralizada',
      'Automatización de tareas repetitivas',
      'Indicadores y reportes en vivo',
    ],
    forWho: 'Para equipos que hoy dependen de planillas y coordinación manual.',
    featured: false,
  },
]

export const PROCESS_STEPS = [
  { n: '01', title: 'Entender', text: 'Qué haces hoy.' },
  { n: '02', title: 'Detectar', text: 'Qué se puede mejorar.' },
  { n: '03', title: 'Diseñar', text: 'Cómo debería funcionar.' },
  { n: '04', title: 'Construir', text: 'Convertirlo en software.' },
  { n: '05', title: 'Implementar', text: 'Llevarlo al mundo real.' },
  { n: '06', title: 'Mejorar', text: 'Continuar evolucionándolo.' },
]

export const RESULTS = [
  'Menos trabajo manual',
  'Mayor control',
  'Información centralizada',
  'Procesos más rápidos',
  'Menos errores',
  'Mejores decisiones',
]

export const EXPERIENCE_TAGS = [
  'Desarrollo de software',
  'Optimización de procesos',
  'Sistemas empresariales',
  'Automatización',
  'Bases de datos',
  'Integraciones',
  'Cloud',
  'GIS',
]

export const QUIZ_QUESTIONS = [
  '¿Usas más de 3 planillas Excel para manejar tu operación diaria?',
  '¿Pierdes tiempo buscando información repartida en distintos lugares?',
  '¿Coordinas tareas del equipo por WhatsApp o correo, sin un registro claro?',
  '¿Se te complica generar reportes o indicadores actualizados?',
  '¿Has cometido errores por trabajar con información desactualizada o duplicada?',
]

export const QUIZ_RESULTS = [
  {
    max: 20,
    title: 'Tu operación está bastante ordenada.',
    text: 'Aun así, hay margen para automatizar tareas repetitivas y ganar tiempo.',
  },
  {
    max: 50,
    title: 'Tienes puntos claros por resolver.',
    text: 'Un sistema a medida podría ordenar esos procesos rápidamente.',
  },
  {
    max: 80,
    title: 'Un sistema te ahorraría horas cada semana.',
    text: 'Varias de tus tareas hoy dependen de procesos manuales que se pueden automatizar.',
  },
  {
    max: 100,
    title: 'Tu negocio necesita un sistema de gestión con urgencia.',
    text: 'La mayoría de tus procesos hoy dependen de coordinación manual y información dispersa.',
  },
]

export const CONTACT = {
  whatsapp: '56978696327',
  email: 'contacto@navsolutions.dev',
}
