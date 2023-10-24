import { memo } from 'react'
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import AppTopBar from '@root/organisms/AppTopBar'

import Module1 from '../FederatedPages/Module1'
import Page2 from '../Page2'
import Page3 from '../Page3'

function LocalRoutes() {
  return (
    <>
      <Route
        path="/route2"
      >
        <Page2 />
      </Route>
      <Route
        path="/route3"
      >
        <Page3 />
      </Route>
    </>
  )
}

function Routes () {
  return (
    <AppTopBar>
      <Switch>
        <Route
          path={['/route1', '/date-range-trail']}
        >
          <Module1 />
        </Route>
        <Route>
          <LocalRoutes />
          <Redirect to='/route2' />
        </Route>
      </Switch>
    </AppTopBar>
  )
}

export default memo(Routes)
