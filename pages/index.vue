<template>
  <div class="home-page">
    <canvas
      :class="[
        'canvas',
        {
          'has-blur': textureStore.textureIndex !== null,
          'change-cursor': textureStore.changeCursor,
        },
      ]"
    ></canvas>
    <div id="text-input" contenteditable="true"></div>
    <pages-open-texture />
  </div>
</template>

<script setup>
import { useTextureLoaderStore } from "@/store/texturesLoaded";
import { useTextureStore } from "@/store/texture";

const textureStore = useTextureStore();
const textureLoadStore = useTextureLoaderStore();
const horizontalScroll = ref(null);

watch(
  () => textureLoadStore.isLoaded,
  (curr) => {
    horizontalScroll.value = new useCardsGallery({
      canvas: document.querySelector(".canvas"),
    });
  }
);
watch(
  () => textureLoadStore.loaderComplete,
  (curr) => {
    horizontalScroll.value.zoomToPoint();
  }
);

onMounted(() => {
  const atlasUrls = ["/images/atlas-120.webp"];

  textureLoadStore.preloadTexture(atlasUrls[0]);
});

function getRandomAtlas(arr) {
  arr[Math.floor(Math.random() * arr.length)];
}
</script>

<style lang="scss" scoped>
.home-page {
  width: 100vw;
  height: 100vh;

  .canvas {
    width: 100%;
    height: 100%;
    cursor: grab;

    &.has-blur {
      filter: blur(8px);
    }
    &.change-cursor {
      cursor: pointer;
    }
  }

  #text-input {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    font-family: var(--font-evexweb-regular);
  }
}
</style>
