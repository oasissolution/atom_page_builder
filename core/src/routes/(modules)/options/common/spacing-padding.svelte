<script>

    import "../../../../app.css";
    import Select from "../../../uicomponents/select.svelte";
    import { fade, fly, slide } from 'svelte/transition';
    import SelectDistance from "../../../uicomponents/select-distance.svelte";
    import { cssUnitOptions, paddingTopClassOptions, paddingRightClassOptions, paddingBottomClassOptions, paddingLeftClassOptions } from "./common-constants.svelte";

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
        updateClassWith("pt-", topValue);
    })();

    /**
     * @type string
     */
    let rightValue;
    $: rightValue, (()=>{
        updateClassWith("pr-", rightValue);
    })();

    /**
     * @type string
     */
    let bottomValue;
    $: bottomValue, (()=>{
        updateClassWith("pb-", bottomValue);
    })();

    /**
     * @type string
     */
    let leftValue;
    $: leftValue, (()=>{
        updateClassWith("pl-", leftValue);
    })();


</script>

<div class="w-full flex flex-col gap-3">

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
        <span title="Utilities for controlling an element's padding.">Padding</span>
    </div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center gap-3">
        <SelectDistance header={"pt"} options={paddingTopClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"T"} bind:value={topValue} bind:loaded bind:elementDataLoaded />
        <SelectDistance header={"pb"} options={paddingBottomClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"B"} bind:value={bottomValue} bind:loaded bind:elementDataLoaded />
    </div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center gap-3">
        <SelectDistance header={"pl"} options={paddingLeftClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"L"} bind:value={leftValue} bind:loaded bind:elementDataLoaded />
        <SelectDistance header={"pr"} options={paddingRightClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"R"} bind:value={rightValue} bind:loaded bind:elementDataLoaded />
    </div>


</div>