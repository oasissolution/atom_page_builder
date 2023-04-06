<script>

    import "../../../../app.css";
    import Select from "../../../uicomponents/select.svelte";
    import { fade, fly, slide } from 'svelte/transition';
    import SelectDistance from "../../../uicomponents/select-distance.svelte";
    import { cssUnitOptions, borderWidthBottomClassOptions, borderWidthLeftClassOptions, borderWidthRightClassOptions, borderWidthTopClassOptions } from "./common-constants.svelte";

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
    let topValue;
    $: topValue, (()=>{
        updateClassWith("border-t", topValue);
    })();

    /**
     * @type string
     */
    let rightValue;
    $: rightValue, (()=>{
        updateClassWith("border-r", rightValue);
    })();

    /**
     * @type string
     */
    let bottomValue;
    $: bottomValue, (()=>{
        updateClassWith("border-b", bottomValue);
    })();

    /**
     * @type string
     */
    let leftValue;
    $: leftValue, (()=>{
        updateClassWith("border-l", leftValue);
    })();


</script>

<div class="w-full flex flex-col gap-3">

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
        <span title="Utilities for controlling the width of an element's borders.">Border Width</span>
    </div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center gap-3">
        <SelectDistance header={"border-t"} options={borderWidthTopClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"T"} bind:value={topValue} bind:loaded bind:elementDataLoaded />
        <SelectDistance header={"border-b"} options={borderWidthBottomClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"B"} bind:value={bottomValue} bind:loaded bind:elementDataLoaded />
    </div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center gap-3">
        <SelectDistance header={"border-l"} options={borderWidthLeftClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"L"} bind:value={leftValue} bind:loaded bind:elementDataLoaded />
        <SelectDistance header={"border-r"} options={borderWidthRightClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"R"} bind:value={rightValue} bind:loaded bind:elementDataLoaded />
    </div>


</div>