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

        {name: "Default",   value: "",                info: "Default"},
        {name: "Start",     value: "items-start",     info: "align-items: flex-start;\n\nUse 'Start' to align items to the start of the container’s cross axis"},
        {name: "Center",    value: "items-center",    info: "align-items: center;\n\nUse 'Center' to align items along the center of the container’s cross axis"},
        {name: "End",       value: "items-end",       info: "align-items: flex-end;\n\nUse 'End' to align items to the end of the container’s cross axis"},
        {name: "Stretch",   value: "items-stretch",   info: "align-items: stretch;\n\nUse 'Stretch' to stretch items to fill the container’s cross axis"},
        {name: "Baseline",  value: "items-baseline",  info: "align-items: baseline;\n\nUse 'Baseline' to align items along the container’s cross axis such that all of their baselines align"},

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
    <span title="Utilities for controlling how flex and grid items are positioned along a container's cross axis.">Align Items</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
