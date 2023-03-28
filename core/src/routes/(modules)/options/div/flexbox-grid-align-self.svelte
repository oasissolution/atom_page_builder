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

        {name: "Default",   value: "",               info: "Default"},
        {name: "Auto",      value: "self-auto",      info: "align-self: auto;\n\nUse 'Auto' to align an item based on the value of the container’s 'Align Items' property"},
        {name: "Start",     value: "self-start",     info: "align-self: start;\n\nUse 'Start' to align an item to the start of the container’s cross axis, despite the container’s 'Align Items' value"},
        {name: "Center",    value: "self-center",    info: "align-self: center;\n\nUse 'Center' to align an item along the center of the container’s cross axis, despite the container’s 'Align Items' value"},
        {name: "End",       value: "self-end",       info: "align-self: end;\n\nUse 'End' to align an item to the end of the container’s cross axis, despite the container’s 'Align Items' value"},
        {name: "Stretch",   value: "self-stretch",   info: "align-self: stretch;\n\nUse 'Stretch' to stretch an item to fill the container’s cross axis, despite the container’s 'Align Items' value"},
        {name: "Baseline",  value: "self-baseline",  info: "align-self: baseline;\n\n"},


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
    <span title="Utilities for controlling how an individual flex or grid item is positioned along its container's cross axis.
    
Use when item needs to be differently aligned of its container's 'Align Items' property.">Align Self</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
