import React from "react"
import { useLocation, useHistory } from "react-router-dom"

const getCurrentSlug = (location) => {
    const paths = location.pathname.split("/")

    if(paths.length > 0){
        return paths[1]
    }    

    return null
}

const ContributorDetails = ({ entries }) => {
    const location = useLocation()
    const history = useHistory()
    const currentSlug = getCurrentSlug(location)
    
    let currentEntryIndex = 0
    if(!!currentSlug){
        currentEntryIndex = entries.findIndex(entry => entry.slug === currentSlug)
    }

    const currentEntry = entries[currentEntryIndex]
    const previous = currentEntryIndex > 0 ? entries[currentEntryIndex - 1] : null
    const next = currentEntryIndex < entries.length - 1 ? entries[currentEntryIndex + 1] : null

    return (
        currentEntry ? (
        <div className="contributor">
            <div><span onClick={() => previous && history.push(`${previous.slug}`)} role="link">Previous</span></div>
            <div className="contributor-description">
                <div className="content">
                    <h1>{currentEntry.title}</h1>
                    <div>{currentEntry.author}</div>
                    <a href={currentEntry.website} target="blank">{currentEntry.website}</a>
                </div>
            </div>
            <div><span onClick={() => next && history.push(`${next.slug}`)} role="link">Next</span></div>
        </div>
        ): null
    )
}


export default ContributorDetails
