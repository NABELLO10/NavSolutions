import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrandLogo from './BrandLogo'

export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-base-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex w-full justify-center px-5 sm:px-6"
          >
            <BrandLogo size="loader" />
          </motion.div>
          <div className="h-px w-32 overflow-hidden bg-white/10 sm:w-40">
            <motion.div
              className="h-full w-full origin-left bg-gradient-to-r from-green-700 via-green-500 to-lime-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
