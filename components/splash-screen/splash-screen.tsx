"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IngredientCircle } from "./ingredient-circle"
import { SparkleEffect } from "./sparkle-effect"
import { Navbar } from "../section/navbar"

const ingredients = [
  {
    id: "garlic",
    src: "/garlic.png?height=150&width=150",
    alt: "Garlic",
    angle: 0,
  },
  {
    id: "cheese",
    src: "/cheese.png?height=150&width=150",
    alt: "Cheese",
    angle: 120,
  },
  {
    id: "pasta",
    src: "/pasta.png?height=150&width=150",
    alt: "Pasta",
    angle: 240,
  },
]

export default function SplashScreen() {
  const [animationStage, setAnimationStage] = useState<"initial" | "converging" | "merged" | "complete">("initial")

  useEffect(() => {
    const sequence = async () => {
      // Wait a bit before starting
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Start converging animation
      setAnimationStage("converging")

      // Wait for ingredients to reach center
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Merge ingredients
      setAnimationStage("merged")

      // Wait a bit then show final result
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Show final pasta with confetti
      setAnimationStage("complete")

      // Trigger confetti
      // confetti({
      //   particleCount: 100,
      //   spread: 70,
      //   origin: { y: 0.6 },
      //   colors: ["#FFD700", "#FFA500", "#FF6347", "#32CD32", "#4169E1"],
      // })
    }

    sequence()
  }, [])

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background sparkles */}
      <SparkleEffect isActive={animationStage === "complete"} />

      {/* Main animation container */}
      <div className="relative w-96 h-96 flex items-center justify-center">
        {/* Recipe text */}
        <AnimatePresence>
          {animationStage === "complete" && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 50 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -top-20 text-center"
            >
              {/* <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipedia✨</h2> */}
              <Navbar className="p-0" textSize="text-4xl font-bold" svgWidth="50" svgHeight="60"/>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Ingredient circle animation */}
        <AnimatePresence>
          {(animationStage === "initial" || animationStage === "converging") && (
            <IngredientCircle ingredients={ingredients} isConverging={animationStage === "converging"} />
          )}
        </AnimatePresence>

        {/* Merging effect */}
        <AnimatePresence>
          {animationStage === "merged" && (
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 1.2, 0], rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final pasta dish */}
        <AnimatePresence>
          {animationStage === "complete" && (
            <motion.div
              initial={{ scale: 0, opacity: 0}}
              animate={{ scale: 1, opacity: 1}}
              transition={{
                duration: 0.8,
                ease: "backOut",
                delay: 0.2,
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                <img
                  src="/pasta-dish.png?height=120&width=120"
                  alt="Delicious Pasta Dish"
                  className="w-30 h-30 rounded-full"
                />

                {/* Glow effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-xl"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
