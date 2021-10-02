import arrayShuffle from "array-shuffle"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import ContributorDetails from "./ContributorDetails"
import entries from "./entries"

const generateRoutes = (entries) => {
    if(entries.length === 0){
        return null
    } 

    return [
        <Route path="/" key="default" exact>
            {entries[0].component}
        </Route>,
        ...entries.map((entry) => (
            <Route path={`/${entry.slug}`} key={entry.slug}>
                {entry.component}
            </Route>
        ))
    ]
}

const App = () => {
    const shuffledEntries = arrayShuffle(entries)

    return (
        <div className="container">
            <div className="content">
                <Switch>{generateRoutes(shuffledEntries)}</Switch>
                <ContributorDetails entries={shuffledEntries} />
            </div>
        </div>
    )
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("root"))
