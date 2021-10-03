import React, { useContext } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import ContributorDetails from "./ContributorDetails"
import EntriesProvider, { EntriesContext } from "./EntriesProvider"

const generateRoutes = (entries) => {
  if (entries.length === 0) {
    return null
  }

  return [
    <Route path="/" key="default" exact component={entries[0].component} />,
    ...entries.map((entry) => (
      <Route
        path={`/${entry.slug}`}
        key={entry.slug}
        component={entry.component}
      />
    )),
  ]
}

const App = () => {
  const { entries, currentSlug } = useContext(EntriesContext)

  return (
    <div className="container">
      <div className="content">
        <Switch>{generateRoutes(entries)}</Switch>
        <ContributorDetails entries={entries} currentSlug={currentSlug} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <EntriesProvider>
      <App />
    </EntriesProvider>
  </BrowserRouter>,
  document.getElementById("root")
)
