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
     * Actual font style class
     * @type string
     */
    export let fontStyle;


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
    let fontStyleOptions = [
        {name: "Default",     value: "",            info: "Page Default"},
        {name: "Italic",      value: "italic",      info: "font-style: italic;"},
        {name: "Not italic",  value: "not-italic",  info: "font-style: normal;"},
    ];

    /**
     * List of all font Style classes
     * @type Array<string>
     */
    const fontStyleList = ["italic", "not-italic"];

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

                fontStyleList.forEach( elm => {
                    if(elm === currentClass) fontStyle = elm;
                });


            });
        }
    })();

    $: fontStyle, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "italic":
                    case "not-italic":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + fontStyle;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the style of text.">Font Style</span>
    <Select options={fontStyleOptions} bind:value={fontStyle}/>
</div>