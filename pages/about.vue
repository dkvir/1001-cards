<template>
  <div class="about-page">
    <canvas class="canvas"></canvas>
    <div id="text-input" contenteditable="true" autofocus></div>
    <pages-open-texture />
  </div>
</template>

<script setup>
import { useImageStore } from "@/store/imagesLoaded";
const imageStore = useImageStore();
const horizontalScroll = ref(null);

// watch(
//   () => imageStore.isLoaded,
//   (curr) => {
//     horizontalScroll.value = new useCardsGallery({
//       canvas: document.querySelector(".canvas"),
//     });
//   }
// );

onMounted(() => {
  // const imageUrls = [];

  // for (let i = 0; i < imageStore.totalImages; i++) {
  //   imageUrls.push(`https://d3l19dpo35tmza.cloudfront.net/${i + 1}.png`);
  // }

  // imageStore.preloadImages(imageUrls);

  horizontalScroll.value = new useCardsGallery({
    canvas: document.querySelector(".canvas"),
  });
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
