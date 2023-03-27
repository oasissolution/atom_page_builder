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
        
        {name: "None",     value: "order-none",     info: "order: 0;"},
        {name: "Last",     value: "order-last",     info: "order: 9999;"},
        {name: "First",    value: "order-first",    info: "order: -9999;"},

        {name: "12",       value: "order-12",       info: "order: 12;"},
        {name: "11",       value: "order-11",       info: "order: 11;"},
        {name: "10",       value: "order-10",       info: "order: 10;"},
        {name: "9",        value: "order-9",        info: "order: 9;"},
        {name: "8",        value: "order-8",        info: "order: 8;"},
        {name: "7",        value: "order-7",        info: "order: 7;"},
        {name: "6",        value: "order-6",        info: "order: 6;"},
        {name: "5",        value: "order-5",        info: "order: 5;"},
        {name: "4",        value: "order-4",        info: "order: 4;"},
        {name: "3",        value: "order-3",        info: "order: 3;"},
        {name: "2",        value: "order-2",        info: "order: 2;"},
        {name: "1",        value: "order-1",        info: "order: 1;"},

        {name: "Default",  value: "",               info: "Default"},
        
        {name: "-1",       value: "-order-1",       info: "order: 1;"},
        {name: "-2",       value: "-order-2",       info: "order: 2;"},
        {name: "-3",       value: "-order-3",       info: "order: 3;"},
        {name: "-4",       value: "-order-4",       info: "order: 4;"},
        {name: "-5",       value: "-order-5",       info: "order: 5;"},
        {name: "-6",       value: "-order-6",       info: "order: 6;"},
        {name: "-7",       value: "-order-7",       info: "order: 7;"},
        {name: "-8",       value: "-order-8",       info: "order: 8;"},
        {name: "-9",       value: "-order-9",       info: "order: 9;"},
        {name: "-10",      value: "-order-10",      info: "order: 10;"},
        {name: "-11",      value: "-order-11",      info: "order: 11;"},
        {name: "-12",      value: "-order-12",      info: "order: 12;"},


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
    <span title="Utilities for controlling the order of flex and grid items. 
Use order to render flex and grid items in a different order than they appear in the DOM.">Order</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
