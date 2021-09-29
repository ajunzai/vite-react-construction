import React from 'react'
import { withRouter } from 'react-router'

const Home = withRouter(React.lazy(() => import('./index')))

export default [
  {
    path: '/home',
    component: () => <Home />
  }
]