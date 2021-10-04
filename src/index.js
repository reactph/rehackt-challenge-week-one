import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header/Header"
import EntriesProvider from "./EntriesProvider"
import styles from "./App.module.css"
import EntryCard from "./components/EntryCard/EntryCard"
import Footer from "./components/Footer/Footer"

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.container}>
        <Suspense fallback={<div>Loading...</div>}>
          <EntryCard />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <EntriesProvider>
      <App />
    </EntriesProvider>
  </BrowserRouter>,
  document.getElementById("root")
)
