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
  padding: 30px var(--page-offset-padding);
  border-bottom: 1px solid var(--color-yellow);

  &:first-child {
    border-top: 1px solid var(--color-yellow);
  }

  @include mq(max-width 500px) {
    position: relative;
    flex-direction: column;
    align-items: baseline;
    padding: 22px 0;
  }

  .number {
    :deep(.number-icon) {
      svg {
        height: 16px;
        width: auto;
      }
    }
    .reason-id {
      margin-left: 12px;
      font-family: var(--font-evex-regular);
      font-size: 48px;
      line-height: 1;
      color: var(--color-evex-green);
      letter-spacing: -3px;

      @include mq(max-width 768px) {
        font-size: css-clamp-vw(40px, 48px, 768);
      }
    }
  }
  .reason {
    margin-left: css-clamp(40px, 70px);
    font-size: css-clamp(16px, 28px);
    font-family: var(--font-ping-regular);
    color: var(--color-evex-green);

    @include mq(max-width 768px) {
      width: css-clamp-vw(283px, 500px, 768);
      margin-left: css-clamp-vw(0px, 40px, 768);
      margin-right: 20px;
    }

    @include mq(max-width 500px) {
      width: 283px;
    }
  }
}
</style>
