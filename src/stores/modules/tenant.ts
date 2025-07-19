import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTenantStore = defineStore('tenant', () => {
  const tenantEnabled = ref(false)
  const tenantId = ref('')

  const setTenantEnable = (status: boolean) => {
    tenantEnabled.value = status
  }
  const setTenantId = (id: string) => {
    tenantId.value = id
  }

  // 判断是否需要用户输入租户编码
  const needInputTenantId = computed(() => {
    return tenantEnabled.value && !tenantId.value
  })

  return {
    tenantEnabled,
    tenantId,
    setTenantEnable,
    setTenantId,
    needInputTenantId,
  }
}, {
  persist: { paths: ['tenantEnabled', 'tenantId'], storage: localStorage },
})
