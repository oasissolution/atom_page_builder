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
    export let decorationStyle;


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
    let decorationStyleOptions = [
        {name: "Default",           value: "",                  info: "Page Default"},
        {name: "Solid",  value: "decoration-solid",  info: "text-decoration-style: solid;"},
        {name: "Double", value: "decoration-double", info: "text-decoration-style: double;"},
        {name: "Dotted", value: "decoration-dotted", info: "text-decoration-style: dotted;"},
        {name: "Dashed", value: "decoration-dashed", info: "text-decoration-style: dashed;"},
        {name: "Wavy",   value: "decoration-wavy",   info: "text-decoration-style: wavy;"},
    ];

    /**
     * List of all decoration Style classes
     * @type Array<string>
     */
    const decorationStyleList = [
        "decoration-solid",
        "decoration-double",
        "decoration-dotted",
        "decoration-dashed",
        "decoration-wavy",
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

                decorationStyleList.forEach( elm => {
                    if(elm === currentClass) decorationStyle = elm;
                });


            });
        }
    })();

    $: decorationStyle, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "decoration-solid":
                    case "decoration-double":
                    case "decoration-dotted":
                    case "decoration-dashed":
                    case "decoration-wavy":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + decorationStyle;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the style of decoration of the text.">Decoration Style</span>
    <Select options={decorationStyleOptions} bind:value={decorationStyle}/>
</div>