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
  {
    component: lazy(() => import("./Snek/Snek")),
    title: "Snek",
    slug: "Snek",
    description: `Play a game of snake to adjust the volume. Get pellets to increase the volume and bite your own body to decrease it. Use the arrow keys to control the snake's direction and press start to play.`,
    author: "Carl de Guia",
    email: "carl.2795@gmail.com",
    linkedIn: "https://www.linkedin.com/in/carl-justin-de-guia-b40a1b97/",
    website: "https://github.com/carldegs",
  },
  {
    title: "Alien Abduction Volume Slider",
    slug: "AlienAbduction",
    description:
      "Slide the volume by 'Saving the Cow', or 'Let the Cow be abducted by aliens'!",
    author: "Boone Raye Flores",
    email: "booneraye@gmail.com",
    linkedIn: "https://www.linkedin.com/in/booneraye",
    website: "https://github.com/booneraye",
    component: lazy(() => import("./AlienAbduction/AlienAbduction")),
  },
  {
    title: "ClickSpeed",
    slug: "ClickSpeed",
    description: "Control the volume base on how fast an individual can click",
    author: "Alleo Indong",
    email: "",
    linkedIn: "",
    website: "https://github.com/aindong",
    component: lazy(() => import("./ClickSpeed/ClickSpeed")),
  },
  {
    title: "PortalVolume",
    slug: "PortalVolume",
    description:
      "Controlling the volume based on how long until the ball reaches the other portal.",
    author: "H-isaac",
    email: "dev.isaac23@gmail.com",
    linkedIn: "",
    website: "https://github.com/H-isaac23",
    component: lazy(() => import("./PortalVolume/PortalVolume")),
  },
]

export default entries
