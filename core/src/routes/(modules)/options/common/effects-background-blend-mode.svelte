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
        
        {name: "Normal",        value: "bg-blend-normal",       info: "background-blend-mode: normal;"},
        {name: "Multiply",      value: "bg-blend-multiply",     info: "background-blend-mode: multiply;"},
        {name: "Screen",        value: "bg-blend-screen",       info: "background-blend-mode: screen;"},
        {name: "Overlay",       value: "bg-blend-overlay",      info: "background-blend-mode: overlay;"},
        {name: "Darken",        value: "bg-blend-darken",       info: "background-blend-mode: darken;"},
        {name: "Lighten",       value: "bg-blend-lighten",      info: "background-blend-mode: lighten;"},
        {name: "Color Dodge",   value: "bg-blend-color-dodge",  info: "background-blend-mode: color-dodge;"},
        {name: "Color Burn",    value: "bg-blend-color-burn",   info: "background-blend-mode: color-burn;"},
        {name: "Hard Light",    value: "bg-blend-hard-light",   info: "background-blend-mode: normal;"},
        {name: "Soft Light",    value: "bg-blend-soft-light",   info: "background-blend-mode: soft-light;"},
        {name: "Difference",    value: "bg-blend-difference",   info: "background-blend-mode: difference;"},
        {name: "Hue",           value: "bg-blend-hue",          info: "background-blend-mode: hue;"},
        {name: "Saturation",    value: "bg-blend-saturation",   info: "background-blend-mode: normal;"},
        {name: "Luminosity",    value: "bg-blend-luminosity",   info: "background-blend-mode: luminosity;"},

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
    <span title="Utilities for controlling how an element's background image should blend with its background color.">Background Blend Mode</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
