<script>
    import { globalEditorPreferencesStore, globalVisibilityStore, globalThemeStore } from "../../../globals/globalstores.js";
    import { PanelDisplayStyles, PanelDefinitions } from "../../../globals/globalconstants.js";
    import Iconbutton from "../../../uicomponents/iconbutton.svelte";

    /**
     * Holds "globalEditorPreferencesStore" store as variable
     */
    let globalEditorPreferences = $globalEditorPreferencesStore;
    /// Updates "globalEditorPreferencesStore" whenever variable "globalEditorPreferences" changes.
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

    /**
     * Sets panel location on main frame
     * @param {String} panelStyle Taken from "panels.style" defined in this file as "const panels = []"
     * @param {String} location Must be one of "PanelDisplayStyles" from globalconstants.js
     */
    function setPanelLocation(panelStyle, location){
        /// Set panel location
        globalEditorPreferences[panelStyle] = location;
        /// Panel location is set but panel is still hidden. Because it can be shown only in one place and we hold visibility in locations separately.
        /// Since customize panel has a special condition like after editing it must be still visible, so instead of toggle we directly show it.
        showCustomizePanel();
    }

    /**
     * Shows "Customize Editor" panel.
     */
    function showCustomizePanel(){

        /**
         * Holds "globalVisibilityStore" store as variable to update
         */
        let globalVisibility = $globalVisibilityStore;

        /// $globalEditorPreferencesStore is used directly to get latest condition
        switch($globalEditorPreferencesStore.customizePanelDisplayStyle){
            case PanelDisplayStyles.FIXEDLEFT:
                for(var key in globalVisibility.left) {
                    if(key == "customizePanel"){
                        globalVisibility.left[key] = true; /// we set directly true instead of !visible
                    }else{
                        globalVisibility.left[key] = false; /// Hide any other panel in this location
                    }
                }
                globalVisibility.right.customizePanel = false; /// Hide in other locations
                globalVisibility.default.customizePanel = false; /// Hide in other locations
                break;
            case PanelDisplayStyles.FIXEDRIGHT:
                for(var key in globalVisibility.right) {
                    if(key == "customizePanel"){
                        globalVisibility.right[key] = true; /// we set directly true instead of !visible
                    }else{
                        globalVisibility.right[key] = false; /// Hide any other panel in this location
                    }
                }
                globalVisibility.left.customizePanel = false; /// Hide in other locations
                globalVisibility.default.customizePanel = false; /// Hide in other locations
                break;
            default:
                globalVisibility.default.customizePanel = true;
                globalVisibility.right.customizePanel = false; /// Hide in other locations
                globalVisibility.left.customizePanel = false; /// Hide in other locations
                break;
        }

        ///Updates "globalVisibilityStore" only once
        globalVisibilityStore.set(globalVisibility);
        
    }


</script>


 {#each PanelDefinitions as panel}

<div class="w-full flex flex-row grow justify-between h-8 align-middle items-center" style='
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
    <span title="Set Menu location on screen">{panel.name}</span>
    <span class="mx-auto"></span>
    <div class="w-[130px] flex flex-row gap-1">
        <Iconbutton active={$globalEditorPreferencesStore[panel.style] == PanelDisplayStyles.FIXEDLEFT} on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDLEFT)}><span slot="icon" title="Left"><i class="bi bi-arrow-left"></i></span></Iconbutton>
        <Iconbutton active={$globalEditorPreferencesStore[panel.style] == PanelDisplayStyles.FIXEDRIGHT} on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDRIGHT)}><span slot="icon" title="Right"><i class="bi bi-arrow-right"></i></span></Iconbutton>
        <!-- <Iconbutton active={$globalEditorPreferencesStore[panel.style] == PanelDisplayStyles.FLOAT} on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FLOAT)}><span slot="icon" title="Float"><i class="bi bi-circle"></i></span></Iconbutton> -->
    </div>
</div>
<div class="widgetPanelDivider"></div>

{/each}


