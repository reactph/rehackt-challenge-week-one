import React from "react"
import styles from "./BaseEntry.module.css"
import PropTypes from "prop-types"

const BaseEntry = ({ children, className, ...props }) => (
  <div className={`${styles.baseEntry} ${className}`} {...props}>
    {children}
  </div>
)

BaseEntry.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
}

export default BaseEntry
