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
        
        {name: "Center",         value: "origin-center",        info: "transform-origin: center;"},
        {name: "Top",            value: "origin-top",           info: "transform-origin: top;"},
        {name: "Top Right",      value: "origin-top-right",     info: "transform-origin: top right;"},
        {name: "Right",          value: "origin-right",         info: "transform-origin: right;"},
        {name: "Bottom Right",   value: "origin-bottom-right",  info: "transform-origin: bottom right;"},
        {name: "Bottom",         value: "origin-bottom",        info: "transform-origin: bottom;"},
        {name: "Bottom Left",    value: "origin-bottom-left",   info: "transform-origin: bottom left;"},
        {name: "Left",           value: "origin-left",          info: "transform-origin: left;"},
        {name: "Top Left",       value: "origin-top-left",      info: "transform-origin: top left;"},


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
    <span title="Utilities for specifying the origin for an element's transformations.">Transform Origin</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
