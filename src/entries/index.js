import { lazy } from "react"

const entries = [
  {
    component: lazy(() => import("./SampleEntry/SampleEntry")),
    title: "Sample Entry",
    author: "ReactJS Philippines",
    website: "reactjs.org.ph",
    slug: "sample-entry",
  },
]

export default entries
