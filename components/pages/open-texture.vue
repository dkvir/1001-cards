<template>
  <div
    :class="[
      'open-texture flex-center',
      { 'is-active': textureStore.textureIndex !== null },
    ]"
  >
    <div class="image">
      <img v-if="imageLink" :src="imageLink" alt="image" class="img" />
    </div>
    <div @click="closeTexture" class="close flex-center">
      <nuxt-icon class="exit-icon" name="cross" filled />
    </div>
    <div @click="closeTexture" class="background"></div>
  </div>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";

const textureStore = useTextureStore();
const router = useRouter();
const route = useRoute();
const imageLink = ref(null);

watch(
  () => textureStore.textureIndex,
  (curr) => {
    if (curr !== null) {
      let currId = (curr % 100) + 1;

      imageLink.value = `/images/1001-folders-back/100-back-${textureStore.textureAtlasIndex}/${currId}.webp`;

      router.push({
        path: route.path,
        query: {
          imageId: currId,
          folder: textureStore.textureAtlasIndex,
        },
      });

      useChangeSeo(currId, textureStore.textureAtlasIndex);
    } else {
      router.push({
        path: route.path,
        query: {},
      });
      useChangeSeo();
      setTimeout(() => {
        imageLink.value = null;
      }, 500);
    }
  }
);

const closeTexture = () => {
  textureStore.changeTextureIndex(null);
  textureStore.toggleShare(false);
};
</script>

<style lang="scss" scoped>
.open-texture {
  position: fixed;
  inset: 0;
  width: 100svw;
  height: 100svh;
  opacity: var(--component-opacity, 0);
  pointer-events: none;
  @include default-transitions(opacity);
  z-index: 2;
  &.is-active {
    --component-opacity: 1;
    --background-opacity: 0.82;
    pointer-events: all;
  }
  .image {
    width: 450px;
    height: 630px;
    background-color: var(--color-white);
    border-radius: 15px;

    @media (min-width: 540px) and (max-height: 900px) {
      margin-top: -100px;
      width: 315px;
      height: 441px;
    }

    @media (max-width: 540px) {
      width: css-clamp-vw(287px, 450px, 540);
      height: css-clamp-vw(400px, 630px, 540);
    }

    .img {
      @include size(100%);
      object-fit: cover;
      border-radius: inherit;
    }
  }
  .close {
    position: absolute;
    top: var(--page-offset-padding);
    right: var(--page-offset-padding);
    z-index: 4;
    font-size: 30px;
    cursor: pointer;
    background-color: var(--close-bg, transparent);
    @include size(var(--app-header-height));
    @include default-transitions(background-color);
    border-radius: 8px;

    &:hover {
      --close-bg: var(--color-yellow);
      --icon-stroke: var(--color-black);
    }
    :deep(.exit-icon) {
      @include size(50%);
      display: block;
      svg {
        @include size(100%);
      }
      path {
        @include default-transitions(stroke);

        stroke: var(--icon-stroke, var(--color-white));
      }
    }
  }
  .background {
    position: absolute;
    inset: 0;
    z-index: -1;
    background-color: var(--color-evex-blue);
    opacity: var(--background-opacity, 0);
    @include default-transitions(opacity);
  }
}
</style>
