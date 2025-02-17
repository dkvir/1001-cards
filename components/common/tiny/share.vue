<template>
  <div
    class="share flex-center"
    :class="{
      'is-active': textureStore.isShareActive,
      'is-invisible': textureStore.textureIndex == null,
    }"
    @click.prevent="clickShare"
  >
    <span class="share-text uppercase">გააზიარე</span>
    <nuxt-icon name="share-icon" class="share-arrow" filled />
  </div>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";

const textureStore = useTextureStore();

// const clickShare = () => {
//   textureStore.toggleShare(!textureStore.isShareActive);

//   const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
//   window.open(shareUrl, "_blank");

//   // const url = encodeURIComponent(window.location.href);
//   // window.open(`fb-messenger://share?link=${window.location.href}`, "_blank");

// };

const clickShare = () => {
  textureStore.toggleShare(!textureStore.isShareActive);

  const url = encodeURIComponent(window.location.href);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Try to open Facebook app
    const fbUrl = `fb://share?link=${url}`;
    window.location.href = fbUrl;

    // Fallback to web after a short delay if app doesn't open
    setTimeout(() => {
      window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }, 2000);
  } else {
    // Desktop behavior
    const shareUrl = `https://www.facebook.com/login.php?next=https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, "_blank");
  }
};
</script>

<style lang="scss" scoped>
.share {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  height: var(--app-header-height);
  padding: 0 css-clamp(16px, 20px);
  border-radius: 8px;
  background-color: var(--share-hover-bg-color, var(--color-eleonor));
  color: var(--share-hover-color, var(--color-black));
  opacity: var(--share-opacity, 1);
  border: 2px solid var(--active-border, transparent);
  pointer-events: all;
  cursor: pointer;
  @include default-transitions(background-color, color, border);

  @media (max-width: 540px) {
    width: css-clamp-vw(287px, 450px, 540);
  }

  &.is-invisible {
    --share-opacity: 0;
    pointer-events: none;
  }

  &:hover {
    --share-hover-bg-color: var(--color-evex-blue);
  }

  &.is-active {
    --share-hover-bg-color: var(--color-evex-blue);
    --share-hover-color: var(--color-white);
    --stroke-hover: var(--color-white);
    --active-border: var(--color-white);
  }

  :deep(.share-arrow) {
    @include size(css-clamp(20px, 24px));
    svg {
      @include size(100%);
    }
    path {
      stroke: var(--stroke-hover, var(--color-black));
      @include default-transitions(stroke);
    }
  }

  .share-text {
    font-size: css-clamp(14px, 18px);
    font-family: var(--font-ping-regular);
    line-height: 1;
    margin-right: 8px;
  }
}
</style>
