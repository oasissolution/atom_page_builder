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
     * Actual font smoothing class
     * @type string
     */
    export let fontSmoothing;


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
    let fontSmoothingOptions = [
        {name: "Default",               value: "",                      info: "Page Default"},
        {name: "Antialiased",           value: "antialiased",           info: "-webkit-font-smoothing: antialiased;\n-moz-osx-font-smoothing: grayscale;"},
        {name: "Subpixel antialiased",  value: "subpixel-antialiased",  info: "-webkit-font-smoothing: auto;\n-moz-osx-font-smoothing: auto;"},
    ];

    /**
     * List of all font smoothing classes
     * @type Array<string>
     */
    const fontSmoothingList = ["antialiased", "subpixel-antialiased"];

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

                fontSmoothingList.forEach( elm => {
                    if(elm === currentClass) fontSmoothing = elm;
                });


            });
        }
    })();

    $: fontSmoothing, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "antialiased":
                    case "subpixel-antialiased":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + fontSmoothing;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the font smoothing of an element.">Font Smoothing</span>
    <Select options={fontSmoothingOptions} bind:value={fontSmoothing}/>
</div>