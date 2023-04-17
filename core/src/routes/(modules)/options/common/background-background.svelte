<script>
    import "../../../../app.css";
    import { fade, fly, slide } from 'svelte/transition';
    import Optionsbutton from "../../../uicomponents/optionsbutton.svelte";
	import ColorBuilder, { ColorBuilderType } from "../../../uicomponents/color-builder.svelte";

    /**
     * @type boolean
     */
    export let loaded;

    /**
     * Actual class
     * @type string
     */
    export let classInput;


    import { createEventDispatcher } from 'svelte';
	
    const dispatch = createEventDispatcher();

    function updateClass() {
        dispatch('updateClass');
    }

    /**
     * Used for sub elements update control.
     * @type string
    */
    export let elementDataLoaded;


    /**
     * @type number
     */
    let backgroundType;


    /**
     * @type string
     */
    let backgroundImage;


    

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling an element's background image / color.">Type</span>
    <div class="w-[130px]">
        <Optionsbutton items={['bi bi-image', 'bi bi-brush']} icons={true} bind:value={backgroundType} spaceBetween={false} gap={"gap-2"}></Optionsbutton>
    </div>
</div>

{#if backgroundType == 0}
<div class="w-full mt-3" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

    <span class="text-[10px]">Background image is not supported YET.<br/>Will be available with image widget.</span>

</div>

{:else}

<div class="w-full mt-3" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

   <ColorBuilder title={"Background Color"} tooltip={"Utility for controlling the text background of an element."} on:updateClass bind:loaded bind:elementDataLoaded bind:classInput target={ColorBuilderType.BACKGROUND}  />

</div>

{/if}