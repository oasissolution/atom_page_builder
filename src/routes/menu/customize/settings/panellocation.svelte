<script>
    import { globalEditorPreferencesStore } from "../../../globals/globalstores.js";
    import { PanelDisplayStyles, PanelDefinitions } from "../../../globals/globalconstants.js";

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
        globalEditorPreferences[panelStyle] = location;
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

                {#if $globalEditorPreferencesStore[panel.style] == PanelDisplayStyles.FLOAT}
                    <button class="iconButton rotate-180deg" on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDLEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
                    <button class="iconButton " on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDRIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
                    <button class="iconButton selected " on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FLOAT)} ><i class="bi bi-hand-index-thumb-fill"></i></button>

                {:else if $globalEditorPreferencesStore[panel.style] == PanelDisplayStyles.FIXEDLEFT}
                    <button class="iconButton selected rotate-180deg" on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDLEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
                    <button class="iconButton " on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDRIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
                    <button class="iconButton " on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FLOAT)} ><i class="bi bi-hand-index-thumb-fill"></i></button>
                    
                {:else if $globalEditorPreferencesStore[panel.style] == PanelDisplayStyles.FIXEDRIGHT}
                    <button class="iconButton rotate-180deg" on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDLEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
                    <button class="iconButton selected" on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FIXEDRIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
                    <button class="iconButton " on:click={() => setPanelLocation(panel.style, PanelDisplayStyles.FLOAT)} ><i class="bi bi-hand-index-thumb-fill"></i></button>
                    
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
    
</style>