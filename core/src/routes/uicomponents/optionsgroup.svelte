<script>
    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";

    /**
     * Variable that holds active state of element
     * @type boolean
     */
    export let active;

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
     * Value of element
     * @type number
     */
    export let value = 0;

    /**
     * Variable that adds class to element
     * @type Array<string>
     */
    export let items;


</script>
<input type="hidden" class="optionButton optionButtonActive"/>

<div class="w-full flex items-center place-content-between {addClassToContainer}" class:flex-row={horizontal} class:flex-col={!horizontal}
style="
    --buttonActiveColor:{$globalThemeStore.options.button.active.color};
    --buttonActiveBackgroundColor:{$globalThemeStore.options.button.active.backgroundColor};
    --buttonPassiveColor:{$globalThemeStore.options.button.passive.color};
    --buttonPassiveBackgroundColor:{$globalThemeStore.options.button.passive.backgroundColor};
"  
>
    {#each items as item}
        <button type="button" class="optionButton rounded-lg h-8 w-max px-2 py-1 {addClassToItem}" on:click={() => value=items.indexOf(item)} class:optionButtonActive={value == items.indexOf(item) || active == true}>{item}</button>
    {/each}
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

