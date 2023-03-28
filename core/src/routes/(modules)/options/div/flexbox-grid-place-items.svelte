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

        {name: "Default",   value: "",                      info: "Default"},
        {name: "Start",     value: "place-items-start",     info: "place-items: start;\n\nUse 'Start' to place grid items on the start of their grid areas on both axes"},
        {name: "Center",    value: "place-items-center",    info: "place-items: center;\n\nUse 'Center' to place grid items on the center of their grid areas on both axes"},
        {name: "End",       value: "place-items-end",       info: "place-items: end;\n\nUse 'End' to place grid items on the end of their grid areas on both axes"},
        {name: "Stretch",   value: "place-items-stretch",   info: "place-items: stretch;\n\nUse 'Stretch' to stretch items along their grid areas on both axes"},
        {name: "Baseline",  value: "place-items-baseline",  info: "place-items: baseline;"},

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
    <span title="Utilities for controlling how items are justified and aligned at the same time.">Place Items</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
