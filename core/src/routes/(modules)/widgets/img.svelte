<script>
	import { onMount } from "svelte";

    /**
     * @type HTMLElement
     */
    let bindElement;

    onMount(() => {

        bindElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', 'element-img');
        });

    });

</script>

<div class="widgetContainer" draggable="true" bind:this={bindElement}>
    <div class="widgetIcon">
        <i class="bi bi-image"></i>
    </div>
    <div class="widgetText">
        Image
    </div>
</div>


