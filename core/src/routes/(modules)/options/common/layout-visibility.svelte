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
     * Actual Visibility class
     * @type string
     */
    export let layoutVisibility;


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
    let layoutVisibilityOptions = [
        {name: "Default",   value: "",          info: "Default - No value"},
        {name: "Visible",   value: "visible",   info: "visibility: visible;"},
        {name: "Invisible", value: "invisible", info: "visibility: hidden;"},
        {name: "Collapse",  value: "collapse",  info: "visibility: collapse;"},
    ];


    /**
     * List of all Visibility classes
     * @type Array<string>
     */
    export const layoutVisibilityList = [
        "visible",
        "invisible",
        "collapse",
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

                layoutVisibilityList.forEach( elm => {
                    if(elm === currentClass) layoutVisibility = elm;
                });


            });
        }
    })();


    $: layoutVisibility, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "visible":
                    case "invisible":
                    case "collapse":
                    // case " ":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            if(layoutVisibility !== undefined) classInput = newClass.trim() + " " + layoutVisibility;
            updateClass();
        }
    })();

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the visibility of an element.">Visibility</span>
    <Select options={layoutVisibilityOptions} bind:value={layoutVisibility}/>
</div>