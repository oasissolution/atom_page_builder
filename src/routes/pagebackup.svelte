<script>
    import { onMount, onDestroy } from "svelte";
    import { globalComponentCollectionStore, globalEditorPreferencesStore, globalVisibilityStore,
        globalRightPanelContentStore, globalLeftPanelContentStore  } from "./globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations } from "./globals/globalconstants.js";
    import jQuery from "jquery";

    let globalComponentCollection = $globalComponentCollectionStore ?? [{}] ;
    let globalEditorPreferences = $globalEditorPreferencesStore ?? {};

    $: globalComponentCollectionStore.set(globalComponentCollection);
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

    //Editor Theme settings
    let editorTheme = globalEditorPreferences.editorTheme;

    function setMenuLocation(location){
        console.log("menuLocation:" + location);
        globalEditorPreferences.menuLocation = location;
    }


    // let editorData = $globalEditorPreferencesStore.editorData;
    // let editorWidth = $globalEditorPreferencesStore.editorData.editorWidth;
    // let editorScreen = $globalEditorPreferencesStore.editorData.editorScreen;
    // let fullWidth = $globalEditorPreferencesStore.editorData.fullWidth;
    let editorWidth = globalEditorPreferences.editorData.editorWidth;
    let editorScreen = globalEditorPreferences.editorData.editorScreen;
    let fullWidth = globalEditorPreferences.editorData.fullWidth;


    onMount(() => {

    });


</script>


<div id="editorInnerPanel">

    <br/><br/>
    Hello this is editor page <br/>
    <br/><br/>
    <div class="">
        <button class="btn btn-sm btn-primary" on:click={() => setMenuLocation(MenuLocations.TOP)} >TOP</button>
        <button class="btn btn-sm btn-primary" on:click={() => setMenuLocation(MenuLocations.LEFT)}>LEFT</button>
        <button class="btn btn-sm btn-primary" on:click={() => setMenuLocation(MenuLocations.RIGHT)}>RIGHT</button>
        <button class="btn btn-sm btn-primary" on:click={() => setMenuLocation(MenuLocations.BOTTOM)}>BOTTOM</button>
    </div>
    <br/><br/>

    <div class="container-fluid row">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h4>Global Editor Preferences</h4>
            <pre>{JSON.stringify($globalEditorPreferencesStore, null, 2)}</pre>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h4>Global Visibility</h4>
            <pre>{JSON.stringify($globalVisibilityStore, null, 2)}</pre>
            <h4>Global Right Panel Content Store</h4>
            <pre>{JSON.stringify($globalRightPanelContentStore, null, 2)}</pre>
            <h4>Global Left Panel Content Store</h4>
            <pre>{JSON.stringify($globalLeftPanelContentStore, null, 2)}</pre>
        </div>
    </div>



    <br/><br/>
    After globalComponentCollection...

    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    &nbsp;*&nbsp;<br/>
    




    
</div> <!-- editorInnerPanel -->



<style>
    /* #editorInnerPanel{
        
    } */
</style>