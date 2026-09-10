import { useState } from 'react'
import Loader from './components/Loader'
import AmbientBackground from './components/AmbientBackground'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToggleButton from './components/ScrollToggleButton'
import Hero from './sections/Hero/Hero'
import Story from './sections/Story/Story'
import Problems from './sections/Problems/Problems'
import Transformation from './sections/Transformation/Transformation'
import Systems from './sections/Systems/Systems'
import WhatWeTransform from './sections/Transform/WhatWeTransform'
import Process from './sections/Process/Process'
import KeySection from './sections/KeySection/KeySection'
import Results from './sections/Results/Results'
import About from './sections/About/About'
import Contact from './sections/Contact/Contact'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useDeviceProfile } from './hooks/useDeviceProfile'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [ready, setReady] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const { tier } = useDeviceProfile()

  // Pointer-tracked physics: desktop-class hardware only.
  const enableHeavyFx = !reducedMotion && tier === 'high'
  // Looping decorative motion (canvas drift, ambient glow): everything
  // except reduced-motion users and genuinely weak devices. Phones get
  // an animated page, just a cheaper one.
  const enableAmbientFx = !reducedMotion && tier !== 'low'

  useSmoothScroll({ disabled: reducedMotion })

  return (
    <div>
      <AmbientBackground animate={enableAmbientFx} />

      <Loader onDone={() => {
        setLoading(false)
        setReady(true)
      }} />

      <Header />

      <main>
        <Hero ready={ready} enableHeavyFx={enableHeavyFx} enableAmbientFx={enableAmbientFx} />
        <Story />
        <Problems />
        <div className="cv-auto">
          <Transformation />
        </div>
        <div className="cv-auto">
          <Systems />
        </div>
        <div className="cv-auto">
          <WhatWeTransform />
        </div>
        <div className="cv-auto">
          <Process />
        </div>
        <KeySection />
        <Results />
        <div className="cv-auto">
          <About />
        </div>
        <Contact />
      </main>

      <Footer />
      <ScrollToggleButton />
      <WhatsAppButton />
    </div>
  )
}
