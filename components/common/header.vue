<template>
  <div class="header flex justify-between">
    <div
      :class="[
        'header-left flex-center',
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

  .header-right-link {
    position: relative;
    height: var(--app-header-height);
    padding: 0 12px;
    text-decoration: none;
    border-radius: 8px;
    opacity: var(--play-video-opacity, 1);
    pointer-events: all;

    &:hover {
      --play-video-margin: 10px;
      --play-button-stroke: var(--color-evex-blue);
    }

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
      margin-right: var(--play-video-margin, 0);
      line-height: 1;
      font-size: css-clamp-vw(11px, 21px);
      font-family: var(--font-ping-regular);
      white-space: nowrap;
      color: var(--color-white);
      @include default-transitions(margin-right);
    }

    :deep(.nuxt-icon) {
      margin-left: 10px;
      display: block;
      @include size(css-clamp(24px, 42px));

      @media (max-width: 1366px) {
        @include size(css-clamp(20px, 24px, 1366));
      }

      @media (max-width: 1024px) {
        @include size(css-clamp-vw(18px, 20px, 1024));
      }

      svg {
        @include size(100%);
        path {
          fill: var(--play-button-stroke, var(--color-white));
          @include default-transitions(fill);
        }
      }
    }
  }
}
</style>
