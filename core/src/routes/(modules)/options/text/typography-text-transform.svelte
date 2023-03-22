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
    export let textTransform;


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
    let textTransformOptions = [
        {name: "Default",       value: "",              info: "Page Default"},
        {name: "Uppercase",     value: "uppercase",     info: "text-transform: uppercase;"},
        {name: "Lowercase",     value: "lowercase",     info: "text-transform: lowercase;"},
        {name: "Capitalize",    value: "capitalize",    info: "text-transform: capitalize;"},
        {name: "Normal case",   value: "normal-case",   info: "text-transform: none;"},
    ];

    /**
     * List of all classes
     * @type Array<string>
     */
    const textTransformList = [
        "uppercase",
        "lowercase",
        "capitalize",
        "normal-case",
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

                textTransformList.forEach( elm => {
                    if(elm === currentClass) textTransform = elm;
                });


            });
        }
    })();

    $: textTransform, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "uppercase":
                    case "lowercase":
                    case "capitalize":
                    case "normal-case":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + textTransform;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the transformation of text.">Text Transform</span>
    <Select options={textTransformOptions} bind:value={textTransform}/>
</div>