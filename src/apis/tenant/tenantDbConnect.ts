import http from '@/utils/http'

const BASE_URL = '/tenant/dbConnect'

export interface TenantDbConnectResp {
  id: string
  connectName: string
  type: string
  host: string
  port: string
  username: string
  password: string
  createUserString: string
  updateUserString: string
}
export interface TenantDbConnectDetailResp {
  id: string
  connectName: string
  type: string
  host: string
  port: string
  username: string
  password: string
  createUser: string
  createTime: string
  updateUser: string
  updateTime: string
  createUserString: string
  updateUserString: string
}
export interface TenantDbConnectQuery {
  connectName: string
  sort: Array<string>
}
export interface TenantDbConnectPageQuery extends TenantDbConnectQuery, PageQuery {}

/** @desc 查询租户数据连接列表 */
export function listTenantDbConnect(query: TenantDbConnectPageQuery) {
  return http.get<PageRes<TenantDbConnectResp[]>>(`${BASE_URL}`, query)
}

/** @desc 查询租户数据连接详情 */
export function getTenantDbConnect(id: string) {
  return http.get<TenantDbConnectDetailResp>(`${BASE_URL}/${id}`)
}

/** @desc 新增租户数据连接 */
export function addTenantDbConnect(data: any) {
  return http.post(`${BASE_URL}`, data)
}

/** @desc 修改租户数据连接 */
export function updateTenantDbConnect(data: any, id: string) {
  return http.put(`${BASE_URL}/${id}`, data)
}

/** @desc 删除租户数据连接 */
export function deleteTenantDbConnect(id: string) {
  return http.del(`${BASE_URL}/${id}`)
}

/** @desc 导出租户数据连接 */
export function exportTenantDbConnect(query: TenantDbConnectQuery) {
  return http.download<any>(`${BASE_URL}/export`, query)
}
