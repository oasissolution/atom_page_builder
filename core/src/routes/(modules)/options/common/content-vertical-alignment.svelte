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
     * Vertical Alignment of element
     * @type string
     */
    export let verticalAlignment;

    /**
     * @typedef {Object} SelectOptions
     * @property {string} value
     * @property {string} name
     * @property {string} info
    */

    /**
     * Vertical alignment options
     * @type Array<SelectOptions>
     */
    const verticalAlignmentOptions = [
        {name: "Default",       value: "",                  info: "Page Default"},
        {name: "Baseline",      value: "align-baseline",    info: ""},
        {name: "Top",           value: "align-top",         info: ""},
        {name: "Middle",        value: "align-middle",      info: ""},
        {name: "Bottom",        value: "align-bottom",      info: ""},
        {name: "Text top",      value: "align-text-top",    info: ""},
        {name: "Text bottom",   value: "align-text-bottom", info: ""},
        {name: "Sub",           value: "align-sub",         info: ""},
        {name: "Super",         value: "align-super",       info: ""},
    ];

    /**
     * List of all font size classes
     * @type Array<string>
     */
    const verticalAlignmentList = ["align-baseline", "align-top", "align-middle", "align-bottom", "align-text-top", "align-text-bottom", "align-sub", "align-super",];


    $: verticalAlignment, (()=>{
        if(loaded == true) {

            var newClass = "";
            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "align-baseline":
                    case "align-top":
                    case "align-middle":
                    case "align-bottom":
                    case "align-text-top":
                    case "align-text-bottom":
                    case "align-sub":
                    case "align-super":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + verticalAlignment;
            updateClass();
        }
    })();

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

                verticalAlignmentList.forEach( elm => {
                    if(elm === currentClass) verticalAlignment = elm;
                });


            });
        }
    })();

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the vertical alignment of an inline element.">V. Alignment</span>
    <Select options={verticalAlignmentOptions} bind:value={verticalAlignment}/>
</div>