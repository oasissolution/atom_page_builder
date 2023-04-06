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

        {name: "Default",   value: "",                  info: "Default"},
        {name: "Start",     value: "justify-start",     info: "justify-content: flex-start;\n\nUse 'Start' to justify items against the start of the container’s main axis"},
        {name: "Center",    value: "justify-center",    info: "justify-content: center;\n\nUse 'Center' to justify items along the center of the container’s main axis"},
        {name: "End",       value: "justify-end",       info: "justify-content: flex-end;\n\nUse 'End' to justify items against the end of the container’s main axis"},
        {name: "Between",   value: "justify-between",   info: "justify-content: space-between;\n\nUse 'Between' to justify items along the container’s main axis such that there is an equal amount of space between each item"},
        {name: "Around",    value: "justify-around",    info: "justify-content: space-around;\n\nUse 'Around' to justify items along the container’s main axis such that there is an equal amount of space on each side of each item"},
        {name: "Evenly",    value: "justify-evenly",    info: "justify-content: space-evenly;\n\nUse 'Evenly' to justify items along the container’s main axis such that there is an equal amount of space around each item, but also accounting for the doubling of space you would normally see between each item when using Around"},
    

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
    <span title="Utilities for controlling how flex and grid items are positioned along a container's main axis.">Justify Content</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
