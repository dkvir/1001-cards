<template>
  <div class="share-parent flex-center">
    <div
      class="share share-fb flex-center"
      :class="{
        'is-invisible':
          textureStore.textureIndex == null &&
          textureloadedStore.mountedTexture == null &&
          textureStore.reasonIndex == null,
      }"
      @click.prevent="clickShareFb"
    >
      <nuxt-icon name="social-fb" class="fb-icon" filled />
      <span class="share-text uppercase">გააზიარე</span>
    </div>
    <div
      class="share share-messenger flex-center"
      :class="{
        'is-invisible':
          textureStore.textureIndex == null &&
          textureloadedStore.mountedTexture == null &&
          textureStore.reasonIndex == null,
        'is-hidden': !isMobile,
      }"
      @click.prevent="clickShareMessenger"
    >
      <nuxt-icon name="social-messenger" class="messenger-icon" filled />
      <span class="share-text uppercase">გაგზავნე</span>
    </div>
  </div>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";
import { useTextureLoaderStore } from "@/store/texturesLoaded";

const textureStore = useTextureStore();
const textureloadedStore = useTextureLoaderStore();
const isMobile = ref(null);
const isAndroid = ref(null);
const isIOS = ref(null);
onMounted(() => {
  isMobile.value = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  isAndroid.value = /Android/i.test(navigator.userAgent);
  isIOS.value = /iPhone|iPad|iPod/i.test(navigator.userAgent);
});

const clickShareFb = () => {
  textureStore.toggleShare(!textureStore.isShareActive);

  const url = encodeURIComponent(window.location.href);

  if (isMobile.value) {
    if (isAndroid.value) {
      const intentUrl = `intent:#Intent;scheme=https;package=com.facebook.katana;action=android.intent.action.SEND;type=text/plain;S.android.intent.extra.TEXT=${url};S.android.intent.extra.SUBJECT=Check this out;end`;
      window.location.href = intentUrl;
    } else if (isIOS.value) {
      const fbUrl = `fb://share?link=${url}`;
      window.location.href = fbUrl;
    }
  } else {
    const shareUrl = `https://www.facebook.com/login.php?next=https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, "_blank");
  }
};

const clickShareMessenger = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`fb-messenger://share?link=${url}`, "_blank");
};
</script>

<style lang="scss" scoped>
.share-parent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  height: var(--app-header-height);
  @include mq(max-width 540px) {
    width: calc(100% - 2 * var(--page-offset-padding));
  }
  .share {
    height: 100%;
    padding: 0 css-clamp(16px, 20px);
    border-radius: 8px;
    background-color: var(--share-hover-bg-color, var(--color-eleonor));
    color: var(--share-hover-color, var(--color-black));
    opacity: var(--share-opacity, 1);
    border: 2px solid var(--active-border, transparent);
    pointer-events: all;
    cursor: pointer;
    @include default-transitions(background-color, color, border);

    &.share-messenger {
      margin-left: 12px;
      &.is-hidden {
        display: none;
      }
    }

    @media (max-width: 540px) {
      width: 50%;
    }

    &.is-invisible {
      --share-opacity: 0;
      pointer-events: none;
    }

    &:hover {
      --share-hover-bg-color: var(--color-evex-blue);
      --fb-icon-fill: var(--color-evex-blue);
    }

    :deep(.nuxt-icon) {
      @include size(css-clamp(20px, 24px));

      &.fb-icon {
        svg {
          path {
            fill: var(--fb-icon-fill, var(--color-white));
            @include default-transitions(fill);
          }
        }
      }
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
      margin-left: 8px;
    }
  }
}
</style>
