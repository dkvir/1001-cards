<template>
  <div class="arrow-right flex-center">
    <ClientOnly>
      <nuxt-icon class="arrow" name="arrow-right" filled />
    </ClientOnly>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.arrow-right {
  --arrow-box-size: 40px;

  margin-left: auto;
  border: 2px solid var(--color-evex-green);
  border-radius: 5px;
  background-color: var(--arrow-bg, transparent);
  @include size(var(--arrow-box-size));
  @include default-transitions(background-color);

  @include mq(max-width 768px) {
    border: 1px solid var(--color-evex-green);
  }

  @include mq(max-width 500px) {
    --arrow-box-size: #{css-clamp-vw(28px, 40px, 500)};

    position: absolute;
    right: var(--page-offset-padding);
    top: 22px;
  }

  :deep(.arrow) {
    width: auto;
    height: 40%;
    svg {
      height: 100%;
      path {
        stroke: var(--stroke-color, var(--color-evex-green));
        @include default-transitions(stroke);
      }
    }
  }
}
</style>
