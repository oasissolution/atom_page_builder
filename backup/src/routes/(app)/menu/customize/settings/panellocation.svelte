<script>
    import { globalEditorPreferencesStore, globalVisibilityStore } from "../../../../globals/globalstores.js";
    import { PanelDisplayStyles, PanelDefinitions } from "../../../../globals/globalconstants.js";

    /**
     * Holds "globalEditorPreferencesStore" store as variable
     */
    let globalEditorPreferences = $globalEditorPreferencesStore ?? {};
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



<div class="vstack" style='
    --fixedPanelBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelBackgroundColor}; 
    --fixedPanelForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelForegroundColor};
    --buttonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveBackgroundColor};
    --buttonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveBackgroundColor};
    --buttonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveForegroundColor};
    --buttonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveForegroundColor};
' >

    {#each PanelDefinitions as panel}
        <div class="hstack customizeRow my-2">
            <span>{panel.name}</span>
            <span class="ms-auto"></span>
            <div class="hstack">

                {#if $globalEditorPreferencesStore[panel.style] == PanelDisplayStyles.FIXEDLEFT}
                    <button class="iconButton selected rotate-180deg" on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDLEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
                    <button class="iconButton " on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDRIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button>
                    <!-- <div class="vr"></div> -->
                    <!-- <button class="iconButton " on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FLOAT)} ><i class="bi bi-hand-index-thumb-fill"></i></button> -->
                    
                {:else if $globalEditorPreferencesStore[panel.style] == PanelDisplayStyles.FIXEDRIGHT}
                    <button class="iconButton rotate-180deg" on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDLEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
                    <button class="iconButton selected" on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDRIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button>
                    <!-- <div class="vr"></div> -->
                    <!-- <button class="iconButton " on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FLOAT)} ><i class="bi bi-hand-index-thumb-fill"></i></button> -->
                    
                {:else if $globalEditorPreferencesStore[panel.style] == PanelDisplayStyles.FLOAT}
                    <button class="iconButton rotate-180deg" on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDLEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
                    <button class="iconButton " on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDRIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
                    <button class="iconButton selected " on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FLOAT)} ><i class="bi bi-hand-index-thumb-fill"></i></button>

                {/if}

            </div>
        </div>
    {/each}

   
 </div>


<style>

    .iconButton{
       width: 32;
       height: 32;
       background-color: var(--buttonPassiveBackgroundColor);
       border-color: transparent;
       color: var(--buttonPassiveForegroundColor);
       font-size: larger;
       margin-left: 4px;
       margin-right: 4px;
    }
    .iconButton.selected{
       background-color: var(--buttonActiveBackgroundColor) !important;
       color: var(--buttonActiveForegroundColor);
       border-radius: 6px;
    }

    .customizeRow{
        height: 50px;
    }

    .rotate-180deg{
        transform: rotate(180deg) !important;
    }
    
</style>