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
     * Actual part of class
     * @type string
     */
    export let property;


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
    let propertyOptions = [
        
        {name: "Default",  value: "",               info: "Default"},
       
        {name: "Normal",        value: "mix-blend-normal",          info: "mix-blend-mode: normal;"},
        {name: "Multiply",      value: "mix-blend-multiply",        info: "mix-blend-mode: multiply;"},
        {name: "Screen",        value: "mix-blend-screen",          info: "mix-blend-mode: screen;"},
        {name: "Overlay",       value: "mix-blend-overlay",         info: "mix-blend-mode: overlay;"},
        {name: "Darken",        value: "mix-blend-darken",          info: "mix-blend-mode: darken;"},
        {name: "Lighten",       value: "mix-blend-lighten",         info: "mix-blend-mode: lighten;"},
        {name: "Color Dodge",   value: "mix-blend-color-dodge",     info: "mix-blend-mode: color-dodge;"},
        {name: "Color Burn",    value: "mix-blend-color-burn",      info: "mix-blend-mode: color-burn;"},
        {name: "Hard Light",    value: "mix-blend-hard-light",      info: "mix-blend-mode: hard-light;"},
        {name: "Soft Light",    value: "mix-blend-soft-light",      info: "mix-blend-mode: soft-light;"},
        {name: "Difference",    value: "mix-blend-difference",      info: "mix-blend-mode: difference;"},
        {name: "Hue",           value: "mix-blend-hue",             info: "mix-blend-mode: hue;"},
        {name: "Saturation",    value: "mix-blend-saturation",      info: "mix-blend-mode: saturation;"},
        {name: "Color",         value: "mix-blend-color",           info: "mix-blend-mode: color;"},
        {name: "Luminosity",    value: "mix-blend-luminosity",      info: "mix-blend-mode: luminosity;"},
        {name: "Plus Lighter",  value: "mix-blend-plus-lighter",    info: "mix-blend-mode: plus-lighter;"},


        // {name: "",     value: "",     info: ""},
       
    ];

    /**
     * List of all classes
     * @type Array<string>
     */
    let propertyList = [];

    propertyOptions.forEach(elm => {
        if(elm.value != "") propertyList.push(elm.value);
    });

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

                propertyList.forEach( elm => {
                    if(elm === currentClass) property = elm;
                });


            });
        }
    })();

    $: property, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {

                if(propertyList.includes(cls.trim())){
                    ///Do nothing - If included then should be removed
                }else{
                    newClass += " " + cls.trim();
                }
            });

            classInput = newClass.trim() + " " + property;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling how an element should blend with the background.">Mix Blend Mode</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
