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
        {name: "Start",     value: "justify-items-start",     info: "justify-items: start;\n\nUse 'Start' to justify grid items against the start of their inline axis"},
        {name: "Center",    value: "justify-items-center",    info: "justify-items: center;\n\nUse 'Center' to justify grid items along their inline axis"},
        {name: "End",       value: "justify-items-end",       info: "justify-items: end;\n\nUse 'End' to justify grid items against the end of their inline axis"},
        {name: "Stretch",   value: "justify-items-stretch",   info: "justify-items: stretch;\n\nUse 'Stretch' to stretch items along their inline axis"},


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
    <span title="Utilities for controlling how grid items are aligned along their inline axis.">Justify Items</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
