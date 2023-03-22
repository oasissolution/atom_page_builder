<script>

    import "../../../../app.css";
    import SelectColor from "../../../uicomponents/select-color.svelte";

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
    export let textColor;


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

    $: textColor, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {

                /**
                 * Current class in elementDataLoaded array without leading and trailing spaces.
                 */
                var currentClass = cls.trim();

                /**
                 * Variable to determine selected unit from class definition.
                */
                var ctl = "";

                if(currentClass.startsWith("text-")){
                    ctl=currentClass.replace("text-", "");
                    if(!ctl.startsWith("[#")){
                        newClass += " " + currentClass;
                    }
                }else{
                    newClass += " " + currentClass;
                }
               
            });

            classInput = newClass.trim() + " " + textColor;
            updateClass();
        }
    })();



</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <span title="Utility for controlling the text color of an element.">Text Color</span>
    <SelectColor header={"text"} bind:loaded bind:elementDataLoaded bind:value={textColor}/>

</div>