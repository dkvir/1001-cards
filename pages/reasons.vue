<template>
  <div class="reasons">
    <nuxt-icon name="1001-reasons" class="reasons-icon flex-center" filled />
    <ul class="list">
      <li v-for="(reason, index) in use1001Copy()" :key="index" class="item">
        {{ reason }}
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
</script>

<style lang="scss" scoped>
.reasons {
  :deep(.reasons-icon) {
    padding-top: calc(
      var(--page-offset-padding) + var(--app-header-height) + 70px
    );
    padding-bottom: 110px;
    svg {
      height: 352px;
      width: auto;
    }
  }
}
</style>
