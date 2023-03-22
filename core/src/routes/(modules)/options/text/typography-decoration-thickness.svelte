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
    export let decorationThickness;


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
    let decorationThicknessOptions = [
        {name: "Default",    value: "",                      info: "Page Default"},
        {name: "Auto",       value: "decoration-auto",       info: "text-decoration-thickness: auto;"},
        {name: "From Font",  value: "decoration-from-font",  info: "text-decoration-thickness: from-font;"},
        {name: "0",          value: "decoration-0",          info: "text-decoration-thickness: 0px;"},
        {name: "1",          value: "decoration-1",          info: "text-decoration-thickness: 1px;"},
        {name: "2",          value: "decoration-2",          info: "text-decoration-thickness: 2px;"},
        {name: "4",          value: "decoration-4",          info: "text-decoration-thickness: 4px;"},
        {name: "8",          value: "decoration-8",          info: "text-decoration-thickness: 8px;"},
    ];

    /**
     * List of all decoration Thickness classes
     * @type Array<string>
     */
    const decorationThicknessList = [
        "decoration-auto",
        "decoration-from-font",
        "decoration-0",
        "decoration-1",
        "decoration-2",
        "decoration-4",
        "decoration-8",
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

                decorationThicknessList.forEach( elm => {
                    if(elm === currentClass) decorationThickness = elm;
                });


            });
        }
    })();

    $: decorationThickness, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "decoration-auto":
                    case "decoration-from-font":
                    case "decoration-0":
                    case "decoration-1":
                    case "decoration-2":
                    case "decoration-4":
                    case "decoration-8":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + decorationThickness;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the thickness of decoration of the text.">Decoration Thickness</span>
    <Select options={decorationThicknessOptions} bind:value={decorationThickness}/>
</div>