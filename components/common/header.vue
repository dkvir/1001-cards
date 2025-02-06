<template>
	<div class="header flex justify-between">
		<div
			:class="[
				'header-left flex',
				{
					'has-background': textureStore.textureIndex == null,
				},
			]"
		>
			<nuxt-icon name="logo" filled />
		</div>
		<a
			href="#"
			:class="[
				'header-right-link',
				{
					'has-opacity': textureStore.textureIndex !== null,
				},
			]"
		>
			<div class="header-right flex justify-between">
				<span class="play-video-text">ნახე ვიდეო</span>
				<nuxt-icon name="play-button" filled />
			</div>
		</a>
	</div>
</template>

<script setup>
	import { useTextureStore } from "@/store/texture";
	const textureStore = useTextureStore();
</script>

<style lang="scss" scoped>
	.header {
		position: fixed;
		top: 64px;
		left: 64px;
		right: 64px;
		z-index: 3;
		pointer-events: none;

		.header-left {
			width: 196px;
			background-color: transparent;
			padding: 12px 16px;
			border-radius: 8px;
			pointer-events: all;

			&.has-background {
				background-color: var(--color-evex-blue);
			}
		}

		.header-right-link {
			display: block;
			position: relative;
			text-decoration: none;
			color: inherit;
			border-radius: 8px;
			opacity: var(--play-video-opacity, 1);
			pointer-events: all;

			&.has-opacity {
				--play-video-opacity: 0;
				pointer-events: none;
			}
		}

		.header-right {
			width: 180px;
			height: 60px;
			padding: 15px 12px;
			display: flex;
			align-items: center;
			position: relative;
			border-radius: 8px;
			color: white;
			font-size: 20px;

			&::before {
				content: "";
				position: absolute;
				background-color: var(--color-evex-gray);
				opacity: 0.3;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				border-radius: 8px;
				z-index: -1;
			}
		}
	}
</style>
