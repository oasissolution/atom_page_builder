<script>
    import { onMount, onDestroy } from "svelte";
    import { globalComponentCollectionStore, globalEditorPreferencesStore } from "../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSize, ScreenSizePx } from "../globals/globalconstants.js";
    import Customize from "./customize/+page.svelte";

    /**
     * Holds "globalEditorPreferencesStore" store as variable
     */
    let globalEditorPreferences = $globalEditorPreferencesStore ?? {};
    /// Updates "globalEditorPreferencesStore" whenever variable "globalEditorPreferences" changes.
    $: globalEditorPreferencesStore.set(globalEditorPreferences);



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



<div class="horizontalMenu row" style='
    --backgroundColor:{$globalEditorPreferencesStore.editorTheme.backgroundColor};
    --foregroundColor:{$globalEditorPreferencesStore.editorTheme.foregroundColor};
    --buttonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveBackgroundColor};
    --buttonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveBackgroundColor};
    --buttonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveForegroundColor};
    --buttonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveForegroundColor};
    ' >
    <div class="col-3 d-flex justify-content-start"></div>

    <div class="col-6 d-flex justify-content-center"></div>

    <div class="col-3 d-flex justify-content-end align-items-end">
        <div class="hstack gap-1">
            {#if fullWidth == true}
            <button class="iconButton selected" on:click={setFullWidth}><i class="fa-solid fa-arrows-left-right-to-line"></i></button>
            {:else}
            <button class="iconButton " on:click={setFullWidth}><i class="fa-solid fa-arrows-left-right-to-line"></i></button>
            {/if}
            <div class="vr"></div>
            {#if editorScreen == ScreenSize.DESKTOP}
            <button class="iconButton  selected" on:click={() => setScreenSize(ScreenSize.DESKTOP)}><i class="fa fa-desktop"></i></button>
            {:else}
            <button class="iconButton " on:click={() => setScreenSize(ScreenSize.DESKTOP)}><i class="fa fa-desktop"></i></button>
            {/if}
            <div class="vr"></div>
            {#if editorScreen == ScreenSize.TABLET}
            <button class="iconButton selected" on:click={() => setScreenSize(ScreenSize.TABLET)}><i class="fa-solid fa-tablet-screen-button"></i></button>
            {:else}
            <button class="iconButton" on:click={() => setScreenSize(ScreenSize.TABLET)}><i class="fa-solid fa-tablet-screen-button"></i></button>
            {/if}
            <div class="vr"></div>
            {#if editorScreen == ScreenSize.MOBILE}
            <button class="iconButton selected" on:click={() => setScreenSize(ScreenSize.MOBILE)}><i class="fa-solid fa-mobile-screen-button"></i></button>
            {:else}
            <button class="iconButton" on:click={() => setScreenSize(ScreenSize.MOBILE)}><i class="fa-solid fa-mobile-screen-button"></i></button>
            {/if}
            <div class="spacer"></div>
            <Customize onlyButton={true} />
        </div>

    </div>
</div>

{:else}

<div class="verticalMenu vstack" style='
    --backgroundColor:{$globalEditorPreferencesStore.editorTheme.backgroundColor};
    --foregroundColor:{$globalEditorPreferencesStore.editorTheme.foregroundColor};
    --buttonActiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveBackgroundColor};
    --buttonPassiveBackgroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveBackgroundColor};
    --buttonActiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonActiveForegroundColor};
    --buttonPassiveForegroundColor:{$globalEditorPreferencesStore.editorTheme.buttonPassiveForegroundColor};
    ' >

    <div class="d-flex align-items-start">&nbsp;</div>
    <div class="mt-auto">&nbsp;</div>

    <div class="d-flex justify-content-end align-items-end">
        <div class="vstack gap-1">
            {#if fullWidth == true}
            <button class="iconButton selected" on:click={setFullWidth}><i class="fa-solid fa-arrows-left-right-to-line"></i></button>
            {:else}
            <button class="iconButton " on:click={setFullWidth}><i class="fa-solid fa-arrows-left-right-to-line"></i></button>
            {/if}
            <div class="hr"></div>
            {#if editorScreen == ScreenSize.DESKTOP}
            <button class="iconButton  selected" on:click={() => setScreenSize(ScreenSize.DESKTOP)}><i class="fa fa-desktop"></i></button>
            {:else}
            <button class="iconButton " on:click={() => setScreenSize(ScreenSize.DESKTOP)}><i class="fa fa-desktop"></i></button>
            {/if}
            <div class="hr"></div>
            {#if editorScreen == ScreenSize.TABLET}
            <button class="iconButton selected" on:click={() => setScreenSize(ScreenSize.TABLET)}><i class="fa-solid fa-tablet-screen-button"></i></button>
            {:else}
            <button class="iconButton" on:click={() => setScreenSize(ScreenSize.TABLET)}><i class="fa-solid fa-tablet-screen-button"></i></button>
            {/if}
            <div class="hr"></div>
            {#if editorScreen == ScreenSize.MOBILE}
            <button class="iconButton selected" on:click={() => setScreenSize(ScreenSize.MOBILE)}><i class="fa-solid fa-mobile-screen-button"></i></button>
            {:else}
            <button class="iconButton" on:click={() => setScreenSize(ScreenSize.MOBILE)}><i class="fa-solid fa-mobile-screen-button"></i></button>
            {/if}
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
        width: 32;
        height: 32;
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

</style>