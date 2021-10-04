import React, { useEffect, useRef, useState } from "react"
import { ClipLoader } from "react-spinners"
import styled, { keyframes } from "styled-components"

const appearAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Container = styled.div`
  max-width: 800px;
  height: 600px;
  margin: 0 auto;
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

const SampleEntry = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(0)
  const [assetsError, setAssetsError] = useState(false)
  const [chillTime, setChillTime] = useState(false)
  const audioGainRef = useRef()
  const audioContextRef = useRef()
  const completeAssets = assetsLoaded > 1

  const playSound = async () => {
    const audioContext = new AudioContext()
    const audioGain = audioContext.createGain()
    const audioSource = audioContext.createBufferSource()
    const audioBuffer = await fetch("/sample.mp3")
      .then((res) => res.arrayBuffer())
      .then((buffer) => audioContext.decodeAudioData(buffer))

    audioSource.buffer = audioBuffer
    audioSource.connect(audioGain)

    audioGain.connect(audioContext.destination)
    audioGain.gain.setValueAtTime(1, audioContext.currentTime)

    audioSource.start()
    audioSource.onended = () => {
      setChillTime(false)
    }
    audioGainRef.current = audioGain
    audioContextRef.current = audioContext
    setChillTime(true)
  }

  const changeVolume = (event) => {
    audioGainRef.current.gain.setValueAtTime(
      event.target.value / 100,
      audioContextRef.current.currentTime
    )
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

  return (
    <Container>
      {completeAssets ? (
        <Content>
          {chillTime ? (
            <input
              type="range"
              onChange={changeVolume}
              min="0"
              max="100"
              defaultValue="100"
            />
          ) : (
            <PressContainer onClick={playSound}>Press to Chill</PressContainer>
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
    </Container>
  )
}

export default SampleEntry
