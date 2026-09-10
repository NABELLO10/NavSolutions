export default function HeroTransition() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 overflow-hidden sm:h-40 md:h-48" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07140b]/20 to-transparent" />

      <svg
        className="absolute inset-x-0 bottom-2 h-20 w-full opacity-60 sm:h-28 md:h-32"
        viewBox="0 0 1200 128"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="transition-line" x1="0" x2="1">
            <stop offset="0" stopColor="#D7FF2F" stopOpacity="0" />
            <stop offset="0.2" stopColor="#D7FF2F" stopOpacity="0.22" />
            <stop offset="0.5" stopColor="#4DFF00" stopOpacity="0.38" />
            <stop offset="0.8" stopColor="#00D84A" stopOpacity="0.2" />
            <stop offset="1" stopColor="#D7FF2F" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 82 C 180 82, 210 46, 360 64 S 550 104, 710 72 S 930 48, 1200 78"
          fill="none"
          stroke="url(#transition-line)"
          strokeWidth="1"
          strokeDasharray="3 9"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 0 104 C 210 104, 280 84, 420 92 S 720 116, 1200 94"
          fill="none"
          stroke="url(#transition-line)"
          strokeWidth="0.7"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="360" cy="64" r="2.2" fill="#D7FF2F" fillOpacity="0.64" />
        <circle cx="710" cy="72" r="2.2" fill="#4DFF00" fillOpacity="0.74" />
        <circle cx="930" cy="54" r="1.8" fill="#00D84A" fillOpacity="0.58" />
      </svg>

      <div className="absolute bottom-[34px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-accent-light/20 to-transparent sm:bottom-[42px] md:bottom-[49px]">
        <span className="hero-data-packet hero-data-packet-one" />
        <span className="hero-data-packet hero-data-packet-two" />
      </div>

      <div className="absolute bottom-0 left-[18%] h-7 w-px bg-gradient-to-b from-accent-light/22 to-transparent md:h-10" />
      <div className="absolute bottom-0 left-1/2 h-10 w-px bg-gradient-to-b from-accent-blue/26 to-transparent md:h-14" />
      <div className="absolute bottom-0 right-[22%] h-6 w-px bg-gradient-to-b from-accent-light/18 to-transparent md:h-8" />
    </div>
  )
}
