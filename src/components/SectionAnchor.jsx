// A zero-height scroll target placed next to a section's heading.
//
// The id used to live on the <section> itself, which meant an anchor
// jump landed on the section's outer edge and left its whole top
// padding (up to 176px) as dead space under the header. Anchoring at
// the heading instead makes every jump land the same way regardless of
// how much breathing room the section has when scrolled through
// normally. The offset itself lives in `.scroll-anchor` in index.css.
export default function SectionAnchor({ id }) {
  return <span id={id} className="scroll-anchor" aria-hidden="true" />
}
