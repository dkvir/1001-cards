<template>
  <div
    ref="target"
    :class="[
      'footer flex-center justify-between',
      { 'is-invisible': textureStore.textureIndex == null },
    ]"
  >
    <nuxt-icon class="take-care" name="take-care" filled />
    <common-tiny-share />
    <common-tiny-visit />
  </div>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";

const textureStore = useTextureStore();
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: css-clamp(32px, 50px);
  z-index: 3;
  padding: 0 var(--page-offset-padding);
  width: 100%;
  font-family: var(--font-ping-regular);
  pointer-events: none;

  @media (max-width: 768px) {
    justify-content: center;
  }

  .take-care {
    position: relative;
    padding: 18px 16px;
    border-radius: 8px;

    @media (max-width: 1024px) {
      opacity: var(--visit-opacity, 0);
      @include default-transitions(opacity);
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
