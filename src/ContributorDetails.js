import React from "react"
import { useHistory } from "react-router-dom"


const ContributorDetails = ({ entries, currentSlug }) => {
    const history = useHistory()
    console.log(entries)
    
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
