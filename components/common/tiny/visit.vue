<template>
  <div
    :class="[
      'visit flex-center',
      { 'is-invisible': textureStore.textureIndex == null },
    ]"
  >
    <a href="#" target="_blank" class="visit-link flex">
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
  margin-left: auto;
  pointer-events: all;

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
  }

  .visit-link {
    font-size: 20px;
    font-family: var(--font-ping-regular);
    background-color: var(--visit-inside-bg, var(--color-white));
    color: var(--color-black);
    border-radius: 8px;
    padding: 14px 21px;
    @include default-transitions(background-color);
    cursor: pointer;

    &:hover {
      --arrow-static-transform: -100%;
      --arrow-animated-transform: 0;
      --visit-inside-bg: var(--color-yellow);
    }
  }

  .visit-text {
    padding: 0 16px;
    font-size: 20px;
    font-family: var(--font-ping-regular);
    color: var(--color-white);
  }

  .arrow-wrapper {
    --arrow-wrapper-size: 24px;
    margin-left: 5px;

    position: relative;
    overflow: hidden;
    @include size(var(--arrow-wrapper-size));
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
