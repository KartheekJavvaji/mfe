import _isNil from 'lodash/isNil'
import _noop from 'lodash/noop'
import { importRemote } from '@module-federation/utilities'

import envHelper from '@root/helpers/envHelper'

import { type FederatedModuleInfo } from './federatedModule.types'

export const loadModule = async <F = never>(federatedModuleInfo: FederatedModuleInfo & { methodOrVariable: string }, fallback: F = _noop as F): Promise<F> => {
  try {
    const remoteEntry: Record<string, any> = await importRemote({
      url: federatedModuleInfo.url,
      scope: federatedModuleInfo.scope,
      module: federatedModuleInfo.module,
      remoteEntryFileName: federatedModuleInfo.remoteEntryFileName,
      bustRemoteEntryCache: federatedModuleInfo.bustRemoteEntryCache
    })
    if (!_isNil(federatedModuleInfo.methodOrVariable)) {
      const federatedModuleExportedMethodOrVariable = remoteEntry[federatedModuleInfo.methodOrVariable]
      if (_isNil(federatedModuleExportedMethodOrVariable)) {
        throw new Error(`Federated module ${federatedModuleInfo.scope} doesnt export ${federatedModuleInfo.methodOrVariable}`)
      }
      return federatedModuleExportedMethodOrVariable
    }
    return remoteEntry as F
  } catch (error) {
    console.error(`Failed while fetching remote module with details - ${JSON.stringify(federatedModuleInfo)}`, error)
    return fallback
  }
}

export enum FederationRemoteApp {
  MODULE1 = 'MODULE1',
}

export const FederationRemoteAppVsFederationLocation: Record<FederationRemoteApp, Pick<FederatedModuleInfo, 'url' | 'scope' | 'remoteEntryFileName'>> = {
  [FederationRemoteApp.MODULE1]: {
    url: envHelper.getFederatedRemoteForModule1(),
    scope: 'module1',
    remoteEntryFileName: 'remoteEntry.js'
  },
}
