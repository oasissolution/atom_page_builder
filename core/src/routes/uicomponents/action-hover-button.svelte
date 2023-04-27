<script>
	import { onMount } from "svelte";

    // This button is used in module actions

    import "../../app.css";
    import { globalThemeStore } from "../globals/globalstores.js";
    import { themeColors as DarkTheme } from "../themes/dark.js";
    import { slide } from 'svelte/transition';

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

    /**
     * @type HTMLElement?
     */
    let selectorHoverPanel;

    /**
     * @type HTMLDivElement
     */
    let hoverPanel;

    /**
     * @type number
     */
    export let hoverPanelWidth = 96;

    /**
     * @type number
     */
    let windowInnerWidth;

    /**
     * @type string
     */
    let hoverPanelTop;
    /**
     * @type string
     */
    let hoverPanelLeft;

    let isPanelVisible = false;

    function showPanel(){
        if(bindElement != null){
            /**
             * Position and dimension data of selected element.
             * @type DOMRect
             */
            const rect = bindElement.getBoundingClientRect();

            var top = rect.bottom + 4;
            var left = rect.left + rect.width / 2 - hoverPanelWidth / 2;
            if(left < 10) left = 10;
            if((left + hoverPanelWidth) > windowInnerWidth) left = windowInnerWidth - hoverPanelWidth - 6;

            hoverPanelTop = top.toFixed(0).toString() + "px";
            hoverPanelLeft = left.toFixed(0).toString() + "px";

            // console.log("rect: " + JSON.stringify(rect) + "\nhoverPanelTop: "+hoverPanelTop + "\nhoverPanelLeft: "+hoverPanelLeft);

        }

        isPanelVisible = true;
    }

    function hidePanel(){
        isPanelVisible = false;
    }

    onMount(()=>{

    });


</script>
<input type="hidden" class="atomButton atomButtonActive" />
<svelte:window bind:innerWidth={windowInnerWidth} />

<button class="atomButton rounded-lg h-8 w-8 {addClass}" class:atomButtonActive={active} bind:this={bindElement} on:mouseenter={showPanel}
style="
    --buttonActiveIconColor:{buttonActiveIconColor};
    --buttonActiveBackgroundColor:{buttonActiveBackgroundColor};
    --buttonPassiveIconColor:{buttonPassiveIconColor};
    --buttonPassiveBackgroundColor:{noBackground == false ? buttonPassiveBackgroundColor : "transparent"};
    --hoverPanelLeft:{hoverPanelLeft};
    --hoverPanelTop:{hoverPanelTop};
    --hoverPanelWidth:{hoverPanelWidth};
"  >

    <span class="atomButtonIcon"><slot name="icon"></slot></span>

</button>

{#if isPanelVisible}
<!-- class:translate-y-[{hoverPanelTop}]={isPanelVisible} -->
    <!-- class:translate-x-[{hoverPanelLeft}]={isPanelVisible} -->

<div class="hoverPanel rounded-lg h-8 translate-y-9" 
    
    bind:this={hoverPanel} on:mouseleave={hidePanel} in:slide={{ duration: 400 }} out:slide={{ duration: 100 }}>
    <slot name="panel"></slot>
</div>
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

    .atomButtonActive > .atomButtonIcon {
        color: var(--buttonActiveIconColor);
    }

    .hoverPanel{
        position: absolute;
        z-index: 100;
        left: var(--hoverPanelLeft);
        top: var(--hoverPanelTop);
        width: var(--hoverPanelWidth);
    }

</style>