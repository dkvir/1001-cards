<template>
  <div class="reasons">
    <nuxt-icon name="1001-reasons" class="reasons-icon flex-center" filled />
    <ul class="list">
      <li
        v-for="(item, index) in use1001Copy()"
        :key="index"
        class="item flex align-center"
      >
        <div class="number flex align-center">
          <nuxt-icon name="number" class="number-icon" filled />
          <div class="reason-id">{{ getCardId(item.cardIndex) }}</div>
        </div>
        <h2 class="reason uppercase">{{ item.reason }}</h2>
        <pages-tiny-arrow-right />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { usePageLink } from "@/store/page-link";

const pageLink = usePageLink();

onMounted(() => {
  setTimeout(() => {
    pageLink.changePageLoading(false);
  }, 500);
});

const getCardId = (cardIndex) => {
  const idToString = cardIndex.toString();

  if (idToString.length == 1) {
    return "00" + idToString;
  } else if (idToString.length == 2) {
    return "0" + idToString;
  } else {
    return idToString;
  }
};
</script>

<style lang="scss" scoped>
.reasons {
  padding: var(--page-offset-padding);
  :deep(.reasons-icon) {
    padding-top: calc(var(--app-header-height) + 70px);
    svg {
      height: 352px;
      width: auto;
    }
  }
  .list {
    padding: 110px 0;
  }

  .item {
    padding: 70px 0;
    border-bottom: 1px solid var(--color-border);
    cursor: pointer;
    &:hover {
      --arrow-bg: var(--color-evex-green);
      --stroke-color: var(--color-white);
    }
  }

  .number {
    .reason-id {
      margin-left: 12px;
      font-family: var(--font-evex-regular);
      font-size: 72px;
      line-height: 1;
      color: var(--color-evex-green);
    }
  }
  .reason {
    margin-left: 70px;
    font-size: 34px;
    font-family: var(--font-ping-regular);
  }
}
</style>
