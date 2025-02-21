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
const config = useRuntimeConfig();

if (route?.query?.imageId) {
  // useChangeSeo(route.query.imageId, route.query.folder);

  useServerSeoMeta({
    ogImage: `/images/1001-folders-back/100-back-${route.query.folder}/${route.query.imageId}.webp`,
    ogTitle: "ევექსი ",
    description: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
    ogDescription: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
    ogUrl: config.public.siteUrl + route.fullPath,
    ogImage:
      config.public.siteUrl +
      `/images/1001-folders-back/100-back-${route.query.folder}/${route.query.imageId}.webp`,
    twitterCard: "summary_large_image",
    twitterSite: config.public.siteUrl + route.fullPath,
    twitterTitle: "ევექსი",
    twitterDescription: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
    twitterImage: `/images/1001-folders-back/100-back-${route.query.folder}/${route.query.imageId}.webp`,
  });
} else {
  useChangeSeo();
}
</script>

<style lang="scss" scoped></style>
