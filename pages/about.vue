<template>
  <div class="about-page">
    <canvas
      :class="['canvas', { 'has-blur': textureStore.textureIndex !== null }]"
    ></canvas>
    <div id="text-input" contenteditable="true" autofocus></div>
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
  const imageUrls = [
    "/images/five/atlas_1.png",
    "/images/five/atlas_2.png",
    "/images/five/atlas_1.png",
    "/images/five/atlas_4.png",
  ];

  const getRandomImage = () =>
    imageUrls[Math.floor(Math.random() * imageUrls.length)];

  textureLoadStore.preloadTexture(imageUrls[0]);
});
</script>

<style lang="scss" scoped>
.about-page {
  width: 100vw;
  height: 100vh;

  .canvas {
    width: 100%;
    height: 100%;
    cursor: grab;

    &.has-blur {
      filter: blur(8px);
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
