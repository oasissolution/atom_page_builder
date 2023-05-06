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

            // console.log("text-alignment => $: textAlignment ("+textAlignment+") => classInput :\n" + classInput);

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

    let localLoad=false;

    $: loaded, (()=>{
        if(loaded == true && localLoad == false) {

            // console.log("text-alignment => $: loaded => textAlignment ("+textAlignment+") | elementDataLoaded :\n" + elementDataLoaded);

            elementDataLoaded.split(" ").forEach( cls => {

                var currentClass = cls.trim();

                textAlignmentList.forEach ( ta => {
                    if(ta === currentClass) textAlignment = textAlignmentList.indexOf(ta) ?? 0;
                });

            });

            localLoad = true;
        }
    })();

    let nestedItems = [
        {outerClass: "w-8",     innerClass: "", innerText: "bi bi-text-left",   title:"Text Left"},
        {outerClass: "w-8",     innerClass: "", innerText: "bi bi-text-center", title:"Text Center"},
        {outerClass: "w-8",     innerClass: "", innerText: "bi bi-text-right",  title:"Text Right"},
        {outerClass: "w-8",     innerClass: "", innerText: "bi bi-justify",     title:"Text Justify"},
    ];


</script>


<div class="w-36 flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <Optionsbutton nestedItems={nestedItems} nested nestedText icons={true} bind:value={textAlignment}></Optionsbutton>
</div>