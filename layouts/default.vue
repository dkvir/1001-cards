<template>
  <div class="default-layout">
    <common-header />
    <slot />
    <common-footer />
    <common-loader />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const route = useRoute();
const siteUrl =
  config.public.siteUrl ?? "https://horizontal-slider-chi.vercel.app";

const changeSeo = (imageId) => {
  useHead({
    titleTemplate: () => {
      return "ევექსი - 1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.";
    },
    meta: [
      { name: "og:title", content: "ევექსი" },
      {
        name: "og:description",
        content: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
      },
      {
        name: "og:url",
        content: () => {
          return siteUrl + route.fullPath;
        },
      },
      {
        name: "og:image",
        content: () => {
          return imageId
            ? siteUrl + `/images/1001-back/${imageId}.webp`
            : siteUrl + "/images/share-image.png";
        },
      },
      { name: "og:image:alt", content: "თავს მოუარე!" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ევექსი" },
      {
        name: "twitter:description",
        content: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
      },
      {
        name: "twitter:image",
        content: () => {
          return imageId
            ? `/images/1001-back/${imageId}.webp`
            : "/images/share-image.png";
        },
      },
      {
        name: "description",
        content: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
      },
    ],
  });
};

if (route?.query?.imageId) {
  changeSeo(route.query.imageId);
} else {
  changeSeo();
}
</script>

<style lang="scss" scoped></style>
