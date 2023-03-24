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
        {name: "Default", value: "", info: "Default - 1 column"},
        {name: "1",     value: "columns-1",     info: "columns: 1;"},
        {name: "2",     value: "columns-2",     info: "columns: 2;"},
        {name: "3",     value: "columns-3",     info: "columns: 3;"},
        {name: "4",     value: "columns-4",     info: "columns: 4;"},
        {name: "5",     value: "columns-5",     info: "columns: 5;"},
        {name: "6",     value: "columns-6",     info: "columns: 6;"},
        {name: "7",     value: "columns-7",     info: "columns: 7;"},
        {name: "8",     value: "columns-8",     info: "columns: 8;"},
        {name: "9",     value: "columns-9",     info: "columns: 9;"},
        {name: "10",    value: "columns-10",    info: "columns: 10;"},
        {name: "11",    value: "columns-11",    info: "columns: 11;"},
        {name: "12",    value: "columns-12",    info: "columns: 12;"},
        {name: "auto",  value: "columns-auto",  info: "columns: auto;"},
        {name: "3xs",   value: "columns-3xs",   info: "columns: 16rem; /* 256px */"},
        {name: "2xs",   value: "columns-2xs",   info: "columns: 18rem; /* 288px */"},
        {name: "xs",    value: "columns-xs",    info: "columns: 20rem; /* 320px */"},
        {name: "sm",    value: "columns-sm",    info: "columns: 24rem; /* 384px */"},
        {name: "md",    value: "columns-md",    info: "columns: 28rem; /* 448px */"},
        {name: "lg",    value: "columns-lg",    info: "columns: 32rem; /* 512px */"},
        {name: "xl",    value: "columns-xl",    info: "columns: 36rem; /* 576px */"},
        {name: "2xl",   value: "columns-2xl",   info: "columns: 42rem; /* 672px */"},
        {name: "3xl",   value: "columns-3xl",   info: "columns: 48rem; /* 768px */"},
        {name: "4xl",   value: "columns-4xl",   info: "columns: 56rem; /* 896px */"},
        {name: "5xl",   value: "columns-5xl",   info: "columns: 64rem; /* 1024px */"},
        {name: "6xl",   value: "columns-6xl",   info: "columns: 72rem; /* 1152px */"},
        {name: "7xl",   value: "columns-7xl",   info: "columns: 80rem; /* 1280px */"},
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
    <span title="Utilities for controlling the number of columns within an element.">Columns</span>
    <Select options={propertyOptions} bind:value={property}/>
</div>
