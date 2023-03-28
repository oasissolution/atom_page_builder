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

        {name: "Default",   value: "",                       info: "Default"},
        {name: "Auto",      value: "justify-self-auto",      info: "justify-self: auto;\n\nUse 'Self Auto' to align an item based on the value of the grid’s 'Justify Items' property"},
        {name: "Start",     value: "justify-self-start",     info: "justify-self: start;\n\nUse 'Start' to align a grid item to the start its inline axis"},
        {name: "Center",    value: "justify-self-center",    info: "justify-self: center;\n\nUse 'Center' to align a grid item along the center its inline axis"},
        {name: "End",       value: "justify-self-end",       info: "justify-self: end;\n\nUse 'End' to align a grid item to the end its inline axis"},
        {name: "Stretch",   value: "justify-self-stretch",   info: "justify-self: stretch;\n\nUse 'Stretch' to stretch a grid item to fill the grid area on its inline axis"},


        // {name: "",     value: "",     info: ""},
    ];

    /**
     * List of all classes
     * @type Array<string>
     */
    let propertyList = [];

    propertyOptions.forEach(elm => {
        propertyList.push(elm.value);
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
    <span title="Utilities for controlling how an individual grid item is aligned along its inline axis.
    
Use when item needs to be differently justified of its container's 'Justify Items' property.">Justify Self</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
