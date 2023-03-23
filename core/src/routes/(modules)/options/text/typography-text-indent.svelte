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
     * Actual letter Spacing class
     * @type string
     */
    export let textIndent;


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
    let textIndentOptions = [
        {name: "96",    value: "indent-96",    info: "text-indent: 24rem; /* 384px */"},
        {name: "80",    value: "indent-80",    info: "text-indent: 20rem; /* 320px */"},
        {name: "72",    value: "indent-72",    info: "text-indent: 18rem; /* 288px */"},
        {name: "64",    value: "indent-64",    info: "text-indent: 16rem; /* 256px */"},
        {name: "60",    value: "indent-60",    info: "text-indent: 15rem; /* 240px */"},
        {name: "56",    value: "indent-56",    info: "text-indent: 14rem; /* 224px */"},
        {name: "52",    value: "indent-52",    info: "text-indent: 13rem; /* 208px */"},
        {name: "48",    value: "indent-48",    info: "text-indent: 12rem; /* 192px */"},
        {name: "44",    value: "indent-44",    info: "text-indent: 11rem; /* 176px */"},
        {name: "40",    value: "indent-40",    info: "text-indent: 10rem; /* 160px */"},
        {name: "36",    value: "indent-36",    info: "text-indent: 9rem; /* 144px */"},
        {name: "32",    value: "indent-32",    info: "text-indent: 8rem; /* 128px */"},
        {name: "28",    value: "indent-28",    info: "text-indent: 7rem; /* 112px */"},
        {name: "24",    value: "indent-24",    info: "text-indent: 6rem; /* 96px */"},
        {name: "20",    value: "indent-20",    info: "text-indent: 5rem; /* 80px */"},
        {name: "16",    value: "indent-16",    info: "text-indent: 4rem; /* 64px */"},
        {name: "14",    value: "indent-14",    info: "text-indent: 3.5rem; /* 56px */"},
        {name: "12",    value: "indent-12",    info: "text-indent: 3rem; /* 48px */"},
        {name: "11",    value: "indent-11",    info: "text-indent: 2.75rem; /* 44px */"},
        {name: "10",    value: "indent-10",    info: "text-indent: 2.5rem; /* 40px */"},
        {name: "9",     value: "indent-9",     info: "text-indent: 2.25rem; /* 36px */"},
        {name: "8",     value: "indent-8",     info: "text-indent: 2rem; /* 32px */"},
        {name: "7",     value: "indent-7",     info: "text-indent: 1.75rem; /* 28px */"},
        {name: "6",     value: "indent-6",     info: "text-indent: 1.5rem; /* 24px */"},
        {name: "5",     value: "indent-5",     info: "text-indent: 1.25rem; /* 20px */"},
        {name: "4",     value: "indent-4",     info: "text-indent: 1rem; /* 16px */"},
        {name: "3.5",   value: "indent-3.5",   info: "text-indent: 0.875rem; /* 14px */"},
        {name: "3",     value: "indent-3",     info: "text-indent: 0.75rem; /* 12px */"},
        {name: "2.5",   value: "indent-2.5",   info: "text-indent: 0.625rem; /* 10px */"},
        {name: "2",     value: "indent-2",     info: "text-indent: 0.5rem; /* 8px */"},
        {name: "1.5",   value: "indent-1.5",   info: "text-indent: 0.375rem; /* 6px */"},
        {name: "1",     value: "indent-1",     info: "text-indent: 0.25rem; /* 4px */"},
        {name: "0.5",   value: "indent-0.5",   info: "text-indent: 0.125rem; /* 2px */"},
        {name: "px",    value: "indent-px",    info: "text-indent: 1px;"},
        {name: "0",     value: "indent-0",     info: "text-indent: 0px;"},
        {name: "Default",     value: "",             info: "Default - No value"},
    ];

    /**
     * List of all classes
     * @type Array<string>
     */
    let textIndentList = [];

    textIndentOptions.forEach(elm => {
        textIndentList.push(elm.value);
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

                textIndentList.forEach( elm => {
                    if(elm === currentClass) textIndent = elm;
                });


            });
        }
    })();

    $: textIndent, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {

                if(textIndentList.includes(cls.trim())){
                    ///Do nothing - If included then should be removed
                }else{
                    newClass += " " + cls.trim();
                }
            });

            classInput = newClass.trim() + " " + textIndent;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the amount of empty space shown before text in a block.">Text Indent</span>
    <Select options={textIndentOptions} bind:value={textIndent}/>
</div>
