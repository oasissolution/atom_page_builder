<script>
    import { onMount, onDestroy } from "svelte";
    import { globalComponentCollectionStore, globalEditorPreferencesStore, globalVisibilityStore,
        globalRightPanelContentStore, globalLeftPanelContentStore  } from "../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations } from "../globals/globalconstants.js";
    import jQuery from "jquery";

    let globalComponentCollection = $globalComponentCollectionStore ?? [{}] ;
    let globalEditorPreferences = $globalEditorPreferencesStore ?? {};

    $: globalComponentCollectionStore.set(globalComponentCollection);
    $: globalEditorPreferencesStore.set(globalEditorPreferences);

    //Editor Theme settings
    let editorTheme = globalEditorPreferences.editorTheme;

    function setMenuLocation(location){
        // console.log("menuLocation:" + location);
        globalEditorPreferences.menuLocation = location;
    }


    // let editorData = $globalEditorPreferencesStore.editorData;
    // let editorWidth = $globalEditorPreferencesStore.editorData.editorWidth;
    // let editorScreen = $globalEditorPreferencesStore.editorData.editorScreen;
    // let fullWidth = $globalEditorPreferencesStore.editorData.fullWidth;
    let editorWidth = globalEditorPreferences.editorData.editorWidth;
    let editorScreen = globalEditorPreferences.editorData.editorScreen;
    let fullWidth = globalEditorPreferences.editorData.fullWidth;

    // jQuery("*")
    //     .on("mouseenter", (e) => {
    //         var target = e.target;
    //         jQuery(target).addClass("hovered");

    //     }).on("mouseleave", (e) => {
    //         var target = e.target;
    //         jQuery(target).removeClass("hovered");
    //     });

    function setSelectedElement(uuid){
        globalEditorPreferences.info = uuid;
    }

    onMount(() => {

        jQuery("#editorInnerPanel > *")
        .on("mouseover", (e) => {
            var target = e.target;
            jQuery(target).addClass("hovered");
            // console.log("mouseenter event");
            setSelectedElement(jQuery(target).attr("class"));

        }).on("mouseout", (e) => {
            var target = e.target;
            jQuery(target).removeClass("hovered");
        });

    });


</script>

<input type="hidden" class="hovered" />

<div id="editorInnerPanel" class="clearfix" style='
    --editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth}; 

'
>


    <div class="container-fluid d-inline">
        <h1>Hello this is editor page</h1>
        <button class="btn btn-info">Test Button</button>
    </div>

    <div class="container-fluid row">
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <h4>Global Editor Preferences</h4>
            <pre>{JSON.stringify($globalEditorPreferencesStore, null, 2)}</pre>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <h4>Global Visibility</h4>
            <pre>{JSON.stringify($globalVisibilityStore, null, 2)}</pre>
            <h4>Global Right Panel Content Store</h4>
            <pre>{JSON.stringify($globalRightPanelContentStore, null, 2)}</pre>
            <h4>Global Left Panel Content Store</h4>
            <pre>{JSON.stringify($globalLeftPanelContentStore, null, 2)}</pre>
        </div>
    </div>


    <div class="container-fluid">
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
    


</div>

    
</div> <!-- editorInnerPanel -->



<style>
    #editorInnerPanel{
        width: var(--editorWidth) !important;
        vertical-align: top;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        /* background-color: aliceblue; */

        /* display: flex;
        flex-direction: column;
        flex-wrap: wrap; */
    }

    .hovered{
        border: 2px solid aqua;
        
    }

    /* sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px */


    @media (min-width: 400px) and (max-width: 599px) {
        .editorInnerPanel .col {
            width: 50%;
        }
    }

    @media (min-width: 600px) and (max-width: 799px) {
        .editorInnerPanel .col {
            width: 33.33%;
        }
    }

    @media (min-width: 800px) {
        .editorInnerPanel .col {
            width: 25%;
        }
    }


</style>