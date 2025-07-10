const CURRENT_TENANT = 'current_tenant'

export interface TenantCommon {
  isEnabled: boolean
  availableList: any[]
}

export const getTenantId = () => {
  return localStorage.getItem(CURRENT_TENANT)
}

export const setTenantId = (tenantId: string) => {
  localStorage.setItem(CURRENT_TENANT, tenantId)
}
