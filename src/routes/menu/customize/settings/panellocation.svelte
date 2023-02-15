<script>
    import { globalEditorPreferencesStore, globalVisibilityStore } from "../../../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations } from "../../../globals/globalconstants.js";

    let globalEditorPreferences = $globalEditorPreferencesStore ?? {};
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

    let panels = [
        {"name":"Customize Panel","style": "customizePanelDisplayStyle"},
        {"name":"Widgets Panel","style": "widgetPanelDisplayStyle"},
        {"name":"Options Panel","style": "optionPanelDisplayStyle"},
    ];



    function setMenuLocation(panelStyle, location){
        // console.log("menuLocation:" + location);
        // globalEditorPreferences.menuLocation = location;
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

    {#each panels as panel}
        <div class="hstack customizeRow my-2">
            <span>{panel.name}</span>
            <span class="ms-auto"></span>
            <div class="hstack">

                {#if $globalEditorPreferencesStore[panel.style] == PanelDisplayStyles.FLOAT}
                    <button class="iconButton rotate-180deg" on:click={() => setMenuLocation(panel.style, PanelDisplayStyles.FIXEDLEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
                    <button class="iconButton " on:click={() => setMenuLocation(panel.style, PanelDisplayStyles.FIXEDRIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
                    <button class="iconButton selected " on:click={() => setMenuLocation(panel.style, PanelDisplayStyles.FLOAT)} ><i class="bi bi-hand-index-thumb-fill"></i></button>

                {:else if $globalEditorPreferencesStore[panel.style] == PanelDisplayStyles.FIXEDLEFT}
                    <button class="iconButton selected rotate-180deg" on:click={() => setMenuLocation(panel.style, PanelDisplayStyles.FIXEDLEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
                    <button class="iconButton " on:click={() => setMenuLocation(panel.style, PanelDisplayStyles.FIXEDRIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
                    <button class="iconButton " on:click={() => setMenuLocation(panel.style, PanelDisplayStyles.FLOAT)} ><i class="bi bi-hand-index-thumb-fill"></i></button>
                    
                {:else if $globalEditorPreferencesStore[panel.style] == PanelDisplayStyles.FIXEDRIGHT}
                    <button class="iconButton rotate-180deg" on:click={() => setMenuLocation(panel.style, PanelDisplayStyles.FIXEDLEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
                    <button class="iconButton selected" on:click={() => setMenuLocation(panel.style, PanelDisplayStyles.FIXEDRIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
                    <button class="iconButton " on:click={() => setMenuLocation(panel.style, PanelDisplayStyles.FLOAT)} ><i class="bi bi-hand-index-thumb-fill"></i></button>
                    
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

    .rotate-90deg{
        transform: rotate(90deg) !important;
    }
    .rotate-180deg{
        transform: rotate(180deg) !important;
    }
    .rotate-270deg{
        transform: rotate(270deg) !important;
    }
    
</style>