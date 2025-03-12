<template>
  <div
    :class="[
      'reason-item flex align-center',
      { 'first-ten-reason': index <= 10 },
    ]"
  >
    <div class="number flex align-center">
      <nuxt-icon name="number" class="number-icon" filled />
      <div class="reason-id">{{ getCardId(item.cardIndex) }}</div>
    </div>
    <h2 class="reason uppercase">{{ item.reason }}</h2>
    <pages-tiny-arrow-right />
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
  },
  index: {
    type: Number,
  },
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
.reason-item {
  padding: 70px 0;
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
