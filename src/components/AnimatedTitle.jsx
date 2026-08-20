import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.025, delayChildren: 0.05 },
  },
}

const word = {
  hidden: { yPercent: 115, opacity: 0, filter: 'blur(10px)' },
  show: {
    yPercent: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function AnimatedTitle({ text, as: Tag = 'h1', className = '', start = true, delay = 0 }) {
  const words = text.split(' ')
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={start ? 'show' : 'hidden'}
      transition={{ delayChildren: delay }}
    >
      <Tag className={className}>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span variants={word} className="inline-block will-change-transform">
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  )
}
