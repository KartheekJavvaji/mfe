import { memo } from "react"
import Stack from '@components/atoms/Stack'
import Typography from "@components/atoms/Typography";
import { Link } from "react-router-dom";

import type { ReactElement } from 'react';

function AppTopBar({children}: { children: ReactElement }) {
  return (
    <Stack>
      <Stack 
        p={2} 
        border={1} 
        spacing={2} 
        direction="row"
      >
        <Typography variant="caption">
          <Link to="/route1">Remote app</Link>
        </Typography>
        <Typography variant="caption">
          <Link to="/route2">Remote app with inbuilt provider</Link>
        </Typography>
        <Typography variant="caption">
          <Link to="/route3">Local app</Link>
        </Typography>
        <Typography variant="caption">
          <Link to="/route4">Local app with inbuilt provider</Link>
        </Typography>
      </Stack>
      {children}
    </Stack>
  )
}

export default memo(AppTopBar)