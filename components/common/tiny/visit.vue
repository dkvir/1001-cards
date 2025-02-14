<template>
  <div
    :class="[
      'visit flex-center',
      { 'is-invisible': textureStore.textureIndex == null },
    ]"
  >
    <a
      href="https://evex.ge/ka/booking"
      target="_blank"
      class="visit-link flex"
    >
      <span class="uppercase">დაჯავშნე</span>
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

const textureStore = useTextureStore();
</script>

<style lang="scss" scoped>
.visit {
  position: relative;
  border-radius: 8px;
  color: var(--visit-color, var(--color-white));
  padding: 5px;
  pointer-events: all;

  @media (max-width: 1024px) {
    opacity: var(--visit-opacity, 0);
    pointer-events: none;
    padding: 3px;
    @include default-transitions(opacity);
  }

  @media (max-width: 600px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    position: relative;
    left: 0;
    display: flex;
    justify-content: space-between;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--visit-bg, var(--color-white));
    opacity: 0.3;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    z-index: -1;
  }

  &.is-invisible {
    --visit-color: var(--color-evex-gray);
    --visit-bg: var(--color-evex-gray);

    @media (max-width: 1024px) {
      pointer-events: all;
      --visit-opacity: 1;
    }
  }

  .visit-link {
    font-size: css-clamp(16px, 20px);
    font-family: var(--font-ping-regular);
    background-color: var(--visit-inside-bg, var(--color-white));
    color: var(--color-black);
    border-radius: 8px;
    padding: 14px 21px;
    @include default-transitions(background-color);
    cursor: pointer;

    @media (max-width: 1024px) {
      font-size: css-clamp-vw(13px, 16px, 1024);
    }

    &:hover {
      --arrow-static-transform: -100%;
      --arrow-animated-transform: 0;
      --visit-inside-bg: var(--color-yellow);
    }
  }

  .visit-text {
    padding: 0 16px;
    font-size: css-clamp(16px, 20px);
    font-family: var(--font-ping-regular);
    color: var(--color-white);

    @media (max-width: 1024px) {
      font-size: css-clamp-vw(13px, 16px, 1024);
    }

    @media (max-width: 540px) {
      font-size: css-clamp-vw(12px, 11px, 540);
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
