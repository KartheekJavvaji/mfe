import { memo } from 'react'
import {
  Route,
} from 'react-router-dom'

import Page1 from '../Page1'
import DateRangeTrail from '../DateRangeTrail'

function Routes() {
  return (
    <>
      <Route
        path="/route1"
      >
        <Page1 />
      </Route>
      <Route
        path="/date-range-trail"
      >
        <DateRangeTrail />
      </Route>
    </>
  )
}

export default memo(Routes)
