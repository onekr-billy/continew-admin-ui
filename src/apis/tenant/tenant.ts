import http from '@/utils/http'
import type { TenantCommon } from '@/utils/tenant'

const BASE_URL = '/tenant/user'

export interface TenantResp {
  id: string
  name: string
  domain: string
  packageId: string
  status: string
  expireTime: string
  createTime: string
  createUserString: string
  updateUserString: string
}
export interface TenantDetailResp {
  id: string
  name: string
  domain: string
  packageId: string
  status: string
  expireTime: string
  createUser: string
  createTime: string
  updateUser: string
  updateTime: string
  createUserString: string
  updateUserString: string
  packageName: string
  menuIds: []
}
export interface TenantQuery {
  name: string
  packageId: string
  status: string
  sort: Array<string>
}
export interface TenantPageQuery extends TenantQuery, PageQuery {}

/** @desc 查询租户列表 */
export function listTenant(query: TenantPageQuery) {
  return http.get<PageRes<TenantResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询租户详情 */
export function getTenant(id: string) {
  return http.get<TenantDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增租户 */
export function addTenant(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改租户 */
export function updateTenant(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除租户 */
export function deleteTenant(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出租户 */
export function exportTenant(query: TenantQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}

/** @desc 多租户通用信息查询 */
export const getTenantCommon = () => {
  return http.get<TenantCommon>(`${BASE_URL}/common`)
}

/** @desc 获取租户管理账号用户名 */
export const getTenantLoginUser = (tenantId: string) => {
  return http.get<string>(`${BASE_URL}/loginUser/${tenantId}`)
}

/** @desc 租户管理账号信息更新 */
export const updateTenantLoginUser = (data: any) => {
  return http.put(`${BASE_URL}/loginUser`, data)
}

/** @desc 获取套餐列表 */
export const listAllPackage = () => {
  return http.get<any>(`${BASE_URL}/all/package`)
}

/** @desc 获取数据连接列表 */
export const listAllDbConnect = () => {
  return http.get<any>(`${BASE_URL}/all/dbConnect`)
}
