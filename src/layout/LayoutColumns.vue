<template>
  <div class="layout-columns">
    <div v-show="isDesktop" class="layout-columns__left">
      <div class="layout-columns__menu-wrapper">
        <!-- 左侧一级菜单区域 -->
        <OneLevelMenu :menus="oneLevelMenus" @menu-click="handleMenuClick"></OneLevelMenu>
        <div class="layout-columns__right-menu" :class="{ collapsed: appStore.menuCollapse }">
          <!-- 系统标题 -->
          <div class="layout-columns__title" @click="toHome">
            <span v-show="!appStore.menuCollapse" class="system-name gi_line_1">{{ title }}</span>
          </div>
          <!-- 左侧二级菜单区域 -->
          <Menu
            v-if="twoLevelMenus.length > 1" class="layout-columns__menu" :menus="twoLevelMenus"
            :menu-style="menuStyle"
          />
        </div>
      </div>
    </div>

    <!-- 右侧内容区域 -->
    <section class="layout-columns__content">
      <Header />
      <Tabs v-if="appStore.tab" />
      <Main />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { findTree, mapTree } from 'xe-utils'
import Header from './components/Header/index.vue'
import Main from './components/Main.vue'
import Menu from './components/Menu/index.vue'
import OneLevelMenu from './components/OneLevelMenu/index.vue'
import Tabs from './components/Tabs/index.vue'
import { filterTree } from '@/utils'
import { useAppStore, useRouteStore } from '@/stores'
import { useDevice } from '@/hooks'

defineOptions({ name: 'LayoutColumns' })

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const routeStore = useRouteStore()
const { isDesktop } = useDevice()

// 系统标题和Logo
const title = computed(() => appStore.getTitle())

// 菜单样式 - 根据折叠状态动态调整宽度
const menuStyle = computed(() => {
  return {
    width: appStore.menuCollapse ? '48px' : '200px',
  }
})

// 跳转首页
const toHome = () => {
  router.push('/')
}

// 处理菜单路由数据
const cloneRoutes = JSON.parse(JSON.stringify(routeStore.routes)) as RouteRecordRaw[]
const showMenuList = filterTree(cloneRoutes, (i) => i.meta?.hidden === false) as RouteRecordRaw[]

// 一级菜单
const oneLevelMenus = ref<RouteRecordRaw[]>([])
function getOneLevelMenus() {
  const cloneList = JSON.parse(JSON.stringify(routeStore.routes)) as RouteRecordRaw[]
  const formatList = mapTree(cloneList, (i) => {
    if (i?.children?.length === 1 && i?.meta?.alwaysShow !== true) {
      return i.children?.[0]
    }
    return i
  })
  const arr = formatList.filter((i) => i.meta?.hidden === false)
  return arr
}
oneLevelMenus.value = getOneLevelMenus()

// 二级菜单
const twoLevelMenus = computed(() => {
  const obj = findTree(showMenuList, (i) => i.path === route.path)
  return showMenuList?.[Number(obj.path[0])]?.children || []
})

function handleMenuClick(item: RouteRecordRaw) {
  if (item.redirect === 'noRedirect') {
    router.replace({ path: item.children?.[0]?.path })
    return
  }
  router.replace({ path: (item.redirect as string) || item.path })
}
</script>

<style lang="scss" scoped>
.layout-columns {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;

  &__left {
    height: 100%;
    background-color: var(--color-bg-1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  &__menu-wrapper {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  &__right-menu {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-right: 1px solid var(--color-border-2);
    transition: width 0.2s;
    width: 200px;

    &.collapsed {
      width: 48px;
    }
  }

  &__title {
    height: 56px;
    padding: 0 12px;
    color: var(--color-text-1);
    font-size: 20px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
    cursor: pointer;
    user-select: none;
    transition: padding 0.2s;

    .layout-columns__right-menu.collapsed & {
      padding: 0;
    }

    .logo {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      transition: all 0.2s;
      overflow: hidden;
      flex-shrink: 0;
    }

    .system-name {
      padding-left: 6px;
      white-space: nowrap;
      transition: color 0.3s;
      line-height: 1.5;
      display: inline-flex;
      align-items: center;

      &:hover {
        color: $color-theme !important;
        cursor: pointer;
      }
    }
  }

  &__menu {
    flex: 1;
    overflow: hidden;
  }

  // 折叠状态下的菜单样式
  :deep(.arco-menu.arco-menu-vertical.arco-menu-collapsed) {
    .arco-menu-icon {
      margin-right: 0;
      padding: 10px 0;
    }

    .arco-menu-has-icon {
      padding: 0;
      justify-content: center;
    }

    .arco-menu-title {
      display: none;
    }
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
