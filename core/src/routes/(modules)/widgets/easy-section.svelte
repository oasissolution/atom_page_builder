<script>
	import { onMount } from "svelte";

    /**
     * @type HTMLElement
     */
    let bindElement;

    onMount(() => {

        bindElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', 'element-easysection');
        });

    });

</script>

<div class="widgetContainer" draggable="true" bind:this={bindElement}>
    <div class="widgetIcon">
        <i class="bi bi-ui-checks-grid"></i>
    </div>
    <div class="widgetText">
        E Section
    </div>
</div>


