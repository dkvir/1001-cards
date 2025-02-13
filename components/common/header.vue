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
  top: 0;
  left: 0;
  width: 100%;
  padding: var(--page-offset-padding);
  padding-bottom: 0;
  z-index: 3;
  pointer-events: none;

  @media (max-width: 768px) {
    padding-top: 20px;
  }

  .header-left {
    background-color: var(--header-left, transparent);
    padding: 0 16px;
    border-radius: 8px;
    pointer-events: all;
    height: 58px;
    &.has-background {
      --header-left: var(--color-evex-blue);
    }

    @media (max-width: 768px) {
      height: css-clamp-vw(34px, 58px, 768);
    }

    :deep(.nuxt-icon) {
      width: auto;
      height: 32px;

      @media (max-width: 768px) {
        height: css-clamp-vw(16px, 32px, 768);
      }
      svg {
        @include size(100%);
      }
    }
  }

  .header-right-link {
    position: relative;
    height: 60px;
    padding: 0 12px;
    text-decoration: none;
    border-radius: 8px;
    opacity: var(--play-video-opacity, 1);
    pointer-events: all;

    @media (max-width: 768px) {
      height: css-clamp-vw(34px, 60px, 768);
    }

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
      font-size: 21px;
      font-family: var(--font-ping-regular);
      white-space: nowrap;
      color: var(--color-white);
      @media (max-width: 768px) {
        font-size: css-clamp-vw(11px, 21px, 768);
      }
      @include default-transitions(margin-right);
    }

    :deep(.nuxt-icon) {
      margin-left: 10px;
      display: block;
      @include size(css-clamp(32px, 42px));

      @media (max-width: 768px) {
        @include size(css-clamp-vw(20px, 32px, 768));
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
