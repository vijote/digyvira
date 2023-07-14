<script>
	/** @type {(event: MouseEvent & { currentTarget: EventTarget & SVGSVGElement; }) => void} */
	export let onMouseDown;

	/** @type {(event: MouseEvent & { currentTarget: EventTarget & SVGSVGElement; }) => void} */
	export let onClick;
</script>

<svg
	on:mousedown={onMouseDown}
	on:click={onClick}
	class="triangle-icon"
	version="1.1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 72.72 72.719"
	xml:space="preserve"
	data-testid="male-member-icon"
>
	<g>
		<g>
			<path
				d="M72.72,65.686H0L36.36,7.034L72.72,65.686z M5.388,62.686h61.943L36.36,12.727L5.388,62.686z"
			/>
		</g>
	</g>
</svg>

<style>
	.triangle-icon {
		width: 100%;
		height: 100%;
		fill: #000000;
	}
</style>
