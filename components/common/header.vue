<template>
  <div class="header flex justify-between">
    <div
      :class="[
        'header-left flex-center',
        {
          'has-background':
            textureStore.textureIndex == null &&
            textureloadedStore.mountedTexture == null,
        },
      ]"
    >
      <nuxt-icon name="logo" filled />
    </div>
    <div
      :class="[
        'buttons flex-center',
        {
          'has-opacity':
            textureStore.textureIndex !== null ||
            textureloadedStore.mountedTexture !== null,
        },
      ]"
    >
      <common-tiny-change-page />
      <common-tiny-see-video />
    </div>
  </div>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";
import { useTextureLoaderStore } from "@/store/texturesLoaded";

const textureStore = useTextureStore();
const textureloadedStore = useTextureLoaderStore();
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: var(--page-offset-padding);
  left: 0;
  width: 100%;
  height: var(--app-header-height);
  padding: 0 var(--page-offset-padding);
  padding-bottom: 0;
  z-index: 3;
  pointer-events: none;

  .header-left {
    background-color: var(--header-left, transparent);
    padding: 0 16px;
    border-radius: 8px;
    height: inherit;
    pointer-events: none;
    &.has-background {
      --header-left: var(--color-evex-blue);
    }

    :deep(.nuxt-icon) {
      width: auto;
      height: 50%;

      svg {
        height: 100%;
        width: auto;
      }
    }
  }
  .buttons {
    &.has-opacity {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
