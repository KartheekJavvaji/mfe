import { memo } from "react"

import type { ReactElement } from 'react';

function AppTopBar({children}: { children: ReactElement }) {
  return (
    <>
      {children}
    </>
  )
}

export default memo(AppTopBar)