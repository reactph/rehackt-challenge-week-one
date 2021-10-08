import { useCallback, useEffect, useRef, useState } from "react"

const useVolume = () => {
  const audioGainRef = useRef()
  const audioContextRef = useRef()
  const audioSourceRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)

  const playSound = useCallback(async () => {
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
        setIsPlaying(false)
      }

      audioGainRef.current = audioGain
      audioContextRef.current = audioContext
      audioSourceRef.current = audioSource
      setIsPlaying(true)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop()
      }
    }
  }, [])

  const changeVolume = useCallback((value) => {
    if (audioGainRef.current) {
      audioGainRef.current.gain.setValueAtTime(
        value / 100,
        audioContextRef.current.currentTime
      )
    }
  }, [])

  return {
    isPlaying,
    playSound,
    changeVolume,
  }
}

export default useVolume
