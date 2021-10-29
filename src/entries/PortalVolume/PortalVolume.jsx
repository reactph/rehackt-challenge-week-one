import React, { useRef, useEffect, useState } from "react"
import "./index.css"
import BaseEntry from "../../components/BaseEntry/BaseEntry"

const PortalVolume = () => {
  const slider1 = useRef(null)
  const slider2 = useRef(null)
  const circle = useRef(null)
  const container = useRef(null)
  const [volume, setVolume] = useState(0)
  let pos1 = 0
  let pos3 = 0

  useEffect(() => {
    slider1.current.onmousedown = dragMouseDown
    slider2.current.onmousedown = dragMouseDown2
  }, [])

  const dragMouseDown = (e) => {
    e = e || window.event
    e.preventDefault()
    pos3 = e.clientX
    // pos4 = e.clientY
    document.onmouseup = closeDrag
    document.onmousemove = elementDrag
  }

  const closeDrag = () => {
    const newTimeDuration = Math.abs(
      Math.floor(
        (slider1.current.offsetLeft + 32 - slider2.current.offsetLeft - 20) *
          1500
      ) / 640
    )

    circle.current.style.setProperty("--time-duration", newTimeDuration + "ms")

    document.onmouseup = null
    document.onmousemove = null
  }

  const elementDrag = (e) => {
    e = e || window.event
    e.preventDefault()

    const leftX = container.current.offsetLeft
    const rightX = container.current.offsetWidth + container.current.offsetLeft

    // set volume
    const volumePercentage =
      (Math.abs(slider2.current.offsetLeft - slider1.current.offsetLeft) /
        608) *
      100

    setVolume(
      100 - Math.floor(volumePercentage) < 0
        ? 0
        : 100 - Math.floor(volumePercentage)
    )

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos3 = e.clientX

    // set the element's new position:

    if (pos3 >= leftX && pos3 <= rightX) {
      slider1.current.style.left = slider1.current.offsetLeft - pos1 + "px"
      circle.current.style.setProperty(
        "--start-point",
        slider1.current.offsetLeft + 32 + "px"
      )
    }
  }

  const dragMouseDown2 = (e) => {
    e = e || window.event
    e.preventDefault()
    pos3 = e.clientX
    // pos4 = e.clientY
    document.onmouseup = closeDrag2
    document.onmousemove = elementDrag2
  }

  const closeDrag2 = () => {
    const newTimeDuration = Math.abs(
      Math.floor(
        (slider1.current.offsetLeft + 32 - slider2.current.offsetLeft - 20) *
          1500
      ) / 640
    )

    circle.current.style.setProperty("--time-duration", newTimeDuration + "ms")

    document.onmouseup = null
    document.onmousemove = null
  }

  const elementDrag2 = (e) => {
    e = e || window.event
    e.preventDefault()

    const leftX = container.current.offsetLeft
    const rightX = container.current.offsetWidth + container.current.offsetLeft

    const volumePercentage =
      (Math.abs(slider1.current.offsetLeft - slider2.current.offsetLeft) /
        608) *
      100

    setVolume(
      100 - Math.floor(volumePercentage) < 0
        ? 0
        : 100 - Math.floor(volumePercentage)
    )

    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos3 = e.clientX
    // set the element's new position:
    if (pos3 >= leftX && pos3 <= rightX) {
      slider2.current.style.left = slider2.current.offsetLeft - pos1 + "px"
      circle.current.style.setProperty(
        "--end-point",
        slider2.current.offsetLeft + 20 + "px"
      )
    }
  }

  return (
    <BaseEntry>
      <div className="wrapper">
        <div className="volumeContainer">
          <h1>Volume:</h1>
          <h3>{volume}</h3>
        </div>
        <div className="container" ref={container}>
          <div className="slider-1" ref={slider1}></div>
          <div className="circle" ref={circle}></div>
          <div className="slider-2" ref={slider2}></div>
        </div>
      </div>
    </BaseEntry>
  )
}

export default PortalVolume
