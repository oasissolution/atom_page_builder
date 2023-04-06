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
        
        {name: "Default",  value: "",               info: "Default - No Shadow"},
       
        {name: "Small",     value: "shadow-sm",     info: "box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);"},
        {name: "Standard",  value: "shadow",        info: "box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);"},
        {name: "Medium",    value: "shadow-md",     info: "box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);"},
        {name: "Large",     value: "shadow-lg",     info: "box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);"},
        {name: "X-Large",   value: "shadow-xl",     info: "box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);"},
        {name: "2X-Large",  value: "shadow-2xl",    info: "box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);"},
        {name: "Inner",     value: "shadow-inner",  info: "box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);"},
        {name: "None",      value: "shadow-none",   info: "box-shadow: 0 0 #0000;"},

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
    <span title="Utilities for controlling the box shadow of an element.">Box Shadow</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
