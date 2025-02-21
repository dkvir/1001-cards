<template>
  <div class="default-layout">
    <common-header />
    <slot />
    <common-footer />
    <common-loader />
    <common-tiny-drag-navigator />
  </div>
</template>

<script setup>
const route = useRoute();

onMounted(() => {
  setTimeout(() => {
    if (route?.query?.imageId) {
      useChangeSeo(route.query.imageId);
    } else {
      useChangeSeo();
    }
  }, 500);
});
</script>

<style lang="scss" scoped></style>
