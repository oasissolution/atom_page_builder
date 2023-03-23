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
    export let whitespace;


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
    let whitespaceOptions = [
        {name: "Default",    value: "",                      info: "Default - No value"},
        {name: "Normal",     value: "whitespace-normal",     info: "white-space: normal;"},
        {name: "Nowrap",     value: "whitespace-nowrap",     info: "white-space: nowrap;"},
        {name: "Pre",        value: "whitespace-pre",        info: "white-space: pre;"},
        {name: "Pre-line",   value: "whitespace-pre-line",   info: "white-space: pre-line;"},
        {name: "Pre-wrap",   value: "whitespace-pre-wrap",   info: "white-space: pre-wrap;"},
    ];

    /**
     * List of all classes
     * @type Array<string>
     */
    let whitespaceList = [];

    whitespaceOptions.forEach(elm => {
        whitespaceList.push(elm.value);
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

                whitespaceList.forEach( elm => {
                    if(elm === currentClass) whitespace = elm;
                });


            });
        }
    })();

    $: whitespace, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {

                if(whitespaceList.includes(cls.trim())){
                    ///Do nothing - If included then should be removed
                }else{
                    newClass += " " + cls.trim();
                }
            });

            classInput = newClass.trim() + " " + whitespace;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling an element's white-space property.">Whitespace</span>
    <Select options={whitespaceOptions} bind:value={whitespace}/>
</div>
