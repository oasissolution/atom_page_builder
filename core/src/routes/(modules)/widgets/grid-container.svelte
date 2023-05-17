<script>
	import { onMount } from "svelte";

    /**
     * @type HTMLElement
     */
    let bindElement;

    onMount(() => {

        bindElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', 'element-gridcontainer');
        });

    });

</script>

<div class="widgetContainer" draggable="true" bind:this={bindElement}>
    <div class="widgetIcon">
        <i class="bi bi-grid-3x3-gap"></i>
    </div>
    <div class="widgetText">
        Grid
    </div>
</div>


