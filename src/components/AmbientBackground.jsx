// A single fixed backdrop shared by the whole page instead of every
// section painting its own flat black block. Gives the site a
// continuous sense of depth (soft light sources + a faint grid,
// vignetted at the edges) rather than a wall of black between sections.
//
// The glow blobs are radial-gradient circles, not solid divs behind a
// CSS `filter: blur()`. A large blurred div is one of the most
// expensive things a browser can composite (measured ~4x slower
// scroll framerate with it in the tree); a radial-gradient with a
// transparent edge reads as an equally soft glow for a fraction of
// the cost, since there's no blur pass at all.
//
// The blobs stay compositor-friendly while scrolling: no scroll-linked
// parallax, just optional slow CSS drift when the device can afford it.
export default function AmbientBackground({ animate = true }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* Base is a deep vertical gradient (never a flat single black),
          so even where no glow overlaps, the backdrop still reads as
          rich navy-black instead of a plain #000 wall. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #010201 0%, #030704 22%, #07100a 48%, #040a06 74%, #010201 100%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.85]"
        style={{
          background:
            'radial-gradient(ellipse 85% 65% at 12% 0%, rgba(24,224,96,0.16), transparent 60%),' +
            'radial-gradient(ellipse 70% 60% at 100% 22%, rgba(15,184,79,0.12), transparent 55%),' +
            'radial-gradient(ellipse 75% 65% at 8% 100%, rgba(141,255,69,0.08), transparent 58%),' +
            'radial-gradient(ellipse 60% 55% at 90% 92%, rgba(24,224,96,0.1), transparent 58%),' +
            'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(141,255,69,0.04), transparent 65%)',
        }}
      />

      <div className="absolute -left-1/4 top-[4%] h-[70vmax] w-[70vmax]">
        <div
          className={`h-full w-full rounded-full ${animate ? 'ambient-drift' : ''}`}
          style={{ background: 'radial-gradient(circle, rgba(24,224,96,0.13) 0%, rgba(24,224,96,0) 70%)' }}
        />
      </div>

      <div className="absolute -right-1/4 top-[40%] h-[66vmax] w-[66vmax]">
        <div
          className={`h-full w-full rounded-full ${animate ? 'ambient-drift-alt' : ''}`}
          style={{ background: 'radial-gradient(circle, rgba(15,184,79,0.1) 0%, rgba(15,184,79,0) 70%)' }}
        />
      </div>

      <div className="absolute bottom-[-15%] left-[15%] h-[58vmax] w-[58vmax]">
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(141,255,69,0.07) 0%, rgba(141,255,69,0) 70%)' }}
        />
      </div>

      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(186,255,205,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(186,255,205,0.55) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 35%, black 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 35%, black 0%, transparent 78%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 90% at 50% 40%, transparent 65%, rgba(0,5,2,0.42) 100%)',
        }}
      />

      <div className="noise-layer absolute inset-0" />
    </div>
  )
}
