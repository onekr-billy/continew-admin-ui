<template>
  <a-drawer v-model:visible="visible" title="租户数据连接详情" :width="width >= 600 ? 600 : '100%'" :footer="false">
    <a-descriptions :column="2" size="large" class="general-description">
      <a-descriptions-item label="ID">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="连接名称">{{ dataDetail?.connectName }}</a-descriptions-item>
      <a-descriptions-item label="连接类型">{{ dataDetail?.type }}</a-descriptions-item>
      <a-descriptions-item label="主机连接地址">{{ dataDetail?.host }}</a-descriptions-item>
      <a-descriptions-item label="连接端口">{{ dataDetail?.port }}</a-descriptions-item>
      <a-descriptions-item label="连接用户名">{{ dataDetail?.username }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
      <a-descriptions-item label="修改时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { type TenantDbConnectDetailResp, getTenantDbConnect as getDetail } from '@/apis/tenant/tenantDbConnect'

const { width } = useWindowSize()

const dataId = ref('')
const dataDetail = ref<TenantDbConnectDetailResp>()
const visible = ref(false)

// 查询详情
const getDataDetail = async () => {
  const { data } = await getDetail(dataId.value)
  dataDetail.value = data
}

// 打开
const onOpen = async (id: string) => {
  dataId.value = id
  await getDataDetail()
  visible.value = true
}

defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
