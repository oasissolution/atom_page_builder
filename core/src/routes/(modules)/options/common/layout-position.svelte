<script>

    import "../../../../app.css";
    import Select from "../../../uicomponents/select.svelte";
    import { fade, fly, slide } from 'svelte/transition';

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

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling how an element is positioned in the DOM.">Position</span>
    <Select options={layoutPositionOptions} bind:value={layoutPosition}/>
</div>

{#if layoutPosition == "absolute" || layoutPosition == "fixed"}

<div class="w-full flex flex-col flex-grow justify-between h-16 align-middle items-center" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }}>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
        <span title="Utilities for controlling how an element is positioned in the DOM.">Placement</span>
        <span>unit</span>
    </div>

    <div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
        <span>w</span>
        <span>w</span>
        <span>w</span>
        <span>w</span>
    </div>

</div>

{/if}