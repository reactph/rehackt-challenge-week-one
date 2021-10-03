import arrayShuffle from "array-shuffle"
import React, { createContext, useRef } from "react"
import { useLocation } from "react-router"
import entries from "./entries"
import PropTypes from "prop-types"

export const EntriesContext = createContext()

const getFirstThenShuffle = (currentSlug) => {
  return [
    entries.find((e) => e.slug === currentSlug),
    ...arrayShuffle(entries.filter((e) => e.slug !== currentSlug)),
  ]
}

const getCurrentSlug = (location) => {
  const paths = location.pathname.split("/")

  return paths.length > 1 ? paths[1] : null
}

const EntriesProvider = ({ children }) => {
  const location = useLocation()
  const currentSlug = getCurrentSlug(location)
  const shuffledEntries = useRef(
    currentSlug ? getFirstThenShuffle(currentSlug) : arrayShuffle(entries)
  )

  return (
    <EntriesContext.Provider
      value={{ entries: shuffledEntries.current, currentSlug }}
    >
      {children}
    </EntriesContext.Provider>
  )
}

EntriesProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default EntriesProvider
