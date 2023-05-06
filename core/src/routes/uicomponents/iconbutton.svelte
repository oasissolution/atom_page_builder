<script>
    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";
    import { themeColors as DarkTheme } from "../themes/dark.js";

    /**
     * Variable that hold active state of element
     * @type boolean
     */
    export let active;

    /**
     * 
     * @type string
     */
    export let addClass = "";

    /**
     * 
     * @type boolean
     */
    export let noBackground = false;

    /**
     * @type HTMLButtonElement?
     */
    export let bindElement=null;

    /**
     * Used in menu buttons, only button section.
     * @type boolean
     */
    export let clickOnHover = false;

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function clickButton() {
        dispatch('click');
    }

    function clickOnHoverFunction(){
        if(clickOnHover == true) clickButton();
    }

    /**
     * @type string
     */
    export let buttonTitle = "";

    /**
     * @type string
     */
    let buttonActiveIconColor;
    /**
     * @type string
     */
    let buttonActiveBackgroundColor;
    /**
     * @type string
     */
    let buttonPassiveIconColor;
    /**
     * @type string
     */
    let buttonPassiveBackgroundColor;

    if(globalThemeStore){
        buttonActiveIconColor = $globalThemeStore.button.active.iconColor;
        buttonActiveBackgroundColor = $globalThemeStore.button.active.backgroundColor;
        buttonPassiveIconColor = $globalThemeStore.button.passive.iconColor;
        buttonPassiveBackgroundColor = noBackground == false ? $globalThemeStore.button.passive.backgroundColor : "transparent";

    }else{
        try {
            globalThemeStore.set(DarkTheme);
            buttonActiveIconColor = $globalThemeStore.button.active.iconColor;
            buttonActiveBackgroundColor = $globalThemeStore.button.active.backgroundColor;
            buttonPassiveIconColor = $globalThemeStore.button.passive.iconColor;
            buttonPassiveBackgroundColor = noBackground == false ? $globalThemeStore.button.passive.backgroundColor : "transparent";

        } catch (error) {
            buttonActiveIconColor = "#0092ED";
            buttonActiveBackgroundColor = "#0092ED26";
            buttonPassiveIconColor = "#9F9F9F";
            buttonPassiveBackgroundColor = noBackground == false ? "#FFFFFF0A" : "transparent";

        }

    }



</script>
<input type="hidden" class="atomButton atomButtonActive" />

<button class="atomButton rounded-lg h-8 w-8 {addClass}" class:atomButtonActive={active} bind:this={bindElement} on:click={clickButton} on:mouseenter={clickOnHoverFunction} title="{buttonTitle}"
style="
    --buttonActiveIconColor:{buttonActiveIconColor};
    --buttonActiveBackgroundColor:{buttonActiveBackgroundColor};
    --buttonPassiveIconColor:{buttonPassiveIconColor};
    --buttonPassiveBackgroundColor:{noBackground == false ? buttonPassiveBackgroundColor : "transparent"};
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

    .atomButtonActive > .atomButtonIcon {
        color: var(--buttonActiveIconColor);
    }


</style>