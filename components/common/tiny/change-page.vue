<template>
  <div class="change-page flex">
    <common-page-link
      v-for="(link, index) in links"
      :key="index"
      :to="link.path"
      :class="[
        'nuxt-link flex-center',
        {
          'has-margin': link.hasMargin,
          'is-active': route.path == link.path,
        },
      ]"
    >
      <nuxt-icon :name="link.icon" class="page-icon" filled />
    </common-page-link>
  </div>
</template>

<script setup>
const route = useRoute();

const links = [
  {
    path: "/",
    icon: "home-icon",
    hasMargin: true,
  },
  {
    path: "/reasons",
    icon: "reasons-icon",
    hasMargin: false,
  },
];
</script>

<style lang="scss" scoped>
.change-page {
  position: relative;
  padding: 5px;
  width: auto;
  height: var(--app-header-height);
  border-radius: 8px;
  margin-right: 20px;
  pointer-events: all;

  @include mq(max-width 768px) {
    padding: css-clamp-vw(3px, 5px, 768);
    margin-right: css-clamp-vw(8px, 20px, 768);
  }
  &::before {
    content: "";
    position: absolute;
    border-radius: inherit;
    background: rgba(124, 124, 124, 0.3);
    inset: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    backdrop-filter: blur(8px);
  }

  .nuxt-link {
    position: relative;
    @include size(calc(var(--app-header-height) - 10px));
    border-radius: 4px;
    cursor: pointer;
    @include mq(max-width 768px) {
      @include size(
        calc(var(--app-header-height) - css-clamp-vw(6px, 10px, 768))
      );
    }

    &::before {
      content: "";
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      border-radius: inherit;
      transform: translate3d(-50%, -50%, 0);
      opacity: 0.8;
      background-color: var(--button-bg, var(--color-eleonor));
      @include size(100%);
      @include default-transitions(background-color);
    }
    &:hover,
    &.is-active {
      --button-bg: var(--color-evex-blue);
      --stroke-color: var(--color-white);
    }
    &.has-margin {
      margin-right: 8px;
      @include mq(max-width 768px) {
        margin-right: css-clamp-vw(3px, 8px, 768);
      }
    }
    :deep(.page-icon) {
      display: block;
      height: 40%;
      &.reasons-icon {
        height: 35%;
      }
      svg {
        height: 100%;
        width: auto;
        path,
        rect {
          stroke: var(--stroke-color, var(--color-evex-green));
          @include default-transitions(stroke);
        }
      }
    }
  }
}
</style>
