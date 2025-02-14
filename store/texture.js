export const useTextureStore = defineStore("useTextureStore", {
  state: () => ({
    textureIndex: null,
    changeCursor: false,
    isShareActive: false,
  }),
  actions: {
    changeTextureIndex(index) {
      this.textureIndex = index;
    },
    toggleShare(status) {
      this.isShareActive = status;
    },
    togglechangeCursor(status) {
      this.changeCursor = status;
    },
  },
});
