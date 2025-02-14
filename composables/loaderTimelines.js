import gsap from "gsap";
import { useTextureLoaderStore } from "@/store/texturesLoaded";

export const useLoaderTilemines = () => {
  const duration = 0.5;
  const textureloadedStore = useTextureLoaderStore();

  const tl = gsap
    .timeline()
    .fromTo(
      ".loader",
      {
        "--clip-bg-10": "100%",
      },
      {
        "--clip-bg-10": "0%",
        duration: duration,
        ease: "power4.out",
      },
      "-=0.1"
    )
    .fromTo(
      ".loader",
      {
        "--clip-bg-9": "100%",
      },
      {
        "--clip-bg-9": "0%",
        duration: duration,
        ease: "power4.out",
      },
      "-=0.1"
    )
    .fromTo(
      ".loader",
      {
        "--clip-bg-8": "100%",
      },
      {
        "--clip-bg-8": "0%",
        duration: duration,
        ease: "power4.out",
      },
      "-=0.1"
    )
    .fromTo(
      ".loader",
      {
        "--clip-bg-7": "100%",
      },
      {
        "--clip-bg-7": "0%",
        duration: duration,
        ease: "power4.out",
      },
      "-=0.1"
    )
    .fromTo(
      ".loader",
      {
        "--clip-bg-6": "100%",
      },
      {
        "--clip-bg-6": "0%",
        duration: duration,
        ease: "power4.out",
      }
    )
    .fromTo(
      ".loader",
      {
        "--clip-bg-5": "100%",
      },
      {
        "--clip-bg-5": "0%",
        duration: duration,
        ease: "power4.out",
      },
      "-=0.1"
    )
    .fromTo(
      ".loader",
      {
        "--clip-bg-4": "100%",
      },
      {
        "--clip-bg-4": "0%",
        duration: duration,
        ease: "power4.out",
      },
      "-=0.1"
    )
    .fromTo(
      ".loader",
      {
        "--clip-bg-3": "100%",
      },
      {
        "--clip-bg-3": "0%",
        duration: duration,
        ease: "power4.out",
      },
      "-=0.1"
    )
    .fromTo(
      ".loader",
      {
        "--clip-bg-2": "100%",
      },
      {
        "--clip-bg-2": "0%",
        duration: duration,
        ease: "power4.out",
        onComplete: () => {
          textureloadedStore.changeTimelineLoaded(true);
          console.log("complete");
        },
      },
      "-=0.1"
    );

  return {
    tl,
  };
};
