<template>
  <div
    :class="[
      'reasons',
      {
        'is-loaded': textureloadedStore.loaderComplete,
      },
    ]"
  >
    <nuxt-icon name="1001-reasons" class="reasons-icon flex-center" filled />
    <ul class="list">
      <li
        v-for="(item, index) in use1001Copy()"
        :key="index"
        @click="changeReasonIndex(index)"
        class="item"
      >
        <pages-tiny-reason-item :item="item" :index="index" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { usePageLink } from "@/store/page-link";
import { useTextureStore } from "@/store/texture";
import { useTextureLoaderStore } from "@/store/texturesLoaded";

const textureloadedStore = useTextureLoaderStore();
const textureStore = useTextureStore();
const pageLink = usePageLink();

watch(
  () => pageLink.loading,
  (curr, prev) => {
    if (!curr) {
      gsapTransforms();
    }
  }
);

watch(
  () => textureloadedStore.loaderComplete,
  (curr) => {
    gsapTransforms();
  }
);

onMounted(() => {
  gsap.set(".first-ten-reason", {
    yPercent: 100,
  });

  gsap.set(".reasons .reasons-icon", {
    opacity: 0,
  });

  setTimeout(() => {
    pageLink.changePageLoading(false);
    pageLink.changePointerEvents(false);
  }, 500);
});

function gsapTransforms() {
  gsap.to(".reasons .reasons-icon", {
    opacity: 1,
    duration: 0.6,
    delay: 0.3,
    ease: "power2.in",
  });
  gsap.to(".first-ten-reason", {
    yPercent: 0,
    duration: 1,
    delay: 0.5,
    stagger: 0.1,
    ease: "power3.out",
  });
}

const changeReasonIndex = (index) => {
  textureStore.changeReasonIndex(index + 1);
};
</script>

<style lang="scss" scoped>
.reasons {
  padding: var(--page-offset-padding);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  &.is-loaded {
    height: 100vh;
    overflow: auto;
  }
  :deep(.reasons-icon) {
    padding-top: calc(var(--app-header-height) + 30px);
    svg {
      height: 300px;
      width: auto;
    }
  }
  .list {
    padding: 60px 0;
  }

  .item {
    border-bottom: 1px solid var(--color-border);
    cursor: pointer;
    overflow: hidden;
    &:hover {
      --arrow-bg: var(--color-evex-green);
      --stroke-color: var(--color-white);
    }
  }
}
</style>
