"use client"
import { motion } from "framer-motion"

interface SparkleEffectProps {
  isActive: boolean
}

export function SparkleEffect({ isActive }: SparkleEffectProps) {
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      {isActive &&
        sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{
              opacity: 0,
              scale: 0,
              x: `${sparkle.x}vw`,
              y: `${sparkle.y}vh`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: sparkle.duration,
              delay: sparkle.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute w-2 h-2"
          >
            <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
          </motion.div>
        ))}
    </div>
  )
}
