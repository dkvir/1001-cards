<template>
  <a
    href="https://www.facebook.com/share/v/19yjYHsM37/?mibextid=wwXIfr"
    target="_blank"
    class="see-video flex-center"
  >
    <nuxt-icon name="play-button" class="play-button" filled />
    <div class="play-video-text uppercase">ნახე ვიდეო</div>
  </a>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";
import { useTextureLoaderStore } from "@/store/texturesLoaded";

const textureStore = useTextureStore();
const textureloadedStore = useTextureLoaderStore();
</script>

<style lang="scss" scoped>
.see-video {
  position: relative;
  height: var(--app-header-height);
  padding: 0 12px;
  text-decoration: none;
  border-radius: 8px;
  pointer-events: all;

  &:hover {
    --play-button-stroke: var(--color-white);
    --after-bg: var(--color-evex-blue);
    --text-color: var(--color-white);
  }

  &::before {
    content: "";
    position: absolute;
    border-radius: inherit;
    background: rgba(124, 124, 124, 0.3);
    inset: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    backdrop-filter: blur(8px);
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    border-radius: 4px;
    transform: translate3d(-50%, -50%, 0);
    opacity: 0.8;
    background-color: var(--after-bg, var(--color-eleonor));
    @include size(calc(100% - 6px));
    @include default-transitions(background-color);
  }

  .play-video-text {
    margin-left: 10px;
    line-height: 1;
    font-size: css-clamp-vw(11px, 20px);
    font-family: var(--font-ping-regular);
    white-space: nowrap;
    color: var(--text-color, var(--color-evex-green));
    @include default-transitions(color);
    @include mq(max-width 540px) {
      display: none;
      margin-left: 0px;
    }
  }

  :deep(.play-button) {
    display: block;
    @include size(css-clamp(20px, 24px));

    @media (max-width: 768px) {
      @include size(css-clamp-vw(16px, 20px, 768));
    }

    svg {
      @include size(100%);
      path {
        fill: var(--play-button-stroke, var(--color-evex-green));
        @include default-transitions(fill);
      }
    }
  }
}
</style>
