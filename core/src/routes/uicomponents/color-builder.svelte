<script context="module">

/**
 * Editor screen sizes as pixels.
 * @global
 */
 export const ColorBuilderType = Object.freeze({
    /**
    * Specific results for Text
    */
    TEXT: "text", 
    /**
     * Specific results for Text Decoration
     */
    TEXTDECORATION: "textDecoration",
    /**
     * Specific results for Background
     */
    BACKGROUND: "background",
});

</script>

<script>
    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";
    import ColorPicker from 'svelte-awesome-color-picker';
    import { fade, fly, slide } from 'svelte/transition';
    import SortableList from 'svelte-sortable-list';
    import { writable } from "svelte/store";

    /**
     * Global variable of class
     * @type string
     */
     export let classInput;

    /**
     * Title of Builder
     * @type string
     */
    export let title = "";

    /**
     * Tooltip of Builder
     * @type string
     */
    export let tooltip = "";

    /**
     * Target of Builder
     * 
     * Use ColorBuilderType from ColorBuilder
     * @type string
     */
    export let target = ColorBuilderType.BACKGROUND;

    /**
     * @type boolean
     */
    export let loaded;

    /**
     * Used for sub elements update control.
     * @type string
    */
    export let elementDataLoaded;

    let fixedColor = writable("#000001");
    let gradientClassForButton = writable("");
    let gradientClasses = writable("");

    /**
     * @type Writable<Array<string>>
     * @example
     * ["text-transparent", "bg-clip-text", "bg-gradient-to-t", "from-[#fffff1]", "from-0%", "to-[#6a5ecb]", "to-70%" ]
     */
    let gradientStops = writable([]);


    let loadedInside = false;

    $: loaded, (()=>{
        if(loaded == true && loadedInside == false) {

            switch(target){
                case ColorBuilderType.TEXT:

                    elementDataLoaded.split(" ").forEach( cls => {
                    
                        var currentClass = cls.trim();
                        var ctl = "";

                        if(currentClass.startsWith("text-")){
                            ctl=currentClass.replace("text-", "");
                            if(ctl.startsWith("[#")){
                                ctl = ctl.replace("[#","").replace("]","");
                                fixedColor.set("#" + ctl);
                                isGradient = 0;
                            } else if(ctl.startsWith("transparent")){
                                isGradient = 1;
                            }
                            
                        }
                    });

                    if(isGradient == 1){
                        /**
                         * @type Array<string>
                         */
                        var definedGradient = [];
                        elementDataLoaded.split(" ").forEach( cls => {
                            var currentClass = cls.trim();
                            if(
                                currentClass.startsWith("from-") || 
                                currentClass.startsWith("via-") || 
                                currentClass.startsWith("to-")
                            ){
                                definedGradient.push(currentClass);
                            }else if(currentClass.startsWith("bg-gradient-") || currentClass == "bg-none"){
                                gradientDirection = currentClass;
                            }
                        });
                        gradientStops.set(definedGradient);
                        convertGradientArrayToGradientStopList();
                        // gradientStopPreview.set("" + gradientDirection + " " + convertGradientArrayToClass());
                        gradientStopPreview.set("text-transparent bg-clip-text " + gradientDirection + " " + convertGradientArrayToClass());
                    }

                    break;
                case ColorBuilderType.TEXTDECORATION:
                    break;
                case ColorBuilderType.BACKGROUND:
                    break;
            }



            

            loadedInside = true;

        }
    })();

    function updateClassInside(){
        switch(target){
            case ColorBuilderType.TEXT:

                var newClass = "";

                //Remove all text color related classes
                classInput.split(" ").forEach( cls => {
                    var currentClass = cls.trim();
                    var ctl = "";
                    if(currentClass.startsWith("text-")){
                        ctl=currentClass.replace("text-", "");
                        if(!ctl.startsWith("[#") && !ctl.startsWith("transparent")){
                            newClass += " " + currentClass;
                        }
                    
                    }else if(
                        currentClass.startsWith("bg-none") || 
                        currentClass.startsWith("bg-gradient-") || 
                        currentClass.startsWith("bg-clip-") || 
                        currentClass.startsWith("from-") || 
                        currentClass.startsWith("via-") || 
                        currentClass.startsWith("to-")
                    ){
                        //Do nothing. just removed classes.
                    
                    }else{
                        newClass += " " + currentClass;
                    }
                });

                if(isGradient == 0){
                    classInput = newClass.trim() + " " + "text-[" + $fixedColor + "]";
                    updateClass();
                }else{
                    classInput = newClass.trim() + " " + "text-transparent bg-clip-text " + gradientDirection + " " + convertGradientArrayToClass();
                    gradientStopPreview.set("text-transparent bg-clip-text " + gradientDirection + " " + convertGradientArrayToClass());
                    updateClass();
                    // gradientStopPreview.set("" + gradientDirection + " " + convertGradientArrayToClass());
                }
                
                console.log("updateClassInside => classInput : " + classInput);

                break;
            case ColorBuilderType.TEXTDECORATION:
                break;
            case ColorBuilderType.BACKGROUND:
                break;
        }
    }


    import { createEventDispatcher, onMount } from 'svelte';
	import Optionsbutton from "./optionsbutton.svelte";
	import Select from "./select.svelte";
	import Button from "./button.svelte";
	import Slider from "./slider.svelte";
	import GradientBuilder from "./gradient-builder.svelte";

    const dispatch = createEventDispatcher();

    function updateClass() {
        dispatch('updateClass');
    }



    onMount(()=>{

    });

    /**
     * Updates selected color
     * @param {CustomEvent} event This event fires from "ColorPicker"
     */
     function setColor(event){
        var {hsv, rgb, hex, color} = event.detail;
        if(loaded == true && hex != "#000001"){
            fixedColor.set(hex);
            updateClassInside();
        }
    }

    let showCollapsedPanel = false;

    let isGradient = 0;

    let gradientDirection = "";

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
    let gradientDirectionOptions = [
        {name: "Default",       value: "",                  info: "Default - No value"},
        {name: "None",          value: "bg-none",           info: "background-image: none;"},
        {name: "Top",           value: "bg-gradient-to-t",  info: "background-image: linear-gradient(to top, var(--tw-gradient-stops));"},
        {name: "Top Right",     value: "bg-gradient-to-tr", info: "background-image: linear-gradient(to top right, var(--tw-gradient-stops));"},
        {name: "Right",         value: "bg-gradient-to-r",  info: "background-image: linear-gradient(to right, var(--tw-gradient-stops));"},
        {name: "Bottom Right",  value: "bg-gradient-to-br", info: "background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));"},
        {name: "Bottom",        value: "bg-gradient-to-b",  info: "background-image: linear-gradient(to bottom, var(--tw-gradient-stops));"},
        {name: "Bottom Left",   value: "bg-gradient-to-bl", info: "background-image: linear-gradient(to bottom left, var(--tw-gradient-stops));"},
        {name: "Left",          value: "bg-gradient-to-l",  info: "background-image: linear-gradient(to left, var(--tw-gradient-stops));"},
        {name: "Top Left",      value: "bg-gradient-to-tl", info: "background-image: linear-gradient(to top left, var(--tw-gradient-stops));"},
    ];

    function convertGradientArrayToClass(){
        var newClass = "";
        $gradientStops.forEach(cls => {
            if(cls != "from-[0%]" && cls != "to-[100%]") newClass += " " + cls;
        });
        return newClass;
        // return "text-left text-transparent bg-clip-text bg-gradient-to-r  from-[#cc1] from-0%";
    }

    function convertGradientArrayToClassForButton(){
        var newClass = "";
        $gradientStops.forEach(cls => {
            if(!cls.startsWith("text-") && !cls.startsWith("bg-clip-")) newClass += " " + cls;
        });
        gradientClassForButton.set(newClass);
        // return newClass;
    }

    function convertGradientArrayToGradientStopList(){
        var newArrayOfJson = [];
        var counter = 0;
        var stops = $gradientStops; // Array of classes

        for(var i=0; i<stops.length; i++){

            if(stops[i].startsWith("from-")){
                if(stops[i+1] != undefined){
                    if(stops[i+1].startsWith("from-")){
                        if(stops[i].startsWith("from-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("from-[","").replace("]",""), "stop": stops[i+1].replace("from-[","").replace("%]",""), "id": counter});
                            counter++;
                        }else{
                            newArrayOfJson.push({"color": stops[i+1].replace("from-[","").replace("]",""), "stop": stops[i].replace("from-[","").replace("%]",""), "id": counter});
                            counter++;
                        }
                    }else{
                        if(stops[i].startsWith("from-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("from-[","").replace("]",""), "stop": 0, "id": counter});
                            counter++;
                        }
                    } 
                }else{
                    if(stops[i].startsWith("from-[#")){
                        newArrayOfJson.push({"color": stops[i].replace("from-[","").replace("]",""), "stop": 0, "id": counter});
                        counter++;
                    }
                }
            }

            if(stops[i].startsWith("to-")){
                if(stops[i+1] != undefined){
                    if(stops[i+1].startsWith("to-")){
                        if(stops[i].startsWith("to-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("to-[","").replace("]",""), "stop": stops[i+1].replace("to-[","").replace("%]",""), "id": counter});
                            counter++;
                        }else{
                            newArrayOfJson.push({"color": stops[i+1].replace("to-[","").replace("]",""), "stop": stops[i].replace("to-[","").replace("%]",""), "id": counter});
                            counter++;
                        }
                    }else{
                        if(stops[i].startsWith("to-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("to-[","").replace("]",""), "stop": 100, "id": counter});
                            counter++;
                        }
                    } 
                }else{
                    if(stops[i].startsWith("to-[#")){
                        newArrayOfJson.push({"color": stops[i].replace("to-[","").replace("]",""), "stop": 100, "id": counter});
                        counter++;
                    }
                }
            }

            if(stops[i].startsWith("via-")){
                if(stops[i+1] != undefined){
                    if(stops[i+1].startsWith("via-")){
                        if(stops[i].startsWith("via-[#")){
                            newArrayOfJson.push({"color": stops[i].replace("via-[","").replace("]",""), "stop": stops[i+1].replace("via-[","").replace("%]",""), "id": counter});
                            counter++;
                        }else{
                            newArrayOfJson.push({"color": stops[i+1].replace("via-[","").replace("]",""), "stop": stops[i].replace("via-[","").replace("%]",""), "id": counter});
                            counter++;
                        }
                    }
                }
            }


        }

        gradientStopList = newArrayOfJson;

    }

    // $: $gradientStops, (()=>{
    //     updateClassInside();
    // })();

    /**
     * @type Writable<string>
     */
    let gradientStopPreview = writable("");

    /**
     * @type Writable<Array<JSON>>
     * @example
     * [
     *      {"color": "#fffff1", "stop": 0, "id": 0},
     *      {"color": "#cc1000", "stop": 70, "id": 0},
     * ]
     */
    let gradientStopListStore = writable([]);
    let gradientStopList = $gradientStopListStore;
    $: gradientStopListStore.set(gradientStopList);

    function addStop(){
        if(gradientStopList.length >0){
            gradientStopList.push({"color": "#cc1000", "stop": 100, "id": gradientStopList.length ?? 0});
        }else{
            gradientStopList.push({"color": "#000000", "stop": 0, "id": gradientStopList.length ?? 0});
        }
        // gradientStopList.push({"color": "#cc1000", "stop": 70, "id": gradientStopList.length ?? 60});
        // console.log(JSON.stringify(gradientStopList));
        updateStops();
    }


    function updateStops(){

        /**
         * @type Array<string>
         */
        var newList = [];
        var counter = 0; // To detect first and last items
        $gradientStopListStore.forEach(element => {
            if(counter == 0){
                newList.push("from-[" + element.color + "]");
                newList.push("from-[" + element.stop + "%]");
            
            }else if(counter == $gradientStopListStore.length -1){
                newList.push("to-[" + element.color + "]");
                newList.push("to-[" + element.stop + "%]");
            }else{
                newList.push("via-[" + element.color + "]");
                newList.push("via-[" + element.stop + "%]");
            }
            counter++;
        });

        console.log(JSON.stringify("updateStops => newList : " + newList));

        gradientStops.set(newList);
        updateClassInside();
        convertGradientArrayToClassForButton();
    }


    /**
     * Updates selected color
     * @param {CustomEvent} event This event fires from "ColorPicker"
     * @param {number} id
     */
     function updateColorFromList(event, id){
        var {hsv, rgb, hex, color} = event.detail;
        for(var i=0; i<gradientStopList.length;i++){
            if(gradientStopList[i].id == id){
                gradientStopList[i]["color"] = hex;
            }
        }
        updateStops();
    }

    /**
     * Updates selected stop value
     * @param {number} id
     * @param {number} value
     */
     function updateStopValueFromList(id, value){
        for(var i=0; i<gradientStopList.length;i++){
            if(gradientStopList[i].id == id){
                gradientStopList[i]["stop"] = value;
            }
        }
        updateStops();
    }

    /**
     * Minimum value for Slider
     * @param {number} index
     */
    function minLimit(index){
        if($gradientStopListStore[index-1] != undefined){
            return $gradientStopListStore[index-1]["stop"];
        }
        return 0;
    }
    /**
     * Maximum value for Slider
     * @param {number} index
     */
     function maxLimit(index){
        if($gradientStopListStore[index+1] != undefined){
            return $gradientStopListStore[index+1]["stop"];
        }
        return 100;
    }


</script>

<div class="block w-full">
    <div class="w-full flex flex-row grow justify-between h-8 align-middle items-center"
        style="
            --color:{$globalThemeStore.input.selectColor.color};
            --backgroundColor:{$globalThemeStore.input.selectColor.backgroundColor};
            --collapseButtonFixedHexColor:{$fixedColor};
            --buttonBackgroundColor:{$globalThemeStore.button.passive.backgroundColor};
            --buttonColor:{$globalThemeStore.button.passive.backgroundColor};
        "
    >

        <span title="{tooltip}">{title}</span>

        {#if isGradient == 0}
        <button class="w-8 h-8 rounded-full collapseButtonColor border" on:click={() => showCollapsedPanel = !showCollapsedPanel}>&nbsp;</button>
        {:else}
        <button class="w-8 h-8 rounded-full border {$gradientStopPreview}" on:click={() => showCollapsedPanel = !showCollapsedPanel}>&nbsp;</button>
        {/if}

    </div>

    {#if showCollapsedPanel}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <Optionsbutton items={["Fixed Color", "Gradient"]} bind:value={isGradient} spaceBetween={false} />

        {#if isGradient == 0}
        <div class="flex flex-row min-w-[130px] h-8 mt-2 pr-2 place-content-start items-center">
            <div class="h-4 flex place-content-center items-center font-bold">
                <ColorPicker 
                    label={$fixedColor}
                    hex={$fixedColor}
                    on:input={(event) => setColor(event)}
                />
            </div> 
        </div>
        {:else}

        <div class="w-full h-8 rounded-lg my-2 flex place-content-center items-center">
            {#if $gradientStopPreview.includes("transparent")}
            <div class="{$gradientStopPreview}">Lorem Ipsum</div>
            {:else}
            <div class="w-full h-8 rounded-lg {$gradientStopPreview}"></div>
            {/if}
        </div>



        <div class="w-full flex flex-row place-content-between h-10 items-center">
            <span>Direction</span>
            <Select options={gradientDirectionOptions} bind:value={gradientDirection} on:onChange={updateClassInside}/>
        </div>

        <div class="w-full flex flex-row place-content-between h-10 items-center">
            <span>Stops</span>
            <Button active={true} on:click={addStop} >
                <span slot="iconRight"><i class="bi bi-plus me-2"></i></span>
                <span slot="text">Add New</span>
            </Button>
        </div>

        <div class="w-full">
            
            <!-- {#each $gradientStopListStore as item}
            <div class="w-full flex flex-row place-content-between h-10 items-center">
                <ColorPicker 
                    label={item.color}
                    hex={item.color}
                    on:input={(event) => updateColorFromList(event, item.id)}
                />
                <Slider value={item.stop} on:change={e => updateStopValueFromList(item.id, e.detail.value)}/>
            </div>
            {/each} -->


            {#each $gradientStopListStore as item, index}
            <div class="w-full flex flex-row place-content-between h-10 items-center">
                <ColorPicker 
                    label={item.color}
                    hex={item.color}
                    on:input={(event) => updateColorFromList(event, item.id)}
                />
                <Slider minLimit={minLimit(index)} maxLimit={maxLimit(index)} value={item.stop} on:change={e => updateStopValueFromList(item.id, e.detail.value)}/>
            </div>
            {/each}
            
            
        </div>

        <GradientBuilder bind:gradientDirection bind:gradientClasses={gradientStops} />
        
        {/if}

    </div>
    {/if}

</div>

<style>


    .box {
        position: relative;
        height: 32px;
        color: var(--color);
        background-color: var(--backgroundColor);
    }


    .inputtext{
        background-color: var(--backgroundColor);
        color: var(--color);
        height: 32px;
        width: 50px;
        border: none;
    }

    .inputtext:focus{
        border: none;
    }

    .collapseButtonColor{
        background-color: var(--collapseButtonFixedHexColor);
        border-color: var(--collapseButtonFixedHexColor);
    }

</style>

