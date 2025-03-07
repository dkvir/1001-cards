<template>
  <div
    ref="target"
    :class="[
      'footer flex-center justify-between',
      {
        'is-invisible':
          textureStore.textureIndex !== null &&
          textureloadedStore.mountedTexture !== null,
      },
    ]"
  >
    <nuxt-icon class="take-care flex-center" name="take-care" filled />
    <common-tiny-share />
    <common-tiny-visit />
  </div>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";
import { useTextureLoaderStore } from "@/store/texturesLoaded";

const textureStore = useTextureStore();
const textureloadedStore = useTextureLoaderStore();
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: var(--page-offset-padding);
  z-index: 3;
  padding: 0 var(--page-offset-padding);
  width: 100%;
  height: var(--app-header-height);
  font-family: var(--font-ping-regular);
  pointer-events: none;

  @media (max-width: 600px) {
    justify-content: center;
  }

  :deep(.take-care) {
    position: relative;
    padding: 0 css-clamp(10px, 16px);
    height: var(--app-header-height);
    border-radius: 8px;

    svg {
      width: auto;
      height: 40%;
    }

    @media (max-width: 1024px) {
      padding: 0 10px;
      opacity: var(--visit-opacity, 0);
      @include default-transitions(opacity);
    }
    @media (max-width: 600px) {
      display: none;
    }

    &::before {
      position: absolute;
      content: "";
      border-radius: 8px;
      background-color: var(--take-care-bg, var(--color-white));
      opacity: 0.2;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      backdrop-filter: blur(10px);
    }

    @include parent-state(".is-invisible") {
      --take-care-bg: var(--color-evex-gray);
      --visit-opacity: 1;
    }
  }
}
</style>
