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
     * Actual ZIndex class
     * @type string
     */
    export let layoutZIndex;


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
    let layoutZIndexOptions = [
        {name: "z-auto",    value: "z-auto", info: "z-index: auto;"},
        {name: "z-50",      value: "z-50",   info: "z-index: 50;"},
        {name: "z-40",      value: "z-40",   info: "z-index: 40;"},
        {name: "z-30",      value: "z-30",   info: "z-index: 30;"},
        {name: "z-20",      value: "z-20",   info: "z-index: 20;"},
        {name: "z-10",      value: "z-10",   info: "z-index: 10;"},
        {name: "z-0",       value: "z-0",    info: "z-index: 0;"},
        {name: "Default",   value: "",       info: "Default - No value"},
        {name: "-z-10",     value: "-z-10",  info: "z-index: -10;"},
        {name: "-z-20",     value: "-z-20",  info: "z-index: -20;"},
        {name: "-z-30",     value: "-z-30",  info: "z-index: -30;"},
        {name: "-z-40",     value: "-z-40",  info: "z-index: -40;"},
        {name: "-z-50",     value: "-z-50",  info: "z-index: -50;"},
    ];


    /**
     * List of all Z-Index classes
     * @type Array<string>
     */
    export const layoutZIndexList = [
        "z-auto",
        "z-50",
        "z-40",
        "z-30",
        "z-20",
        "z-10",
        "z-0",
        "-z-10",
        "-z-20",
        "-z-30",
        "-z-40",
        "-z-50",
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

                layoutZIndexList.forEach( elm => {
                    if(elm === currentClass) layoutZIndex = elm;
                });


            });
        }
    })();


    $: layoutZIndex, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "z-auto":
                    case "z-50":
                    case "z-40":
                    case "z-30":
                    case "z-20":
                    case "z-10":
                    case "z-0":
                    case "-z-10":
                    case "-z-20":
                    case "-z-30":
                    case "-z-40":
                    case "-z-50":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            if(layoutZIndex !== undefined) classInput = newClass.trim() + " " + layoutZIndex;
            updateClass();
        }
    })();

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the stack order of an element.">Z-Index</span>
    <Select options={layoutZIndexOptions} bind:value={layoutZIndex}/>
</div>