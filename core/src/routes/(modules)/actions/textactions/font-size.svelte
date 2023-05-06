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
     * Actual font size class
     * @type number
     */
    export let fontSize;


    /**
     * List of all font size classes
     * @type Array<string>
     */
    const fontSizeList = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl", "text-7xl", "text-8xl", "text-9xl",];

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

                fontSizeList.forEach ( elm => {
                    if(elm === currentClass) fontSize = fontSizeList.indexOf(elm) ?? 2; // if can't find class then its 2 -> text-base
                });


            });

            localLoad = true;
        }
    })();

    $: fontSize, (()=>{
        if(loaded == true) {

            var newClass = "";

            classInput.split(" ").forEach( cls => {
                switch(cls.trim()){
                    case "text-xs":
                    case "text-sm":
                    case "text-base":
                    case "text-lg":
                    case "text-xl":
                    case "text-2xl":
                    case "text-3xl":
                    case "text-4xl":
                    case "text-5xl":
                    case "text-6xl":
                    case "text-7xl":
                    case "text-8xl":
                    case "text-9xl":
                    // case " ":
                        break;
                    default:
                        newClass += " " + cls.trim();
                        break;
                }
            });

            if(fontSize != 2){
                classInput = newClass.trim() + " " + fontSizeList[fontSize];
                updateClass();
            }else{
                classInput = newClass.trim();
                updateClass();
            }
        }
    })();

    // Flows out of bar above 4xl
    // let nestedItems = [
    //     {outerClass: "w-8",     innerClass: "text-xs",      innerText: "A"},
    //     {outerClass: "w-8",     innerClass: "text-sm",      innerText: "A"},
    //     {outerClass: "w-8",     innerClass: "text-base",    innerText: "A"},
    //     {outerClass: "w-8",     innerClass: "text-lg",      innerText: "N"},
    //     {outerClass: "w-8",     innerClass: "text-xl",      innerText: "A"},
    //     {outerClass: "w-8",     innerClass: "text-2xl",     innerText: "A"},
    //     {outerClass: "w-8",     innerClass: "text-3xl",     innerText: "A"},
    //     {outerClass: "w-8",     innerClass: "text-4xl",     innerText: "A"},
    //     {outerClass: "w-8",     innerClass: "text-5xl",     innerText: "A"},
    //     {outerClass: "w-8",     innerClass: "text-6xl",     innerText: "A"},
    //     {outerClass: "w-8",     innerClass: "text-7xl",     innerText: "A"},
    //     {outerClass: "w-8",     innerClass: "text-8xl",     innerText: "A"},
    //     {outerClass: "w-8",     innerClass: "text-9xl",     innerText: "A"},
    // ];

    let nestedItems = [
        {outerClass: "w-8",     innerClass: "",     innerText: "XS",  title:""},
        {outerClass: "w-8",     innerClass: "",     innerText: "SM",  title:""},
        {outerClass: "w-8",     innerClass: "",     innerText: "N",   title:""},
        {outerClass: "w-8",     innerClass: "",     innerText: "L",   title:""},
        {outerClass: "w-8",     innerClass: "",     innerText: "XL",  title:""},
        {outerClass: "w-8",     innerClass: "",     innerText: "2XL", title:""},
        {outerClass: "w-8",     innerClass: "",     innerText: "3XL", title:""},
        {outerClass: "w-8",     innerClass: "",     innerText: "4XL", title:""},
        {outerClass: "w-8",     innerClass: "",     innerText: "5XL", title:""},
        {outerClass: "w-8",     innerClass: "",     innerText: "6XL", title:""},
        {outerClass: "w-8",     innerClass: "",     innerText: "7XL", title:""},
        {outerClass: "w-8",     innerClass: "",     innerText: "8XL", title:""},
        {outerClass: "w-8",     innerClass: "",     innerText: "9XL", title:""},
    ];

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center">
    <Optionsbutton nestedItems={nestedItems} nested nestedText icons={false} bind:value={fontSize}></Optionsbutton>
</div>
