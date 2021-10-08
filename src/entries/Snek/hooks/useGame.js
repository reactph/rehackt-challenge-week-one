import { useState, useEffect, useMemo, useCallback } from "react"
import {
  WIDTH,
  HEIGHT,
  SCORE_INTERVAL,
  NUM_SPEED_INTERVALS,
  START_DELAY,
  END_DELAY,
} from "../constant"
import { randomPos, getDelay } from "../utils"

import useInterval from "./useInterval"

const useGame = () => {
  const [direction, setDirection] = useState("R")
  const [snake, setSnake] = useState([
    {
      x: Math.floor(WIDTH / 2),
      y: Math.floor(HEIGHT / 2),
    },
  ])
  const [foodPos, setFoodPos] = useState(randomPos(WIDTH - 1, HEIGHT - 1))
  const [score, setScore] = useState(0)
  const [isBitten, setBitten] = useState(false)
  const [isPlaying, setPlaying] = useState(false)

  useInterval(
    () => {
      setSnake((currSnake) => {
        const newSnake = [...currSnake]
        const currPos = newSnake[0]

        let newHeadPos

        switch (direction) {
          case "U":
            newHeadPos = {
              ...currPos,
              y: currPos.y - 1 < 0 ? HEIGHT - 1 : (currPos.y - 1) % HEIGHT,
            }
            break
          case "D":
            newHeadPos = {
              ...currPos,
              y: (currPos.y + 1) % HEIGHT,
            }
            break
          case "L":
            newHeadPos = {
              ...currPos,
              x: currPos.x - 1 < 0 ? WIDTH - 1 : (currPos.x - 1) % WIDTH,
            }
            break
          case "R":
          default:
            newHeadPos = {
              ...currPos,
              x: (currPos.x + 1) % WIDTH,
            }
            break
        }

        newSnake.unshift(newHeadPos)

        if (snake.length >= score / SCORE_INTERVAL + 1) {
          newSnake.pop()
        }

        return newSnake
      })
    },
    isPlaying
      ? getDelay(
          START_DELAY,
          END_DELAY,
          score / SCORE_INTERVAL,
          NUM_SPEED_INTERVALS
        )
      : null
  )

  const grid = useMemo(() => {
    const [head, ...body] = snake

    return Array.from(new Array(HEIGHT)).map((_, col) =>
      Array.from(new Array(WIDTH)).map((_, row) => {
        let type = null
        const isHead = head.x === row && head.y === col
        const bodyNum = body.findIndex(({ x, y }) => x === row && y === col) + 1
        const isBody = bodyNum > 0
        const hasFood = foodPos.x === row && foodPos.y === col

        if (hasFood) {
          type = "food"
        }

        if (isBody) {
          type = "body"
        }

        if (isHead) {
          type = "head"
        }

        if ((isHead || isBody) && hasFood) {
          setFoodPos(randomPos(WIDTH - 1, HEIGHT - 1))
          setScore((score) => score + SCORE_INTERVAL)
        }

        if (isHead && isBody) {
          setSnake((currSnake) => currSnake.slice(0, bodyNum))
          setScore(bodyNum * SCORE_INTERVAL)
          setBitten(true)
        }

        return {
          position: { x: row, y: col },
          type,
        }
      })
    )
  }, [snake, foodPos])

  useEffect(() => {
    if (score >= 100) {
      setFoodPos({ x: -1, y: -1 })
    } else if (isBitten && foodPos.x === -1 && foodPos.y === -1) {
      setFoodPos(randomPos(WIDTH - 1, HEIGHT - 1))
      setBitten(false)
    }
  }, [score, isBitten.foodPos])

  const resetGame = useCallback(() => {
    setDirection("R")
    setSnake([
      {
        x: Math.floor(WIDTH / 2),
        y: Math.floor(HEIGHT / 2),
      },
    ])
    setFoodPos(randomPos(WIDTH - 1, HEIGHT - 1))
    setScore(0)
    setBitten(false)
    setPlaying(false)
  }, [])

  return {
    grid,
    score,
    setDirection,
    foodPos,
    snake,
    isPlaying,
    setPlaying,
    resetGame,
  }
}

export default useGame
