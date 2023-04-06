<script>

    import "../../../../app.css";
    import Select from "../../../uicomponents/select.svelte";
    import { fade, fly, slide } from 'svelte/transition';
    import SelectDistance from "../../../uicomponents/select-distance.svelte";
    import { cssUnitOptions, borderRadiusBLClassOptions, borderRadiusBRClassOptions, borderRadiusTLClassOptions, borderRadiusTRClassOptions } from "./common-constants.svelte";

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
    let topLeftValue;
    $: topLeftValue, (()=>{
        updateClassWith("rounded-tl-", topLeftValue);
    })();

    /**
     * @type string
     */
    let topRightValue;
    $: topRightValue, (()=>{
        updateClassWith("rounded-tr-", topRightValue);
    })();

    /**
     * @type string
     */
    let bottomLeftValue;
    $: bottomLeftValue, (()=>{
        updateClassWith("rounded-bl-", bottomLeftValue);
    })();

    /**
     * @type string
     */
    let bottomRightValue;
    $: bottomRightValue, (()=>{
        updateClassWith("rounded-br-", bottomRightValue);
    })();


</script>

<div class="w-full flex flex-col gap-3">

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
        <span title="Utilities for controlling the border radius of an element.">Border Radius</span>
    </div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center gap-3">
        <SelectDistance header={"rounded-tl"} options={borderRadiusTLClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"TL"} bind:value={topLeftValue} bind:loaded bind:elementDataLoaded />
        <SelectDistance header={"rounded-tr"} options={borderRadiusTRClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"TR"} bind:value={topRightValue} bind:loaded bind:elementDataLoaded />
    </div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center gap-3">
        <SelectDistance header={"rounded-bl"} options={borderRadiusBLClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"BL"} bind:value={bottomLeftValue} bind:loaded bind:elementDataLoaded />
        <SelectDistance header={"rounded-br"} options={borderRadiusBRClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"BR"} bind:value={bottomRightValue} bind:loaded bind:elementDataLoaded />
    </div>


</div>