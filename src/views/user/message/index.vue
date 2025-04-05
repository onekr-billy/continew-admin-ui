<template>
  <GiPageLayout :margin="true" :default-collapsed="false">
    <template v-if="isDesktop" #left>
      <a-tabs v-model:active-key="activeKey" position="left" hide-content @change="change">
        <a-tab-pane v-for="(item) in menuList" :key="item.key" :title="item.name"></a-tab-pane>
      </a-tabs>
    </template>
    <a-tabs v-if="!isDesktop" v-model:active-key="activeKey" type="card-gutter" style="margin-bottom: 10px" position="top" hide-content @change="change">
      <a-tab-pane v-for="(item) in menuList" :key="item.key" :title="item.name"></a-tab-pane>
    </a-tabs>
    <transition name="fade-slide" mode="out-in" appear>
      <component :is="menuList.find((item) => item.key === activeKey)?.value"></component>
    </transition>
  </GiPageLayout>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import MyMessage from './components/MyMessage.vue'
import MyNotice from './components/MyNotice.vue'
import { useDevice } from '@/hooks'

defineOptions({ name: 'UserMessage' })

const { isDesktop } = useDevice()

const menuList = [
  { name: '我的消息', key: 'msg', value: MyMessage },
  { name: '我的公告', key: 'notice', value: MyNotice },
]

const route = useRoute()
const router = useRouter()
const activeKey = ref('msg')
watch(
  () => route.query,
  () => {
    if (route.query.tab) {
      activeKey.value = String(route.query.tab)
    }
  },
  { immediate: true },
)
const change = (key: string | number) => {
  activeKey.value = key as string
  router.replace({ path: route.path, query: { tab: key } })
}
</script>

<style scoped lang="scss">
:deep(.arco-tabs-nav-vertical.arco-tabs-nav-type-line .arco-tabs-tab) {
  margin: 0;
  padding: 8px 16px;

  &:hover {
    background: var(--color-fill-1);

    .arco-tabs-tab-title {
      &::before {
        display: none !important;
      }
    }
  }

  &.arco-tabs-tab-active {
    background: rgba(var(--primary-6), 0.08);
  }
}

:deep(.arco-tabs-nav-vertical::before) {
  left: 0;
  display: none;
}

:deep(.arco-tabs-nav-vertical .arco-tabs-nav-ink) {
  left: 0;
}

:deep(.arco-tabs-nav-vertical) {
  float: none;
  flex-direction: row;
}
</style>
