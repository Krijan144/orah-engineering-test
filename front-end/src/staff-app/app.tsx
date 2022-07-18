import React from "react"
import { Routes, Route } from "react-router-dom"
import "shared/helpers/load-icons"
import { Header } from "staff-app/components/header/header.component"
import { HomeBoardPage } from "staff-app/daily-care/home-board.page"
import { ActivityPage } from "staff-app/platform/activity.page"
import styled from "styled-components"
import { Sidebar } from "./components/sidebar/sidebar.component"

function App() {
  return (
    <>
      <Header />
      <AppBody>
        <Sidebar />
        <AppBodyWrapper>
          <Routes>
            <Route path="daily-care" element={<HomeBoardPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="*" element={<div>No Match</div>} />
          </Routes>
        </AppBodyWrapper>
      </AppBody>
    </>
  )
}
const AppBodyWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  height: calc(100vh - 57px);
`
const AppBody = styled.div`
  display: flex;
`

export default App
