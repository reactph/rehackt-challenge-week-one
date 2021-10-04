import React, { useEffect, useRef, useState } from "react"
import { ClipLoader } from "react-spinners"
import styled, { keyframes } from "styled-components"

import BaseEntry from "../../components/BaseEntry/BaseEntry"

const diceFaces = [
  "https://upload.wikimedia.org/wikipedia/commons/c/c5/Dice-0.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/2c/Alea_1.png",
  "https://upload.wikimedia.org/wikipedia/commons/b/b8/Alea_2.png",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Alea_3.png",
  "https://upload.wikimedia.org/wikipedia/commons/8/8d/Alea_4.png",
  "https://upload.wikimedia.org/wikipedia/commons/5/55/Alea_5.png",
  "https://upload.wikimedia.org/wikipedia/commons/f/f4/Alea_6.png",
]

const appearAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Content = styled.div`
  display: flex;
  flex-basis: 100%;
  min-height: 100%;
  background: #f5f5f5 url(/sample-bg.gif) no-repeat center;
  background-size: cover;
  align-items: center;
  justify-content: center;
  animation: ${appearAnimation} 0.5s ease;
`

const Placeholder = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const DiceContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DiceImage = styled.img`
  width: 50px;
  height: 50px;
`
const Row = styled.div`
  display: flex;
  width: 60%;
  height: 80%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const TotalVolume = styled.h2`
  color: white;
  font-family: Poiret One;
  text-align: center;
  font-size: 2rem;
`

const PressContainer = styled.div`
  font-family: Poiret One;
  font-size: 3rem;
  font-weight: 400;
  margin: 0 auto;
  color: white;
  text-shadow: 2px 5px 5px #222222;
  animation: ${appearAnimation} 0.5s ease;

  @media (min-width: 50rem) {
    font-size: 5rem;
  }

  &:hover {
    cursor: pointer;
  }
`

const RollForVolume = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(0)
  const [assetsError, setAssetsError] = useState(false)
  const [chillTime, setChillTime] = useState(false)
  const [diceValues, setDiceValues] = useState(Array(16).fill(6))
  const audioGainRef = useRef()
  const audioContextRef = useRef()
  const completeAssets = assetsLoaded > 1

  const playSound = async () => {
    if (!audioContextRef.current) {
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext
      const audioGain = audioContext.createGain()
      const audioSource = audioContext.createBufferSource()
      const audioBuffer = await fetch("/sample.mp3")
        .then((res) => res.arrayBuffer())
        .then((buffer) => audioContext.decodeAudioData(buffer))

      audioSource.buffer = audioBuffer
      audioSource.connect(audioGain)

      audioGain.connect(audioContext.destination)
      audioGain.gain.setValueAtTime(0.96, audioContext.currentTime)

      audioSource.start()
      audioSource.onended = () => {
        setChillTime(false)
      }
      audioGainRef.current = audioGain
      audioContextRef.current = audioContext
      setChillTime(true)
    }
  }

  const changeVolume = (volume) => {
    audioGainRef.current.gain.setValueAtTime(
      volume / 100,
      audioContextRef.current.currentTime
    )
  }

  const rollDice = () => {
    // * Roll 16 dice, then add the values together to get the volume
    // ? Yes, the maximum total can only add up to 96.
    // ? Yes, that's part of the fun :^)
    const newDiceValues = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 7)
    )

    setDiceValues(newDiceValues)
  }

  const getDiceFaces = () => {
    return diceValues.map((dice, idx) => (
      <DiceImage src={diceFaces[dice]} key={"dice" + idx} />
    ))
  }

  const getTotalVolume = () => {
    return diceValues.reduce((total, nxt) => total + nxt)
  }

  useEffect(() => {
    try {
      const loadFont = async () => {
        const customFont = new FontFace(
          "Poiret One",
          "url(/fonts/PoiretOne-Regular.woff2)"
        )
        await customFont.load()
        document.fonts.add(customFont)
        setAssetsLoaded((s) => s + 1)
      }
      loadFont()

      const image = new Image()
      image.src = "/sample-bg.gif"
      image.onload = () => {
        setAssetsLoaded((s) => s + 1)
      }
    } catch {
      setAssetsError(true)
    }
  }, [])

  useEffect(() => {
    if (audioGainRef.current) {
      changeVolume(getTotalVolume())
    }
  }, [diceValues])

  return (
    <BaseEntry>
      {completeAssets ? (
        <Content>
          {chillTime ? (
            <DiceContainer>
              <Row>{getDiceFaces()}</Row>

              <Row>
                <TotalVolume>Total volume: {getTotalVolume()}</TotalVolume>
              </Row>

              <Row>
                <button onClick={rollDice}>Roll!</button>
              </Row>
            </DiceContainer>
          ) : (
            <PressContainer onClick={playSound}>Roll for volume</PressContainer>
          )}
        </Content>
      ) : (
        <Placeholder>
          {assetsError ? (
            <span>Unable to load assets. Please refresh</span>
          ) : (
            <ClipLoader color="black" />
          )}
        </Placeholder>
      )}
    </BaseEntry>
  )
}

export default RollForVolume
