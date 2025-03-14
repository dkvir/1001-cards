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
      },
    ]"
  >
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

const searchQuery = ref("");

const searchVisibility = ref(null);

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
</script>

<style lang="scss" scoped>
.search {
  align-items: center;
  width: 280px;
  height: 100%;
  border-radius: 8px;
  padding: 19px 16px;
  padding-right: 6px;
  gap: 16px;
  opacity: var(--search-opacity, 0);
  position: relative;
  pointer-events: all;

  &::before {
    position: absolute;
    content: "";
    border-radius: 8px;
    background: rgba(124, 124, 124, var(--input-opacity, 0.3));
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    opacity: var(--background-opacity, 1);
    backdrop-filter: blur(8px);
  }

  &.is-visible {
    --search-opacity: 1;
  }

  .search-input:focus {
    outline: none;
    text-align: left;
    opacity: 1;
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
    font-size: 20px;
    color: var(--color-black);
    opacity: 0.3;
  }

  .search-input {
    font-size: 20px;
    color: var(--color-black);
  }

  :deep(.search-icon) {
    svg {
      @include size(24px);
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
  }
}
</style>
