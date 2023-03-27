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
       
        {name: "Start 1",       value: "col-start-1",       info: "grid-column-start: 1;"},
        {name: "Start 2",       value: "col-start-2",       info: "grid-column-start: 2;"},
        {name: "Start 3",       value: "col-start-3",       info: "grid-column-start: 3;"},
        {name: "Start 4",       value: "col-start-4",       info: "grid-column-start: 4;"},
        {name: "Start 5",       value: "col-start-5",       info: "grid-column-start: 5;"},
        {name: "Start 6",       value: "col-start-6",       info: "grid-column-start: 6;"},
        {name: "Start 7",       value: "col-start-7",       info: "grid-column-start: 7;"},
        {name: "Start 8",       value: "col-start-8",       info: "grid-column-start: 8;"},
        {name: "Start 9",       value: "col-start-9",       info: "grid-column-start: 9;"},
        {name: "Start 10",      value: "col-start-10",      info: "grid-column-start: 10;"},
        {name: "Start 11",      value: "col-start-11",      info: "grid-column-start: 11;"},
        {name: "Start 12",      value: "col-start-12",      info: "grid-column-start: 12;"},
        {name: "Start 13",      value: "col-start-13",      info: "grid-column-start: 13;"},
        {name: "Start Auto",    value: "col-start-auto",    info: "grid-column-start: auto;"},
        
        {name: "End 1",         value: "col-end-1",         info: "grid-column-end: 1;"},
        {name: "End 2",         value: "col-end-2",         info: "grid-column-end: 2;"},
        {name: "End 3",         value: "col-end-3",         info: "grid-column-end: 3;"},
        {name: "End 4",         value: "col-end-4",         info: "grid-column-end: 4;"},
        {name: "End 5",         value: "col-end-5",         info: "grid-column-end: 5;"},
        {name: "End 6",         value: "col-end-6",         info: "grid-column-end: 6;"},
        {name: "End 7",         value: "col-end-7",         info: "grid-column-end: 7;"},
        {name: "End 8",         value: "col-end-8",         info: "grid-column-end: 8;"},
        {name: "End 9",         value: "col-end-9",         info: "grid-column-end: 9;"},
        {name: "End 10",        value: "col-end-10",        info: "grid-column-end: 10;"},
        {name: "End 11",        value: "col-end-11",        info: "grid-column-end: 11;"},
        {name: "End 12",        value: "col-end-12",        info: "grid-column-end: 12;"},
        {name: "End 13",        value: "col-end-13",        info: "grid-column-end: 13;"},
        {name: "End Auto",      value: "col-end-auto",      info: "grid-column-end: auto;"},

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
    <span title="Utilities for controlling how elements are placed across grid columns.

Use the Span-(n) utilities to make an element span n columns.

Use the Start-(n) and End-(n) utilities to make an element start or end at the nth grid line. These can also be combined with the Span-(n) utilities to span a specific number of columns.

Note that CSS grid lines start at 1, not 0, so a full-height element in a 3-row grid would start at line 1 and end at line 4.">
    Grid Column Start / End</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
