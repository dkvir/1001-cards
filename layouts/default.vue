<template>
  <div class="default-layout">
    <common-header />
    <slot />
    <common-footer />
    <!-- <common-loader /> -->
  </div>
</template>

<script setup>
const route = useRoute();

if (route?.query?.imageId) {
  useChangeSeo(route.query.imageId);
} else {
  useChangeSeo();
}
</script>

<style lang="scss" scoped></style>
