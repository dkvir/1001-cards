<template>
  <div
    ref="target"
    :class="[
      'footer flex-center',
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
  bottom: 50px;
  left: 64px;
  right: 64px;
  z-index: 3;
  font-family: var(--font-ping-regular);
  pointer-events: none;

  .take-care {
    position: relative;
    margin-right: get-vw(553px);
    padding: 18px 16px;
    border-radius: 8px;

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
    }
  }
}
</style>
