import { memo } from 'react'
import {
  Route,
} from 'react-router-dom'

import Page1 from '../Route1'
import Page2 from '../Route2'

function Routes() {
  return (
    <>
      <Route
        path="/route1"
      >
        <Page1 />
      </Route>
      <Route
        path="/route2"
      >
        <Page2 />
      </Route>
    </>
  )
}

export default memo(Routes)
