<script>
    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";

    /**
     * Variable that hold active state of element
     * @type boolean
     */
    export let active;

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function clickButton() {
        dispatch('click');
    }



</script>
<input type="hidden" class="atomButton atomButtonActive" />

<button class="atomButton rounded-lg h-8 w-max px-3" class:atomButtonActive={active} on:click={clickButton}  
style="
    --buttonActiveIconColor:{$globalThemeStore.button.active.iconColor};
    --buttonActiveTextColor:{$globalThemeStore.button.active.textColor};
    --buttonActiveBackgroundColor:{$globalThemeStore.button.active.backgroundColor};
    --buttonPassiveIconColor:{$globalThemeStore.button.passive.iconColor};
    --buttonPassiveTextColor:{$globalThemeStore.button.passive.textColor};
    --buttonPassiveBackgroundColor:{$globalThemeStore.button.passive.backgroundColor};
"  >
    <span class="atomButtonIcon mr-2 p-0"><slot name="iconLeft"></slot></span>
    <span class="atomButtonText m-0 p-0"><slot name="text"></slot></span>
    <span class="atomButtonIcon ml-2 p-0"><slot name="iconRight"></slot></span>
</button>


<style>


    .atomButton{
        background-color: var(--buttonPassiveBackgroundColor);
    }

    .atomButton .atomButtonActive{
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