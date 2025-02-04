<template>
  <div class="about-page">
    <canvas class="canvas"></canvas>
    <div id="text-input" contenteditable="true" autofocus></div>
    <pages-open-texture />
  </div>
</template>

<script setup>
import { useTextureLoaderStore } from "@/store/texturesLoaded";
const textureStore = useTextureLoaderStore();
const horizontalScroll = ref(null);

watch(
  () => textureStore.isLoaded,
  (curr) => {
    horizontalScroll.value = new useCardsGallery({
      canvas: document.querySelector(".canvas"),
    });
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

  textureStore.preloadTexture(getRandomImage());
});
</script>

<style lang="scss" scoped>
.about-page {
  width: 100vw;
  height: 100vh;

  .canvas {
    width: 100%;
    height: 100%;
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
