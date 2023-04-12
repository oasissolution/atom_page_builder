<script>
    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";
    
    /**
     * Variable that adds class to element
     * @type string
     */
    export let addClass = "";

    /**
     * Value of element
     * @type string
     */
    export let text = "";

    /**
     * Letter at the end of input
     * @type string
     */
    export let trailingLetter = "";

    /**
     * Letter at the start of input
     * @type string
     */
    export let leadingLetter = "";

    /**
     * Value of element
     * @type boolean
     */
     export let onlyNumbers = false;


    import { createEventDispatcher, onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    /**
     * Action on enter pressed.
     */
    function onSubmit() {
        dispatch('onSubmit', { text });
    }

    function keyPress(e){
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            onSubmit();
        }else{
            if(onlyNumbers == true)
            if(
                e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || 
                e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === '0' ||
                e.key === 'NumPad1' || e.key === 'NumPad2' || e.key === 'NumPad3' || e.key === 'NumPad4' || e.key === 'NumPad5' || 
                e.key === 'NumPad6' || e.key === 'NumPad7' || e.key === 'NumPad8' || e.key === 'NumPad9' || e.key === 'NumPad0' 
            ){
                return
            }else{
                e.preventDefault();
            }
        }
    }

    

</script>

{#if trailingLetter != ""}

<div class="flex flex-row max-w-[180px] h-8 pr-2">
    <input type="text" class="inputtext max-w-[144px] rounded-lg p-2 mb-1 {addClass}" class:normal-nums={onlyNumbers} on:keypress={keyPress} bind:value={text}
    style="
        --color:{$globalThemeStore.input.text.color};
        --backgroundColor:{$globalThemeStore.input.text.backgroundColor};
    "
    />
    <div class="w-8 h-8 flex place-content-center items-center font-bold">{trailingLetter}</div>
</div>

{:else if leadingLetter != ""}
<div class="flex flex-row max-w-[180px] h-8 pr-2">
    <div class="w-8 h-8 flex place-content-center items-center font-bold">{leadingLetter}</div>
    <input type="text" class="inputtext max-w-[144px] rounded-lg p-2 mb-1 {addClass}" class:normal-nums={onlyNumbers} on:keypress={keyPress} bind:value={text}
    style="
        --color:{$globalThemeStore.input.text.color};
        --backgroundColor:{$globalThemeStore.input.text.backgroundColor};
    "
    />
</div>
{:else}

<input type="text" class="inputtext max-w-[180px] rounded-lg p-2 mb-1 {addClass}" class:normal-nums={onlyNumbers} on:keypress={keyPress} bind:value={text}
style="
    --color:{$globalThemeStore.input.text.color};
    --backgroundColor:{$globalThemeStore.input.text.backgroundColor};
"
/>
{/if}



<style>

    .inputtext{
        background-color: var(--backgroundColor);
        color: var(--color);
        /* height: 32px; */
    }

    .inputtext:focus{
        border: 1 px solid var(--color);
    }


</style>

