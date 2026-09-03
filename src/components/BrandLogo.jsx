export function BrandMark({ className = 'h-9 w-9' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="NavSolutions"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nav-mark-bg" x1="12" y1="8" x2="52" y2="56">
          <stop offset="0%" stopColor="#132014" />
          <stop offset="100%" stopColor="#030705" />
        </linearGradient>
        <linearGradient id="nav-mark-stroke" x1="10" y1="8" x2="54" y2="56">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
          <stop offset="58%" stopColor="#4DFF00" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path
        d="M16 6.5h32c5.25 0 9.5 4.25 9.5 9.5v32c0 5.25-4.25 9.5-9.5 9.5H16c-5.25 0-9.5-4.25-9.5-9.5V16c0-5.25 4.25-9.5 9.5-9.5Z"
        fill="url(#nav-mark-bg)"
      />
      <path
        d="M16 7.25h32c4.83 0 8.75 3.92 8.75 8.75v32c0 4.83-3.92 8.75-8.75 8.75H16c-4.83 0-8.75-3.92-8.75-8.75V16c0-4.83 3.92-8.75 8.75-8.75Z"
        fill="none"
        stroke="url(#nav-mark-stroke)"
        strokeWidth="1.5"
      />
      <path
        d="M19 45V19h7.5l17.8 25.6V19H50v26h-7.5L24.7 19.4V45H19Z"
        fill="#F7FAF4"
      />
      <path d="M31.1 19h6.1l-4.3 26h-6.1L31.1 19Z" fill="#4DFF00" opacity="0.9" />
    </svg>
  )
}

export default function BrandLogo({ compact = false, size = 'default', className = '' }) {
  if (compact) {
    return (
      <span className={`group/logo relative inline-flex ${className}`} aria-label="NAV Solutions">
        <BrandMark
          className="h-full w-full origin-center transition-transform duration-500 ease-premium group-hover/logo:scale-[1.035]"
        />
      </span>
    )
  }

  const markClass =
    size === 'loader'
      ? 'h-16 w-16 shrink-0 sm:h-20 sm:w-20'
      : 'h-11 w-11 shrink-0 sm:h-12 sm:w-12'
  const nameClass =
    size === 'loader'
      ? 'font-display text-3xl font-extrabold tracking-normal text-white sm:text-4xl'
      : 'font-display text-xl font-extrabold tracking-normal text-white sm:text-2xl'
  const taglineClass =
    size === 'loader'
      ? 'mt-2 font-sans text-[10px] font-medium tracking-[0.16em] text-white/45 sm:text-xs'
      : 'mt-1 hidden font-sans text-[9px] font-medium tracking-[0.16em] text-white/45 sm:block'

  return (
    <span className={`group/logo relative inline-flex items-center gap-3 ${className}`}>
      <BrandMark className={markClass} />
      <span className="flex flex-col leading-none">
        <span className={nameClass}>
          NAV<span style={{ color: '#4DFF00' }}>Solutions</span>
        </span>
        <span className={taglineClass}>
          SOFTWARE QUE TRANSFORMA
        </span>
      </span>
    </span>
  )
}
