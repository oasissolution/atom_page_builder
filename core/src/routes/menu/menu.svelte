<script>
    import { onMount, onDestroy } from "svelte";
    import { globalComponentCollectionStore, globalEditorPreferencesStore, globalEditorViewStore } from "../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSize, ScreenSizePx, EditorViews } from "../globals/globalconstants.js";
    import Customize from "./customize/page.svelte";
    import Widgets from "./widgets/page.svelte";
    import Options from "./options/page.svelte";
    import Layers from "./layers/page.svelte";

    /**
     * Holds "globalEditorPreferencesStore" store as variable
     */
    let globalEditorPreferences = $globalEditorPreferencesStore;
    /// Updates "globalEditorPreferencesStore" whenever variable "globalEditorPreferences" changes.
    $: globalEditorPreferencesStore.set(globalEditorPreferences);


    /**
     * Holds "globalEditorViewStore" store as variable
     */
    let globalEditorView = $globalEditorViewStore;
    /// Updates "globalEditorViewStore" whenever variable "globalEditorView" changes.
    $: globalEditorViewStore.set(globalEditorView);

    /**
     * Updates Editor View.
     * @param {string} newView Must be one of "EditorViews" from global constants.
     */
    function setEditorView(newView){
        globalEditorView = newView;
    }

    /**
     * Used for release / dev differences
     */
    let buildType = globalEditorPreferences.build;


    let editorData = $globalEditorPreferencesStore.editorData;
    let editorWidth = editorData.editorWidth;
    let editorScreen = editorData.editorScreen;
    let fullWidth = editorData.fullWidth;

    /**
     * Sets Editor width
     * @param {string} size Must be one of "ScreenSize" from global constants.
     */
    function setScreenSize(size){
        editorScreen = size;
        globalEditorPreferences.editorData.editorScreen = size;
        switch(size){
            case ScreenSize.DESKTOP:
                if(fullWidth==true){
                    editorWidth = ScreenSizePx.FULLWIDTH;
                    globalEditorPreferences.editorData.editorWidth = ScreenSizePx.FULLWIDTH;
                }else{
                    editorWidth = ScreenSizePx.DESKTOP;
                    globalEditorPreferences.editorData.editorWidth = ScreenSizePx.DESKTOP;
                }
                break;
            case ScreenSize.TABLET:
                editorWidth = ScreenSizePx.TABLET;
                globalEditorPreferences.editorData.editorWidth = ScreenSizePx.TABLET;
                break;
            case ScreenSize.MOBILE:
                editorWidth = ScreenSizePx.MOBILE;
                globalEditorPreferences.editorData.editorWidth = ScreenSizePx.MOBILE;
                break;
        }
        globalEditorPreferences = globalEditorPreferences;
    }

    /**
     * Set editor screen/panel to full width available
     */
    function setFullWidth(){
        fullWidth = !fullWidth;
        globalEditorPreferences.editorData.fullWidth = fullWidth;
        if(editorScreen == ScreenSize.DESKTOP){
            if(fullWidth==true){
                editorWidth = ScreenSizePx.FULLWIDTH;
                globalEditorPreferences.editorData.editorWidth = ScreenSizePx.FULLWIDTH;
            }else{
                editorWidth = ScreenSizePx.DESKTOP;
                globalEditorPreferences.editorData.editorWidth = ScreenSizePx.DESKTOP;
            }
        }
    }



</script>

{#if globalEditorPreferences.menuLocation == MenuLocations.TOP || globalEditorPreferences.menuLocation == MenuLocations.BOTTOM}



<div class="horizontalMenu flex flex-row" style='
    --backgroundColor:{$globalEditorPreferencesStore.editorTheme.backgroundColor};
    --foregroundColor:{$globalEditorPreferencesStore.editorTheme.foregroundColor};
    --buttonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveBackgroundColor};
    --buttonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveBackgroundColor};
    --buttonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveForegroundColor};
    --buttonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveForegroundColor};
    ' >
    <div class="float-left">
        <div class="flex flex-row gap-1 pl-3">
            <Widgets onlyButton={true} />
            <Options onlyButton={true} />
            <Layers onlyButton={true} />
        </div>
    </div>

    <div class="flex flex-1 mx-auto">
        {#if buildType != "release"}
        <div class="flex flex-row gap-1 mx-auto">
            <button class="iconButton" class:selected={globalEditorView == EditorViews.PAGE} on:click={() => setEditorView(EditorViews.PAGE)}><i class="bi bi-wordpress"></i></button>
            <div class="vr"></div>
            <button class="iconButton" class:selected={globalEditorView == EditorViews.CODE} on:click={() => setEditorView(EditorViews.CODE)}><i class="bi bi-code-slash"></i></button>
            <div class="vr"></div>
            <button class="iconButton" class:selected={globalEditorView == EditorViews.DEBUG} on:click={() => setEditorView(EditorViews.DEBUG)}><i class="bi bi-braces-asterisk"></i></button>
        </div>
        {/if}
    </div>

    <div class="float-right">
        <div class="flex flex-row gap-1 pr-3">
            <button class="iconButton" class:selected={fullWidth} on:click={setFullWidth}><i class="bi bi-fullscreen"></i></button>
            <div class="vr"></div>
            <button class="iconButton" class:selected={editorScreen == ScreenSize.DESKTOP} on:click={() => setScreenSize(ScreenSize.DESKTOP)}><i class="bi bi-display"></i></button>
            <div class="vr"></div>
            <button class="iconButton" class:selected={editorScreen == ScreenSize.TABLET} on:click={() => setScreenSize(ScreenSize.TABLET)}><i class="bi bi-tablet"></i></button>
            <div class="vr"></div>
            <button class="iconButton" class:selected={editorScreen == ScreenSize.MOBILE} on:click={() => setScreenSize(ScreenSize.MOBILE)}><i class="bi bi-phone"></i></button>
            <div class="spacer"></div>
            <Customize onlyButton={true} />
        </div>
    </div>
</div>

{:else}

<div class="verticalMenu flex flex-col space-y-auto" style='
    --backgroundColor:{$globalEditorPreferencesStore.editorTheme.backgroundColor};
    --foregroundColor:{$globalEditorPreferencesStore.editorTheme.foregroundColor};
    --buttonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveBackgroundColor};
    --buttonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveBackgroundColor};
    --buttonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveForegroundColor};
    --buttonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveForegroundColor};
    ' >

    <div class="flex items-start">
        <div class="flex flex-col gap-1 pt-3">
            <Widgets onlyButton={true} />
            <Options onlyButton={true} />
            <Layers onlyButton={true} />
        </div>
    </div>
    <div class="flex flex-grow"></div>

    <div class="flex content-end items-end">
        <div class="flex flex-col gap-1 pb-2">
            <button class="iconButton" class:selected={fullWidth} on:click={setFullWidth}><i class="bi bi-fullscreen"></i></button>
            <div class="hr"></div>
            <button class="iconButton" class:selected={editorScreen == ScreenSize.DESKTOP} on:click={() => setScreenSize(ScreenSize.DESKTOP)}><i class="bi bi-display"></i></button>
            <div class="hr"></div>
            <button class="iconButton" class:selected={editorScreen == ScreenSize.TABLET} on:click={() => setScreenSize(ScreenSize.TABLET)}><i class="bi bi-tablet"></i></button>
            <div class="hr"></div>
            <button class="iconButton" class:selected={editorScreen == ScreenSize.MOBILE} on:click={() => setScreenSize(ScreenSize.MOBILE)}><i class="bi bi-phone"></i></button>
            <div class="vspacer"></div>
            <Customize onlyButton={true} />
        </div>

    </div>

</div>

{/if}




<style>
    .horizontalMenu{
        width: 100%;
        height: auto;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: 0;
        background-color: var(--backgroundColor);
        color: var(--foregroundColor);
    }

    .verticalMenu{
        width: auto;
        height: 100vh;
        padding-left: 5px;
        padding-right: 5px;
        margin: 0;
        background-color: var(--backgroundColor);
        color: var(--foregroundColor);
    }


    .iconButton{
        width: 32px;
        height: 32px;
        background-color: var(--buttonPassiveBackgroundColor);
        border-color: transparent;
        color: var(--buttonPassiveForegroundColor);
    }
    .iconButton.selected{
        background-color: var(--buttonActiveBackgroundColor);
        color: var(--buttonActiveForegroundColor);
        border-radius: 6px;
    }

    .spacer{
        width: 40px;
    }
    .vspacer{
        height: 40px;
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