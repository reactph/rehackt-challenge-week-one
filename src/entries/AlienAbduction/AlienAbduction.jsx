import React, { useState, useRef, useEffect } from "react"

import BaseEntry from "../../components/BaseEntry/BaseEntry"
import Alienship from "./images/alienship.png"
import Cow from "./images/cow.png"
import Cow2 from "./images/cow2.png"
import "./styles/style.css"

const AlienAbduction = () => {
  const [volume, setVolume] = useState(0)
  const [heroTime, setHeroTime] = useState(false)

  const audioGainRef = useRef()
  const audioContextRef = useRef()
  const audioSourceRef = useRef()

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
      audioGain.gain.setValueAtTime(0, audioContext.currentTime)

      audioSource.start()
      audioSource.onended = () => {
        setHeroTime(false)
      }

      audioGainRef.current = audioGain
      audioContextRef.current = audioContext
      audioSourceRef.current = audioSource
      setHeroTime(true)
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

  useEffect(() => {
    changeVolume(volume)
  }, [volume])

  useEffect(() => {
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop()
      }
    }
  }, [])

  console.log(volume)

  return (
    <BaseEntry>
      <div className="container">
        <div className="div1">
          {heroTime ? (
            <button
              className="btn"
              onClick={() => (volume === 0 ? "" : setVolume(volume - 10))}
            >
              Save the Cow
            </button>
          ) : (
            <button
              className="btn"
              onClick={() => setHeroTime(true) || playSound()}
            >
              Start Hero Time!
            </button>
          )}
        </div>
        <div className="div2">
          <img src={Alienship} style={{ width: "100%" }} />
        </div>
        <div className="div3">
          {heroTime ? (
            <button
              className="btn-cancel"
              onClick={() => (volume === 100 ? "" : setVolume(volume + 10))}
            >
              Dont save the cow!
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="div4">
          {volume === 0 ? (
            <img
              src={Cow2}
              style={{ width: "90%", marginTop: `${100 - volume}%` }}
            />
          ) : (
            <img
              src={Cow}
              style={{ width: "90%", marginTop: `${100 - volume}%` }}
            />
          )}
        </div>
      </div>
    </BaseEntry>
  )
}

export default AlienAbduction
