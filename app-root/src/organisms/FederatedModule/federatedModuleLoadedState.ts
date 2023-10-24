import EventEmitter from 'eventemitter3'

import { type FederatedModuleInfo } from './federatedModule.types'

export enum FederatedModulesLoadedStatus {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  FAILED = 'FAILED'
}

export interface FederatedModuleLoadedContext {
  scope: FederatedModuleInfo['scope']
  status: FederatedModulesLoadedStatus
}

export type FederatedModulesLoadedState = Record<FederatedModuleInfo['scope'], FederatedModuleLoadedContext>

export const FEDERATED_MODULE_LOADED_CONTEXT_UPDATED = 'FEDERATED_MODULE_LOADED_CONTEXT_UPDATED'

export const federatedModuleLoadedContextEvent = new EventEmitter()

export let federatedModulesLoadedState: FederatedModulesLoadedState = {}

export const updateFederatedModulesLoadedContext = (federatedModuleLoadedContext: FederatedModuleLoadedContext): void => {
  federatedModulesLoadedState = {
    ...federatedModulesLoadedState,
    [federatedModuleLoadedContext.scope]: federatedModuleLoadedContext
  }

  federatedModuleLoadedContextEvent.emit(FEDERATED_MODULE_LOADED_CONTEXT_UPDATED, federatedModulesLoadedState)
  federatedModuleLoadedContextEvent.emit(`${FEDERATED_MODULE_LOADED_CONTEXT_UPDATED}_${federatedModuleLoadedContext.scope}`, federatedModuleLoadedContext)
}
