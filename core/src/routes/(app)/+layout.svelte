<script>
    import { onMount, onDestroy, SvelteComponent } from "svelte";
    import "../../app.css";
    import {
        globalComponentCollectionStore,
        globalEditorPreferencesStore,
        globalRightPanelContentStore,
        globalLeftPanelContentStore,
        globalVisibilityStore,
        globalEditorViewStore
    } from "../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations } from "../globals/globalconstants.js";
    import Menu from "../menu/menu.svelte";
	import Info from "../info.svelte";
    import Customize from "../menu/customize/page.svelte";
    import Widgets from "../menu/widgets/page.svelte";
    import Options from "../menu/options/page.svelte";

    import { loadVariables } from "../loadvariables.svelte";

    import { editorDefaultPreferences, editorBlankData } from "../globals/defaults.js";



    /// Attach all data from database to this app.
    //TODO: fetch data from WP with rest Api
    globalComponentCollectionStore.set(editorBlankData);
    globalEditorPreferencesStore.set(editorDefaultPreferences);


    /// Load all variables dynamically, especially visibility options
    loadVariables();


    ///Load all panels in layout

    /**
     * Variable which holds "Right Panel Contents".
     *
     * @type [{}]
     */
    let rightPanelContentStore = [{}];
    /// Updates "globalRightPanelContentStore" whenever variable "rightPanelContentStore" changes.
    $: globalRightPanelContentStore.set(rightPanelContentStore);

    /**
     * Variable which holds "Left Panel Contents".
     *
     * @type [{}]
     */
    let leftPanelContentStore = [{}];
    /// Updates "globalLeftPanelContentStore" whenever variable "leftPanelContentStore" changes.
    $: globalLeftPanelContentStore.set(leftPanelContentStore);


    /// Manually add all components to panels.

    /// There must be no empty entries in the list. So started adding components like this. To add new panels use .push() !
    /// "name" and "ds" (short for display style) parameters are used in background to help development and debugging
    rightPanelContentStore = [{"component":Customize, "name":"Customize", "ds": "customizePanelDisplayStyle" }];
    leftPanelContentStore = [{"component":Customize, "name":"Customize", "ds": "customizePanelDisplayStyle"  }];

    rightPanelContentStore.push({"component":Widgets, "name":"Widgets", "ds": "widgetPanelDisplayStyle" });
    leftPanelContentStore.push({"component":Widgets, "name":"Widgets", "ds": "widgetPanelDisplayStyle"  });

    rightPanelContentStore.push({"component":Options, "name":"Options", "ds": "optionPanelDisplayStyle" });
    leftPanelContentStore.push({"component":Options, "name":"Options", "ds": "optionPanelDisplayStyle"  });




    let topMenuFrameContent = false;
    let bottomMenuFrameContent = false;
    let leftMenuFrameContent = false;
    let rightMenuFrameContent = false;

    $: switch($globalEditorPreferencesStore.menuLocation){
        case MenuLocations.TOP:
            topMenuFrameContent = true;
            bottomMenuFrameContent = false;
            leftMenuFrameContent = false;
            rightMenuFrameContent = false;
            break;
        case MenuLocations.BOTTOM:
            topMenuFrameContent = false;
            bottomMenuFrameContent = true;
            leftMenuFrameContent = false;
            rightMenuFrameContent = false;
            break;
        case MenuLocations.LEFT:
            topMenuFrameContent = false;
            bottomMenuFrameContent = false;
            leftMenuFrameContent = true;
            rightMenuFrameContent = false;
            break;
        case MenuLocations.RIGHT:
            topMenuFrameContent = false;
            bottomMenuFrameContent = false;
            leftMenuFrameContent = false;
            rightMenuFrameContent = true;
            break;
        default:
            break;
    }

</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <title>Atom Page Builder</title>
</svelte:head>


<div id="backgroundFrame" class="" style='--backgroundFrameColor:{$globalEditorPreferencesStore.editorTheme.backgroundFrameColor};'>
    {#if topMenuFrameContent}<div id="topMenuFrame" class="fixed top-0 left-0 right-0"><svelte:component this={Menu}/></div>{/if}
    <div id="middleFrame" class="flex flex-row" >
        {#if leftMenuFrameContent}<div id="leftMenuFrame" class=""><svelte:component this={Menu}/></div>{/if}

        {#if $globalLeftPanelContentStore.length > 0}<div id="leftPanelFrame" class="">
            {#each $globalLeftPanelContentStore as item}
                {#if $globalEditorPreferencesStore[item.ds] == PanelDisplayStyles.FIXEDLEFT}
                    <svelte:component this={item.component}/>
                {/if}
            {/each}
        </div>{/if}

        <div id="editorWrapper" class="w-full">
            <div id="editor"
                style='
                --editorBackgroundColor:{$globalEditorPreferencesStore.editorTheme.editorBackgroundColor};
                --backgroundColor:{$globalEditorPreferencesStore.editorTheme.backgroundColor};
                --editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};
                '>
                <slot></slot>
            </div>
        </div>


        {#if $globalRightPanelContentStore.length > 0}<div id="rightPanelFrame" class="">
            {#each $globalRightPanelContentStore as item}
                {#if $globalEditorPreferencesStore[item.ds] == PanelDisplayStyles.FIXEDRIGHT}
                    <svelte:component this={item.component}/>
                {/if}
            {/each}
        </div>{/if}

        {#if rightMenuFrameContent}<div id="rightMenuFrame" class=""><svelte:component this={Menu}/></div>{/if}

    </div>
    {#if bottomMenuFrameContent}<div id="bottomMenuFrame" class="fixed bottom-0 left-0 right-0"><svelte:component this={Menu}/></div>{/if}

</div>

<div id="infoLayer" class="flex items-center">
    <svelte:component this={Info}/>
</div>






<style>
    #backgroundFrame{
        background-color: var(--backgroundFrameColor);
        width: 100vw;
        height: 100vh;
        position: relative;
        margin: auto;
        overflow: hidden;
    }
    #topMenuFrame{
        position: sticky;
        width: 100vw;
    }
    #bottomMenuFrame{
        position: sticky;
        width: 100vw;
    }
    #leftMenuFrame{
        height: 100vh;
    }
    #leftPanelFrame{
        background-color: var(--backgroundColor);
        height: 100vh;
    }

    #rightMenuFrame{
        height: 100vh;
    }
    #rightPanelFrame{
        background-color: var(--backgroundColor);
        height: 100vh;
    }
    #editor{
        width: 100%;
        height: auto;
        max-width: var(--editorWidth);
        max-height: 100vh;
        margin: auto;
        overflow: auto !important;
        background-color: var(--editorBackgroundColor);

        /* vertical-align: top;
        display: inline-flex;
        flex-direction: column;
        flex-wrap: wrap; */
    }

    #infoLayer{
        position: fixed;
        left: 20vw;
        bottom: 50px;
        z-index: 99999;
        width: 60vw;
        max-width: 100vw;
        /* min-width: 360px; */
        margin: auto;
    }


</style>