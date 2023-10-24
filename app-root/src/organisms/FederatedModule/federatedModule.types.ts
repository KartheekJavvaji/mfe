import { type ImportRemoteOptions } from '@module-federation/utilities'
import { type ReactNode, type ReactElement } from 'react'

export type FederatedModuleInfo = ImportRemoteOptions
export interface FederatedModuleProps<FederatedComponentProps extends Record<string, any>> {
  federatedModuleInfo: ImportRemoteOptions
  componentProps?: FederatedComponentProps
  Fallback?: (props: any) => ReactElement | null
  children?: ReactNode | ReactNode[]
}
