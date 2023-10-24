import { type ReactElement, memo } from 'react'

import FederatedModule, { FederationRemoteApp, type FederatedModuleInfo, FederationRemoteAppVsFederationLocation } from '@root/organisms/FederatedModule'

const SPARKLE_FEDERATION_CONFIG: FederatedModuleInfo = {
  ...FederationRemoteAppVsFederationLocation[FederationRemoteApp.MODULE1],
  module: './FederatedRemote'
}

function Module1 (): ReactElement {
  return (
    <FederatedModule
      federatedModuleInfo={SPARKLE_FEDERATION_CONFIG}
    />
  )
}

export default memo(Module1)
