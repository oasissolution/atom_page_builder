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
     * Vertical Alignment of element
     * @type number
     */
    export let verticalAlignment;

    /**
     * List of all font size classes
     * @type Array<string>
     */
    const verticalAlignmentList = [" ", "align-top", "align-middle", "align-bottom", "align-sub", "align-super"];


    $: verticalAlignment, (()=>{
        if(loaded == true) {

            var newClass = "";
            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "align-top":
                    case "align-middle":
                    case "align-bottom":
                    case "align-sub":
                    case "align-super":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            if(verticalAlignment != 0){
                classInput = newClass.trim() + " " + verticalAlignmentList[verticalAlignment];
                updateClass();
            }else{
                classInput = newClass.trim();
                updateClass();
            }
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
            elementDataLoaded.split(" ").forEach( cls => {

                var currentClass = cls.trim();

                verticalAlignmentList.forEach ( elm => {
                    if(elm === currentClass) verticalAlignment = verticalAlignmentList.indexOf(elm) ?? 0; // if can't find class then its 0 -> ""
                });


            });

            if(!verticalAlignment) verticalAlignment = 0;

            localLoad = true;
        }
    })();

    let nestedItems = [
        {outerClass: "w-8", innerClass: "", innerText: "bi bi-x-lg",            title:"Default"},
        {outerClass: "w-8", innerClass: "", innerText: "bi bi-align-top",       title:"Align Top"},
        {outerClass: "w-8", innerClass: "", innerText: "bi bi-align-middle",    title:"Align Middle"},
        {outerClass: "w-8", innerClass: "", innerText: "bi bi-align-bottom",    title:"Align Bottom"},
        {outerClass: "w-8", innerClass: "", innerText: "bi bi-subscript",       title:"Subscript"},
        {outerClass: "w-8", innerClass: "", innerText: "bi bi-superscript",     title:"Superscript"},
    ];

</script>


<div class="w-56 flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <Optionsbutton nestedItems={nestedItems} nested nestedText icons={true} bind:value={verticalAlignment}></Optionsbutton>
</div>
