<script>
    import "../../../app.css";
	import Iconbutton from "../../uicomponents/iconbutton.svelte";
    import { globalThemeStore } from "../../globals/globalstores.js";
    import { themeColors as DarkTheme } from "../../themes/dark.js";

    /**
     * This is a default variable, which holds position of "Actions" panel according to top-right corner on X axis.
     * 
     * Do not change variable name, since this is a standart definition for all modules.
     */
    export const marginX = "-6px";

    /**
     * This is a default variable, which holds position of "Actions" panel according to top-right corner on Y axis.
     * 
     * Do not change variable name, since this is a standart definition for all modules.
     */
    export const marginY = "0px";

    /**
     * Width of "Actions" panel.
     */
    export const ActionsWidth = "112px";

    /**
     * @type string
     */
    let fixedPanelBackgroundColor;
    /**
     * @type string
     */
    let fixedPanelForegroundColor;

    if(globalThemeStore != undefined && $globalThemeStore != undefined){
        fixedPanelBackgroundColor = $globalThemeStore.panel.backgroundColor;
        fixedPanelForegroundColor = $globalThemeStore.panel.foregroundColor;
    }else{
        try {
            globalThemeStore.set(DarkTheme);
            fixedPanelBackgroundColor = $globalThemeStore.panel.backgroundColor;
            fixedPanelForegroundColor = $globalThemeStore.panel.foregroundColor;
        } catch (error) {
            fixedPanelBackgroundColor = "#242425";
            fixedPanelForegroundColor = "#9F9F9F";
        }

    }


    function editButtonPress(){
        alert("Button clicked!");
    }

</script>

<div class="flex flex-row w-28 rounded-md gap-1 divide-x divide-black/40 place-content-center items-center content-center inlinePanel" style='
--fixedPanelBackgroundColor:{fixedPanelBackgroundColor};
--fixedPanelForegroundColor:{fixedPanelForegroundColor};
' >

    <div class="flex flex-row gap-1">
        <Iconbutton active={false} on:click={editButtonPress} noBackground><span slot="icon"><i class="bi bi-pen"></i></span></Iconbutton>
        <Iconbutton active={false} on:click={editButtonPress} noBackground><span slot="icon"><i class="bi bi-files"></i></span></Iconbutton>
    </div>

    <div>
        <Iconbutton active={false} on:click={editButtonPress} noBackground><span slot="icon"><i class="bi bi-x-circle"></i></span></Iconbutton>
    </div>
    
</div>

<style>

    .inlinePanel{
        background-color: var(--fixedPanelBackgroundColor);
        color: var(--fixedPanelForegroundColor);
    }

</style>