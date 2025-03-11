<template>
  <div
    :class="['page-transition flex-center', { 'is-active': pageLink.loading }]"
  >
    <nuxt-icon name="1001-reasons" class="reasons-icon flex-center" filled />
  </div>
</template>

<script setup>
import { usePageLink } from "@/store/page-link";
import gsap from "gsap";

const pageLink = usePageLink();
const router = useRouter();

watch(
  () => pageLink.loading,
  (curr, prev) => {
    if (curr) {
      gsap.fromTo(
        ".page-transition",
        {
          "--clip-path-top": "100%",
        },
        {
          "--clip-path-top": "0%",
          onComplete: () => {
            router.push(pageLink.currentPage);
          },
        }
      );
    } else {
      gsap.fromTo(
        ".page-transition",
        {
          "--clip-path-bottom": "100%",
        },
        {
          "--clip-path-bottom": "0%",
          onComplete: () => {
            gsap.to(".page-transition", {
              clearProps: "all",
            });
          },
        }
      );
    }
  }
);
</script>

<style lang="scss" scoped>
.page-transition {
  position: fixed;
  inset: 0;
  z-index: 5;
  width: 100svw;
  height: 100dvh;
  pointer-events: none;
  background-color: var(--color-evex-blue);
  clip-path: polygon(
    0% var(--clip-path-top, 100%),
    100% var(--clip-path-top, 100%),
    100% var(--clip-path-bottom, 100%),
    0 var(--clip-path-bottom, 100%)
  );

  &.is-active {
    pointer-events: all;
  }
  :deep(.reasons-icon) {
    svg {
      height: 352px;
      width: auto;
      --numbers-fill: var(--color-white);
    }
  }
}
</style>
