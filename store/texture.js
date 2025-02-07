export const useTextureStore = defineStore("useTextureStore", {
	state: () => ({
		textureIndex: null,
		isShareActive: false,
	}),
	actions: {
		changeTextureIndex(index) {
			this.textureIndex = index;
		},
		toggleShare(status) {
			this.isShareActive = status;
		},
	},
});
