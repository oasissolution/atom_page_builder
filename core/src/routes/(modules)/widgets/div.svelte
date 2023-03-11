<script>
	import { onMount } from "svelte";

    /**
     * @type HTMLElement
     */
    let bindElement;

    onMount(() => {

        bindElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', 'element-div');
        });

    });

</script>

<div class="widgetContainer" draggable="true" bind:this={bindElement}>
    <div class="widgetIcon">
        <i class="bi bi-bounding-box-circles"></i>
    </div>
    <div class="widgetText">
        Container
    </div>
</div>


