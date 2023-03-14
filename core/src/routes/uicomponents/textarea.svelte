<script>
    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";
    import Switch from "./switch.svelte";

    /**
     * Variable that adds class to element
     * @type string
     */
    export let addClass = "";

    /**
     * @type number
     */
    export let rows = 5;

    /**
     * @type number
     */
    export let cols = 20;
 
    /**
     * Value of element
     * @type string
     */
    export let text = "";


    /**
     * @type boolean
     */
    let submitOnEnter = true;


    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    /**
     * Action on enter pressed.
     */
    function onSubmit() {
        dispatch('onSubmit');
    }

    function keyPress(e){
        if(e.key === 'Enter' && !e.shiftKey && submitOnEnter == true){
            e.preventDefault();
            onSubmit();
        }
    }

</script>


<div class="w-full flex flex-row items-center place-content-between"
style="
    --color:{$globalThemeStore.input.textarea.color};
    --backgroundColor:{$globalThemeStore.input.textarea.backgroundColor};
    --checkboxCheckedColor:{$globalThemeStore.input.checkbox.checked.color};
    --checkboxCheckedBackgroundcolor:{$globalThemeStore.input.checkbox.checked.backgroundColor};
    --checkboxUncheckedColor:{$globalThemeStore.input.checkbox.unchecked.color};
    --checkboxUncheckedBackgroundcolor:{$globalThemeStore.input.checkbox.unchecked.backgroundColor};
"  
>
    <div class="w-full flex flex-col gap-1">
        <textarea class="textarea rounded-lg p-2 mb-1 {addClass}" rows="{rows}" cols="{cols}" on:keypress={keyPress} bind:value={text}></textarea>
        <div class="flex flex-row gap-2">
            <Switch bind:checked={submitOnEnter}></Switch>
            {#if submitOnEnter}
            <span class="text-[10px] align-auto" >Submit on Enter (Use Shift + Enter for a new line)</span>
            {:else}
            <div class="w-full flex flex-row items-start place-content-between">
                <span class="text-[10px] align-auto" >Submit on Enter</span>
                <button type="button" class="applyButton rounded-lg px-2" on:click={onSubmit}>Apply</button>
            </div>
            {/if}
        </div>
    </div>
</div>

<style>

    .textarea{
        background-color: var(--backgroundColor);
        color: var(--color);
    }

    .textarea:focus{
        border: 1 px solid var(--color);
    }

    .applyButton{
        height: 22px;
        font-size: small;
        background-color: var(--backgroundColor);
        color: var(--color);
    }


</style>

