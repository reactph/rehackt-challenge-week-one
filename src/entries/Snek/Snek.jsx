import React, { useEffect } from "react"

import BaseEntry from "../../components/BaseEntry/BaseEntry"
import useVolume from "./hooks/useVolume"
import useGame from "./hooks/useGame"
import { WIDTH } from "./constant"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #9bbc0f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Score = styled.h1`
  margin-bottom: 16px;
  font-size: 42px;
`

const GridWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  border-color: #0f380f;
  border-width: 2px;
  background-color: transparent;
  color: #0f380f;
  font-weight: bold;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${WIDTH}, 1fr);
  width: fit-content;
  border: 4px solid #0f380f;
  margin-right: 104px;
`

const GridCell = styled.div`
  width: 24px;
  height: 24px;
  border: 1px solid #0f380f0f;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ type }) =>
    type === "head" ? "#0f380f" : type === "body" ? "#0f380fcc" : ""};
`

const Food = styled.div`
  height: 50%;
  width: 50%;
  transform: rotate(45deg);
  background: #0f380f;
`

const Snek = () => {
  const game = useGame()
  const { playSound, changeVolume } = useVolume()

  useEffect(() => {
    changeVolume(game.score)
  }, [game.score])

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
      <Container>
        <h4 style={{ margin: 0 }}>Volume</h4>
        <Score>{game.score}</Score>
        <GridWrapper>
          <div style={{ marginRight: "12px" }}>
            <Button
              onClick={() => {
                if (!game.isPlaying) {
                  game.setPlaying(true)
                  playSound()
                } else {
                  game.resetGame()
                  playSound(false)
                }
              }}
            >
              {game.isPlaying ? "RESET" : "START"}
            </Button>
          </div>
          <Grid>
            {game.grid.map((row) =>
              row.map(({ position, type }) => (
                <GridCell type={type} key={JSON.stringify(position)}>
                  {type === "food" && <Food />}
                </GridCell>
              ))
            )}
          </Grid>
        </GridWrapper>
      </Container>
    </BaseEntry>
  )
}

export default Snek
