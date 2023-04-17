<script>
    import { globalEditorPreferencesStore, globalThemeStore } from "../../../globals/globalstores.js";
    import { MenuLocations } from "../../../globals/globalconstants.js";
	import Iconbutton from "../../../uicomponents/iconbutton.svelte";

    /**
     * Holds "globalEditorPreferencesStore" store as variable
     */
    let globalEditorPreferences = $globalEditorPreferencesStore ?? {};
    /// Updates "globalEditorPreferencesStore" whenever variable "globalEditorPreferences" changes.
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

    /**
     * Sets Menu Location on main frame.
     * @param {string} location Must be one of "MenuLocations" from globalconstants.js
     */
    function setMenuLocation(location){
        globalEditorPreferences.menuLocation = location;
    }

</script>


<div class="w-full flex flex-row flex-grow justify-between h-8 align-middle items-center" style='
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
    <span title="Set Menu location on screen">Menu</span>
    <div class="w-[130px] flex flex-row gap-1">
        <Iconbutton active={$globalEditorPreferencesStore.menuLocation == MenuLocations.LEFT} on:click={() => setMenuLocation(MenuLocations.LEFT)}><span slot="icon" title="Left"><i class="bi bi-arrow-left"></i></span></Iconbutton>
        <Iconbutton active={$globalEditorPreferencesStore.menuLocation == MenuLocations.RIGHT} on:click={() => setMenuLocation(MenuLocations.RIGHT)}><span slot="icon" title="Right"><i class="bi bi-arrow-right"></i></span></Iconbutton>
        <Iconbutton active={$globalEditorPreferencesStore.menuLocation == MenuLocations.TOP} on:click={() => setMenuLocation(MenuLocations.TOP)}><span slot="icon" title="Top"><i class="bi bi-arrow-up"></i></span></Iconbutton>
        <Iconbutton active={$globalEditorPreferencesStore.menuLocation == MenuLocations.BOTTOM} on:click={() => setMenuLocation(MenuLocations.BOTTOM)}><span slot="icon" title="Bottom"><i class="bi bi-arrow-down"></i></span></Iconbutton>
    </div>
</div>
