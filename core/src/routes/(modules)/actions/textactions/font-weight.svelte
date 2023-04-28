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
     * Actual index of font Weight class
     * @type number
     */
    export let fontWeight;

    /**
     * List of all font Weight classes
     * @type Array<string>
     */
    const fontWeightList = ["font-thin", "font-extralight", "font-light", "font-normal", "font-medium", "font-semibold", "font-bold", "font-extrabold", "font-black"];

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

                fontWeightList.forEach ( ta => {
                    if(ta === currentClass) fontWeight = fontWeightList.indexOf(ta) ?? 3; // if can't find class then its 3 -> font-normal
                });

            });
        }
    })();

    $: fontWeight, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "font-thin":
                    case "font-extralight":
                    case "font-light":
                    case "font-normal":
                    case "font-medium":
                    case "font-semibold":
                    case "font-bold":
                    case "font-extrabold":
                    case "font-black":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            if(fontWeight != 3){ // if not font-normal
                classInput = newClass.trim() + " " + fontWeightList[fontWeight];
            }else{
                classInput = newClass.trim();
            }
            updateClass();
        }
    })();


    let nestedItems = [
        {outerClass: "w-8",       innerClass: "font-thin", innerText: "B"},
        {outerClass: "w-8", innerClass: "font-extralight", innerText: "B"},
        {outerClass: "w-8",      innerClass: "font-light", innerText: "B"},
        {outerClass: "w-8",     innerClass: "font-normal", innerText: "N"},
        {outerClass: "w-8",     innerClass: "font-medium", innerText: "B"},
        {outerClass: "w-8",   innerClass: "font-semibold", innerText: "B"},
        {outerClass: "w-8",       innerClass: "font-bold", innerText: "B"},
        {outerClass: "w-8",  innerClass: "font-extrabold", innerText: "B"},
        {outerClass: "w-8",      innerClass: "font-black", innerText: "B"},
    ];


</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <Optionsbutton nestedItems={nestedItems} nested nestedText icons={true} bind:value={fontWeight}></Optionsbutton>
</div>