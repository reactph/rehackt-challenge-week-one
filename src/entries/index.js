import { lazy } from "react"

// FORMAT
// component: your component  (required)
// slug: your component name (required)
// title: (required)
// description: limit to 256 characters.
// author: your name/alias (required)
// email: your email address
// linkedin: your LinkedIn URL
// website: your website

const entries = [
  {
    component: lazy(() => import("./SampleEntry/SampleEntry")),
    slug: "SampleEntry",
    title: "Sample Entry",
    description:
      "This entry was inspired by my great great great granduncle who was a veteran of the Star Wars.",
    author: "Juan dela Cruz",
    email: "juandc@gmail.com",
    linkedIn: "https://www.linkedin.com/in/juan-dela-cruz-b40a1b97/",
    website: "juandc.ph",
  },
]

export default entries
