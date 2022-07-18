import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "index.css"
import "./sass/index.scss"
import StaffApp from "staff-app/app"
import { GlobalStyle } from "shared/styles/global-style"
import Orahlogo from "assets/orah-logo.svg"

const Home: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-wrapper">
          <div className="image-wrapper">
            <img src={Orahlogo} />
          </div>
          <div className="text-wrapper">
            <p>Engineering Test</p>
            <Link to="staff/daily-care">
              <button>Staff</button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home>Engineering Test</Home>} />
        <Route path="staff/*" element={<StaffApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
