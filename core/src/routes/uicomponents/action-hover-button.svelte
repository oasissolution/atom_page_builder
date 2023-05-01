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
     * @type HTMLDivElement
     */
    let hoverPanel;

    /**
     * @type number
     */
    export let hoverPanelWidth = 96;

    /**
     * Index of Hover Button in panel
     * 
     * Starts from 0
     * @type number
     */
    export let buttonIndex = 0;

    /**
     * @type number
     */
    let windowInnerWidth;

    /**
     * @type string
     */
     let translateX;
    /**
     * @type string
     */
    let translateY;

    let isPanelVisible = false;

    function showPanel(){
        if(bindElement != null){
            /**
             * Position and dimension data of button.
             * @type DOMRect
             */
            const rect = bindElement.getBoundingClientRect();

            var left = rect.left + rect.width / 2 - hoverPanelWidth / 2;

            var buttonWidthSpace = 32; // Is used in button index, this is width of previous buttons each approximately
            var centerOfButton = buttonIndex * (buttonWidthSpace + 8);
            if(buttonIndex > 0) centerOfButton += parseInt((buttonWidthSpace / 2).toFixed(0));

            var containerLeft = rect.left - buttonIndex * (buttonWidthSpace + 4); // Hover panel default left px, translateX = "0px"

            translateY = "33px"; // h-8 = 32 + 1 offset
            translateX = (rect.width / 2 - hoverPanelWidth / 2 + centerOfButton).toFixed(0).toString()+"px";
            if(left < 10) translateX = (buttonIndex * buttonWidthSpace).toFixed(0).toString()+"px";
            // if((left + hoverPanelWidth) > windowInnerWidth) translateX = ((-1)*(hoverPanelWidth - (windowInnerWidth - rect.left) + 6)).toFixed(0).toString()+"px";
            // if((left + hoverPanelWidth) > windowInnerWidth) translateX = ((windowInnerWidth-hoverPanelWidth-rect.left-6) - (buttonIndex * buttonWidthSpace)).toFixed(0).toString()+"px";
            // if((left + hoverPanelWidth) > windowInnerWidth) translateX = ((-1)*(hoverPanelWidth - (windowInnerWidth - rect.left)) + centerOfButton).toFixed(0).toString()+"px";
            // if((left + hoverPanelWidth) > windowInnerWidth) translateX = (left + hoverPanelWidth/2 - windowInnerWidth).toFixed(0).toString()+"px";
            if((left + hoverPanelWidth) > windowInnerWidth) translateX = (windowInnerWidth - containerLeft - hoverPanelWidth).toFixed(0).toString()+"px";
            
            

            // console.log(
            //     "translateX: "+translateX+
            //     "\ntranslateY: "+translateY+
            //     "\nhoverPanelWidth: "+hoverPanelWidth+
            //     "\nwindowInnerWidth: "+windowInnerWidth+
            //     "\nrect.left: "+rect.left+
            //     "\nleft: "+left
            //     );

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

<button class="atomButton rounded-lg h-8 w-8 {addClass}" class:atomButtonActive={isPanelVisible} bind:this={bindElement} on:mouseenter={showPanel}
style="
    --buttonActiveIconColor:{buttonActiveIconColor};
    --buttonActiveBackgroundColor:{buttonActiveBackgroundColor};
    --buttonPassiveIconColor:{buttonPassiveIconColor};
    --buttonPassiveBackgroundColor:{noBackground == false ? buttonPassiveBackgroundColor : "transparent"};
    --hoverPanelWidth:{hoverPanelWidth};
"  >

    <span class="atomButtonIcon"><slot name="icon"></slot></span>

</button>

{#if isPanelVisible}

<div class="hoverPanel rounded-lg h-8 flex justify-center" style="
    --translateX:{translateX};
    --translateY:{translateY};
    --hoverPanelWidth:{hoverPanelWidth};
" 
    
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
        width: var(--hoverPanelWidth);
        transform: translate3d(var(--translateX), var(--translateY), 0);

    }

</style>