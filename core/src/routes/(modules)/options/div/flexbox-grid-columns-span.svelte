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
        
        {name: "Default",       value: "",                  info: "Default"},
        {name: "Auto",          value: "col-auto",          info: "grid-column: auto;"},

        {name: "Span 1",        value: "col-span-1",        info: "grid-column: span 1 / span 1;"},
        {name: "Span 2",        value: "col-span-2",        info: "grid-column: span 2 / span 2;"},
        {name: "Span 3",        value: "col-span-3",        info: "grid-column: span 3 / span 3;"},
        {name: "Span 4",        value: "col-span-4",        info: "grid-column: span 4 / span 4;"},
        {name: "Span 5",        value: "col-span-5",        info: "grid-column: span 5 / span 5;"},
        {name: "Span 6",        value: "col-span-6",        info: "grid-column: span 6 / span 6;"},
        {name: "Span 7",        value: "col-span-7",        info: "grid-column: span 7 / span 7;"},
        {name: "Span 8",        value: "col-span-8",        info: "grid-column: span 8 / span 8;"},
        {name: "Span 9",        value: "col-span-9",        info: "grid-column: span 9 / span 9;"},
        {name: "Span 10",       value: "col-span-10",       info: "grid-column: span 10 / span 10;"},
        {name: "Span 11",       value: "col-span-11",       info: "grid-column: span 11 / span 11;"},
        {name: "Span 12",       value: "col-span-12",       info: "grid-column: span 12 / span 12;"},
        {name: "Span Full",     value: "col-span-full",     info: "grid-column: 1 / -1;"},
       
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
    <span title="Utilities for controlling how elements are sized across grid columns.

Use the Span-(n) utilities to make an element span n columns.">
    Grid Column Span</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
