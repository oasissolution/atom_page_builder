<script>
    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";
    import { themeColors as DarkTheme } from "../themes/dark.js";

    /**
     * Variable that adds class to element
     * @type string
     */
    export let addClassToContainer = "";

    /**
     * Variable that adds class to element
     * @type string
     */
     export let addClassToItem = "";

    /**
     * Variable that holds direction of element
     * 
     * if false, it is vertical
     * @type boolean
     */
    export let horizontal = true;

    /**
     * Variable that holds if items of elements are icons
     * 
     * if false, it is vertical
     * @type boolean
     */
    export let icons = false;

    /**
     * Value of element
     * @type number
     */
    export let value = 0;

    /**
     * Variable that adds class to element
     * @type Array<string>
     */
    export let items = [];

    /**
     * Variable that holds distance class between elements
     * @type string
     */
    export let gap = "";

    /**
     * Variable that holds if items of elements are icons
     * 
     * @type boolean
     */
    export let spaceBetween = true;

    /**
     * @typedef {Object} nestedItemsType
     * @property {string} outerClass
     * @property {string} innerClass
     * @property {string?} innerText
     */

    /**
     * Used for nested elements in button.
     * @example
     * Lets say we have 
     * 
     * <span class="">
     *      <i class=""></i>
     * </span>
     * 
     * So we set like:
     * 
     * [
     *      {outerClass: "", innerClass: ""},
     *      {outerClass: "", innerClass: ""},
     * ]
     * @type Array<nestedItemsType>
     */
    export let nestedItems = [];

    /**
     * Variable that holds if items of elements are nested elements
     * 
     * @type boolean
     */
    export let nested = false;

    /**
     * Variable that holds if items of elements are nested text elements
     * 
     * @type boolean
     */
    export let nestedText = false;

    /**
     * @type string
     */
    let buttonActiveColor;
    /**
     * @type string
     */
    let buttonActiveBackgroundColor;
    /**
     * @type string
     */
    let buttonPassiveColor;
    /**
     * @type string
     */
    let buttonPassiveBackgroundColor;

    if(globalThemeStore != undefined && $globalThemeStore != undefined){
        buttonActiveColor = $globalThemeStore.options.button.active.color;
        buttonActiveBackgroundColor = $globalThemeStore.options.button.active.backgroundColor;
        buttonPassiveColor = $globalThemeStore.options.button.passive.color;
        buttonPassiveBackgroundColor = $globalThemeStore.options.button.passive.backgroundColor;
    }else{
        try {
            globalThemeStore.set(DarkTheme);
            buttonActiveColor = $globalThemeStore.options.button.active.color;
            buttonActiveBackgroundColor = $globalThemeStore.options.button.active.backgroundColor;
            buttonPassiveColor = $globalThemeStore.options.button.passive.color;
            buttonPassiveBackgroundColor = $globalThemeStore.options.button.passive.backgroundColor;
        } catch (error) {
            buttonActiveColor = "#0092ED";
            buttonActiveBackgroundColor = "#0092ED26";
            buttonPassiveColor = "#9F9F9F";
            buttonPassiveBackgroundColor = "#FFFFFF0A";
        }

    }
    


</script>
<input type="hidden" class="optionButton optionButtonActive"/>

<div class="w-full flex items-center place-content-between {gap} {addClassToContainer}" class:flex-row={horizontal} class:flex-col={!horizontal}
class:place-content-between={spaceBetween}
style="
    --buttonActiveColor:{buttonActiveColor};
    --buttonActiveBackgroundColor:{buttonActiveBackgroundColor};
    --buttonPassiveColor:{buttonPassiveColor};
    --buttonPassiveBackgroundColor:{buttonPassiveBackgroundColor};
"  
>
    {#if nested == false}
        {#each items as item, index}
            <button type="button" class="optionButton rounded-lg h-8 w-max px-2 py-1 {addClassToItem}" on:click={() => value=index} class:optionButtonActive={value == index}>
                {#if icons==true}
                <i class="{item}"></i>
                {:else}
                {item}
                {/if}
            </button>
        {/each}
    {:else}
        {#each nestedItems as item, index}
            <button type="button" class="optionButton rounded-lg h-8 w-max px-2 py-1 {addClassToItem}" on:click={() => value=index} class:optionButtonActive={value == index}>
                <span class="{item.outerClass}">
                    {#if nestedText == true}
                    <span class="{item.innerClass}">{item.innerText}</span>
                    {:else}
                    <i class="{item.innerClass}"></i>
                    {/if}
                </span>
            </button>
        {/each}
    {/if}


</div>

<style>

    .optionButton{
        background-color: var(--buttonPassiveBackgroundColor);
        color: var(--buttonPassiveColor);
    }

    .optionButton.optionButtonActive{
        background-color: var(--buttonActiveBackgroundColor);
        color: var(--buttonActiveColor);
    }

</style>

