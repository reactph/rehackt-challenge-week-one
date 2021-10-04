import React from "react"
import styles from "./Header.module.css"

const Header = () => (
  <header className={styles.header}>
    <img src="/header-logo.png" />
    <div className={styles.challengeInfo}>
      <h2>Turn it up</h2>
      <p>Make the best, worst or weirdest volume slider</p>
    </div>
    <div className={styles.buttonMenu}>
      <a
        href="https://github.com/reactph/rehackt-challenge-week-one"
        target="_blank"
        rel="noreferrer"
      >
        <button>Join now</button>
      </a>
      {/* TODO: Add modal to show info about Rehackt */}
      {/* <button>About Rehackt</button> */}
    </div>
  </header>
)

export default Header
