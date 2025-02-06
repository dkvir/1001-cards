<template>
	<div
		:class="[
			'open-texture flex-center',
			{ 'is-active': textureStore.textureIndex !== null },
		]"
	>
		<div class="image">
			<img v-if="imageLink" :src="imageLink" alt="image" class="img" />
		</div>
		<div @click="closeTexture" class="close">
			<nuxt-icon class="exit-icon" name="cross" filled />
		</div>

		<common-footer />
	</div>
</template>

<script setup>
	import { useTextureStore } from "@/store/texture";

	const textureStore = useTextureStore();
	const imageLink = ref(null);

	watch(
		() => textureStore.textureIndex,
		(curr) => {
			imageLink.value = `/images/textures/artboard-0${(curr % 4) + 1}.png`;
		}
	);

	const closeTexture = () => {
		textureStore.changeTextureIndex(null);
	};
</script>

<style lang="scss" scoped>
	.open-texture {
		position: fixed;
		inset: 0;
		width: 100svw;
		height: 100svh;
		opacity: var(--component-opacity, 0);
		pointer-events: none;
		@include default-transitions(opacity);
		z-index: 2;
		&::before {
			content: "";
			position: absolute;
			inset: 0;
			z-index: -1;
			background-color: var(--color-evex-blue);
			opacity: var(--background-opacity, 0);
			@include default-transitions(opacity);
		}
		&.is-active {
			--component-opacity: 1;
			--background-opacity: 0.82;
			pointer-events: all;
		}
		.image {
			width: 450px;
			height: 630px;
			background-color: var(--color-white);
			border-radius: 15px;
			.img {
				@include size(100%);
				object-fit: cover;
				border-radius: inherit;
			}
		}
		.close {
			position: absolute;
			top: 75px;
			right: 70px;
			z-index: 4;
			font-size: 30px;
			cursor: pointer;
		}
	}
</style>
