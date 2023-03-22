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
     * Actual line height class
     * @type string
     */
    export let lineHeight;


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
    let lineHeightOptions = [
        {name: "Default",           value: "",                  info: "Page Default"},
        {name: "None",      value: "leading-none",      info: "line-height: 1;"},
        {name: "Tight",     value: "leading-tight",     info: "line-height: 1.25;"},
        {name: "Snug",      value: "leading-snug",      info: "line-height: 1.375;"},
        {name: "Normal",    value: "leading-normal",    info: "line-height: 1.5;"},
        {name: "Relaxed",   value: "leading-relaxed",   info: "line-height: 1.625;"},
        {name: "Loose",     value: "leading-loose",     info: "line-height: 2;"},
        {name: "3",         value: "leading-3",         info: "line-height: .75rem; /* 12px */"},
        {name: "4",         value: "leading-4",         info: "line-height: 1rem; /* 16px */"},
        {name: "5",         value: "leading-5",         info: "line-height: 1.25rem; /* 20px */"},
        {name: "6",         value: "leading-6",         info: "line-height: 1.5rem; /* 24px */"},
        {name: "7",         value: "leading-7",         info: "line-height: 1.75rem; /* 28px */"},
        {name: "8",         value: "leading-8",         info: "line-height: 2rem; /* 32px */"},
        {name: "9",         value: "leading-9",         info: "line-height: 2.25rem; /* 36px */"},
        {name: "10",        value: "leading-10",        info: "line-height: 2.5rem; /* 40px */"},
    ];

    /**
     * List of all font Style classes
     * @type Array<string>
     */
    const lineHeightList = [
        "leading-none",
        "leading-tight",
        "leading-snug",
        "leading-normal",
        "leading-relaxed",
        "leading-loose",
        "leading-3",
        "leading-4",
        "leading-5",
        "leading-6",
        "leading-7",
        "leading-8",
        "leading-9",
        "leading-10",
    ];

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

                lineHeightList.forEach( elm => {
                    if(elm === currentClass) lineHeight = elm;
                });


            });
        }
    })();

    $: lineHeight, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "leading-none":
                    case "leading-tight":
                    case "leading-snug":
                    case "leading-normal":
                    case "leading-relaxed":
                    case "leading-loose":
                    case "leading-3":
                    case "leading-4":
                    case "leading-5":
                    case "leading-6":
                    case "leading-7":
                    case "leading-8":
                    case "leading-9":
                    case "leading-10":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + lineHeight;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the leading (line height) of an element.">Line Height</span>
    <Select options={lineHeightOptions} bind:value={lineHeight}/>
</div>