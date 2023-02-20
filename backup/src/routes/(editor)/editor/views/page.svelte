<script>
    import { onMount, onDestroy } from "svelte";
    import { globalComponentCollectionStore, globalEditorPreferencesStore, globalVisibilityStore, globalEditorViewStore,
        globalRightPanelContentStore, globalLeftPanelContentStore  } from "../../../globals/globalstores.js";
    import { PanelDisplayStyles, MenuLocations, ScreenSizePx } from "../../../globals/globalconstants.js";
    import jQuery from "jquery";

    let globalComponentCollection = $globalComponentCollectionStore ?? [{}] ;
    $: globalComponentCollectionStore.set(globalComponentCollection);

    let globalEditorPreferences = $globalEditorPreferencesStore ?? {};
    $: globalEditorPreferencesStore.set(globalEditorPreferences);





    onMount(() => {

        jQuery("#editorInnerPanel > *")
            .on("mouseover", (e) => {
                var target = e.target;
                jQuery(target).addClass("hovered");
                // setSelectedElement(jQuery(target).attr("class"));
                window.parent.postMessage(jQuery(target).attr("class"), '*');

            }).on("mouseout", (e) => {
                var target = e.target;
                jQuery(target).removeClass("hovered");
            });

            

            // add eventlistener for @ here to listen from parent !

            // globalComponentCollectionStore.subscribe(data => {
            //     window.parent.postMessage(data, '*');
            // });

            // globalEditorPreferencesStore.subscribe(data => {
            //     window.parent.postMessage(data, '*');
            // });

            // globalEditorViewStore.subscribe(data => {
            //     window.parent.postMessage(data, '*');
            // });
        
    });





</script>

<!-- style='
    --editorWidth:{$globalEditorPreferencesStore.editorData.editorWidth};
    --editorMouseOverColor:{$globalEditorPreferencesStore.editorTheme.editorMouseOverColor};


' -->

<div id="editorInnerPanel" class="clearfix" 


>
    <input type="hidden" class="hovered" />

    <div class="container-fluid"> <h1>This is editor</h1></div>


    <div class="container-fluid">
        <div class="col-lg-6 col-md-6 col-sm-12">

            <pre>{JSON.stringify($globalComponentCollectionStore, null, 2)}</pre>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">

            <pre>{JSON.stringify($globalEditorPreferencesStore, null, 2)}</pre>
        </div>
    </div>



</div>






<style>


    #editorInnerPanel{
        width: 100%; /* var(--editorWidth) !important; */
        height: 100vh;
        vertical-align: top;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .hovered{
        border: 2px solid aqua; /* var(--editorMouseOverColor); */
    }



</style>