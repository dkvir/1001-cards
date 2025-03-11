<template>
  <div
    :href="to"
    @click="
      (event) => {
        startPageChange(event, to);
      }
    "
    class="page-link"
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

import { usePageLink } from "@/store/page-link";

const pageLink = usePageLink();
const route = useRoute();

const startPageChange = (event, to) => {
  if (route.path !== "/" && to !== "/reasons") pageLink.changePageLoading(true);

  pageLink.changeCurrentPage(to);
};
</script>

<style lang="scss" scoped></style>
