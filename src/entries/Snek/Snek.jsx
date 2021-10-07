import React, { useEffect, useMemo, useRef, useState } from "react"

import BaseEntry from "../../components/BaseEntry/BaseEntry"

const WIDTH = 15
const HEIGHT = 15
const START_DELAY = 300
const END_DELAY = 50
const SCORE_INTERVAL = 4
const NUM_SPEED_INTERVALS = Math.floor(100 / SCORE_INTERVAL)

const randomIntInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const randomPos = (width, height) => ({
  x: randomIntInterval(0, width),
  y: randomIntInterval(0, height),
})

const getDelay = (startDelay, endDelay, currStep, numSteps) =>
  startDelay -
  ((startDelay - endDelay) * Math.log(currStep + 1)) / Math.log(numSteps + 1)

const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}

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
        // TODO: Optimize
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

  return {
    grid,
    score,
    setDirection,
    foodPos,
    snake,
    isPlaying,
    setPlaying,
  }
}

const Snek = () => {
  const game = useGame()

  return (
    <BaseEntry
      onKeyDown={(e) => {
        game.setDirection((dir) => {
          switch (e.key) {
            case "ArrowLeft":
              return dir === "R" ? dir : "L"
            case "ArrowUp":
              return dir === "D" ? dir : "U"
            case "ArrowRight":
              return dir === "L" ? dir : "R"
            case "ArrowDown":
              return dir === "U" ? dir : "D"
            default:
              return dir
          }
        })
      }}
      tabIndex={0}
    >
      <div style={{ width: "100%", height: "100%", background: "#9bbc0f" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>{game.score}</h1>
          <div>
            <button
              onClick={() => {
                game.setPlaying(true)
              }}
            >
              {game.isPlaying ? "RESET" : "START"}
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${WIDTH}, 1fr)`,
              width: "fit-content",
              border: "4px solid #0f380f",
            }}
          >
            {game.grid.map((row) =>
              row.map(({ position, type }) => (
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "1px solid #0f380f0f",
                    background:
                      type === "head"
                        ? "#0f380f"
                        : type === "food"
                        ? "red"
                        : type === "body"
                        ? "#0f380f66"
                        : "",
                  }}
                  key={JSON.stringify(position)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </BaseEntry>
  )
}

export default Snek
