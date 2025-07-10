<template>
  <a-drawer v-model:visible="visible" title="租户套餐详情" :width="width >= 600 ? 600 : '100%'" :footer="false">
    <a-descriptions title="基础信息" :column="2" size="large" class="general-description">
      <a-descriptions-item label="ID">{{ dataDetail?.id }}</a-descriptions-item>
      <a-descriptions-item label="套餐名称">{{ dataDetail?.name }}</a-descriptions-item>
      <a-descriptions-item label="状态">
        <a-tag v-if="dataDetail?.status === 1" color="green">启用</a-tag>
        <a-tag v-else color="red">禁用</a-tag>
      </a-descriptions-item>
      <a-descriptions-item />
      <a-descriptions-item label="创建人">{{ dataDetail?.createUserString }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ dataDetail?.createTime }}</a-descriptions-item>
      <a-descriptions-item label="修改人">{{ dataDetail?.updateUserString }}</a-descriptions-item>
      <a-descriptions-item label="修改时间">{{ dataDetail?.updateTime }}</a-descriptions-item>
    </a-descriptions>

    <a-descriptions
      title="套餐权限"
      :column="2"
      size="large"
      class="permission general-description"
      style="margin-top: 20px; position: relative"
    >
      <a-descriptions-item :span="2">
        <a-tree
          :checked-keys="dataDetail?.menuIds"
          :data="menuList"
          default-expand-all
          check-strictly
          checkable
        />
      </a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { type TenantPackageDetailResp, getTenantPackage as getDetail } from '@/apis/tenant/tenantPackage'
import { useMenu } from '@/hooks/app'

const { width } = useWindowSize()

const dataId = ref('')
const dataDetail = ref<TenantPackageDetailResp>()
const visible = ref(false)
const { menuList, getTenantPackageMenuList } = useMenu()
// 查询详情
const getDataDetail = async () => {
  const { data } = await getDetail(dataId.value)
  dataDetail.value = data
}

// 打开
const onOpen = async (id: string) => {
  dataId.value = id
  if (!menuList.value.length) {
    await getTenantPackageMenuList()
  }
  await getDataDetail()
  visible.value = true
}

defineExpose({ onOpen })
</script>

<style scoped lang="scss"></style>
