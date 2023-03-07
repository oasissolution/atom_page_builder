<script>
	import { onMount } from "svelte";


    /**
     * @type HTMLElement
     */
    let bindElement;

    
    onMount(() => {

        bindElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', 'div');
        });

    });

</script>

<div class="widgetContainer" draggable="true" bind:this={bindElement} >
    <div class="widgetIcon">
        <i class="bi bi-bounding-box-circles"></i>
    </div>
    <div class="widgetText">
        Container
    </div>
</div>



<style>

    :global(.widgetContainer){
        width: 80px;
        height: 80px;
        display: block;
        align-items: center;
        justify-items: center;
        place-items: center;
        place-content: center;
        border: 1px solid #e3e3e3;
        border-radius: 14px;
        padding-top: 8px;
        
    }

    :global(.widgetContainer .widgetIcon){
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
        justify-items: center;
        place-items: center;
        place-content: center;
        font-size:x-large;
    }

    :global(.widgetContainer .widgetText){
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
        justify-items: center;
        place-items: center;
        place-content: center;
        font-size: small;
    }

    :global([draggable="true"]) {
        /*
        To prevent user selecting inside the drag source
        */
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }

</style>