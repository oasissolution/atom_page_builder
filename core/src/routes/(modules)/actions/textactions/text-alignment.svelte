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
    export let textAlignment;

    /**
     * List of all font size classes
     * @type Array<string>
     */
    const textAlignmentList = ["text-left", "text-center", "text-right", "text-justify"];

    $: textAlignment, (()=>{
        if(loaded == true) {

            var newClass = "";
            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "text-left":
                    case "text-center":
                    case "text-right":
                    case "text-justify":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            classInput = newClass.trim() + " " + textAlignmentList[textAlignment];
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

                textAlignmentList.forEach ( ta => {
                    if(ta === currentClass) textAlignment = textAlignmentList.indexOf(ta) ?? 0;
                });

            });
        }
    })();



</script>


<div class="w-36 flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <Optionsbutton items={['bi bi-text-left', 'bi bi-text-center', 'bi bi-text-right', 'bi bi-justify']} icons={true} bind:value={textAlignment}></Optionsbutton>
</div>