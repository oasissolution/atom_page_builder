<script>

    import "../../../../app.css";
    import SelectColor from "../../../uicomponents/select-color.svelte";
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

    /**
     * Actual line height class
     * @type string
     */
    export let textColor;


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


</script>

<ColorBuilder title={"Text Color"} tooltip={"Utility for controlling the text color of an element."} on:updateClass bind:loaded bind:elementDataLoaded bind:classInput target={ColorBuilderType.TEXT} />

<!-- <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center"> -->
    <!-- <span title="Utility for controlling the text color of an element.">Text Color</span>
    <SelectColor header={"text"} bind:loaded bind:elementDataLoaded bind:value={textColor}/> -->
<!-- </div> -->