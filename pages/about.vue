<template>
  <div class="about-page"></div>
</template>

<script setup>
import { useImageStore } from "@/store/imagesLoaded";
const imageStore = useImageStore();

watch(
  () => imageStore.isLoaded,
  (curr) => {
    console.log(imageStore.loadedImages);
  }
);

onMounted(() => {
  const imageUrls = [];

  for (let i = 0; i < imageStore.totalImages; i++) {
    imageUrls.push(`https://d3l19dpo35tmza.cloudfront.net/${i + 1}.png`);
  }

  imageStore.preloadImages(imageUrls);
});
</script>

<style lang="scss" scoped></style>
