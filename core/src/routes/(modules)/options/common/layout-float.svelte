<script>

    import "../../../../app.css";
    import Optionsbutton from "../../../uicomponents/optionsbutton.svelte";

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
     * @type number
     */
    export let layoutFloat;

    /**
     * List of all float classes
     * @type Array<string>
     */
    const layoutFloatList = ["", "float-none", "float-left", "float-right"];

    $: layoutFloat, (()=>{
        if(loaded == true) {

            var newClass = "";
            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "float-none":
                    case "float-left":
                    case "float-right":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + layoutFloatList[layoutFloat];
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

                layoutFloatList.forEach ( ta => {
                    if(ta === currentClass) layoutFloat = layoutFloatList.indexOf(ta) ?? 0;
                });

            });
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utilities for controlling the wrapping of content around an element.">Float</span>
    <div class="w-[130px]">
        <Optionsbutton items={['bi bi-arrows-fullscreen', 'bi bi-pin', 'bi bi-chevron-bar-left', 'bi bi-chevron-bar-right']} icons={true} bind:value={layoutFloat}></Optionsbutton>
    </div>
</div>