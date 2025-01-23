import * as THREE from "three";
import { defineStore } from "pinia";

export const useImageStore = defineStore("imageStore", {
  state: () => ({
    images: [], // Original URLs
    loadedImages: [], // Stores THREE.Textures
    isLoading: false,
    isLoaded: false,
    totalImages: 1001,
  }),
  actions: {
    async preloadImages(imageUrls) {
      this.isLoading = true;
      const promises = imageUrls.map((url) => this.preloadImage(url));
      await Promise.all(promises);
      this.isLoading = false;
      this.isLoaded = true;
    },
    preloadImage(url) {
      return new Promise((resolve, reject) => {
        const loader = new THREE.TextureLoader();
        loader.load(
          url,
          (texture) => {
            this.loadedImages.push(texture); // Store the THREE.Texture
            resolve();
          },
          undefined,
          (error) => {
            console.error("Failed to load image:", url, error);
            reject(error);
          }
        );
      });
    },
  },
});
