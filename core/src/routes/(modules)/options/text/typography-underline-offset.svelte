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
     * Actual line height class
     * @type string
     */
    export let underlineOffset;


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
    let underlineOffsetOptions = [
        {name: "Default",    value: "",                      info: "Page Default"},
        {name: "Auto",       value: "underline-offset-auto",       info: "text-underline-offset: auto;"},
        {name: "0",          value: "underline-offset-0",          info: "text-underline-offset: 0px;"},
        {name: "1",          value: "underline-offset-1",          info: "text-underline-offset: 1px;"},
        {name: "2",          value: "underline-offset-2",          info: "text-underline-offset: 2px;"},
        {name: "4",          value: "underline-offset-4",          info: "text-underline-offset: 4px;"},
        {name: "8",          value: "underline-offset-8",          info: "text-underline-offset: 8px;"},
    ];

    /**
     * List of all underline Offset classes
     * @type Array<string>
     */
    const underlineOffsetList = [
        "underline-offset-auto",
        "underline-offset-0",
        "underline-offset-1",
        "underline-offset-2",
        "underline-offset-4",
        "underline-offset-8",
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

                underlineOffsetList.forEach( elm => {
                    if(elm === currentClass) underlineOffset = elm;
                });


            });
        }
    })();

    $: underlineOffset, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "underline-offset-auto":
                    case "underline-offset-0":
                    case "underline-offset-1":
                    case "underline-offset-2":
                    case "underline-offset-4":
                    case "underline-offset-8":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + underlineOffset;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the offset of a text underline.">Underline Offset</span>
    <Select options={underlineOffsetOptions} bind:value={underlineOffset}/>
</div>