<template>
  <div
    :class="[
      'reasons',
      {
        'is-loaded': textureloadedStore.loaderComplete,
      },
    ]"
    @mousemove="(event) => handleMouseMove(event)"
  >
    <nuxt-icon name="1001-reasons" class="reasons-icon flex-center" filled />
    <ul class="list">
      <li
        v-for="(item, index) in searchStore.getReasons"
        :key="index"
        @click="changeReasonIndex(index)"
        @mouseenter="(event) => handleMouseEnter(index, event)"
        @mouseleave="(event) => handleMouseLeave(event)"
        class="item"
      >
        <pages-tiny-reason-item :item="item" :index="index" />
      </li>
    </ul>
    <div
      :class="['hover-image', { 'hover-image-visible': hoveredImageLink }]"
      :style="`--transform-x: calc(${cursorPosition.x}px + 20%); --transform-y: calc(${cursorPosition.y}px - 70%)`"
    >
      <img :src="hoveredImageLink" />
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { usePageLink } from "@/store/page-link";
import { useTextureStore } from "@/store/texture";
import { useTextureLoaderStore } from "@/store/texturesLoaded";
import { useSearchStore } from "~/store/search";

const searchStore = useSearchStore();
const textureloadedStore = useTextureLoaderStore();
const textureStore = useTextureStore();
const pageLink = usePageLink();
const reasonsArray = use1001Copy();

const hoveredItemIndex = ref(null);
const hoveredImageLink = ref(null);
const cursorPosition = ref({ x: 0, y: 0 });

const handleMouseMove = (event) => {
  gsap.to(cursorPosition.value, {
    x: event.clientX - window.innerWidth / 2,
    y: event.clientY - window.innerHeight / 2,
  });
};

const handleMouseEnter = (index, e) => {
  hoveredItemIndex.value = index;
  hoveredImageLink.value = reasonsArray[index]?.image;
  useReasonsHover.mouseEnter(e);
};

const handleMouseLeave = (e) => {
  hoveredItemIndex.value = null;
  hoveredImageLink.value = null;
  useReasonsHover.mouseLeave(e);
};

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
  padding: var(--page-offset-padding) 0;
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
      @include mq(max-width 768px) {
        height: css-clamp-vw(128px, 300px, 768);
      }
    }
  }
  .list {
    padding: 60px 0;

    @include mq(max-width 500px) {
      padding-top: css-clamp-vw(30px, 60px, 500);
    }
  }

  .item {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      @include size(100%);
      background-color: var(--color-yellow);
      transform: translate3d(
        0,
        var(--item-link-transform-end, var(--item-link-transform-start, -105%)),
        0
      );
      transition: transform 0.25s ease;
      transition-delay: 0ms;
    }
    &:hover {
      --arrow-bg: var(--color-evex-green);
      --stroke-color: var(--color-white);
    }
  }

  .hover-image {
    position: fixed;
    top: 50%;
    left: 50%;
    pointer-events: none;
    z-index: 100;
    opacity: var(--image-opacity, 0);
    width: css-clamp(262px, 375px);
    height: css-clamp(367px, 525px);
    border-radius: 12px;
    overflow: hidden;
    transform: translate3d(
      var(--transform-x, -50%),
      var(--transform-y, -50%),
      0
    );
    @include default-transitions(opacity);

    &.hover-image-visible {
      --image-opacity: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
