<template>
  <div
    ref="target"
    :class="[
      'footer flex-center justify-between',
      {
        'is-invisible':
          textureStore.textureIndex !== null ||
          textureloadedStore.mountedTexture !== null ||
          textureStore.reasonIndex,
      },
    ]"
  >
    <nuxt-icon class="take-care flex-center" name="take-care" filled />
    <common-tiny-share />
    <common-tiny-search @transformVisit="changeVisitTransform" />
    <common-tiny-visit :transformVisit="transformVisit" />
  </div>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";
import { useTextureLoaderStore } from "@/store/texturesLoaded";

const textureStore = useTextureStore();
const textureloadedStore = useTextureLoaderStore();
const transformVisit = ref(false);

const changeVisitTransform = (value) => {
  transformVisit.value = value;
};
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

  @media (max-width: 1024px) {
    flex-direction: row-reverse;
  }

  @media (max-width: 600px) {
    gap: 20px;
    justify-content: space-between;
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
      position: absolute;
      @include default-transitions(opacity);
    }
    @media (max-width: 600px) {
      display: none;
    }

    &::before {
      position: absolute;
      content: "";
      border-radius: 8px;
      background: rgba(124, 124, 124, 0.3);
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      opacity: var(--background-opacity, 1);
      backdrop-filter: blur(8px);
    }

    @include parent-state(".is-invisible") {
      --background-opacity: 0;
      --visit-opacity: 1;
    }
  }
}
</style>
