export default function HeroTransition() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08111c]/15 to-transparent" />

      <svg
        className="absolute inset-x-0 bottom-2 h-32 w-full opacity-60"
        viewBox="0 0 1200 128"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="transition-line" x1="0" x2="1">
            <stop offset="0" stopColor="#55D6FF" stopOpacity="0" />
            <stop offset="0.2" stopColor="#55D6FF" stopOpacity="0.26" />
            <stop offset="0.5" stopColor="#147DFF" stopOpacity="0.42" />
            <stop offset="0.8" stopColor="#55D6FF" stopOpacity="0.22" />
            <stop offset="1" stopColor="#55D6FF" stopOpacity="0" />
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
        <circle cx="360" cy="64" r="2.2" fill="#55D6FF" fillOpacity="0.7" />
        <circle cx="710" cy="72" r="2.2" fill="#147DFF" fillOpacity="0.8" />
        <circle cx="930" cy="54" r="1.8" fill="#55D6FF" fillOpacity="0.65" />
      </svg>

      <div className="absolute bottom-[49px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-accent-light/20 to-transparent">
        <span className="hero-data-packet hero-data-packet-one" />
        <span className="hero-data-packet hero-data-packet-two" />
      </div>

      <div className="absolute bottom-0 left-[18%] h-10 w-px bg-gradient-to-b from-accent-light/22 to-transparent" />
      <div className="absolute bottom-0 left-1/2 h-14 w-px bg-gradient-to-b from-accent-blue/26 to-transparent" />
      <div className="absolute bottom-0 right-[22%] h-8 w-px bg-gradient-to-b from-accent-light/18 to-transparent" />
    </div>
  )
}
