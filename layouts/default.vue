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

if (route?.query?.imageId) {
  const currId = Number(route.query.imageId) + Number(route.query.folder) * 100;
  console.log(currId);
  useChangeSeo(currId);
} else {
  useChangeSeo();
}
</script>

<style lang="scss" scoped></style>
