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
     * Actual class
     * @type string
     */
    export let textOverflow;


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
    let textOverflowOptions = [
        {name: "Default",   value: "",              info: "Page Default"},
        {name: "Truncate",  value: "truncate",      info: "overflow: hidden;\ntext-overflow: ellipsis;\nwhite-space: nowrap;"},
        {name: "Ellipsis",  value: "text-ellipsis", info: "text-overflow: ellipsis;"},
        {name: "Clip",      value: "text-clip",     info: "text-overflow: clip;"},

    ];

    /**
     * List of all classes
     * @type Array<string>
     */
    const textOverflowList = [
        "truncate",
        "text-ellipsis",
        "text-clip",
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

                textOverflowList.forEach( elm => {
                    if(elm === currentClass) textOverflow = elm;
                });


            });
        }
    })();

    $: textOverflow, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "truncate":
                    case "text-ellipsis":
                    case "text-clip":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + textOverflow;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling text overflow in an element.">Text Overflow</span>
    <Select options={textOverflowOptions} bind:value={textOverflow}/>
</div>