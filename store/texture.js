export const useTextureStore = defineStore("useTextureStore", {
  state: () => ({
    textureIndex: null,
  }),
  actions: {
    changeTextureIndex(index) {
      console.log(index);
      this.textureIndex = index;
    },
  },
});
