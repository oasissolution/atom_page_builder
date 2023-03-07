<script>
    import { onMount } from "svelte";


    /**
     * @type HTMLElement
     */
    let bindElement;


    onMount(() => {

        bindElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', 'text');
        });

    });

</script>

<div class="widgetContainer" draggable="true" bind:this={bindElement} >
    <div class="widgetIcon">
        <i class="bi bi-fonts"></i>
    </div>
    <div class="widgetText">
        Text
    </div>
</div>
