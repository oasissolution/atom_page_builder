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
     * Actual font size class
     * @type string
     */
    export let fontSize;


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
    let fontSizeOptions = [
        {name: "Default",   value: "",          info: "Page Default"},
        {name: "X-Small",   value: "text-xs",   info: "font-size: 0.75rem; /* 12px */"},
        {name: "Small",     value: "text-sm",   info: "font-size: 0.875rem; /* 14px */"},
        {name: "Base",      value: "text-base", info: "font-size: 1rem; /* 16px */"},
        {name: "Large",     value: "text-lg",   info: "font-size: 1.125rem; /* 18px */"},
        {name: "X-Large",   value: "text-xl",   info: "font-size: 1.25rem; /* 20px */"},
        {name: "2X-Large",  value: "text-2xl",  info: "font-size: 1.5rem; /* 24px */"},
        {name: "3X-Large",  value: "text-3xl",  info: "font-size: 1.875rem; /* 30px */"},
        {name: "4X-Large",  value: "text-4xl",  info: "font-size: 2.25rem; /* 36px */"},
        {name: "5X-Large",  value: "text-5xl",  info: "font-size: 3rem; /* 48px */"},
        {name: "6X-Large",  value: "text-6xl",  info: "font-size: 3.75rem; /* 60px */"},
        {name: "7X-Large",  value: "text-7xl",  info: "font-size: 4.5rem; /* 72px */"},
        {name: "8X-Large",  value: "text-8xl",  info: "font-size: 6rem; /* 96px */"},
        {name: "9X-Large",  value: "text-9xl",  info: "font-size: 8rem; /* 128px */"},
    ];

    /**
     * List of all font size classes
     * @type Array<string>
     */
    const fontSizeList = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl", "text-7xl", "text-8xl", "text-9xl",];

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

                fontSizeList.forEach( elm => {
                    if(elm === currentClass) fontSize = elm;
                });


            });
        }
    })();

    $: fontSize, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "text-xs":
                    case "text-sm":
                    case "text-base":
                    case "text-lg":
                    case "text-xl":
                    case "text-2xl":
                    case "text-3xl":
                    case "text-4xl":
                    case "text-5xl":
                    case "text-6xl":
                    case "text-7xl":
                    case "text-8xl":
                    case "text-9xl":
                    // case " ":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + fontSize;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the font size of an element.">Font Size</span>
    <Select options={fontSizeOptions} bind:value={fontSize}/>
</div>