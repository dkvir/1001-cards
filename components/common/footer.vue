<template>
  <div
    :class="[
      'footer flex-center',
      { 'is-invisible': textureStore.textureIndex == null },
    ]"
  >
    <nuxt-icon class="take-care" name="take-care" filled />
    <a href="#" target="_blank" class="share flex-center">
      <span class="share-text uppercase">გააზიარე</span>
      <nuxt-icon name="share-icon" filled />
    </a>
    <div class="visit flex-center">
      <div class="visit-inside flex-center">
        <a href="#" target="_blank" class="visit-link">
          <span class="uppercase">დაჯავშნე</span>
        </a>
        <nuxt-icon name="visit-arrow" filled />
      </div>
      <div class="visit-text">ვიზიტი ექიმთან</div>
    </div>
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

  .take-care {
    position: relative;
    margin-right: 553px;
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

  .share {
    padding: 20px 16px;
    border-radius: 8px;
    background-color: var(--color-eleonor);
    color: var(--color-black);
    opacity: var(--share-opacity, 1);

    @include parent-state(".is-invisible") {
      --share-opacity: 0;
    }
    .share-text {
      font-size: 18px;
      font-family: var(--font-ping-regular);
      line-height: 1;
      margin-right: 8px;
    }
  }

  .visit {
    position: relative;
    border-radius: 8px;
    color: var(--visit-color, var(--color-white));
    padding: 5px;
    margin-left: auto;

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

    @include parent-state(".is-invisible") {
      --visit-color: var(--color-evex-gray);
      --visit-bg: var(--color-evex-gray);
    }

    .visit-inside {
      opacity: 1;
      background-color: var(--color-white);
      color: var(--color-black);
      border-radius: 8px;
      padding: 14px 21px;
    }
    .visit-link {
      margin-right: 5px;
      color: var(--color-black);
      font-size: 20px;
      font-family: var(--font-ping-regular);
    }
    .visit-text {
      padding: 0 16px;
      font-size: 20px;
      font-family: var(--font-ping-regular);
      color: var(--color-white);
    }
  }
}
</style>
