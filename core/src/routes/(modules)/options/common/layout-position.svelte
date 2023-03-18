<script>

    import "../../../../app.css";
    import Select from "../../../uicomponents/select.svelte";
    import { fade, fly, slide } from 'svelte/transition';
    import SelectDistance from "../../../uicomponents/select-distance.svelte";
    import { cssUnitOptions, topClassOptions, rightClassOptions, bottomClassOptions, leftClassOptions } from "./common-constants.svelte";

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
     * Actual position class
     * @type string
     */
    export let layoutPosition;

    /**
     * Actual position class
     * @type string
     */
    let selectedUnit = "class";


    /**
     * @typedef {Object} SelectOptions
     * @property {string} value
     * @property {string} name
     * @property {string} info
    */




    /**
         * Value of element
         * @type Array<SelectOptions>
         */
    let layoutPositionOptions = [
        {name: "Default",   value: "",          info: "Page Default"},
        {name: "Static",    value: "static",    info: "position: static;"},
        {name: "Fixed",     value: "fixed",     info: "position: fixed;"},
        {name: "Absolute",  value: "absolute",  info: "position: absolute;"},
        {name: "Relative",  value: "relative",  info: "position: relative;"},
        {name: "Sticky",    value: "sticky",    info: "position: sticky;"},
    ];

    /**
     * List of all position classes
     * @type Array<string>
     */
    export const layoutPositionList = ["static", "fixed", "absolute", "relative", "sticky"];

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

    $: loaded, (()=>{
        if(loaded == true) {
            elementDataLoaded.split(" ").forEach( cls => {

                var currentClass = cls.trim();

                layoutPositionList.forEach( elm => {
                    if(elm === currentClass) layoutPosition = elm;
                });

            });

        }
    })();


    $: layoutPosition, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "static":
                    case "fixed":
                    case "absolute":
                    case "relative":
                    case "sticky":
                    // case " ":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            if(layoutPosition !== undefined) classInput = newClass.trim() + " " + layoutPosition;
            updateClass();
        }
    })();


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
        updateClassWith("top-", topValue);
    })();

    /**
     * @type string
     */
    let rightValue;
    $: rightValue, (()=>{
        updateClassWith("right-", rightValue);
    })();

    /**
     * @type string
     */
    let bottomValue;
    $: bottomValue, (()=>{
        updateClassWith("bottom-", bottomValue);
    })();

    /**
     * @type string
     */
    let leftValue;
    $: leftValue, (()=>{
        updateClassWith("left-", leftValue);
    })();


</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling how an element is positioned in the DOM.">Position</span>
    <Select options={layoutPositionOptions} bind:value={layoutPosition}/>
</div>

{#if layoutPosition != "static" && layoutPosition != ""}

<div class="w-full flex flex-col pt-2 gap-3" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }}>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
        <span title="Utilities for controlling how an element is positioned in the DOM.">Placement</span>
    </div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center gap-3">
        <SelectDistance header={"top"} options={topClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"T"} bind:value={topValue} bind:loaded bind:elementDataLoaded />
        <SelectDistance header={"bottom"} options={bottomClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"B"} bind:value={bottomValue} bind:loaded bind:elementDataLoaded />
    </div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center gap-3">
        <SelectDistance header={"left"} options={leftClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"L"} bind:value={leftValue} bind:loaded bind:elementDataLoaded />
        <SelectDistance header={"right"} options={rightClassOptions} unitClassOptions={cssUnitOptions} leadingLetter={"R"} bind:value={rightValue} bind:loaded bind:elementDataLoaded />
    </div>

</div>

{/if}