<template>
  <a-row justify="center" align="center">
    <div style="height: 100px">
      <FileImage :data="data" style="border-radius: 5px" />
    </div>
  </a-row>
  <a-row style="margin-top: 15px">
    <a-descriptions :column="1" layout="inline-vertical">
      <a-descriptions-item label="名称">
        <a-typography-paragraph copyable :copy-text="data.url">
          <template #copy-tooltip>复制链接</template>
          {{ data.originalName }}
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="大小">{{ formatFileSize(data.size) }}</a-descriptions-item>
      <a-descriptions-item label="路径">{{ `${data.path === '/' ? '' : data.path}/${data.name}` }}</a-descriptions-item>
      <a-descriptions-item v-if="data.sha256" label="SHA256">
        <a-typography-paragraph copyable :copy-text="data.sha256">
          <template #copy-tooltip>复制</template>
          {{ data.sha256 }}
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="上传时间">{{ data.createTime }}</a-descriptions-item>
      <a-descriptions-item v-if="data?.updateTime" label="修改时间">{{ data?.updateTime }}</a-descriptions-item>
      <a-descriptions-item label="存储名称">{{ data.storageName }}</a-descriptions-item>
    </a-descriptions>
  </a-row>
</template>

<script setup lang="ts">
import FileImage from '../../main/FileMain/FileImage.vue'
import type { FileItem } from '@/apis/system'
import { formatFileSize } from '@/utils'

interface Props {
  data: FileItem
}

withDefaults(defineProps<Props>(), {})
</script>

<style lang="less" scoped>
.label {
  color: var(--color-text-2);
}
:deep(.arco-form-item) {
  margin-bottom: 0;
}
:deep(.arco-form-item-label-col > label) {
  white-space: nowrap;
}
:deep(.arco-descriptions-title) {
  font-size: 14px;
}
:deep(.arco-descriptions-item-label-inline) {
  font-size: 12px;
}
:deep(.arco-descriptions-item-value-inline) {
  font-size: 12px;
  margin-bottom: 10px;
}
</style>
