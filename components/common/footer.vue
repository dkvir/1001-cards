<template>
	<div class="footer flex">
		<nuxt-icon class="take-care" name="take-care" filled />
		<div class="share flex justify-center">
			<span class="share-text"> <a href="#">გააზიარე</a></span>
			<nuxt-icon name="share-icon" filled />
		</div>
		<div class="visit flex">
			<div class="visit-inside flex justify-center">
				<a href="#">
					<span class="uppercase">დაჯავშნე</span>
				</a>
				<nuxt-icon name="visit-arrow" filled />
			</div>
			<span class="visit-text"><a href="#">ვიზიტი ექიმთან</a></span>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped>
	.footer {
		position: fixed;
		bottom: 50px;
		left: 64px;
		right: 64px;
		z-index: 3;
		font-family: var(--font-ping-regular);

		.take-care {
			margin-right: 553px;
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
		}

		.visit {
			position: relative;
			// background-color: var(--color-white);
			// opacity: 0.3;
			width: 380px;
			height: 60px;
			font-size: 20px;
			align-items: center;
			border-radius: 8px;
			color: var(--color-white);
			padding: 5px;
			padding-right: 16px;
			margin-left: 437px;
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
			}

			a {
				color: inherit;
				text-decoration: none;
			}

			.share-text {
				font-size: 18px;
			}
		}
	}
</style>
