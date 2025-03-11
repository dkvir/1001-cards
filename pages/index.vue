<template>
  <div class="home-page">
    <pages-open-texture />
  </div>
</template>

<script setup>
import { usePageLink } from "@/store/page-link";

const pageLink = usePageLink();

onMounted(() => {
  setTimeout(() => {
    pageLink.changePageLoading(false);
  }, 1500);
});
</script>

<style lang="scss" scoped>
.home-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(53.06% 50% at 50% 50%, #f9f9f9 0%, #c5c5c5 100%);
}
</style>
