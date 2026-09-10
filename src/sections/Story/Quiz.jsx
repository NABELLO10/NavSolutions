import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from '../../data/content'

function useCountUp(target, duration = 600) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    function tick(now) {
      const t = Math.min(1, (now - start) / duration)
      setValue(Math.round(t * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}

function ScoreRing({ score }) {
  const radius = 68
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const displayed = useCountUp(score)

  return (
    <div className="relative mx-auto h-36 w-36 sm:h-44 sm:w-44">
      <svg viewBox="0 0 176 176" className="h-full w-full -rotate-90">
        <circle cx="88" cy="88" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <motion.circle
          cx="88"
          cy="88"
          r={radius}
          fill="none"
          stroke="url(#quizGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="quizGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4DFF00" />
            <stop offset="100%" stopColor="#D7FF2F" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-extrabold text-white sm:text-4xl">{displayed}%</span>
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent-light">
          Necesidad
        </span>
      </div>
    </div>
  )
}

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const total = QUIZ_QUESTIONS.length
  const finished = step >= total

  const score = useMemo(() => {
    if (!finished) return 0
    const yes = answers.filter(Boolean).length
    return Math.round((yes / total) * 100)
  }, [finished, answers, total])

  const result = useMemo(
    () => QUIZ_RESULTS.find((r) => score <= r.max) || QUIZ_RESULTS[QUIZ_RESULTS.length - 1],
    [score]
  )

  function answer(value) {
    setAnswers((prev) => [...prev, value])
    setStep((s) => s + 1)
  }

  function restart() {
    setStep(0)
    setAnswers([])
  }

  return (
    <div className="relative mx-auto mt-16 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] xs:p-6 sm:mt-24 sm:rounded-3xl sm:p-8 md:mt-32 md:p-12">
      {!finished ? (
        <>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-accent-light/70 sm:text-xs sm:tracking-[0.25em]">
              ¿Necesitas un sistema?
            </span>
            <span className="shrink-0 font-sans text-xs text-white/40">
              {step + 1}/{total}
            </span>
          </div>
          <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-green-700 to-lime-400"
              animate={{ width: `${(step / total) * 100}%` }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-balance font-display text-lg font-bold leading-snug text-white sm:text-xl md:text-2xl">
                {QUIZ_QUESTIONS[step]}
              </p>

              <div className="mt-6 flex gap-3 sm:mt-8 sm:gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => answer(true)}
                  className="flex-1 rounded-xl border border-accent-light/30 bg-accent-blue/10 py-3.5 font-sans text-sm font-semibold text-accent-light transition-colors hover:bg-accent-blue/20 focus-ring sm:rounded-2xl sm:py-4"
                >
                  Sí
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => answer(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] py-3.5 font-sans text-sm font-semibold text-white/60 transition-colors hover:bg-white/[0.06] focus-ring sm:rounded-2xl sm:py-4"
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <ScoreRing score={score} />
          <h3 className="mt-5 text-balance font-display text-xl font-bold leading-snug text-white sm:mt-6 sm:text-2xl md:text-3xl">
            {result.title}
          </h3>
          <p className="mx-auto mt-3 max-w-md font-sans text-[15px] text-white/55 sm:text-base">{result.text}</p>

          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-4 sm:mt-8">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-sans text-sm font-semibold text-base-950 transition-transform active:scale-[0.98] focus-ring"
              style={{ background: 'linear-gradient(90deg, #D7FF2F 0%, #4DFF00 54%, #00B93E 100%)' }}
            >
              Cuéntanos tu caso <span>→</span>
            </a>
            <button
              onClick={restart}
              className="py-2 font-sans text-sm text-white/40 underline-offset-4 transition-colors hover:text-white/70 hover:underline focus-ring"
            >
              Repetir quiz
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
