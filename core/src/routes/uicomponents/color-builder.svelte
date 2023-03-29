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


    // ColorBuilderType.TEXT variables

    let typeText_value = "";
    let typeText_value_hex = writable("#000001");

    let collapseButtonFixedHexColor = writable("#000001");

    let loadedInside = false;

    $: loaded, (()=>{
        if(loaded == true && loadedInside == false) {

            elementDataLoaded.split(" ").forEach( cls => {

                /**
                 * Current class in elementDataLoaded array without leading and trailing spaces.
                 */
                var currentClass = cls.trim();

                /**
                 * Variable to determine selected unit from class definition.
                */
                var ctl = "";

                switch(target){
                    case ColorBuilderType.TEXT:
                        if(currentClass.startsWith("text-")){
                            ctl=currentClass.replace("text-", "");
                            if(ctl.startsWith("[#")){
                                ctl = ctl.replace("[#","").replace("]","");
                                typeText_value = "text-[#" + ctl + "]";
                                typeText_value_hex.set("#" + ctl);
                                collapseButtonFixedHexColor.set("#" + ctl);
                                isGradient = 0;
                            } else if(ctl.startsWith("transparent")){
                                isGradient = 1;

                            }
                            
                        }

                        break;
                    case ColorBuilderType.TEXTDECORATION:
                        break;
                    case ColorBuilderType.BACKGROUND:
                        break;
                }

            });

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
                        }else if(ctl.startsWith("transparent")){

                        }
                    }else{
                        newClass += " " + currentClass;
                    }
                });

                if(isGradient == 0){
                    if(typeText_value != ""){
                        classInput = newClass.trim() + " " + typeText_value;
                        typeText_value_hex.set(typeText_value.replace("text-[", "").replace("]",""));
                        collapseButtonFixedHexColor.set(typeText_value.replace("text-[", "").replace("]",""));
                        updateClass();
                    }
                }else{

                }
                

                break;
            case ColorBuilderType.TEXTDECORATION:
                break;
            case ColorBuilderType.BACKGROUND:
                break;
        }
    }

    import { createEventDispatcher, onMount } from 'svelte';
	import Optionsbutton from "./optionsbutton.svelte";

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
            typeText_value = "text-[" + hex + "]";
            updateClassInside();
        }
    }

    let showCollapsedPanel = false;

    let isGradient = 0;

</script>

<div class="block w-full">
    <div class="w-full flex flex-row grow justify-between h-8 align-middle items-center"
        style="
            --color:{$globalThemeStore.input.selectColor.color};
            --backgroundColor:{$globalThemeStore.input.selectColor.backgroundColor};
            --collapseButtonFixedHexColor:{$collapseButtonFixedHexColor};
        "
    >

        <span title="{tooltip}">{title}</span>

        {#if isGradient == 0}
        <button class="w-8 h-8 rounded-full collapseButtonColor border" on:click={() => showCollapsedPanel = !showCollapsedPanel}>&nbsp;</button>
        {:else}
        <button class="w-8 h-8 rounded-full border-sky-500 border" on:click={() => showCollapsedPanel = !showCollapsedPanel}>&nbsp;</button>
        {/if}

    </div>

    {#if showCollapsedPanel}
    <div class="w-full" in:slide={{ duration: 400 }} out:slide={{ duration: 100 }} >

        <Optionsbutton items={["Fixed Color", "Gradient"]} bind:value={isGradient} spaceBetween={false} />

        {#if isGradient == 0}
        <div class="flex flex-row min-w-[130px] h-8 mt-2 pr-2 place-content-start items-center">
            <div class="h-4 flex place-content-center items-center font-bold">
                <ColorPicker 
                    label={$typeText_value_hex}
                    hex={$typeText_value_hex}
                    on:input={(event) => setColor(event)}
                />
            </div> 
        </div>
        {:else}

        gradient
        
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

