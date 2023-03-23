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
    export let wordbreak;


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
    let wordbreakOptions = [
        {name: "Default",   value: "",              info: "Default - No value"},
        {name: "Normal",    value: "break-normal",  info: "overflow-wrap: normal;\nword-break: normal;"},
        {name: "Words",     value: "break-words",   info: "overflow-wrap: break-word;"},
        {name: "All",       value: "break-all",     info: "word-break: break-all;"},
        {name: "Keep",      value: "break-keep",    info: "word-break: keep-all;"},

        
    ];

    /**
     * List of all classes
     * @type Array<string>
     */
    let wordbreakList = [];

    wordbreakOptions.forEach(elm => {
        wordbreakList.push(elm.value);
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

                wordbreakList.forEach( elm => {
                    if(elm === currentClass) wordbreak = elm;
                });


            });
        }
    })();

    $: wordbreak, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {

                if(wordbreakList.includes(cls.trim())){
                    ///Do nothing - If included then should be removed
                }else{
                    newClass += " " + cls.trim();
                }
            });

            classInput = newClass.trim() + " " + wordbreak;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling word breaks in an element.">Word Break</span>
    <Select options={wordbreakOptions} bind:value={wordbreak}/>
</div>
