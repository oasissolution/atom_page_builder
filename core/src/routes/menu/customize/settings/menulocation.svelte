<script>
    import { globalEditorPreferencesStore, globalVisibilityStore } from "../../../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations } from "../../../globals/globalconstants.js";

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

<div class="flex flex-row customizeRow" style='
    --fixedPanelBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelBackgroundColor};
    --fixedPanelForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelForegroundColor};
    --buttonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveBackgroundColor};
    --buttonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveBackgroundColor};
    --buttonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonActiveForegroundColor};
    --buttonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.fixedPanelButtonPassiveForegroundColor};
' >
    <span>Menu</span>
    <span class="mx-auto"></span>
    <div class="flex flex-row">

        {#if $globalEditorPreferencesStore.menuLocation == MenuLocations.TOP}
            <button class="iconButton selected rotate-270deg" on:click={() => setMenuLocation(MenuLocations.TOP)} ><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
            <button class="iconButton rotate-90deg" on:click={() => setMenuLocation(MenuLocations.BOTTOM)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
            <button class="iconButton rotate-180deg" on:click={() => setMenuLocation(MenuLocations.LEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
            <button class="iconButton " on:click={() => setMenuLocation(MenuLocations.RIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button>
        {:else if $globalEditorPreferencesStore.menuLocation == MenuLocations.LEFT}
            <button class="iconButton rotate-270deg" on:click={() => setMenuLocation(MenuLocations.TOP)} ><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
            <button class="iconButton rotate-90deg" on:click={() => setMenuLocation(MenuLocations.BOTTOM)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
            <button class="iconButton selected rotate-180deg" on:click={() => setMenuLocation(MenuLocations.LEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
            <button class="iconButton " on:click={() => setMenuLocation(MenuLocations.RIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button>
        {:else if $globalEditorPreferencesStore.menuLocation == MenuLocations.RIGHT}
            <button class="iconButton rotate-270deg" on:click={() => setMenuLocation(MenuLocations.TOP)} ><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
            <button class="iconButton rotate-90deg" on:click={() => setMenuLocation(MenuLocations.BOTTOM)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
            <button class="iconButton rotate-180deg" on:click={() => setMenuLocation(MenuLocations.LEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
            <button class="iconButton selected" on:click={() => setMenuLocation(MenuLocations.RIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button>
        {:else }
            <button class="iconButton rotate-270deg" on:click={() => setMenuLocation(MenuLocations.TOP)} ><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
            <button class="iconButton selected rotate-90deg" on:click={() => setMenuLocation(MenuLocations.BOTTOM)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button><div class="vr"></div>
            <button class="iconButton rotate-180deg" on:click={() => setMenuLocation(MenuLocations.LEFT)}><i class="bi bi-layout-sidebar-inset-reverse "></i></button><div class="vr"></div>
            <button class="iconButton " on:click={() => setMenuLocation(MenuLocations.RIGHT)}><i class="bi bi-layout-sidebar-inset-reverse"></i></button>
        {/if}

    </div>
</div>


<style>

    .iconButton{
        width: 32px;
        height: 32px;
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

    .hr {
        display: inline-block;
        align-self: stretch;
        height: 1px;
        min-width: 1em;
        background-color: var(--foregroundColor);
        opacity: 0.25;
    }

    .vr {
        display: inline-block;
        align-self: stretch;
        width: 1px;
        min-height: 1em;
        background-color: var(--foregroundColor);
        opacity: 0.25;
    }

</style>