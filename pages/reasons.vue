<template>
  <div
    :class="[
      'reasons',
      {
        'is-loaded': textureloadedStore.loaderComplete,
      },
    ]"
  >
    <nuxt-icon name="1001-reasons" class="reasons-icon flex-center" filled />
    <ul class="list">
      <li v-for="(item, index) in use1001Copy()" :key="index" class="item">
        <pages-tiny-reason-item :item="item" :index="index" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { usePageLink } from "@/store/page-link";
import { useTextureLoaderStore } from "@/store/texturesLoaded";

const textureloadedStore = useTextureLoaderStore();
const pageLink = usePageLink();

onMounted(() => {
  setTimeout(() => {
    pageLink.changePageLoading(false);
  }, 500);
});
</script>

<style lang="scss" scoped>
.reasons {
  padding: var(--page-offset-padding);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  &.is-loaded {
    height: 100vh;
    overflow: auto;
  }
  :deep(.reasons-icon) {
    padding-top: calc(var(--app-header-height) + 70px);
    svg {
      height: 352px;
      width: auto;
    }
  }
  .list {
    padding: 110px 0;
  }

  .item {
    border-bottom: 1px solid var(--color-border);
    cursor: pointer;
    overflow: hidden;
    &:hover {
      --arrow-bg: var(--color-evex-green);
      --stroke-color: var(--color-white);
    }
  }
}
</style>
