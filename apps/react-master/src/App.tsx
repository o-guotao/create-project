import React from 'react'

import { router } from './router'
import { HashRouter, useRoutes } from 'react-router-dom'

const Routers = () => useRoutes(router)

export default function App() {
  return (
    <HashRouter>
      <Routers />
    </HashRouter>
  )
}
