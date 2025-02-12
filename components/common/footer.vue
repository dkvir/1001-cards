<template>
  <div
    ref="target"
    :class="[
      'footer flex-center',
      { 'is-invisible': textureStore.textureIndex == null },
    ]"
  >
    <nuxt-icon class="take-care" name="take-care" filled />
    <a
      href="#"
      class="share flex-center"
      :class="{ 'is-active': textureStore.isShareActive }"
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
    <div class="visit flex-center">
      <a href="#" target="_blank" class="visit-link flex">
        <span class="uppercase">დაჯავშნე</span>
        <div class="arrow-wrapper flex-center">
          <nuxt-icon
            class="arrow visit-arrow-static"
            name="visit-arrow"
            filled
          />
          <nuxt-icon
            class="arrow visit-arrow-animated"
            name="visit-arrow"
            filled
          />
        </div>
      </a>
      <div class="visit-text uppercase">ვიზიტი ექიმთან</div>
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

    @include parent-state(".is-invisible") {
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

    @include parent-state(".is-invisible") {
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
}
</style>
