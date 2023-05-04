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
     * Actual text decoration class ( underline, etc... )
     * @type number
     */
    export let textDecoration;



    /**
     * List of all font Style classes
     * @type Array<string>
     */
    const textDecorationList = [
        " ",
        "underline",
        "overline",
        "line-through",
        "no-underline",
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

    let localLoad=false;

    $: loaded, (()=>{
        if(loaded == true && localLoad == false) {
            elementDataLoaded.split(" ").forEach( cls => {

                var currentClass = cls.trim();

                textDecorationList.forEach ( elm => {
                    if(elm === currentClass) textDecoration = textDecorationList.indexOf(elm) ?? 0; // if can't find class then its 0 -> ""
                });

            });

            if(!textDecoration) textDecoration = 0;

            localLoad = true;
        }
    })();

    $: textDecoration, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "underline":
                    case "overline":
                    case "line-through":
                    case "no-underline":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            if(textDecoration != 0){
                classInput = newClass.trim() + " " + textDecorationList[textDecoration];
                updateClass();
            }else{
                classInput = newClass.trim();
                updateClass();
            }
        }
    })();

    let nestedItems = [
        {outerClass: "w-8",     innerClass: "",             innerText: "X"},
        {outerClass: "w-8",     innerClass: "underline",    innerText: "U"},
        {outerClass: "w-8",     innerClass: "overline",     innerText: "O"},
        {outerClass: "w-8",     innerClass: "line-through", innerText: "T"},
        {outerClass: "w-8",     innerClass: "no-underline", innerText: "A"},
    ];

</script>

<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <Optionsbutton nestedItems={nestedItems} nested nestedText icons={true} bind:value={textDecoration}></Optionsbutton>
</div>
