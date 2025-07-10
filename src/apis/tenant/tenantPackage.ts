import http from '@/utils/http'

const BASE_URL = '/tenant/package'

export interface TenantPackageResp {
  id: string
  name: string
  menuIds: string
  menuCheckStrictly: string
  status: string
  createTime: string
  createUserString: string
  updateUserString: string
}
export interface TenantPackageDetailResp {
  id: string
  name: string
  menuIds: []
  menuCheckStrictly: string
  status: string
  createUser: string
  createTime: string
  updateUser: string
  updateTime: string
  createUserString: string
  updateUserString: string
}
export interface TenantPackageQuery {
  name: string
  status: string
  sort: Array<string>
}
export interface TenantPackagePageQuery extends TenantPackageQuery, PageQuery {}

/** @desc 查询租户套餐列表 */
export function listTenantPackage(query: TenantPackagePageQuery) {
  return http.get<PageRes<TenantPackageResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询租户套餐详情 */
export function getTenantPackage(id: string) {
  return http.get<TenantPackageDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增租户套餐 */
export function addTenantPackage(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改租户套餐 */
export function updateTenantPackage(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除租户套餐 */
export function deleteTenantPackage(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出租户套餐 */
export function exportTenantPackage(query: TenantPackageQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}

/** @desc 查询所有套餐 */
export function listAllTenantPackage() {
  return http.get<TenantPackageResp[]>(`${BASE_URL}/list`)
}

/** @desc 查询套餐菜单 */
export function listTenantPackageMenu() {
  return http.get<any>(`${BASE_URL}/menuTree`)
}
