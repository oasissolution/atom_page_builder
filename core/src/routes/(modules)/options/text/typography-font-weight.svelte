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
     * Actual font Weight class
     * @type string
     */
    export let fontWeight;


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
    let fontWeightOptions = [
        {name: "Default",       value: "",                  info: "Page Default"},
        {name: "Thin",          value: "font-thin",         info: "font-weight: 100;"},
        {name: "Extra light",   value: "font-extralight",   info: "font-weight: 200;"},
        {name: "Light",         value: "font-light",        info: "font-weight: 300;"},
        {name: "Normal",        value: "font-normal",       info: "font-weight: 400;"},
        {name: "Medium",        value: "font-medium",       info: "font-weight: 500;"},
        {name: "Semibold",      value: "font-semibold",     info: "font-weight: 600;"},
        {name: "Bold",          value: "font-bold",         info: "font-weight: 700;"},
        {name: "Extra bold",    value: "font-extrabold",    info: "font-weight: 800;"},
        {name: "Black",         value: "font-black",        info: "font-weight: 900;"},
        
    ];

    /**
     * List of all font Weight classes
     * @type Array<string>
     */
    const fontWeightList = ["font-thin", "font-extralight", "font-light", "font-normal", "font-medium", "font-semibold", "font-bold", "font-extrabold", "font-black"];

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

                fontWeightList.forEach( elm => {
                    if(elm === currentClass) fontWeight = elm;
                });


            });
        }
    })();

    $: fontWeight, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "font-thin":
                    case "font-extralight":
                    case "font-light":
                    case "font-normal":
                    case "font-medium":
                    case "font-semibold":
                    case "font-bold":
                    case "font-extrabold":
                    case "font-black":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + fontWeight;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the weight of text.">Font Weight</span>
    <Select options={fontWeightOptions} bind:value={fontWeight}/>
</div>