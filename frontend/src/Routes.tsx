import React from 'react'
import { Route, Routes as Router } from 'react-router-dom'
import Items from './pages/items'

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Items />} />
      {/* <Route path="/login" element={<Login />} /> */}
    </Router>
  )
}

export default Routes