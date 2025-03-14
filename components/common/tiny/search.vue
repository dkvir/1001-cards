<template>
  <div
    :class="[
      'search flex justify-between',
      {
        'is-visible':
          textureStore.textureIndex == null &&
          textureloadedStore.mountedTexture == null &&
          textureStore.reasonIndex == null &&
          searchVisibility,
        'is-darker': natali,
      },
    ]"
  >
    <div class="search-icon-wrapper flex justify-center">
      <nuxt-icon name="search" class="search-icon-small" filled />
    </div>

    <nuxt-icon name="search" class="search-icon" filled />
    <input
      v-model="searchQuery"
      class="search-input"
      type="number"
      :min="1"
      :max="1001"
      placeholder="მოძებნე მიზეზი"
      @input="restrictInput"
      @keyup.enter="handleSearch"
      @focus="focusInput"
      @blur="unfocus"
    />
    <nuxt-icon
      name="search-arrow"
      class="search-arrow"
      filled
      @click="handleSearch"
    />
  </div>
</template>

<script setup>
import { useTextureStore } from "@/store/texture";
import { useTextureLoaderStore } from "@/store/texturesLoaded";
import { useSearchStore } from "~/store/search";

const searchStore = useSearchStore();
const textureStore = useTextureStore();
const textureloadedStore = useTextureLoaderStore();
const route = useRoute();
const natali = ref(false);

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
};

const focusInput = () => {
  natali.value = true;
};

const unfocus = () => {
  natali.value = false;
};
</script>

<style lang="scss" scoped>
.search {
  align-items: center;
  width: 280px;
  height: 100%;
  border-radius: 8px;
  padding-left: 16px;
  padding-right: 6px;
  opacity: var(--search-opacity, 0);
  position: relative;
  pointer-events: all;
  font-family: var(--font-ping-regular);

  &::before {
    position: absolute;
    content: "";
    border-radius: inherit;
    background: rgba(124, 124, 124, var(--input-opacity, 0.3));
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    opacity: var(--background-opacity, 1);
    backdrop-filter: blur(8px);

    @include default-transitions(background);
  }

  @include mq(max-width 600px) {
    width: 50%;
  }

  @include mq(max-width 425px) {
    width: auto;
    align-items: center;
    border-radius: 4px;
    padding: 5px;
  }

  &.is-visible {
    --search-opacity: 1;
  }

  &.is-darker {
    --input-opacity: 0.6;
  }

  .search:focus-within {
    outline: none;
    text-align: left;
  }

  .search-input[type="number"]::-webkit-outer-spin-button,
  .search-input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .search-input[type="number"] {
    -moz-appearance: textfield;
  }

  .search-input:focus::placeholder {
    opacity: 0;
  }

  .search-text {
    font-size: css-clamp(16px, 20px);
    color: var(--color-evex-green);
    font-family: var(--font-ping-regular);
    opacity: 0.3;

    @include mq(max-width 1024px) {
      font-size: css-clamp-vw(13px, 16px, 1024);
    }
  }

  .search-input {
    font-size: css-clamp(16px, 20px);
    color: var(--color-evex-green);
    font-family: var(--font-ping-regular);

    @include mq(max-width 1024px) {
      font-size: css-clamp-vw(12px, 16px, 1024);
    }

    @include mq(max-width 425px) {
      display: none;
      position: absolute;
    }
  }

  .search-icon-wrapper {
    padding: 7px;
    background-color: var(--color-eleonor);
    border-radius: 2px;
    :deep(.search-icon-small) {
      svg {
        @include size(13px);
      }
    }

    @include mq(min-width 426px) {
      display: none;
    }
  }

  :deep(.search-icon) {
    padding-right: css-clamp(8px, 16px);
    svg {
      @include size(24px);
      @include mq(max-width 768px) {
        @include size(16px);
      }
      @include mq(max-width 425px) {
        display: none;
      }
    }
  }

  :deep(.search-arrow) {
    margin-left: auto;
    cursor: pointer;
    &:hover {
      --hover-color: var(--color-yellow);
    }

    svg {
      @include size(calc(var(--app-header-height) - 10px));

      rect {
        @include default-transitions(fill);
        fill: var(--hover-color, var(--color-eleonor));
      }
    }

    @include mq(max-width 425px) {
      display: none;
      position: absolute;
    }
  }
}
</style>
