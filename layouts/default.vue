<template>
  <div class="default-layout">
    <common-header />
    <slot />
    <common-footer />
    <!-- <common-loader /> -->
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute();

useHead({
  titleTemplate: "ევექსი",
  meta: [
    {
      name: "description",
      content: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
    },
  ],
});

useServerSeoMeta({
  ogImage: "/images/share-image.png",
  ogTitle: "ევექსი",
  description: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
  ogDescription: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
  ogUrl: config.public.siteUrl + route.fullPath,
  ogImage: "https://horizontal-slider-chi.vercel.app/images/share-image.png",
  twitterCard: "summary_large_image",
  twitterSite: config.public.siteUrl + route.fullPath,
  twitterTitle: "ევექსი",
  twitterDescription: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
  twitterImage: "/images/share-image.png",
});
</script>

<style lang="scss" scoped></style>
