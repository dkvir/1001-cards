<template>
  <div
    :class="[
      'loader flex-center',
      {
        'is-loaded': textureloadedStore.loaderComplete,
      },
    ]"
  >
    <div class="backgrounds">
      <div class="bg"></div>
      <div class="bg"></div>
      <div class="bg"></div>
      <div class="bg"></div>
      <div class="bg"></div>
      <div class="bg"></div>
      <div class="bg"></div>
      <div class="bg"></div>
      <div class="bg"></div>
      <div class="bg"></div>
    </div>
    <div class="content flex-center flex-column">
      <div id="text">1001</div>
      <nuxt-icon name="lettering-icon" class="lettering-icon" filled />
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { useTextureLoaderStore } from "@/store/texturesLoaded";
const textureloadedStore = useTextureLoaderStore();

const textEl = ref(null);
let contentEl = ref(null);

watch(
  () => [textureloadedStore.loadedTexture, textureloadedStore.timelineCompete],
  ([curr1, prev1], [curr2, prev2]) => {
    if (curr1 && curr2) {
      setTimeout(() => {
        gsap.fromTo(
          ".loader",
          {
            "--text-scale": 1,
            "--text-transform-y": "0",
            "--lettering-opacity": 0,
          },
          {
            "--text-scale": 0.7,
            "--text-transform-y": "-200px",
            "--lettering-opacity": 1,
            onComplete: () => {
              setTimeout(() => {
                gsap.fromTo(
                  ".loader",
                  {
                    "--clip-bg-1": "100%",
                  },
                  {
                    "--clip-bg-1": "0%",
                    duration: 0.5,
                    ease: "power4.out",
                    onComplete: () => {
                      setTimeout(() => {
                        textureloadedStore.changeloaderComplete(true);
                      }, 500);
                    },
                  }
                );
              }, 1500);
            },
          }
        );
      }, 1000);
    }
  }
);

onMounted(() => {
  textEl.value = document.getElementById("text");
  contentEl.value = document.querySelector(".loader .content");

  let distance = textEl.value.getBoundingClientRect().bottom;

  contentEl.value.style.setProperty("--lettering-icon-top", distance + "px");

  const scrambleText = new useScrambleText(textEl.value, {
    timeOffset: 1000,
    chars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    callback: function () {},
  }).play();

  setTimeout(() => {
    useLoaderTilemines().tl;
    scrambleText.start();
  }, 1000);
});
</script>

<style lang="scss" scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 5;
  width: 100vw;
  height: 100dvh;
  &.is-loaded {
    pointer-events: none;
  }

  $colors: (
    10: #f2978d,
    9: #fdcb5e,
    8: #bdebe1,
    7: #16af9b,
    6: #00827f,
    5: #f2978d,
    4: #fdcb5e,
    3: #bdebe1,
    2: #16af9b,
    1: #00827f,
  );

  .backgrounds {
    position: absolute;
    inset: 0;
    @include size(100%);
    .section {
      position: absolute;
      inset: 0;
      @include size(100%);
      &.section-one {
        z-index: 1;
      }
      &.section-two {
        z-index: -1;
      }
    }
    .bg {
      position: absolute;
      inset: 0;
      @include size(100%);
      @include default-transitions(clip-path);
      transition-duration: 0.8s;

      @each $key, $val in $colors {
        &:nth-child(#{$key}) {
          background-color: $val;

          clip-path: polygon(
            0 0,
            100% 0,
            100% var(--clip-bg-#{$key}, 100%),
            0 var(--clip-bg-#{$key}, 100%)
          );
        }
      }
    }
    .last-bg {
      position: absolute;
      inset: 0;
      z-index: -3;
      background-color: #00827f;
    }
  }
  .content {
    position: absolute;
    inset: 0;
    @include default-transitions(clip-path);
    transition-duration: 0.8s;
    z-index: 2;
    clip-path: polygon(
      0 0,
      100% 0,
      100% var(--clip-bg-1, 100%),
      0 var(--clip-bg-1, 100%)
    );
    #text {
      font-size: 464px;
      line-height: 1;
      color: var(--color-white);
      font-family: var(--font-evex-regular);
      transform: scale(var(--text-scale, 1))
        translate3d(0, var(--text-transform-y, 0), 0);
      @include default-transitions(transform);
    }
    :deep(.lettering-icon) {
      height: 320px;
      position: absolute;
      top: var(--lettering-icon-top, 0);
      left: 50%;
      transform: translate3d(
        -50%,
        calc(-100px + var(--text-transform-y, 0px)),
        0
      );
      opacity: var(--lettering-opacity, 0);
      @include default-transitions(opacity);
      transition-duration: 0.3;
    }
  }
}
</style>
