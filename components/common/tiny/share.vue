<template>
  <a
    href="#"
    class="share flex-center"
    :class="{
      'is-active': textureStore.isShareActive,
      'is-invisible': textureStore.textureIndex == null,
    }"
    @click.prevent="textureStore.toggleShare(!textureStore.isShareActive)"
  >
    <div
      class="share-qr flex-column justify-center align-center"
      :class="{
        'is-visible': textureStore.isShareActive,
      }"
    >
      <div class="qr"></div>
      <p class="qr-text uppercase">გასთორე ინსტაგრამზე</p>
    </div>
    <span class="share-text uppercase">გააზიარე</span>
    <nuxt-icon name="share-icon" class="share-arrow" filled />
  </a>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";

const textureStore = useTextureStore();
</script>

<style lang="scss" scoped>
.share {
  padding: 20px 16px;
  border-radius: 8px;
  background-color: var(--share-hover-bg-color, var(--color-eleonor));
  position: relative;
  color: var(--share-hover-color, var(--color-black));
  opacity: var(--share-opacity, 1);
  border: 2px solid var(--active-border, transparent);
  @include default-transitions(background-color, color, border);
  pointer-events: all;

  &.is-invisible {
    --share-opacity: 0;
    pointer-events: none;
  }

  &:hover {
    --share-hover-bg-color: var(--color-evex-blue);
  }

  &.is-active {
    --share-hover-bg-color: var(--color-evex-blue);
    --share-hover-color: var(--color-white);
    --stroke-hover: var(--color-white);
    --active-border: var(--color-white);
  }

  :deep(.share-arrow) {
    path {
      stroke: var(--stroke-hover, var(--color-black));
      @include default-transitions(stroke);
    }
  }

  .share-text {
    font-size: 18px;
    font-family: var(--font-ping-regular);
    line-height: 1;
    margin-right: 8px;
  }

  .share-qr {
    border-radius: 8px;
    position: absolute;
    width: 400px;
    bottom: 100%;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    margin-bottom: 16px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    pointer-events: all;
    font-family: var(--font-ping-regular);
    color: var(--color-white);

    &.is-visible {
      opacity: 1;
      visibility: visible;
    }

    &.is-hidden {
      display: none;
      pointer-events: none;
    }

    .qr {
      width: 170px;
      height: 170px;
      background-color: var(--color-evex-gray);
      border-radius: 8px;
    }

    .qr-text {
      color: var(--color-white);
      font-size: 16px;
      text-align: center;
      margin-top: 12px;
    }
  }
}
</style>
