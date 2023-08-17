<script>
	import { onMount } from 'svelte';

	/**
	 * @type HTMLElement
	 */
	let bindElement;

	onMount(() => {
		bindElement.addEventListener('dragstart', (event) => {
			event.dataTransfer.setData('text/plain', 'element-section');
		});
	});
</script>

<div class="widgetContainer" draggable="true" bind:this={bindElement}>
	<div class="widgetIcon">
		<i class="bi bi-border-all" />
	</div>
	<div class="widgetText">Section</div>
</div>
