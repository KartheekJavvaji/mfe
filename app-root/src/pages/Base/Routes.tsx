import { memo } from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import AppTopBar from '@root/organisms/AppTopBar'

import Module1 from '../FederatedPages/Module1'
import Page3 from '../Page3'
import Page4 from '../Page4'

function LocalRoutes() {
  return (
    <>
      <Route
        path="/route3"
      >
        <Page3 />
      </Route>
      <Route
        path="/route4"
      >
        <Page4 />
      </Route>
    </>
  )
}

function Routes () {
  return (
    <AppTopBar>
      <Switch>
        <Redirect exact from="/" to='/route1' />
        <Route
          path={['/route1', '/route2']}
        >
          <Module1 />
        </Route>
        <Route>
          <LocalRoutes />
        </Route>
      </Switch>
    </AppTopBar>
  )
}

export default memo(Routes)
