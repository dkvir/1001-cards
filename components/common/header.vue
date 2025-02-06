<template>
  <div class="header flex justify-between">
    <div
      :class="[
        'header-left flex',
        {
          'has-background': textureStore.textureIndex == null,
        },
      ]"
    >
      <nuxt-icon name="logo" filled />
    </div>
    <a
      href="#"
      :class="[
        'header-right-link flex-center',
        {
          'has-opacity': textureStore.textureIndex !== null,
        },
      ]"
    >
      <div class="play-video-text uppercase">ნახე ვიდეო</div>
      <nuxt-icon name="play-button" filled />
    </a>
  </div>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";
const textureStore = useTextureStore();
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 64px;
  left: 64px;
  right: 64px;
  z-index: 3;
  pointer-events: none;

  .header-left {
    background-color: var(--header-left, transparent);
    padding: 12px 16px;
    border-radius: 8px;
    pointer-events: all;
    &.has-background {
      --header-left: var(--color-evex-blue);
    }
  }

  .header-right-link {
    position: relative;
    height: 60px;
    padding: 15px 12px;
    text-decoration: none;
    border-radius: 8px;
    opacity: var(--play-video-opacity, 1);
    pointer-events: all;

    &::before {
      content: "";
      position: absolute;
      background-color: var(--color-evex-gray);
      opacity: 0.3;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 8px;
      z-index: -1;
    }

    &.has-opacity {
      --play-video-opacity: 0;
      pointer-events: none;
    }
    .play-video-text {
      line-height: 1;
      font-size: 21px;
      font-family: var(--font-ping-regular);
      white-space: nowrap;
      color: var(--color-white);
    }
    :deep(.nuxt-icon) {
      margin-left: 10px;
      display: block;
      @include size(42px);
      svg {
        @include size(100%);
      }
    }
  }
}
</style>
