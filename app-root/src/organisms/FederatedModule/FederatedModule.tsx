import { type ComponentType, useMemo, type ReactElement, Suspense, lazy, memo } from 'react'
import { importRemote } from '@module-federation/utilities'

import { type FederatedModuleInfo, type FederatedModuleProps } from './federatedModule.types'
import { FederatedModulesLoadedStatus, updateFederatedModulesLoadedContext } from './federatedModuleLoadedState'

function FallbackComponent (props: { federatedModuleInfo: FederatedModuleInfo }): ReactElement {
  const { federatedModuleInfo } = props
  return <p>{`Failed to load ${federatedModuleInfo.module} !`}</p>
}

function FederatedModule<FederatedComponentProps extends Record<string, any>> (props: FederatedModuleProps<FederatedComponentProps>): ReactElement {
  const { federatedModuleInfo, componentProps, Fallback = FallbackComponent, children } = props

  const dynamicImporter = useMemo(() => async (): Promise<{ default: ComponentType<any> }> => {
    try {
      updateFederatedModulesLoadedContext({
        scope: federatedModuleInfo.scope,
        status: FederatedModulesLoadedStatus.LOADING
      })
      const remoteEntry: { default: ComponentType<any> } = await importRemote({
        url: federatedModuleInfo.url,
        scope: federatedModuleInfo.scope,
        module: federatedModuleInfo.module,
        remoteEntryFileName: federatedModuleInfo.remoteEntryFileName,
        bustRemoteEntryCache: federatedModuleInfo.bustRemoteEntryCache
      })
      updateFederatedModulesLoadedContext({
        scope: federatedModuleInfo.scope,
        status: FederatedModulesLoadedStatus.LOADED
      })
      return remoteEntry
    } catch (error: any) {
      console.error(`Error while loading ${JSON.stringify(federatedModuleInfo)}. Error - ${error.message as string}. Stack - ${error.stack as string}`)
      updateFederatedModulesLoadedContext({
        scope: federatedModuleInfo.scope,
        status: FederatedModulesLoadedStatus.FAILED
      })
      return { default: Fallback }
    }
  }, [federatedModuleInfo, Fallback])

  const Component = useMemo(() => {
    return lazy(dynamicImporter)
  }, [dynamicImporter])

  return (
    <Suspense fallback=''>
      <Component
        federatedModuleInfo={federatedModuleInfo}
        {...componentProps}
      >
        {children}
      </Component>
    </Suspense>
  )
}

export default memo(FederatedModule)
