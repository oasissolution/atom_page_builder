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
    export let addClass = "";

    /**
     * Variable that holds direction of element
     * 
     * if false, it is vertical
     * @type boolean
     */
     export let horizontal = true;


    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function clickButton() {
        dispatch('click');
    }



</script>
<input type="hidden" class="atomButton atomButtonActive" />

{#if horizontal == true}

<button class="atomButton rounded-lg h-8 w-max {addClass}" class:atomButtonActive={active} on:click={clickButton}
style="
    --buttonActiveIconColor:{$globalThemeStore.button.active.iconColor};
    --buttonActiveTextColor:{$globalThemeStore.button.active.textColor};
    --buttonActiveBackgroundColor:{$globalThemeStore.button.active.backgroundColor};
    --buttonPassiveIconColor:{$globalThemeStore.button.passive.iconColor};
    --buttonPassiveTextColor:{$globalThemeStore.button.passive.textColor};
    --buttonPassiveBackgroundColor:{$globalThemeStore.button.passive.backgroundColor};
"  >
    <span class="atomButtonIcon ml-2"><slot name="iconLeft"></slot></span>
    <span class="atomButtonText mx-1 p-0"><slot name="text"></slot></span>
    <span class="atomButtonIcon mr-2"><slot name="iconRight"></slot></span>
</button>

{:else}

<button class="atomButton rounded-lg h-10 w-10 flex flex-col gap-0 p-0 items-center place-content-center {addClass}" class:atomButtonActive={active} on:click={clickButton}
style="
    --buttonActiveIconColor:{$globalThemeStore.button.active.iconColor};
    --buttonActiveTextColor:{$globalThemeStore.button.active.textColor};
    --buttonActiveBackgroundColor: {"transparent"};
    --buttonPassiveIconColor:{$globalThemeStore.button.passive.iconColor};
    --buttonPassiveTextColor:{$globalThemeStore.button.passive.textColor};
    --buttonPassiveBackgroundColor:{"transparent"};
"  >
    <span class="atomButtonIcon m-0 text-[22px]"><slot name="iconTop"></slot></span>
    <span class="atomButtonText mx-auto my-0 p-0 text-[8px]"><slot name="text"></slot></span>
    <span class="atomButtonIcon m-0 text-[22px]"><slot name="iconBottom"></slot></span>
</button>

{/if}

<style>


    .atomButton{
        background-color: var(--buttonPassiveBackgroundColor);
    }

    .atomButton.atomButtonActive{
        background-color: var(--buttonActiveBackgroundColor);
    }

    .atomButtonIcon{
        color: var(--buttonPassiveIconColor);
    }

    .atomButtonText{
        color: var(--buttonPassiveTextColor);
    }

    .atomButtonActive > .atomButtonIcon {
        color: var(--buttonActiveIconColor);
    }

    .atomButtonActive > .atomButtonText {
        color: var(--buttonActiveTextColor);
    }



</style>