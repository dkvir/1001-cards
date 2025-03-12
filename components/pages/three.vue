<template>
  <div :class="['three', { 'is-paused': rendererPaused }]">
    <canvas
      :class="[
        'canvas',
        {
          'has-blur':
            textureStore.textureIndex !== null ||
            textureLoadStore.mountedTexture !== null,
          'change-cursor': textureStore.changeCursor,
        },
      ]"
    ></canvas>
    <div id="text-input" contenteditable="true"></div>
  </div>
</template>

<script setup>
import { useTextureLoaderStore } from "@/store/texturesLoaded";
import { useTextureStore } from "@/store/texture";
import { usePageLink } from "@/store/page-link";

const textureLoadStore = useTextureLoaderStore();
const textureStore = useTextureStore();
const route = useRoute();
const pageLink = usePageLink();
const horizontalScroll = ref(null);
const rendererPaused = ref(null);

watch(
  () => textureLoadStore.isLoaded,
  (curr) => {
    rendererPaused.value = route.path !== "/";
    horizontalScroll.value = new useCardsGallery({
      canvas: document.querySelector(".canvas"),
      pauseRenderer: rendererPaused.value,
    });
  }
);

watch(
  () => textureLoadStore.loaderComplete,
  (curr) => {
    if (route.path == "/") horizontalScroll.value.zoomToPoint();
  }
);

watch(
  () => route.path,
  (curr) => {
    rendererPaused.value = curr !== "/";
    horizontalScroll.value.options.pauseRenderer = rendererPaused.value;
  }
);

watch(
  () => pageLink.currentPage,
  (curr, prev) => {
    if (route.path == "/" && curr == "/reasons") {
      horizontalScroll.value.zoomOut();
    }
  }
);

watch(
  () => pageLink.loading,
  (curr, prev) => {
    if (!curr && route.path == "/") horizontalScroll.value.zoomToPoint();
  }
);

const atlasUrls = [
  "/images/atlases/atlas-1.webp",
  "/images/atlases/atlas-2.webp",
  "/images/atlases/atlas-3.webp",
  "/images/atlases/atlas-4.webp",
  "/images/atlases/atlas-5.webp",
  "/images/atlases/atlas-6.webp",
  "/images/atlases/atlas-7.webp",
  "/images/atlases/atlas-8.webp",
  "/images/atlases/atlas-9.webp",
  "/images/atlases/atlas-10.webp",
];

onBeforeMount(() => {
  const ramdonAtlas = getRandomAtlas(atlasUrls);
  textureLoadStore.preloadTexture(ramdonAtlas);
});

function getRandomAtlas(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  textureStore.changeTextureAtlasIndex(randomIndex + 1);

  return arr[randomIndex];
}
</script>

<style lang="scss" scoped>
.three {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  &.is-paused {
    opacity: 0;
    pointer-events: none;
  }

  .canvas {
    width: 100%;
    height: 100%;
    cursor: grab;

    &.has-blur {
      filter: blur(8px);
    }
    &.change-cursor {
      cursor: pointer;
    }
  }

  #text-input {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    font-family: var(--font-evexweb-regular);
  }
}
</style>
