import { lazy } from "react"

// FORMAT
// component: your component  (required)
// slug: your component name (must be unique) (required)
// title:  (required)
// description: limit to 256 characters.
// author: your name/alias (required)
// email: your email address
// linkedin: your LinkedIn URL
// website: your website

const entries = [
  {
    component: lazy(() => import("./SampleEntry/SampleEntry")),
    slug: "SampleEntry",
    title: "(Sample) Press To Chill",
    description:
      "A simple untouched input range slider with the use of styled-components for styling and audio context API.",
    author: "Franrey Saycon",
    email: "franreysaycon@gmail.com",
    linkedIn: "https://www.linkedin.com/in/fssaycon/",
    website: "https://fsaycon.dev",
  },
  {
    component: lazy(() => import("./RollForVolume/RollForVolume")),
    slug: "RollForVolume",
    title: "Roll for volume",
    description: "Feeling lucky, are we?",
    author: "Insidiae",
    email: "insidiae423@gmail.com",
    linkedIn: "https://www.linkedin.com/in/insidiae423/",
    website: "https://github.com/Insidiae",
  },
]

export default entries
