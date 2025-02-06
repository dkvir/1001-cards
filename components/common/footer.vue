<template>
	<div class="footer flex">
		<nuxt-icon
			:class="[
				'take-care',
				{ 'take-care-gray': textureStore.textureIndex == null },
			]"
			name="take-care"
			filled
		/>
		<div
			:class="[
				'share flex justify-center',
				{ 'is-invisible': textureStore.textureIndex == null },
			]"
		>
			<span class="share-text"> <a href="#">გააზიარე</a></span>
			<nuxt-icon name="share-icon" filled />
		</div>
		<div
			:class="[
				'visit flex',
				{ 'visit-gray': textureStore.textureIndex == null },
			]"
		>
			<div class="visit-inside flex justify-center">
				<a href="#"><span class="uppercase">დაჯავშნე</span></a>
				<nuxt-icon name="visit-arrow" filled />
			</div>
			<span class="visit-text"><a href="#">ვიზიტი ექიმთან</a></span>
		</div>
	</div>
</template>

<script setup>
	import { useTextureStore } from "@/store/texture";
	const textureStore = useTextureStore();
</script>

<style lang="scss" scoped>
	.footer {
		position: fixed;
		bottom: 50px;
		left: 64px;
		right: 64px;
		z-index: 3;
		font-family: var(--font-ping-regular);

		.take-care {
			position: relative;
			margin-right: 553px;
			padding: 18px 16px;
			border-radius: 8px;

			&::before {
				position: absolute;
				content: "";
				border-radius: 8px;
				background-color: var(--color-white);
				opacity: 0.2;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				z-index: -1;
				backdrop-filter: blur(10px);
			}

			&.take-care-gray::before {
				background-color: var(--color-evex-gray);
			}
		}

		.share {
			align-items: center;
			gap: 8px;
			width: 170px;
			height: 60px;
			border-radius: 8px;
			background-color: var(--color-eleonor);
			color: var(--color-black);
			font-size: 18px;
			margin-left: 220px;

			&.is-invisible {
				opacity: 0;
			}
		}

		.visit {
			position: relative;
			width: 380px;
			height: 60px;
			font-size: 20px;
			align-items: center;
			border-radius: 8px;
			color: var(--color-white);
			padding: 5px;
			padding-right: 20px;
			margin-left: auto;

			&::before {
				content: "";
				position: absolute;
				background-color: var(--color-white);
				opacity: 0.3;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				border-radius: 8px;
				z-index: -1;
			}

			&.visit-gray {
				color: var(--color-evex-gray);

				&::before {
					background-color: var(--color-evex-gray);
				}
			}

			.visit-inside {
				align-items: center;
				opacity: 1;
				width: 170px;
				height: 50px;
				background-color: var(--color-white);
				color: var(--color-black);
				gap: 3px;
				border-radius: 8px;
			}

			.visit-text {
				margin-left: auto;
				color: var(--color-white);
			}
		}

		a {
			color: inherit;
			text-decoration: none;
		}

		.share-text {
			font-size: 18px;
		}
	}
</style>
