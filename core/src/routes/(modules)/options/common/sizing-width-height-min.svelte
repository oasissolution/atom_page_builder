<script>

    import "../../../../app.css";
    import Select from "../../../uicomponents/select.svelte";
    import { fade, fly, slide } from 'svelte/transition';
    import SelectDistance from "../../../uicomponents/select-distance.svelte";
    import { cssUnitOptions, minHeightClassOptions, minWidthClassOptions } from "./common-constants.svelte";

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
     * @typedef {Object} SelectOptions
     * @property {string} value
     * @property {string} name
     * @property {string} info
    */

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
     *
     * @param {string} startString
     * @param {string} value
     */
    function updateClassWith(startString, value){
        if(loaded == true) {
            var newClass = "";
            classInput.split(" ").forEach( cls => {
                if(!cls.trim().startsWith(startString) && !cls.trim().startsWith("-"+startString))  newClass += " " + cls.trim();
            });
            if(value !== undefined) classInput = newClass.trim() + " " + value;
            updateClass();
        }
    }


    /**
     * @type string
     */
    let widthValue;
    $: widthValue, (()=>{
        updateClassWith("min-w-", widthValue);
    })();

    /**
     * @type string
     */
    let heightValue;
    $: heightValue, (()=>{
        updateClassWith("min-h-", heightValue);
    })();


</script>

<div class="w-full flex flex-col gap-3">

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
        <span title="Utilities for setting the minimum width & minimum height of an element.">Min Dimensions</span>
    </div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center gap-3">
        <SelectDistance header={"min-w"} options={minWidthClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"W"} bind:value={widthValue} bind:loaded bind:elementDataLoaded />
        <SelectDistance header={"min-h"} options={minHeightClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"H"} bind:value={heightValue} bind:loaded bind:elementDataLoaded />
    </div>


</div>