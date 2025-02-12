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

console.log(route.query);

const changeSeo = (imageId) => {
  useHead({
    titleTemplate: () => {
      return imageId ? `მიზეზი ${imageId}` : "ევექსი";
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
          return config.public.siteUrl + route.fullPath;
        },
      },
      {
        name: "og:image",
        content: () => {
          return imageId
            ? config.public.siteUrl + `/images/1001-back/${imageId}.png`
            : config.public.siteUrl + "images/share-image.png";
        },
      },
      { name: "og:image:alt", content: "თავს მოუარე!" }, // Optionally, add an alt tag for accessibility
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
            ? `/images/1001-back/${imageId}.png`
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

// useHead({
//   titleTemplate: "ევექსი",
//   meta: [
//     { name: "og:title", content: "ევექსი" },
//     {
//       name: "og:description",
//       content: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
//     },
//     { name: "og:url", content: config.public.siteUrl + route.fullPath },
//     {
//       name: "og:image",
//       content: config.public.siteUrl + "images/share-image.png",
//     },
//     { name: "og:image:alt", content: "თავს მოუარე!" }, // Optionally, add an alt tag for accessibility
//     { name: "twitter:card", content: "summary_large_image" },
//     { name: "twitter:title", content: "ევექსი" },
//     {
//       name: "twitter:description",
//       content: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
//     },
//     { name: "twitter:image", content: "/images/share-image.png" },
//     {
//       name: "description",
//       content: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
//     },
//   ],
// });

// useSeoMeta({
//   ogImage: "/images/share-image.png",
//   ogTitle: "ევექსი",
//   description: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
//   ogDescription: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
//   ogUrl: config.public.siteUrl + route.fullPath,
//   ogImage: config.public.siteUrl + "images/share-image.png",
//   twitterCard: "summary_large_image",
//   twitterSite: config.public.siteUrl + route.fullPath,
//   twitterTitle: "ევექსი",
//   twitterDescription: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
//   twitterImage: "/images/share-image.png",
// });
</script>

<style lang="scss" scoped></style>
