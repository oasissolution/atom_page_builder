<script>
	import { onMount } from 'svelte';

	/**
	 * @type HTMLElement
	 */
	let bindElement;

	onMount(() => {
		bindElement.addEventListener('dragstart', (event) => {
			event.dataTransfer.setData('text/plain', 'element-block');
		});
	});
</script>

<div class="widgetContainer" draggable="true" bind:this={bindElement}>
	<div class="widgetIcon">
		<i class="bi bi-square-half" />
	</div>
	<div class="widgetText">Block</div>
</div>
