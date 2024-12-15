import React from 'react'
import { Route, Routes as Router } from 'react-router-dom'
import PlayerDetailsTable from './pages/items'

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<PlayerDetailsTable />} />
    </Router>
  )
}

export default Routes