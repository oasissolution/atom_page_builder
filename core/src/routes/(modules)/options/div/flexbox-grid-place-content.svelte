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

        {name: "Default",   value: "",                        info: "Default"},
        {name: "Start",     value: "place-content-start",     info: "place-content: start;\n\nUse 'Start' to pack items against the start of the block axis"},
        {name: "Center",    value: "place-content-center",    info: "place-content: center;\n\nUse 'Center' to pack items in the center of the block axis"},
        {name: "End",       value: "place-content-end",       info: "place-content: end;\n\nUse 'End' to to pack items against the end of the block axis"},
        {name: "Between",   value: "place-content-between",   info: "place-content: space-between;\n\nUse 'Between' to distribute grid items along the block axis so that that there is an equal amount of space between each row on the block axis"},
        {name: "Around",    value: "place-content-around",    info: "place-content: space-around;\n\nUse 'Around' distribute grid items such that there is an equal amount of space around each row on the block axis"},
        {name: "Evenly",    value: "place-content-evenly",    info: "place-content: space-evenly;\n\nUse 'Evenly' to distribute grid items such that they are evenly spaced on the block axis"},
        {name: "Baseline",  value: "place-content-baseline",  info: "place-content: baseline;"},
        {name: "Stretch",   value: "place-content-stretch",   info: "place-content: stretch;\n\nUse 'Stretch' to stretch grid items along their grid areas on the block axis"},
    
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
    <span title="Utilities for controlling how content is justified and aligned at the same time.">Place Content</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
