<script>
    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";

    /**
     * Variable that hold active state of element
     * @type boolean
     */
    export let active;

    /**
     * Variable that hold active state of element
     * @type string
     */
    export let addClass = "";

    /**
     * Variable that hold active state of element
     * @type boolean
     */
    export let noBackground = false;


    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function clickButton() {
        dispatch('click');
    }



</script>
<input type="hidden" class="atomButton atomButtonActive" />

<button class="atomButton rounded-lg h-8 w-8 {addClass}" class:atomButtonActive={active} on:click={clickButton}
style="
    --buttonActiveIconColor:{$globalThemeStore.button.active.iconColor};
    --buttonActiveTextColor:{$globalThemeStore.button.active.textColor};
    --buttonActiveBackgroundColor:{$globalThemeStore.button.active.backgroundColor};
    --buttonPassiveIconColor:{$globalThemeStore.button.passive.iconColor};
    --buttonPassiveTextColor:{$globalThemeStore.button.passive.textColor};
    --buttonPassiveBackgroundColor:{noBackground == false ? $globalThemeStore.button.passive.backgroundColor : "transparent"};
"  >

    <span class="atomButtonIcon"><slot name="icon"></slot></span>

</button>


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