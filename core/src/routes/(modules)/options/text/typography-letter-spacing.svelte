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
    export let letterSpacing;


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
    let letterSpacingOptions = [
        {name: "Default",  value: "",                  info: "Page Default"},
        {name: "Tighter",  value: "tracking-tighter",  info: "letter-spacing: -0.05em;"},
        {name: "Tight",    value: "tracking-tight",    info: "letter-spacing: -0.025em;"},
        {name: "Normal",   value: "tracking-normal",   info: "letter-spacing: 0em;"},
        {name: "Wide",     value: "tracking-wide",     info: "letter-spacing: 0.025em;"},
        {name: "Wider",    value: "tracking-wider",    info: "letter-spacing: 0.05em;"},
        {name: "Widest",   value: "tracking-widest",   info: "letter-spacing: 0.1em;"},
    ];

    /**
     * List of all font Style classes
     * @type Array<string>
     */
    const letterSpacingList = [
        "tracking-tighter",
        "tracking-tight",
        "tracking-normal",
        "tracking-wide",
        "tracking-wider",
        "tracking-widest",
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

                letterSpacingList.forEach( elm => {
                    if(elm === currentClass) letterSpacing = elm;
                });


            });
        }
    })();

    $: letterSpacing, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "tracking-tighter":
                    case "tracking-tight":
                    case "tracking-normal":
                    case "tracking-wide":
                    case "tracking-wider":
                    case "tracking-widest":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + letterSpacing;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the tracking (letter spacing) of an element.">Letter Spacing</span>
    <Select options={letterSpacingOptions} bind:value={letterSpacing}/>
</div>