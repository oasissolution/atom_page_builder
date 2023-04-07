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
        
        {name: "None",      value: "blur-none", info: "filter: blur(0);"},
        {name: "Small",     value: "blur-sm",   info: "filter: blur(4px);"},
        {name: "Standard",  value: "blur",      info: "filter: blur(8px);"},
        {name: "Medium",    value: "blur-md",   info: "filter: blur(12px);"},
        {name: "Large",     value: "blur-lg",   info: "filter: blur(16px);"},
        {name: "X-Large",   value: "blur-xl",   info: "filter: blur(24px);"},
        {name: "2X-Large",  value: "blur-2xl",  info: "filter: blur(40px);"},
        {name: "3X-Large",  value: "blur-3xl",  info: "filter: blur(64px);"},
        

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
    <span title="Utilities for applying blur filters to an element.">Blur</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
