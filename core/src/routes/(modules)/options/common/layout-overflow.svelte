<script>

    import "../../../../app.css";
    import Select from "../../../uicomponents/select.svelte";

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
     * Actual Overflow class
     * @type string
     */
    export let layoutOverflow;


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
    let layoutOverflowOptions = [
        {name: "Default",   value: "",                      info: "Default - No value"},
        {name: "auto",      value: "overflow-auto",         info: "overflow: auto;"},
        {name: "x-auto",    value: "overflow-x-auto",       info: "overflow-x: auto;"},
        {name: "y-auto",    value: "overflow-y-auto",       info: "overflow-y: auto;"},
        {name: "hidden",    value: "overflow-hidden",       info: "overflow: hidden;"},
        {name: "x-hidden",  value: "overflow-x-hidden",     info: "overflow-x: hidden;"},
        {name: "y-hidden",  value: "overflow-y-hidden",     info: "overflow-y: hidden;"},
        {name: "clip",      value: "overflow-clip",         info: "overflow: clip;"},
        {name: "x-clip",    value: "overflow-x-clip",       info: "overflow-x: clip;"},
        {name: "y-clip",    value: "overflow-y-clip",       info: "overflow-y: clip;"},
        {name: "visible",   value: "overflow-visible",      info: "overflow: visible;"},
        {name: "x-visible", value: "overflow-x-visible",    info: "overflow-x: visible;"},
        {name: "y-visible", value: "overflow-y-visible",    info: "overflow-y: visible;"},
        {name: "scroll",    value: "overflow-scroll",       info: "overflow: scroll;"},
        {name: "x-scroll",  value: "overflow-x-scroll",     info: "overflow-x: scroll;"},
        {name: "y-scroll",  value: "overflow-y-scroll",     info: "overflow-y: scroll;"},
    ];


    /**
     * List of all Overflow classes
     * @type Array<string>
     */
    export const layoutOverflowList = [
        "overflow-auto",
        "overflow-x-auto",
        "overflow-y-auto",
        "overflow-hidden",
        "overflow-x-hidden",
        "overflow-y-hidden",
        "overflow-clip",
        "overflow-x-clip",
        "overflow-y-clip",
        "overflow-visible",
        "overflow-x-visible",
        "overflow-y-visible",
        "overflow-scroll",
        "overflow-x-scroll",
        "overflow-y-scroll",
    ];

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

                layoutOverflowList.forEach( elm => {
                    if(elm === currentClass) layoutOverflow = elm;
                });


            });
        }
    })();


    $: layoutOverflow, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "overflow-auto":
                    case "overflow-x-auto":
                    case "overflow-y-auto":
                    case "overflow-hidden":
                    case "overflow-x-hidden":
                    case "overflow-y-hidden":
                    case "overflow-clip":
                    case "overflow-x-clip":
                    case "overflow-y-clip":
                    case "overflow-visible":
                    case "overflow-x-visible":
                    case "overflow-y-visible":
                    case "overflow-scroll":
                    case "overflow-x-scroll":
                    case "overflow-y-scroll":
                    // case " ":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            if(layoutOverflow !== undefined) classInput = newClass.trim() + " " + layoutOverflow;
            updateClass();
        }
    })();

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling how an element handles content that is too large for the container.">Overflow</span>
    <Select options={layoutOverflowOptions} bind:value={layoutOverflow}/>
</div>