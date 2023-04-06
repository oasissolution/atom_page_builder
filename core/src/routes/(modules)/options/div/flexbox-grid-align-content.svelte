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
        {name: "Start",     value: "content-start",     info: "align-content: flex-start;\n\nUse 'Start' to pack rows in a container against the start of the cross axis"},
        {name: "Center",    value: "content-center",    info: "align-content: center;\n\nUse 'Center' to pack rows in a container in the center of the cross axis"},
        {name: "End",       value: "content-end",       info: "align-content: flex-end;\n\nUse 'End' to pack rows in a container against the end of the cross axis"},
        {name: "Between",   value: "content-between",   info: "align-content: space-between;\n\nUse 'Between' to distribute rows in a container such that there is an equal amount of space between each line"},
        {name: "Around",    value: "content-around",    info: "align-content: space-around;\n\nUse 'Around' to distribute rows in a container such that there is an equal amount of space around each line"},
        {name: "Evenly",    value: "content-evenly",    info: "align-content: space-evenly;\n\nUse 'Evenly' to distribute rows in a container such that there is an equal amount of space around each item, but also accounting for the doubling of space you would normally see between each item when using 'Around'."},
        {name: "Baseline",  value: "content-baseline",  info: "align-content: baseline;\n\n"},
    

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
    <span title="Utilities for controlling how rows are positioned in multi-row flex and grid containers.">Align Content</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
