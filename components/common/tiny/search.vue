<template>
  <div
    ref="target"
    :class="[
      'search flex justify-between',
      {
        'is-visible':
          textureStore.textureIndex == null &&
          textureloadedStore.mountedTexture == null &&
          textureStore.reasonIndex == null &&
          searchVisibility,
        'is-darker': natali,
        'is-mobile-opened': openSearchMobile,
      },
    ]"
  >
    <div @click="openMobileSearch" class="search-icon-wrapper flex-center">
      <nuxt-icon name="search" class="search-icon" filled />
    </div>
    <div class="input-parent flex-center justify-between">
      <input
        v-model="searchQuery"
        class="search-input uppercase"
        type="number"
        :min="1"
        :max="1001"
        placeholder="მოძებნე მიზეზი"
        @input="restrictInput"
        @keyup.enter="handleSearch"
        @focus="focusInput"
        @blur="unfocus"
      />
      <div @click="handleSearch" class="search-arrow">
        <nuxt-icon name="search-arrow" filled />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";
import { useTextureLoaderStore } from "@/store/texturesLoaded";
import { useSearchStore } from "~/store/search";
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";

const target = useTemplateRef("target");

const emit = defineEmits(["transformVisit"]);

const searchStore = useSearchStore();
const textureStore = useTextureStore();
const textureloadedStore = useTextureLoaderStore();
const route = useRoute();
const natali = ref(false);
const openSearchMobile = ref(false);

const searchQuery = ref("");
const searchVisibility = ref(null);
const isMobile = ref(false);

const checkViewportSize = () => {
  isMobile.value = window.innerWidth <= 600;
};

onMounted(() => {
  checkViewportSize();
  window.addEventListener("resize", checkViewportSize);
});

searchVisibility.value = route.path == "/reasons";

watch(
  () => route.path,
  (curr, prev) => {
    searchVisibility.value = curr == "/reasons";

    if (window.innerWidth <= 500) {
      openSearchMobile.value = false;
      emit("transformVisit", openSearchMobile.value);
    }

    if (curr == "/" && prev == "/reasons") {
      searchQuery.value = null;
      searchStore.changeSearchValue(searchQuery.value);
    }
  }
);

const restrictInput = () => {
  const value = parseInt(searchQuery.value, 10);
  if (value < 1) {
    searchQuery.value = "1";
  } else if (value > 1001) {
    searchQuery.value = "1001";
  }
};

const handleSearch = () => {
  searchStore.changeSearchValue(searchQuery.value);
  if (window.innerWidth <= 500) {
    openSearchMobile.value = !openSearchMobile.value;
    emit("transformVisit", openSearchMobile.value);
  }
};

const focusInput = () => {
  natali.value = true;
};

const unfocus = () => {
  natali.value = false;
};

const openMobileSearch = () => {
  if (window.innerWidth <= 500) {
    openSearchMobile.value = true;
    emit("transformVisit", openSearchMobile.value);
  }
};

onClickOutside(target, (event) => {
  if (window.innerWidth <= 500) {
    openSearchMobile.value = false;
    emit("transformVisit", openSearchMobile.value);
  }
});
</script>

<style lang="scss" scoped>
.search {
  --icon-padding: 5px;
  --icon-sizes: calc(var(--app-header-height) - 2 * var(--icon-padding));
  --border-radius: 8px;

  position: relative;
  width: var(--search-width, 320px);
  height: 100%;
  border-radius: var(--border-radius);
  padding: var(--icon-padding);
  padding-left: calc(css-clamp(12px, 16px) + var(--icon-sizes));
  opacity: var(--search-opacity, 0);
  pointer-events: none;
  overflow: hidden;
  transition: width 0.45s ease-in-out;

  @include mq(max-width 768px) {
    --icon-padding: 3px;

    width: var(--search-width, 250px);
  }

  @include mq(max-width 500px) {
    --search-width: var(--app-header-height);
    --border-radius: 4px;

    position: absolute;
    right: var(--page-offset-padding);
    bottom: 0;
    padding-left: calc(var(--icon-sizes));
  }

  &.is-visible {
    --search-opacity: 1;
    pointer-events: all;
  }

  &.is-darker {
    --input-opacity: 0.6;
  }
  &.is-mobile-opened {
    --search-width: calc(100% - 2 * var(--page-offset-padding));
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    background: rgba(124, 124, 124, var(--input-opacity, 0.3));
    z-index: -1;
    opacity: var(--background-opacity, 1);
    backdrop-filter: blur(8px);

    @include default-transitions(background);
  }

  .search-icon-wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate3d(0, -50%, 0);
    margin-left: css-clamp(12px, 16px);
    @include size(var(--icon-sizes));
    background-color: var(--search-icon-bg, transparent);
    border-radius: var(--border-radius);

    @include mq(max-width 500px) {
      --search-icon-bg: var(--color-eleonor);
      margin-left: var(--icon-padding);
    }

    :deep(.search-icon) {
      svg {
        @include size(css-clamp(18px, 24px));
        @include mq(max-width 768px) {
          @include size(css-clamp-vw(18px, 18px, 768));
        }
      }
    }
  }

  .input-parent {
    --input-margin: #{css-clamp(5px, 16px)};

    width: 100%;
    margin-left: var(--input-margin);

    @include mq(max-width 500px) {
      --input-margin: 16px;
    }
    .search-input {
      font-size: css-clamp(16px, 20px);
      color: var(--color-evex-green);
      font-family: var(--font-ping-regular);
      width: calc(100% - var(--icon-sizes) - var(--input-margin));
      @include mq(max-width 1024px) {
        font-size: css-clamp-vw(14px, 16px, 1024);
      }

      &:focus::placeholder {
        opacity: 0;
      }

      &[type="number"]::-webkit-outer-spin-button,
      &[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    :deep(.search-arrow) {
      cursor: pointer;
      background-color: var(--hover-color, var(--color-eleonor));
      border-radius: var(--border-radius);
      @include size(var(--icon-sizes));
      @include default-transitions(background-color);

      &:hover {
        --hover-color: var(--color-yellow);
      }
      svg {
        fill: var(--color-black);
      }
    }
  }
}
</style>
