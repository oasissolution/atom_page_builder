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
    export let textDecoration;


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
    let textDecorationOptions = [
        {name: "Default",       value: "",              info: "Page Default"},
        {name: "Underline",     value: "underline",     info: "text-decoration-line: underline;"},
        {name: "Overline",      value: "overline",      info: "text-decoration-line: overline;"},
        {name: "Line through",  value: "line-through",  info: "text-decoration-line: line-through;"},
        {name: "No Underline",  value: "no-underline",  info: "text-decoration-line: none;"},
        
    ];

    /**
     * List of all font Style classes
     * @type Array<string>
     */
    const textDecorationList = [
        "underline",
        "overline",
        "line-through",
        "no-underline",
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

                textDecorationList.forEach( elm => {
                    if(elm === currentClass) textDecoration = elm;
                });


            });
        }
    })();

    $: textDecoration, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "underline":
                    case "overline":
                    case "line-through":
                    case "no-underline":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + textDecoration;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the decoration of text.">Text Decoration</span>
    <Select options={textDecorationOptions} bind:value={textDecoration}/>
</div>