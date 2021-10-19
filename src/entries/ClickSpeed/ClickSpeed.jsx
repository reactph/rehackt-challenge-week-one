import React, { useState, useRef, useEffect } from "react"
import { ClipLoader } from "react-spinners"
import styled from "styled-components"

import BaseEntry from "../../components/BaseEntry/BaseEntry"

const Content = styled.div`
  display: flex;
  flex-basis: 100%;
  min-height: 100%;
  background: #f5f5f5
    url(https://media.makeameme.org/created/you-just-click-1ae418aa04.jpg)
    no-repeat center;
  background-size: cover;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const LabelContainer = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  justify-content: space-evenly;
  margin-bottom: 40px;
`

const Label = styled.div`
  color: #fff;
  font-weight: 800;
  font-size: 1.2em;
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`
const Placeholder = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const ClickSpeed = () => {
  const [assetsLoaded, setAssetsLoaded] = useState(0)
  const [assetsError, setAssetsError] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [clicks, setClicks] = useState(0)
  const [maxCPS, setMaxCPS] = useState(0)
  const [clicksPerS, setClickPerS] = useState(0)
  const [chillTime, setChillTime] = useState(false)
  const audioGainRef = useRef()
  const audioContextRef = useRef()
  const audioSourceRef = useRef()
  const completeAssets = assetsLoaded >= 1

  const playSound = async () => {
    if (!audioContextRef.current) {
      const audioContext = new AudioContext()
      const audioGain = audioContext.createGain()
      const audioSource = audioContext.createBufferSource()
      const audioBuffer = await fetch("/sample.mp3")
        .then((res) => res.arrayBuffer())
        .then((buffer) => audioContext.decodeAudioData(buffer))

      audioSource.buffer = audioBuffer
      audioSource.connect(audioGain)

      audioGain.connect(audioContext.destination)
      audioGain.gain.setValueAtTime(0.05, audioContext.currentTime)

      audioSource.start()
      audioSource.onended = () => {
        setChillTime(false)
      }

      audioGainRef.current = audioGain
      audioContextRef.current = audioContext
      audioSourceRef.current = audioSource
      setChillTime(true)
    }
  }

  const changeVolume = (value) => {
    if (audioGainRef.current) {
      audioGainRef.current.gain.setValueAtTime(
        value / 100,
        audioContextRef.current.currentTime
      )
    }
  }

  const getCurrentTime = () => {
    return new Date().getTime()
  }

  const getActiveTime = () => {
    return getCurrentTime() - startTime
  }

  const getIdleTime = () => {
    return getCurrentTime() - endTime
  }

  const normalize = (num, dec = 2) => {
    return num.toFixed(2, dec)
  }

  const restart = () => {
    setClicks(0)
    setClickPerS(0)
    setStartTime(getCurrentTime())
  }

  const mouseDown = () => {
    if (!chillTime) {
      playSound()
    }

    setClicks(clicks + 1)

    const activeTime = getActiveTime()
    const idleTime = getIdleTime()
    if (idleTime > 1000) {
      restart()
    }

    if (activeTime > 100) {
      const cps = (clicks / getActiveTime()) * 1000
      setClickPerS(cps)
    }

    if (activeTime > 1000) {
      const mCPS = Math.max(clicksPerS, maxCPS)
      setMaxCPS(mCPS)
    }

    changeVolume(clicksPerS * 10)
  }

  const mouseUp = () => {
    const newEndTime = getCurrentTime()
    setEndTime(newEndTime)
  }

  useEffect(() => {
    try {
      const image = new Image()
      image.src =
        "https://media.makeameme.org/created/you-just-click-1ae418aa04.jpg"
      image.onload = () => {
        setAssetsLoaded((s) => s + 1)
      }
    } catch {
      setAssetsError(true)
    }
  }, [])

  return (
    <BaseEntry>
      {completeAssets ? (
        <Content>
          <LabelContainer>
            <Label>CPS: {normalize(clicksPerS, 2)}</Label>
            <Label>MAX CPS: {normalize(maxCPS, 2)}</Label>
          </LabelContainer>

          <ButtonContainer>
            <button onMouseDown={mouseDown} onMouseUp={mouseUp}>
              CLICK ME
            </button>
          </ButtonContainer>
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

export default ClickSpeed
