export const randomIntInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const randomPos = (width, height) => ({
  x: randomIntInterval(0, width),
  y: randomIntInterval(0, height),
})

export const getDelay = (startDelay, endDelay, currStep, numSteps) =>
  startDelay -
  ((startDelay - endDelay) * Math.log(currStep + 1)) / Math.log(numSteps + 1)
