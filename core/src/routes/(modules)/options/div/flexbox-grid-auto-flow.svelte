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

        {name: "Default",       value: "",                      info: "Default"},
        {name: "Row",           value: "grid-flow-row",         info: "grid-auto-flow: row;"},
        {name: "Column",        value: "grid-flow-col",         info: "grid-auto-flow: column;"},
        {name: "Dense",         value: "grid-flow-dense",       info: "grid-auto-flow: dense;"},
        {name: "Row Dense",     value: "grid-flow-row-dense",   info: "grid-auto-flow: row dense;"},
        {name: "Column Dense",  value: "grid-flow-col-dense",   info: "grid-auto-flow: column dense;"},

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
    <span title="Utilities for controlling how elements in a grid are auto-placed.">Grid Auto Flow</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
