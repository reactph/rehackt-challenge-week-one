import React from "react"
import PropTypes from "prop-types"
import styles from "./ContributorDetails.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

const AuthorInfoItem = ({ icon, children, href, ...props }) => (
  <a
    className={styles.authorInfoItem}
    href={href}
    target="_blank"
    rel="noreferrer"
    {...props}
  >
    <FontAwesomeIcon icon={icon} color="" />
    <p>{children}</p>
  </a>
)

AuthorInfoItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  href: PropTypes.string,
}

const ContributorDetails = ({ entries, currentSlug }) => {
  let currentEntryIndex = 0
  if (currentSlug) {
    currentEntryIndex = entries.findIndex((entry) => entry.slug === currentSlug)
  }

  const { title, author, description, email, linkedIn, website, slug } =
    entries[currentEntryIndex] || {}

  return title ? (
    <div className={styles.contributor}>
      <div className={styles.entryInfo}>
        <h1>{title}</h1>
        <p>by {author}</p>
        <AuthorInfoItem
          href={`https://github.com/reactph/rehackt-challenge-week-one/tree/main/src/entries/${slug}`}
          icon={faGithub}
          style={{ marginTop: "5px", marginBottom: 0 }}
        >{`/${slug}`}</AuthorInfoItem>
        <br />

        <p>{description}</p>
      </div>

      <div className={styles.authorInfo}>
        <p id={styles.authorName}>{author}</p>
        {website && (
          <AuthorInfoItem href={website} icon={faGlobe}>
            {website}
          </AuthorInfoItem>
        )}
        {email && (
          <AuthorInfoItem href={`mailto:${email}`} icon={faEnvelope}>
            {email}
          </AuthorInfoItem>
        )}
        {email && (
          <AuthorInfoItem href={linkedIn} icon={faLinkedin}>
            {author}
          </AuthorInfoItem>
        )}
      </div>
    </div>
  ) : null
}

ContributorDetails.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      author: PropTypes.string.isRequired,
      email: PropTypes.email,
      linkedIn: PropTypes.string,
      website: PropTypes.string,
    })
  ),
  currentSlug: PropTypes.string.isRequired,
}

export default ContributorDetails
