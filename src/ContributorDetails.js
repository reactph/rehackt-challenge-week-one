import React from "react"
import { useLocation } from "react-router-dom"

const getCurrentSlug = (location) => {
    const paths = location.pathname.split("/")

    if(paths.length > 0){
        return paths[1]
    }    

    return null
}

const ContributorDetails = ({ entries }) => {
    const location = useLocation()
    const currentSlug = getCurrentSlug(location)
    const currentEntry = location.pathname === "/" ? entries[0]: entries.find(entry => entry.slug === currentSlug)

    return (
        currentEntry ?(
        <div className="contributor">
            <div className="content">
                <h1>{currentEntry.title}</h1>
                <div>{currentEntry.author}</div>
                <a href={currentEntry.website} target="blank">{currentEntry.website}</a>
            </div>
        </div>
        ): null
    )
}


export default ContributorDetails
