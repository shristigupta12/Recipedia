"use client"

import { motion } from "framer-motion"

interface Ingredient {
  id: string
  src: string
  alt: string
  angle: number
}

interface IngredientCircleProps {
  ingredients: Ingredient[]
  isConverging: boolean
}

export function IngredientCircle({ ingredients, isConverging }: IngredientCircleProps) {
  const radius = 200

  return (
    <>
      {ingredients.map((ingredient, index) => {
        const x = Math.cos((ingredient.angle * Math.PI) / 180) * radius
        const y = Math.sin((ingredient.angle * Math.PI) / 180) * radius

        return (
          <motion.div
            key={ingredient.id}
            initial={{
              x,
              y,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              x: isConverging ? 0 : x,
              y: isConverging ? 0 : y,
              scale: isConverging ? [1, 1.2, 0] : [0, 1],
            }}
            transition={{
              duration: isConverging ? 1.5 : 0.8,
              delay: isConverging ? index * 0.1 : index * 0.2,
              ease: isConverging ? "easeInOut" : "backOut",
            }}
            className="absolute flex items-center justify-center"
          >
            <motion.div whileHover={{ scale: 1.1 }} className="relative">
              <img
                src={ingredient.src || "/placeholder.svg"}
                alt={ingredient.alt}
                className="w-32 h-32 "
              />

              {/* Ingredient glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: index * 0.3,
                }}
                className="absolute inset-0  rounded-full blur-md"
              />

              {/* Floating animation */}
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: index * 0.4,
                }}
                className="absolute inset-0"
              />
            </motion.div>
          </motion.div>
        )
      })}
    </>
  )
}
