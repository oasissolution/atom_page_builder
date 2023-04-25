<script>
    import "../../../app.css";
    import { globalThemeStore } from "../../globals/globalstores.js";
    import Iconbutton from "../../uicomponents/iconbutton.svelte";
    import { openOptionsPanel } from "../../(shared)/shared/sharedfunctions.js";

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
    export const marginY = "-38px";





    function editButtonPress(){
        alert("Button clicked!");
    }

</script>

<div class="flex flex-row w-32 rounded-md gap-1 divide-x divide-black/40 place-content-center items-center content-center inlinePanel" style='
--fixedPanelBackgroundColor:{$globalThemeStore.panel.backgroundColor};
--fixedPanelForegroundColor:{$globalThemeStore.panel.foregroundColor};
--fixedPanelTitleColor:{$globalThemeStore.panel.titleColor};
--fixedPanelTabsDivider: {$globalThemeStore.panel.tabsDivider};
--backgroundColor: {$globalThemeStore.widgetIcon.backgroundColor};
--foregroundColor: {$globalThemeStore.widgetIcon.foregroundColor};
--borderColor: {$globalThemeStore.widgetIcon.borderColor};
--iconColor: {$globalThemeStore.widgetIcon.iconColor};
--textColor: {$globalThemeStore.widgetIcon.textColor};
' >

    <div>
        <Iconbutton active={false} on:click={openOptionsPanel} noBackground><span slot="icon"><i class="bi bi-sliders"></i></span></Iconbutton>
    </div>

    <div class="flex flex-row gap-1">
        <Iconbutton active={false} on:click={editButtonPress} noBackground><span slot="icon"><i class="bi bi-pen"></i></span></Iconbutton>
        <Iconbutton active={false} on:click={editButtonPress} noBackground><span slot="icon"><i class="bi bi-files"></i></span></Iconbutton>
    </div>

    <div>
        <Iconbutton active={false} on:click={editButtonPress} noBackground><span slot="icon"><i class="bi bi-x-circle"></i></span></Iconbutton>
    </div>
    
</div>

