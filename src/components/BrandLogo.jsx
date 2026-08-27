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
        <linearGradient id="nav-mark-gradient" x1="10" y1="8" x2="54" y2="56">
          <stop offset="0%" stopColor="#8BE9FF" />
          <stop offset="46%" stopColor="#147DFF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <filter id="nav-mark-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.08 0 0 0 0 0.49 0 0 0 0 1 0 0 0 0.75 0"
          />
          <feBlend in="SourceGraphic" />
        </filter>
      </defs>
      <rect width="64" height="64" rx="18" fill="#05080D" />
      <path
        d="M15 47V17l34 30V17"
        fill="none"
        stroke="url(#nav-mark-gradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#nav-mark-glow)"
      />
      <path
        d="M18 17h28M18 47h28"
        fill="none"
        stroke="#EAF7FF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.82"
      />
      <circle cx="15" cy="47" r="3.2" fill="#55D6FF" />
      <circle cx="49" cy="17" r="3.2" fill="#8B5CF6" />
    </svg>
  )
}

const LOGOS = {
  dark: '/logo-dark.png',
  light: '/logo-light.png',
}

const SIZE_CLASSES = {
  default: 'h-14 w-auto max-w-[260px] sm:h-16 sm:max-w-[320px]',
  footer: 'h-16 w-auto max-w-[320px] sm:h-20 sm:max-w-[390px]',
  loader: 'h-auto w-full max-w-[440px]',
}

export default function BrandLogo({ compact = false, variant = 'dark', size = 'default', className = '' }) {
  if (compact || size === 'loader') {
    return (
      <span className={`group/logo relative inline-flex ${className}`}>
        <img
          src="/logo-mark.png"
          alt="NAV Solutions"
          decoding="async"
          className={`${size === 'loader' ? 'h-28 w-28 sm:h-32 sm:w-32' : 'h-full w-full'} origin-center object-contain transition-transform duration-500 ease-premium group-hover/logo:scale-[1.035]`}
        />
      </span>
    )
  }

  const logoSrc = LOGOS[variant] ?? LOGOS.dark

  return (
    <span className={`group/logo relative inline-flex ${className}`}>
      <img
        src={logoSrc}
        alt="NAV Solutions - Soluciones de software que transforman"
        decoding="async"
        className={`${SIZE_CLASSES[size] ?? SIZE_CLASSES.default} origin-center object-contain transition-transform duration-500 ease-premium group-hover/logo:scale-[1.035]`}
      />
    </span>
  )
}
