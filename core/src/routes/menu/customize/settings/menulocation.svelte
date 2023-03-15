<script>
    import { globalEditorPreferencesStore, globalVisibilityStore } from "../../../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations } from "../../../globals/globalconstants.js";
    import Optionsbutton from "../../../uicomponents/optionsbutton.svelte";

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

    /**
     * Holds selected location in number
     * @type number
     */
    let selectedLocation = 0;

    /**
     * @typedef {Object} nestedItemsType
     * @property {string} outerClass
     * @property {string} innerClass
     */

    /**
     * @type Array<nestedItemsType>
     */
    let locationList = [
        {outerClass: "-rotate-90", innerClass: "bi bi-layout-sidebar-inset-reverse"},
        {outerClass: "rotate-90", innerClass: "bi bi-layout-sidebar-inset-reverse"},
        {outerClass: "rotate-180", innerClass: "bi bi-layout-sidebar-inset-reverse"},
        {outerClass: "", innerClass: "bi bi-layout-sidebar-inset-reverse"},
    ];

    let locationPositions = [
        MenuLocations.TOP,
        MenuLocations.BOTTOM,
        MenuLocations.LEFT,
        MenuLocations.RIGHT
    ];

    $: selectedLocation, (()=>{
        console.log("selectedLocation : " + selectedLocation + " |=> : "+locationPositions[selectedLocation]);
        setMenuLocation(locationPositions[selectedLocation]);
    })();

</script>

<!-- <div class="flex flex-row place-content-between h-8 items-center">
    <span>Menu</span>
    <div class="w-[150px]">
        <Optionsbutton nestedItems={locationList} nested={true} bind:value={selectedLocation}></Optionsbutton>
    </div>
    
</div> -->



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

    :global(.rotate-90deg){
        transform: rotate(90deg) !important;
    }
    :global(.rotate-180deg){
        transform: rotate(180deg) !important;
    }
    :global(.rotate-270deg){
        transform: rotate(270deg) !important;
    }



</style>