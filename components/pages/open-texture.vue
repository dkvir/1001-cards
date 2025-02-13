<template>
  <div
    :class="[
      'open-texture flex-center',
      { 'is-active': textureStore.textureIndex !== null },
    ]"
  >
    <div class="image">
      <img v-if="imageLink" :src="imageLink" alt="image" class="img" />
    </div>
    <div @click="closeTexture" class="close flex-center">
      <nuxt-icon class="exit-icon" name="cross" filled />
    </div>
    <div @click="closeTexture" class="background"></div>
  </div>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";

const textureStore = useTextureStore();
const router = useRouter();
const route = useRoute();
const imageLink = ref(null);
const config = useRuntimeConfig();

const siteUrl =
  config.public.siteUrl ?? "https://horizontal-slider-chi.vercel.app";

console.log(siteUrl);

watch(
  () => textureStore.textureIndex,
  (curr) => {
    if (curr) {
      let currId = (curr % 120) + 1;

      imageLink.value = `/images/1001-back-120/${currId}.webp`;

      router.push({
        path: route.path,
        query: {
          imageId: currId,
        },
      });

      changeSeo(currId);
    } else {
      router.push({
        path: route.path,
        query: {},
      });
      changeSeo();
      setTimeout(() => {
        imageLink.value = null;
      }, 500);
    }
  }
);

const closeTexture = () => {
  textureStore.changeTextureIndex(null);
  textureStore.toggleShare(false);
};

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
            ? siteUrl + `/images/1001-back-120/${imageId}.webp`
            : siteUrl + "/images/share-image.png";
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
            ? `/images/1001-back-120/${imageId}.webp`
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
</script>

<style lang="scss" scoped>
.open-texture {
  position: fixed;
  inset: 0;
  width: 100svw;
  height: 100svh;
  opacity: var(--component-opacity, 0);
  pointer-events: none;
  @include default-transitions(opacity);
  z-index: 2;
  &.is-active {
    --component-opacity: 1;
    --background-opacity: 0.82;
    pointer-events: all;
  }
  .image {
    width: 450px;
    height: 630px;
    background-color: var(--color-white);
    border-radius: 15px;

    @media (max-width: 540px) {
      width: css-clamp-vw(287px, 450px, 540);
      height: css-clamp-vw(400px, 630px, 540);
    }

    .img {
      @include size(100%);
      object-fit: cover;
      border-radius: inherit;
    }
  }
  .close {
    position: absolute;
    top: var(--page-offset-padding);
    right: var(--page-offset-padding);
    z-index: 4;
    font-size: 30px;
    cursor: pointer;
    background-color: var(--close-bg, transparent);
    @include size(55px);
    @include default-transitions(background-color);
    border-radius: 8px;

    @media (max-width: 768px) {
      @include size(css-clamp-vw(32px, 55px, 768));
      top: calc(var(--page-offset-padding) + var(--page-offset-padding) / 2);
    }

    &:hover {
      //u i i a i u u i i i a i
      --close-bg: var(--color-yellow);
      --icon-stroke: var(--color-black);
    }
    :deep(.exit-icon) {
      @include size(50%);
      display: block;
      path {
        @include default-transitions(stroke);

        stroke: var(--icon-stroke, var(--color-white));
      }
    }
  }
  .background {
    position: absolute;
    inset: 0;
    z-index: -1;
    background-color: var(--color-evex-blue);
    opacity: var(--background-opacity, 0);
    @include default-transitions(opacity);
  }
}
</style>
