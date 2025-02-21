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
  const atlasUrls = [
    "/images/atlases/atlas-1.webp",
    "/images/atlases/atlas-2.webp",
    "/images/atlases/atlas-3.webp",
    "/images/atlases/atlas-4.webp",
    "/images/atlases/atlas-5.webp",
    "/images/atlases/atlas-6.webp",
    "/images/atlases/atlas-7.webp",
    "/images/atlases/atlas-8.webp",
    "/images/atlases/atlas-9.webp",
    "/images/atlases/atlas-10.webp",
  ];

  const ramdonAtlas = getRandomAtlas(atlasUrls);

  textureLoadStore.preloadTexture(ramdonAtlas);
});

function getRandomAtlas(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  textureStore.changeTextureAtlasIndex(randomIndex + 1);

  return arr[randomIndex];
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
