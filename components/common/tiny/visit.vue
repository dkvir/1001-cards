<template>
  <div
    :class="[
      'visit flex-center',
      {
        'is-invisible':
          textureStore.textureIndex !== null ||
          textureloadedStore.mountedTexture !== null ||
          textureStore.reasonIndex !== null,
        'transform-visit': transformVisit,
      },
    ]"
  >
    <a
      href="https://evex.ge/ka/booking"
      target="_blank"
      class="visit-link flex-center"
    >
      <span class="uppercase desktop-span">დაჯავშნე</span>
      <span class="uppercase mobile-span">ვიზიტი ექიმთან</span>
      <div class="arrow-wrapper flex-center">
        <nuxt-icon class="arrow visit-arrow-static" name="visit-arrow" filled />
        <nuxt-icon
          class="arrow visit-arrow-animated"
          name="visit-arrow"
          filled
        />
      </div>
    </a>
    <div class="visit-text uppercase">ვიზიტი ექიმთან</div>
  </div>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";
import { useTextureLoaderStore } from "@/store/texturesLoaded";

const props = defineProps({
  transformVisit: {
    type: Boolean,
  },
});

const textureStore = useTextureStore();
const textureloadedStore = useTextureLoaderStore();

const isMobile = ref(null);

const checkViewportSize = () => {
  isMobile.value = window.innerWidth <= 600;
};

onMounted(() => {
  checkViewportSize();
  window.addEventListener("resize", checkViewportSize);
});
</script>

<style lang="scss" scoped>
.visit {
  position: relative;
  border-radius: 8px;
  color: var(--visit-color, var(--color-white));
  padding: 5px;
  pointer-events: all;
  height: var(--app-header-height);
  transform: translate3d(0, var(--visit-transform-y, 0), 0);
  transition: transform 0.35s ease-in-out,
    opacity 0.35s cubic-bezier(0.33, 1, 0.68, 1);

  @include mq(max-width 500px) {
    position: absolute;
    left: var(--page-offset-padding);
    bottom: 0;
  }

  @media (max-width: 768px) {
    justify-content: space-between;
    border-radius: 4px;
    padding: 3px;
  }

  &.transform-visit {
    --visit-transform-y: calc(-100% - 8px);
  }

  &.is-invisible {
    --visit-color: var(--color-evex-gray);
    --visit-bg: var(--color-evex-gray);

    @media (max-width: 600px) {
      opacity: var(--visit-opacity, 0);
      pointer-events: none;
    }
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

  .visit-link {
    position: relative;
    font-size: css-clamp(16px, 20px);
    font-family: var(--font-ping-regular);
    color: var(--color-black);
    border-radius: 8px;
    padding: 0 css-clamp(14px, 20px);
    height: 100%;
    cursor: pointer;

    .desktop-span {
      @media (max-width: 768px) {
        display: none;
      }
    }
    .mobile-span {
      @media (min-width: 769px) {
        display: none;
      }
    }

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      background-color: var(--visit-inside-bg, var(--color-white));
      border-radius: inherit;
      opacity: 0.8;
      @include default-transitions(background-color);
    }

    @media (max-width: 1024px) {
      font-size: css-clamp-vw(14px, 16px, 1024);
    }

    @media (max-width: 768px) {
      border-radius: 2px;
      padding: 0 css-clamp(5px, 14px);
    }

    &:hover {
      --arrow-static-transform: -100%;
      --arrow-animated-transform: 0;
      --visit-inside-bg: var(--color-yellow);
    }
  }

  .visit-text {
    padding: 0 css-clamp(10px, 16px) 0 css-clamp(13px, 16px);
    font-size: css-clamp(16px, 20px);
    font-family: var(--font-ping-regular);
    color: var(--color-white);

    @media (max-width: 1024px) {
      font-size: css-clamp-vw(14px, 16px, 1024);
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .arrow-wrapper {
    --arrow-wrapper-size: 24px;
    margin-left: 5px;
    --arrow-wrapper-size: #{css-clamp-vw(18px, 24px)};

    position: relative;
    overflow: hidden;
    @include size(var(--arrow-wrapper-size));

    @media (max-width: 1024px) {
      --arrow-wrapper-size: #{css-clamp-vw(13px, 18px, 1024)};
    }

    @media (max-width: 540px) {
      --arrow-wrapper-size: #{css-clamp-vw(16px, 24px, 540)};
    }
  }

  .arrow {
    position: absolute;
    left: 0;
    top: 0;
    @include size(var(--arrow-wrapper-size));
    @include default-transitions(transform);
  }

  .visit-arrow-static {
    transform: translate3d(
      calc(var(--arrow-static-transform, 0) * -1),
      var(--arrow-static-transform, 0),
      0
    );
  }

  .visit-arrow-animated {
    transform: translate3d(
      var(--arrow-animated-transform, -100%),
      var(--arrow-animated-transform, 100%),
      0
    );
  }
}
</style>
