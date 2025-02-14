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
    </div>
    <nuxt-icon
      name="lettering-icon"
      :class="[
        'lettering-icon',
        {
          'has-opacity': setLetterIconOpacity,
        },
      ]"
      filled
    />
  </div>
</template>

<script setup>
import gsap from "gsap";
import { useTextureLoaderStore } from "@/store/texturesLoaded";

const textureloadedStore = useTextureLoaderStore();
const textEl = ref(null);
const letteringIcon = ref(null);
const setLetterIconOpacity = ref(false);

watch(
  () => textureloadedStore.timelineCompete,
  (curr, prev) => {
    if (curr) {
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
                        setLetterIconOpacity.value = true;
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
  letteringIcon.value = document.querySelector(".lettering-icon");

  let distance = textEl.value.getBoundingClientRect().bottom;

  letteringIcon.value.style.setProperty(
    "--lettering-icon-top",
    distance + "px"
  );

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
  --text-tranform-ratio: 1;

  @media (max-width: 1024px) {
    --text-tranform-ratio: 0.5;
  }
  @media (max-width: 540px) {
    --text-tranform-ratio: 0.2;
  }

  position: fixed;
  inset: 0;
  z-index: 5;
  width: 100svw;
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
        translate3d(
          0,
          calc(var(--text-transform-y, 0) * var(--text-tranform-ratio)),
          0
        );
      @include default-transitions(transform);
      @media (min-width: 1025px) and (max-width: 1200px) {
        font-size: css-clamp-vw(350px, 400px, 1200);
      }

      @media (min-width: 769px) and (max-width: 1024px) {
        font-size: css-clamp-vw(300px, 350px, 1024);
      }
      @media (min-width: 541px) and (max-width: 768px) {
        font-size: css-clamp-vw(260px, 300px, 768);
      }
      @media (max-width: 540px) {
        font-size: 130px;
      }
    }
  }
  :deep(.lettering-icon) {
    position: fixed;
    top: var(--lettering-icon-top, 0);
    left: 50%;
    transform: translate3d(
        -50%,
        calc(
          -100px + (var(--text-transform-y, 0) * var(--text-tranform-ratio))
        ),
        0
      )
      scale(var(--lettering-icon-scale, 1));
    z-index: 2;
    opacity: var(--lettering-opacity, 0);
    @include default-transitions(opacity);
    transition-duration: 0.5s;

    @media (max-width: 540px) {
      transform: translate3d(
          -50%,
          calc(-40px + var(--text-transform-y, 0) * var(--text-tranform-ratio)),
          0
        )
        scale(var(--lettering-icon-scale, 1));
    }
    svg {
      height: 320px;
      width: auto;
      @media (min-width: 1025px) and (max-width: 1200px) {
        height: css-clamp-vw(210px, 260px, 1200);
      }
      @media (min-width: 769px) and (max-width: 1024px) {
        height: css-clamp-vw(160px, 210px, 1024);
      }
      @media (min-width: 541px) and (max-width: 768px) {
        height: css-clamp-vw(150px, 160px, 768);
      }
      @media (max-width: 549px) {
        height: 90px;
      }
    }
    &.has-opacity {
      --lettering-opacity: 0;
      --lettering-icon-scale: 10;
      transition: transform 2s ease-in-out, opacity 1s ease-in-out;
      transition-delay: 0.45s;
    }
  }
}
</style>
