import { useEffect, useState } from 'react'
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
import { ScrollTrigger } from './config/gsap'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [ready, setReady] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const { isLowPower } = useDeviceProfile()

  const enableHeavyFx = !reducedMotion && !isLowPower
  const disableSmoothScroll = reducedMotion

  useSmoothScroll({ disabled: disableSmoothScroll })

  useEffect(() => {
    if (!loading) {
      setReady(true)
      const id = requestAnimationFrame(() => ScrollTrigger.refresh())
      return () => cancelAnimationFrame(id)
    }
    return undefined
  }, [loading])

  return (
    <div>
      <AmbientBackground lowPower={reducedMotion || isLowPower} />

      <Loader onDone={() => setLoading(false)} />

      <Header />

      <main>
        <Hero ready={ready} enableHeavyFx={enableHeavyFx} />
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
