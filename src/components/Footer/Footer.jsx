import React from "react"
import styles from "./Footer.module.css"

const Footer = () => (
  <div className={styles.container}>
    <div className={styles.footer}>
      <div className={styles.sponsor}>
        <p>
          <b>Rehackt</b> is presented by
        </p>
        <a href="https://reactjs.org.ph/" target="_blank" rel="noreferrer">
          <img src="/reactjsph.png" style={{ height: "45px" }} />
        </a>
      </div>
      <div className={styles.sponsor}>
        <p>in cooperation with</p>
        <a href="https://codev.com/" target="_blank" rel="noreferrer">
          <img src="/codev-logo.png" style={{ height: "25px" }} />
        </a>
      </div>
    </div>
    <div className={styles.bg} />
  </div>
)

export default Footer
