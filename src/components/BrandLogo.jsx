// Raster logo pack lives in brand-source/logo_of (not published); public/brand
// holds the trimmed, web-sized exports actually served (horizontal ≈ 6:1,
// icon ≈ 1.7:1).
const LOGO_SRC = '/brand/logo-horizontal.webp'
const ICON_SRC = '/brand/logo-icon.webp'

export function BrandMark({ className = 'h-9 w-auto' }) {
  return (
    <img
      src={ICON_SRC}
      alt="NavSolutions"
      width={400}
      height={235}
      draggable={false}
      className={`select-none object-contain ${className}`}
    />
  )
}

export default function BrandLogo({ compact = false, size = 'default', compactBar = false, className = '' }) {
  if (compact) {
    return (
      <span className={`group/logo relative inline-flex ${className}`} aria-label="NavSolutions">
        <BrandMark
          className="h-full w-full origin-center transition-transform duration-500 ease-premium group-hover/logo:scale-[1.035]"
        />
      </span>
    )
  }

  const isLoader = size === 'loader'
  const isFooter = size === 'footer'

  // The header shrinks its own padding on scroll; the logo has to shrink
  // with it or the bar stops looking deliberate.
  const heightClass = isLoader
    ? 'h-12 xs:h-14 sm:h-[4.5rem]'
    : isFooter
      ? 'h-9 sm:h-10'
      : `transition-[height] duration-300 ease-premium ${
          compactBar ? 'h-8 sm:h-9' : 'h-9 sm:h-10 lg:h-11'
        }`

  return (
    <span className={`group/logo relative inline-flex shrink-0 items-center ${className}`}>
      <img
        src={LOGO_SRC}
        alt="NavSolutions — Software que transforma"
        width={1100}
        height={183}
        draggable={false}
        className={`w-auto max-w-full select-none object-contain ${heightClass}`}
      />
    </span>
  )
}
