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
     * Actual display class
     * @type string
     */
    export let layoutDisplay;


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
    let layoutDisplayOptions = [
        {name: "Default",       value: "",              info: "Page Default"},
        {name: "Block",         value: "block",         info: "display: block;"},
        {name: "Inline Block",  value: "inline-block",  info: "display: inline-block;"},
        {name: "Inline",        value: "inline",        info: "display: inline;"},
        {name: "Flex",          value: "flex",          info: "display: flex;"},
        {name: "Inline Flex",   value: "inline-flex",   info: "display: inline-flex;"},
        {name: "Grid",          value: "grid",          info: "display: grid;"},
        {name: "Inline Grid",   value: "inline-grid",   info: "display: inline-grid;"},
        {name: "Contents",      value: "contents",      info: "display: contents;"},
        {name: "List Item",     value: "list-item",     info: "display: list-item;"},
        {name: "Hidden",        value: "hidden",        info: "display: none;"},
    ];

    /**
     * List of all display classes
     * @type Array<string>
     */
    export const layoutDisplayList = ["block", "inline-block", "inline", "flex", "inline-flex", "grid", "inline-grid", "contents", "list-item", "hidden"];

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

                layoutDisplayList.forEach( elm => {
                    if(elm === currentClass) layoutDisplay = elm;
                });


            });
        }
    })();


    $: layoutDisplay, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "block":
                    case "inline-block":
                    case "inline":
                    case "flex":
                    case "inline-flex":
                    case "grid":
                    case "inline-grid":
                    case "contents":
                    case "list-item":
                    case "hidden":
                    // case " ":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            if(layoutDisplay !== undefined) classInput = newClass.trim() + " " + layoutDisplay;
            updateClass();
        }
    })();

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the display box type of an element.">Display</span>
    <Select options={layoutDisplayOptions} bind:value={layoutDisplay}/>
</div>