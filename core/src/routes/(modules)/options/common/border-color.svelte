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

<ColorBuilder title={"Border Color"} tooltip={"Utilities for controlling the color of an element's borders."} on:updateClass bind:loaded bind:elementDataLoaded bind:classInput target={ColorBuilderType.BORDER} />

