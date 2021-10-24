import BaseEntry from "../../components/BaseEntry/BaseEntry"
import React, {useState, useEffect, useRef} from 'react'
import {list} from './textList'
import './TextTypingGame.css'
function TextTypingGame() {
  const [inputText, setInputText] = useState('')
  const [randomText, setRandomText] = useState([])
  const [volume, setVolume] = useState(0)
  const [add, setAdd] = useState(false)
  const [correctNum, setCorrectNum] = useState(1)
  const [showMessage, setShowMessage] = useState(false)
  const [showAddVolume, setShowAddVolume] = useState(false)
  const [gameStart, setGameStart] = useState(false)
  const [points, setPoints] = useState(0)
  const [chillTime, setChillTime] = useState(false)

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
      audioGain.gain.setValueAtTime(1, audioContext.currentTime)

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

  useEffect(() => {
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop()
      }
    }
  }, [])

  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const getRandomText = () => {
    const newArr = []
    const newText =  list[getRandom(0, list.length)].toLowerCase()
    for(let i = 0; i < newText.length; i++){
      newArr.push({letter: newText.charAt(i), correct: false})
    }
    return newArr
  }

  const addVolume = () => {
    setInputText('')
    setRandomText(getRandomText())
    setAdd(true)
  }
  
  useEffect(()=> {
    setRandomText(getRandomText())
  },[])

  useEffect(()=> {
    changeVolume(volume)
    if(volume > 0){
      const intervalId = setInterval(() => {
        if(add){
          setAdd(false)
          if(volume >= 90){
            return setVolume(100)
          }
          return setVolume(volume + randomText.length)
        }
        else{
            setVolume(volume -1)
        }
      }, 100);
      return ()=> {
        clearInterval(intervalId)
      }
    } else {
      setGameStart(false)
      return setVolume(0)
    }
  },[volume])

  useEffect(()=> {
    if(gameStart){
      if(randomText){
        checkInput()
      }
    }
  },[inputText])

  const checkInput = () => {
    const newArr = [...randomText]
    for(let i= 0; i < correctNum; i++){
      if(newArr[i].letter === inputText.slice(-1)){
        newArr[i].correct = true
        setCorrectNum(newArr.filter((data)=> data.correct).length + 1)
      }
      if(newArr.length === correctNum){
        addVolume()
        setShowMessage(true)
        setRandomText(getRandomText())
        setCorrectNum(1)
        setShowAddVolume(true)
        setPoints(points + 1)
      } 
    }
  }

  const handleKeypress = e => {
    if(!gameStart){
      if (e.key === "Enter") {
        startGame()
      }
    }
  };
  
  const startGame = () => {
    setRandomText(getRandomText())
    setVolume(100)
    setGameStart(true)
    setPoints(0)
    playSound()
  }

  return (
    <BaseEntry>
    <div className="typing-game">
      <p className="typingGame__logo">The Text Typing Game</p>
      <div onTransitionEnd={() => setShowMessage(false)} className={`typingGame__messageContainer ${!showMessage ? 'message__hidden' : 'message__shown'}` }>
        <p className="typingGame__message">Correct!</p>
      </div>
      <div className="typing__text">
        {randomText && randomText.map((text, index)=>(
          <p key={index} className={`${text.correct && 'active'} typingGame__text`} text>{text.letter}</p>
        ))}
      </div>
      <p className="typingGame__volume">volume: {volume}% <span onTransitionEnd={() => setShowAddVolume(false)} className={`typingGame__plus ${!showAddVolume && 'message__hidden'}`}>+10</span></p>
      <p className="typingGame__points">points: {points}</p>
      {(chillTime && gameStart) ? null:
        <button onClick={()=>{
          startGame()
        }} 
          className="typingGame__start">press enter</button>
      }

      <form className="typingGame__form" onSubmit={e => e.preventDefault()}>
        <div className="hide__input">
          <p></p>
        </div>
        <input className="typingGame__input" onBlur={({ target }) => target.focus()} autoFocus value={inputText} 
          onChange={e => {
            setInputText(e.target.value)
          }}
          onKeyPress={handleKeypress}
          />
      </form>
    </div>
    </BaseEntry>
  )
}

export default TextTypingGame
