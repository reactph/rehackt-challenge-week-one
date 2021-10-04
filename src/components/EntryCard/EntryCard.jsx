import React, { useContext } from "react"
import { Route, Switch } from "react-router-dom"
import ContributorDetails from "../ContributorDetails/ContributorDetails"
import styles from "./EntryCard.module.css"
import { EntriesContext } from "../../EntriesProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowCircleRight,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router"

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

const EntryCard = () => {
  const history = useHistory()
  const { entries, currentSlug } = useContext(EntriesContext)
  let currentEntryIndex = 0

  if (currentSlug) {
    currentEntryIndex = entries.findIndex((entry) => entry.slug === currentSlug)
  }

  const previous =
    currentEntryIndex > 0
      ? entries[currentEntryIndex - 1]
      : entries[entries.length - 1]
  const next =
    currentEntryIndex < entries.length - 1
      ? entries[currentEntryIndex + 1]
      : entries[0]

  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        icon={faArrowCircleLeft}
        size="3x"
        className={styles.arrow}
        onClick={() => previous && history.push(`${previous.slug}`)}
      />
      <div className={styles.entryCard}>
        <Switch>{generateRoutes(entries)}</Switch>
        <ContributorDetails entries={entries} currentSlug={currentSlug} />
      </div>
      <FontAwesomeIcon
        icon={faArrowCircleRight}
        size="3x"
        className={styles.arrow}
        onClick={() => next && history.push(`${next.slug}`)}
      />
    </div>
  )
}

export default EntryCard
