import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ClipLoader } from "react-spinners"
import BaseEntry from "../../components/BaseEntry/BaseEntry"

const ButtonWrapper = styled.div`
  transition: all 0.3s ease;

  :hover {
    opacity: 0.8;
  }

  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    background: ${(props) =>
      props.correct
        ? "linear-gradient(90deg, #00FF00, #00FF00)"
        : !props.correct && props.userClicked
        ? "linear-gradient(90deg, #ff5656, #c16868)"
        : "linear-gradient(90deg, #56ccff, #6eafb4)"};
    border: 3px solid #000;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #000;
    text-shadow: 0px 1px 0px rgba();
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  min-height: 100%;
  align-items: center;
  background: url("https://images.unsplash.com/photo-1627844718626-4c6b963baac0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=928&q=80")
    no-repeat center;
  background-size: cover;

  > p {
    color: #fff;
    font-weight: bold;
    text-shadow: 1px 1px #000;
    text-align: center;
    padding: 0 40px 0 40px;
  }

  .score {
    color: #000;
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 1px 1px #000;
    margin: 0;
  }

  .start,
  .next {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #0277bd);
    border: 2px solid #000;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
    color: #fff;
  }

  .start {
    max-width: 200px;
  }
`

const Placeholder = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const TOTAL_QUESTIONS = 10

const difficulty = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
}

const Quiz = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [assetsLoaded, setAssetsLoaded] = useState(0)
  const [assetsError, setAssetsError] = useState(false)
  const [chillTime, setChillTime] = useState(false)
  const [volume, setVolume] = useState(100)
  const audioGainRef = useRef()
  const audioContextRef = useRef()
  const audioSourceRef = useRef()
  const completeAssets = assetsLoaded > 1

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

    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop()
      }
    }
  }, [])

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

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5)

  const fetchQuizQuestions = async (amount, difficulty) => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endPoint)).json()
    return data.results.map((question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }))
  }

  const startQuiz = async () => {
    setVolume(100)
    playSound()
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      difficulty.EASY
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e) => {
    if (!gameOver) {
      // users answer
      const answer = e.currentTarget.value
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer
      // add score if answer is correct
      if (correct) {
        setScore((prev) => prev + 1)
        setVolume((prev) => prev + 20)
      } else setVolume((prev) => prev - 20)
      // save answer in the array fo user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
    changeVolume()
  }

  const nextQuestion = () => {
    // Move on to next question if not last question
    const nextQuestion = number + 1

    if (nextQuestion === TOTAL_QUESTIONS) setGameOver(true)
    else setNumber(nextQuestion)
  }

  const changeVolume = () => {
    if (volume > 0)
      audioGainRef.current.gain.setValueAtTime(
        volume / 100,
        audioContextRef.current.currentTime
      )
  }

  return (
    <BaseEntry>
      {completeAssets ? (
        <>
          {chillTime ? (
            <Wrapper>
              <h1>QUIZ</h1>
              {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                <button className="start" onClick={startQuiz}>
                  Try Again
                </button>
              ) : null}
              {!gameOver ? <p className="score">Score: {score}</p> : null}
              {loading ? (
                <Placeholder>
                  <ClipLoader color="black" />
                </Placeholder>
              ) : null}
              {!loading && !gameOver && (
                <>
                  <p>
                    Question: {number + 1} / {TOTAL_QUESTIONS}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: questions[number].question,
                    }}
                  />
                  <div>
                    {questions[number].answers.map((answer) => (
                      <ButtonWrapper
                        key={answer}
                        correct={userAnswers[number]?.correctAnswer === answer}
                        userClicked={userAnswers[number]?.answer === answer}
                      >
                        <button
                          disabled={userAnswers[number]}
                          value={answer}
                          onClick={checkAnswer}
                        >
                          <span>{answer}</span>
                        </button>
                      </ButtonWrapper>
                    ))}
                  </div>
                </>
              )}
              {!loading &&
              userAnswers.length === number + 1 &&
              number !== TOTAL_QUESTIONS - 1 ? (
                <button className="next" onClick={nextQuestion}>
                  {" "}
                  Next Question{" "}
                </button>
              ) : null}
            </Wrapper>
          ) : (
            <Placeholder>
              {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                <button className="start" onClick={startQuiz}>
                  Start
                </button>
              ) : null}
            </Placeholder>
          )}
        </>
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

export default Quiz
