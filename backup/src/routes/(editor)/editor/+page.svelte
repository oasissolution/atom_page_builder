<script>
    import { onMount, onDestroy } from "svelte";
    import { globalComponentCollectionStore, globalEditorPreferencesStore, globalVisibilityStore,
        globalRightPanelContentStore, globalLeftPanelContentStore, globalEditorViewStore  } from "../../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSizePx, EditorViews } from "../../globals/globalconstants.js";
    import jQuery from "jquery";
	import Page from "./views/page.svelte";
    import Code from "./views/code.svelte";
    import Variables from "./views/variables.svelte";


    let globalComponentCollection = $globalComponentCollectionStore ?? [{}] ;
    $: globalComponentCollectionStore.set(globalComponentCollection);

    let globalEditorPreferences = $globalEditorPreferencesStore ?? {};
    $: globalEditorPreferencesStore.set(globalEditorPreferences);




    /**
     * Sets selected element in editor.
     * @param {string | undefined} uuid Unique identity string used in "globalComponentCollectionStore"
     */
    function setSelectedElement(uuid){
        //globalEditorPreferences.info = uuid;
        //const data = {"selectedUuid": uuid};
        window.parent.postMessage(uuid, '*'); //TODO: For security reasons add domain here
    }

    onMount(() => {

        // jQuery("#editorInnerPanel > *")
        //     .on("mouseover", (e) => {
        //         var target = e.target;
        //         jQuery(target).addClass("hovered");
        //         // setSelectedElement(jQuery(target).attr("class"));
        //         window.parent.postMessage(jQuery(target).attr("class"), '*');

        //     }).on("mouseout", (e) => {
        //         var target = e.target;
        //         jQuery(target).removeClass("hovered");
        //     });



    });


</script>



    {#if $globalEditorViewStore == EditorViews.PAGE}
    <svelte:component this={Page}/>
    {:else if $globalEditorViewStore == EditorViews.CODE }
    <svelte:component this={Code}/>
    {:else}
    <svelte:component this={Variables}/>
    {/if}

<!-- <div id="editorInnerPanel" class="clearfix" style='
    --editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};
    --editorMouseOverColor:{$globalEditorPreferencesStore.editorTheme.editorMouseOverColor};


'
>
    <input type="hidden" class="hovered col" />

    


</div> editorInnerPanel -->



<style>

    /* @import "editorcss.css"; */

    /* #editorInnerPanel{
        width: var(--editorWidth) !important;
        height: 100vh;
        vertical-align: top;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

    } */

    /* calc(var(--editorPanelWidth)* 25 / 100); */

    /* .hovered{
        border: 2px solid var(--editorMouseOverColor);
    } */

    /* .hovered{
        border: 2px solid aqua;
    } */

    




</style>