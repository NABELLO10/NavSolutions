import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 350)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-base-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="overflow-hidden">
            <motion.span
              className="block font-display text-sm font-semibold tracking-[0.5em] text-white"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              NAB
            </motion.span>
          </div>
          <div className="mt-1 overflow-hidden">
            <motion.span
              className="block font-display text-sm font-semibold tracking-[0.5em] text-accent-light"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.3, delay: 0.03, ease: [0.16, 1, 0.3, 1] }}
            >
              SOLUTIONS
            </motion.span>
          </div>
          <motion.div
            className="mt-8 h-px w-32 origin-left bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-light"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.32, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
