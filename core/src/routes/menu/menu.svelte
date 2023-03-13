<script>
    import { onMount, onDestroy } from "svelte";
    import { globalComponentCollectionStore, globalEditorPreferencesStore, globalEditorViewStore, globalThemeStore } from "../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSize, ScreenSizePx, EditorViews } from "../globals/globalconstants.js";
    import Customize from "./customize/page.svelte";
    import Widgets from "./widgets/page.svelte";
    import Options from "./options/page.svelte";
    import Layers from "./layers/page.svelte";
	import Button from "../uicomponents/button.svelte";
	import Iconbutton from "../uicomponents/iconbutton.svelte";


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


<div class="horizontalMenu flex flex-row align-middle items-center" style='
    --backgroundColor:{$globalThemeStore.menu.backgroundColor};
    --foregroundColor:{$globalThemeStore.menu.foregroundColor};
    ' >
    <div class="float-left">
        <div class="flex flex-row gap-1 pl-3 align-middle items-center">
            <Widgets onlyButton={true} />
        </div>
    </div>

    <div class="flex flex-1 mx-auto">
        {#if buildType != "release"}
        <div class="flex flex-row gap-1 mx-auto align-middle items-center">
            <button class="iconButton" class:selected={globalEditorView == EditorViews.PAGE} on:click={() => setEditorView(EditorViews.PAGE)}><i class="bi bi-wordpress"></i></button>
            <div class="vr"></div>
            <button class="iconButton" class:selected={globalEditorView == EditorViews.CODE} on:click={() => setEditorView(EditorViews.CODE)}><i class="bi bi-code-slash"></i></button>
            <div class="vr"></div>
            <button class="iconButton" class:selected={globalEditorView == EditorViews.DEBUG} on:click={() => setEditorView(EditorViews.DEBUG)}><i class="bi bi-braces-asterisk"></i></button>
        </div>
        {/if}
    </div>

    <div class="float-right">
        <div class="flex flex-row gap-1 pr-3 h-full align-middle items-center">
            <div class="vr"></div>
            <Iconbutton active={fullWidth} on:click={setFullWidth} noBackground={true}><span slot="icon"><i class="bi bi-fullscreen"></i></span></Iconbutton>
            <Iconbutton active={editorScreen == ScreenSize.DESKTOP} on:click={() => setScreenSize(ScreenSize.DESKTOP)} noBackground={true}>
                <span slot="icon"><i class="bi bi-display"></i></span></Iconbutton>
            <Iconbutton active={editorScreen == ScreenSize.TABLET} on:click={() => setScreenSize(ScreenSize.TABLET)} noBackground={true}>
                <span slot="icon"><i class="bi bi-tablet"></i></span></Iconbutton>
            <Iconbutton active={editorScreen == ScreenSize.MOBILE} on:click={() => setScreenSize(ScreenSize.MOBILE)} noBackground={true}>
                <span slot="icon"><i class="bi bi-phone"></i></span></Iconbutton>

            <div class="vr"></div>

            <Options onlyButton={true} />
            <Layers onlyButton={true} />
            <Customize onlyButton={true} />

            <div class="vr"></div>

            <Button active={true} addClass={"ml-3"}>
                <span slot="text">Publish</span>
                <span slot="iconRight"><i class="bi bi-globe"></i></span>
            </Button>

        </div>



    </div>
</div>

{:else}

<div class="verticalMenu flex flex-col space-y-auto" style='
    --backgroundColor:{$globalThemeStore.menu.backgroundColor};
    --foregroundColor:{$globalThemeStore.menu.foregroundColor};
' >

    <div class="flex items-start">
        <div class="flex flex-col gap-1 pt-3">
            <Widgets onlyButton={true} />
            
        </div>
    </div>
    <div class="flex flex-grow"></div>

    <div class="flex content-end items-end">
        <div class="flex flex-col place-content-center justify-items-center place-items-center gap-1 pb-2">

            <div class="hr"></div>
            <Iconbutton active={fullWidth} on:click={setFullWidth} noBackground={true}><span slot="icon"><i class="bi bi-fullscreen"></i></span></Iconbutton>
            <Iconbutton active={editorScreen == ScreenSize.DESKTOP} on:click={() => setScreenSize(ScreenSize.DESKTOP)} noBackground={true}>
                <span slot="icon"><i class="bi bi-display"></i></span></Iconbutton>
            <Iconbutton active={editorScreen == ScreenSize.TABLET} on:click={() => setScreenSize(ScreenSize.TABLET)} noBackground={true}>
                <span slot="icon"><i class="bi bi-tablet"></i></span></Iconbutton>
            <Iconbutton active={editorScreen == ScreenSize.MOBILE} on:click={() => setScreenSize(ScreenSize.MOBILE)} noBackground={true}>
                <span slot="icon"><i class="bi bi-phone"></i></span></Iconbutton>

            <div class="hr"></div>
            
            <Options onlyButton={true} />
            <div class="vSpace"></div>
            <Layers onlyButton={true} />
            <div class="vSpace"></div>
            <Customize onlyButton={true} />
            <div class="vSpace"></div>
            <div class="hr"></div>

            <Button active={true} addClass={"mb-3"} horizontal={false}>
                <span slot="text">Publish</span>
                <span slot="iconTop"><i class="bi bi-globe"></i></span>
            </Button>
            
        </div>

    </div>

</div>

{/if}


<div class="hidden">

</div>

<style>
    .horizontalMenu{
        width: 100%;
        height: 50px;
        /* padding-top: 9px;
        padding-bottom: 9px; */
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

    :global(.hr) {
        display: inline-block;
        align-self: stretch;
        height: 1px;
        min-width: 1em;
        background-color: var(--foregroundColor);
        opacity: 0.25;
    }

    :global(.vr) {
        display: inline-block;
        align-self: stretch;
        width: 1px;
        height: 50px;
        min-height: 1em; /* 1em */
        background-color: var(--foregroundColor);
        opacity: 0.25;
    }

    .vSpace{
        height: 8px;
    }

</style>