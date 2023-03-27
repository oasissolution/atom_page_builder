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
        
        {name: "Default",  value: "",               info: "Default"},
        {name: "1",        value: "grid-cols-1",    info: "grid-template-columns: repeat(1, minmax(0, 1fr));"},
        {name: "2",        value: "grid-cols-2",    info: "grid-template-columns: repeat(2, minmax(0, 1fr));"},
        {name: "3",        value: "grid-cols-3",    info: "grid-template-columns: repeat(3, minmax(0, 1fr));"},
        {name: "4",        value: "grid-cols-4",    info: "grid-template-columns: repeat(4, minmax(0, 1fr));"},
        {name: "5",        value: "grid-cols-5",    info: "grid-template-columns: repeat(5, minmax(0, 1fr));"},
        {name: "6",        value: "grid-cols-6",    info: "grid-template-columns: repeat(6, minmax(0, 1fr));"},
        {name: "7",        value: "grid-cols-7",    info: "grid-template-columns: repeat(7, minmax(0, 1fr));"},
        {name: "8",        value: "grid-cols-8",    info: "grid-template-columns: repeat(8, minmax(0, 1fr));"},
        {name: "9",        value: "grid-cols-9",    info: "grid-template-columns: repeat(9, minmax(0, 1fr));"},
        {name: "10",       value: "grid-cols-10",   info: "grid-template-columns: repeat(10, minmax(0, 1fr));"},
        {name: "11",       value: "grid-cols-11",   info: "grid-template-columns: repeat(11, minmax(0, 1fr));"},
        {name: "12",       value: "grid-cols-12",   info: "grid-template-columns: repeat(12, minmax(0, 1fr));"},
        {name: "None",     value: "grid-cols-none", info: "grid-template-columns: none"},
        
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
    <span title="Utilities for specifying the columns in a grid layout. 
Use utilities to create grids with n equally sized columns.">Grid Template Columns</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
