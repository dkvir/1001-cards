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

if (route?.query?.imageLink) {
  useChangeSeo(route?.query?.imageLink);
} else {
  useChangeSeo();
}
</script>

<style lang="scss" scoped></style>
